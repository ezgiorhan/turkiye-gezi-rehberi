import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const GEO_URL =
  "https://raw.githubusercontent.com/alpers/Turkey-Maps-GeoJSON/master/tr-cities.json";

function normalize(str) {
  return (str || "")
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ş/g, "s")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .trim();
}

const GEO_NAME_ALIASES = {
  afyon: "afyonkarahisar",
  urfa: "sanliurfa",
  maras: "kahramanmaras",
  kmaras: "kahramanmaras",
  icel: "mersin",
};

export default function TurkeyMap({ cities = [], visitedSlugs = [], showOnlyVisited = false }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const citiesBySlug = {};
  cities.forEach((c) => {
    citiesBySlug[normalize(c.slug)] = c;
  });

  const findCityForGeo = (geoName) => {
    const key = normalize(geoName);
    if (citiesBySlug[key]) return citiesBySlug[key];
    if (GEO_NAME_ALIASES[key] && citiesBySlug[GEO_NAME_ALIASES[key]]) {
      return citiesBySlug[GEO_NAME_ALIASES[key]];
    }
    const fuzzy = cities.find((c) => {
      const slugKey = normalize(c.slug);
      return key.includes(slugKey) || slugKey.includes(key);
    });
    return fuzzy || null;
  };

  const handleMouseMove = (evt, city, geoName) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = evt.clientX - rect.left + 15;
    const y = evt.clientY - rect.top + 15;

    setTooltip({
      name: city ? city.name : geoName,
      region: city ? city.region : "Türkiye",
      description: city ? city.shortDescription : "Tarih ve doğa harikası Anadolu ili.",
      spotsCount: city ? city.places?.length || 12 : 10,
      slug: city ? city.slug : null,
      x: Math.min(x, rect.width - 290),
      y: Math.min(y, rect.height - 140),
    });
  };

  // Color generator based on region & visited status
  const getCityFill = (city, isVisited) => {
    if (!city) return "#dee0e2";
    if (isVisited) return "#0F766E";
    if (showOnlyVisited) return "#e2e7ff";

    const region = city.region || "";
    if (region === "Ege" || region === "Akdeniz") return "#0f766e";
    if (region === "Karadeniz" || region === "Marmara") return "#14b8a6";
    return "#ea580c"; // İç Anadolu, Doğu Anadolu, Güneydoğu
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-3xl bg-surface-container-low p-space-md sm:p-space-xl overflow-hidden shadow-[0_20px_50px_-20px_rgba(15,118,110,0.12)] border border-borderline"
      style={{
        backgroundColor: "rgb(250, 247, 242)",
        borderColor: "rgb(231, 223, 213)",
      }}
    >
      {/* Regional Legend Overlay */}
      <div
        className="absolute top-space-md left-space-md z-10 hidden sm:flex flex-wrap items-center gap-space-xs p-space-xs rounded-xl bg-surface/90 backdrop-blur-md shadow-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          border: "1px solid rgb(231, 223, 213)",
        }}
      >
        <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface px-2 py-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#0f766e]"></span> Ege &amp; Akdeniz
        </span>
        <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface px-2 py-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#14b8a6]"></span> Karadeniz &amp; Marmara
        </span>
        <span className="inline-flex items-center gap-1.5 font-label-sm text-label-sm text-on-surface px-2 py-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ea580c]"></span> İç &amp; Doğu Anadolu
        </span>
      </div>

      {/* Floating Zoom Controls in Corner */}
      <div className="absolute top-space-md right-space-md z-10 flex items-center gap-1 p-1 rounded-xl bg-white/90 backdrop-blur-md border border-borderline shadow-sm">
        <button
          onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.8))}
          className="w-7 h-7 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors text-on-surface"
          title="Yakınlaştır"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.9))}
          className="w-7 h-7 rounded-lg hover:bg-surface-container flex items-center justify-center transition-colors text-on-surface"
          title="Uzaklaştır"
          type="button"
        >
          <span className="material-symbols-outlined text-[16px]">remove</span>
        </button>
      </div>

      {/* Map SVG Canvas Container */}
      <div
        className="w-full h-[380px] sm:h-[480px] flex items-center justify-center overflow-hidden transition-transform duration-300"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ center: [35.5, 39], scale: 2700 }}
          width={960}
          height={480}
          style={{ width: "100%", height: "auto" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoName = geo.properties.name || geo.properties.NAME || "";
                const city = findCityForGeo(geoName);
                const isVisited = city
                  ? visitedSlugs.includes(city.slug.toLowerCase())
                  : false;
                const fill = getCityFill(city, isVisited);

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => city && navigate(`/sehir/${city.slug}`)}
                    onMouseMove={(evt) => handleMouseMove(evt, city, geoName)}
                    onMouseLeave={() => setTooltip(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={city ? city.name : geoName}
                    style={{
                      default: {
                        fill: fill,
                        stroke: "#FAF7F2",
                        strokeWidth: 0.8,
                        outline: "none",
                        cursor: city ? "pointer" : "default",
                        transition: "all 150ms ease",
                      },
                      hover: {
                        fill: "#c2410c",
                        stroke: "#ffffff",
                        strokeWidth: 1.5,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#9a3412",
                        stroke: "#ffffff",
                        strokeWidth: 1.5,
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      {/* STITCH DYNAMIC POPOVER TOOLTIP */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-30 p-space-md rounded-2xl bg-surface/95 backdrop-blur-xl shadow-[0_24px_48px_-12px_rgba(15,23,42,0.2)] w-72 flex flex-col gap-2 transition-all duration-150 border border-borderline"
          style={{
            left: tooltip.x,
            top: tooltip.y,
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-bold uppercase">
              {tooltip.region}
            </span>
            <div className="flex items-center text-tertiary font-label-sm font-bold gap-0.5">
              <span className="material-symbols-outlined text-[14px]">star</span>
              <span>4.9</span>
            </div>
          </div>
          <div className="font-headline-sm text-headline-sm text-on-surface font-bold">
            {tooltip.name}
          </div>
          <div className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
            {tooltip.description}
          </div>
          <div className="flex items-center justify-between pt-1 font-label-sm text-label-sm font-semibold text-primary">
            <span>{tooltip.spotsCount} Gezilecek Yer</span>
            <span className="flex items-center">Tıkla ve Keşfet →</span>
          </div>
        </div>
      )}

      {/* Map Banner Footer */}
      <div className="mt-space-md pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant font-label-md text-label-md border-t border-borderline/60">
        <div className="flex items-center gap-space-sm">
          <span className="material-symbols-outlined text-primary text-[20px]">touch_app</span>
          <span>Herhangi bir şehrin sınırına tıklayarak detaylı il rehberine geçiş yapabilirsiniz.</span>
        </div>
        <div className="flex items-center gap-space-md">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-primary"></span>
            {visitedSlugs.length} Gezildi
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary-container"></span>
            81 Vilayet
          </span>
        </div>
      </div>
    </div>
  );
}
