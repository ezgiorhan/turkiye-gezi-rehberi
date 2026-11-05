import React, { useRef, useState } from "react";
import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";

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

export default function MyTurkeyMap({ cities, visitedSlugs, onToggleCity }) {
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null);
  const [position, setPosition] = useState({ coordinates: [35.5, 39], zoom: 1 });

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

  const handleMouseMove = (evt, city, geoName, isVisited) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip({
      name: city ? city.name : geoName,
      region: city ? city.region : "",
      isVisited,
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    });
  };

  const visitedSet = new Set((visitedSlugs || []).map((s) => normalize(s)));

  const handleZoomIn = () => {
    setPosition((pos) => ({ ...pos, zoom: Math.min(pos.zoom * 1.3, 4) }));
  };

  const handleZoomOut = () => {
    setPosition((pos) => ({ ...pos, zoom: Math.max(pos.zoom / 1.3, 0.9) }));
  };

  const handleResetZoom = () => {
    setPosition({ coordinates: [35.5, 39], zoom: 1 });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden p-space-md sm:p-space-lg select-none"
      style={{
        backgroundColor: "rgb(250, 247, 242)",
        border: "1px solid rgb(231, 223, 213)",
      }}
    >
      {/* Top Floating Toolbar */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-surface/90 backdrop-blur-md p-1.5 rounded-xl border border-borderline shadow-sm">
        <button
          onClick={handleZoomIn}
          type="button"
          title="Yakınlaş"
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface hover:bg-surface-container text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
        </button>
        <button
          onClick={handleZoomOut}
          type="button"
          title="Uzaklaş"
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface hover:bg-surface-container text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">remove</span>
        </button>
        <button
          onClick={handleResetZoom}
          type="button"
          title="Sıfırla"
          className="w-8 h-8 rounded-lg flex items-center justify-center bg-surface hover:bg-surface-container text-on-surface transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">restart_alt</span>
        </button>
      </div>

      {/* Legend Badge Overlay */}
      <div className="absolute top-4 left-4 z-20 hidden sm:flex items-center gap-3 bg-surface/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-borderline shadow-sm text-xs font-semibold text-on-surface">
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#C1440E] shadow-sm" />
          Gezildi
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3.5 h-3.5 rounded-full bg-[#0F766E] shadow-sm" />
          Gezilmedi
        </span>
      </div>

      {/* Floating Dynamic Tooltip Card */}
      {tooltip && (
        <div
          className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-full rounded-xl bg-surface/95 px-3 py-2 text-xs shadow-xl backdrop-blur-md border border-borderline transition-all duration-75"
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y - 12}px`,
          }}
        >
          <div className="font-bold text-on-surface text-sm">{tooltip.name}</div>
          {tooltip.region && (
            <div className="text-[11px] text-on-surface-variant font-medium">{tooltip.region}</div>
          )}
          <div className="mt-1 flex items-center gap-1 font-semibold">
            {tooltip.isVisited ? (
              <span className="text-[#C1440E] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">check_circle</span> Gezildi (Kaldırmak için tıkla)
              </span>
            ) : (
              <span className="text-primary flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">add_circle</span> Gezdim Olarak İşaretle
              </span>
            )}
          </div>
        </div>
      )}

      {/* Map Canvas */}
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [35.5, 39], scale: 2700 }}
        width={800}
        height={430}
        style={{ width: "100%", height: "auto" }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={(pos) => setPosition(pos)}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const geoName = geo.properties.name || geo.properties.NAME || "";
                const city = findCityForGeo(geoName);
                const citySlugKey = city ? normalize(city.slug) : normalize(geoName);
                const isVisited = visitedSet.has(citySlugKey);

                // Renk Kuralları:
                // - Gezildi (seçildi): #C1440E (turuncu/kiremit)
                // - Gezilmedi: #0F766E (turkuaz)
                // - Hover: Gezildiyse hafif koyu turuncu (#9C3509); Gezilmediyse turuncu önizleme (#C1440E)
                const defaultFill = isVisited ? "#C1440E" : "#0F766E";
                const hoverFill = isVisited ? "#9C3509" : "#C1440E";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onClick={() => {
                      if (city) {
                        onToggleCity(city.slug);
                      } else {
                        // Eğer backend listesinde olmayan bir ilse de slug normalize edilip toggle edilebilir
                        onToggleCity(citySlugKey);
                      }
                    }}
                    onMouseMove={(evt) => handleMouseMove(evt, city, geoName, isVisited)}
                    onMouseLeave={() => setTooltip(null)}
                    tabIndex={0}
                    role="button"
                    aria-label={`${city ? city.name : geoName} - ${
                      isVisited ? "Gezildi" : "Gezilmedi"
                    }`}
                    style={{
                      default: {
                        fill: defaultFill,
                        stroke: "#FAF7F2",
                        strokeWidth: 0.75,
                        outline: "none",
                        transition: "fill 200ms ease",
                      },
                      hover: {
                        fill: hoverFill,
                        stroke: "#FFFFFF",
                        strokeWidth: 1.5,
                        outline: "none",
                        cursor: "pointer",
                      },
                      pressed: {
                        fill: "#9C3509",
                        outline: "none",
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}
