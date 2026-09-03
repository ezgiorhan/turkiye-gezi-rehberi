import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

// Türkiye'nin 81 ilinin gerçek sınırlarını içeren açık kaynak GeoJSON.
// properties.name alanı il adını taşır (ör. "Istanbul", "Izmir", "Ankara").
const GEO_URL =
  "https://raw.githubusercontent.com/alpers/Turkey-Maps-GeoJSON/master/tr-cities.json";

// Türkçe karakterleri sadeleştirip küçük harfe çevirerek karşılaştırılabilir
// bir anahtar üretir. Böylece "İstanbul" / "Istanbul" / "istanbul" hepsi eşleşir.
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

// GeoJSON kaynağı bazı illeri farklı/eski isimlerle etiketleyebiliyor
// (ör. "Afyon" yerine "Afyonkarahisar", "Urfa" yerine "Şanlıurfa").
// Anahtar: GeoJSON'da görünen (normalize edilmiş) ad, değer: bizim slug'ımız.
const GEO_NAME_ALIASES = {
  afyon: "afyonkarahisar",
  urfa: "sanliurfa",
  maras: "kahramanmaras",
  kmaras: "kahramanmaras",
  icel: "mersin",
};

export default function TurkeyMap({ cities }) {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [tooltip, setTooltip] = useState(null); // { name, x, y, active }

  // slug -> şehir verisi hızlı erişim tablosu
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
    // Son çare: alias listesinde olmayan başka bir isim farkı varsa (ör. GeoJSON
    // "Afyon", bizim slug "afyonkarahisar" ise) bulanık (substring) eşleşme dene.
    const fuzzy = cities.find((c) => {
      const slugKey = normalize(c.slug);
      return key.includes(slugKey) || slugKey.includes(key);
    });
    return fuzzy || null;
  };

  const handleMouseMove = (evt, name, active) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setTooltip({
      name,
      active,
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top,
    });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden rounded-2xl border border-cini-altin/40 bg-cini-cobalt/95 p-3 shadow-lg sm:p-6"
    >
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ center: [35.5, 39], scale: 2700 }}
        width={800}
        height={430}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const geoName = geo.properties.name || geo.properties.NAME || "";
              const city = findCityForGeo(geoName);
              const isActive = Boolean(city);
              const isHovered = tooltip && tooltip.name === geoName;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => isActive && navigate(`/sehir/${city.slug}`)}
                  onMouseMove={(evt) => handleMouseMove(evt, geoName, isActive)}
                  onMouseLeave={() => setTooltip(null)}
                  tabIndex={isActive ? 0 : -1}
                  role={isActive ? "button" : undefined}
                  aria-label={isActive ? `${geoName} sayfasına git` : geoName}
                  onKeyDown={(evt) => {
                    if (isActive && (evt.key === "Enter" || evt.key === " ")) {
                      navigate(`/sehir/${city.slug}`);
                    }
                  }}
                  style={{
                    default: {
                      fill: isActive ? "#0E9AA7" : "#3E5871",
                      stroke: "#F6EEDD",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: isActive ? "pointer" : "default",
                      transition: "fill 150ms ease",
                    },
                    hover: {
                      fill: isActive ? "#C1440E" : "#4C6A85",
                      stroke: "#F6EEDD",
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: isActive ? "pointer" : "default",
                    },
                    pressed: {
                      fill: "#9C3509",
                      stroke: "#F6EEDD",
                      strokeWidth: 0.5,
                      outline: "none",
                    },
                  }}
                  className={isHovered ? "opacity-100" : ""}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltip && (
        <div
          className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full rounded-md border border-cini-altin/50 bg-cini-krem px-2.5 py-1 text-xs font-semibold text-cini-cobalt shadow-md"
          style={{ left: tooltip.x, top: tooltip.y - 8 }}
        >
          {tooltip.name}
          {!tooltip.active && (
            <span className="ml-1 font-normal text-cini-cobalt/60">· yakında</span>
          )}
        </div>
      )}
    </div>
  );
}
