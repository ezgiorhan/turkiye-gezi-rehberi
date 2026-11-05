import React, { useState } from "react";
import { Link } from "react-router-dom";
import cityMeta from "../data/cityMeta";
import { haversineDistanceKm } from "../utils/geo";

export default function NearestCityBanner({ cities }) {
  const [status, setStatus] = useState("idle"); // idle | loading | done | denied | unsupported
  const [nearest, setNearest] = useState(null); // { city, distanceKm }

  const handleFindNearest = () => {
    if (!navigator.geolocation) {
      setStatus("unsupported");
      return;
    }

    setStatus("loading");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        let best = null;
        cities.forEach((c) => {
          const meta = cityMeta[c.slug];
          if (!meta) return;
          const distanceKm = haversineDistanceKm(latitude, longitude, meta.lat, meta.lng);
          if (!best || distanceKm < best.distanceKm) {
            best = { city: c, distanceKm };
          }
        });

        setNearest(best);
        setStatus("done");
      },
      () => setStatus("denied"),
      { timeout: 10000 }
    );
  };

  return (
    <section className="w-full relative z-20 my-6">
      <div
        className="p-space-md sm:p-space-lg rounded-2xl bg-surface flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid rgb(231, 223, 213)",
          boxShadow: "rgba(30, 27, 26, 0.06) 0px 12px 32px -8px",
        }}
      >
        <div className="flex items-start sm:items-center gap-space-md">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: "rgb(253, 242, 238)",
              color: "rgb(194, 94, 62)",
              border: "1px solid rgb(248, 221, 210)",
            }}
          >
            <span className="material-symbols-outlined text-[28px]">location_on</span>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-space-sm flex-wrap">
              <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary font-bold tracking-wide">
                GPS YAKINLIK SENSÖRÜ
              </span>
              {status === "done" && nearest && (
                <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">near_me</span> Tahmini{" "}
                  {Math.round(nearest.distanceKm)} km mesafe
                </span>
              )}
            </div>

            {status === "idle" && (
              <p className="font-body-md text-body-md text-on-surface mt-1 font-medium">
                Konumunuzu paylaşarak size en yakın gezilecek ili, saklı rotaları ve yöresel lezzetleri hemen keşfedin.
              </p>
            )}

            {status === "loading" && (
              <p className="font-body-md text-body-md text-on-surface-variant mt-1 animate-pulse">
                Uydulardan konumunuz hesaplanıyor...
              </p>
            )}

            {status === "denied" && (
              <p className="font-body-md text-body-md text-error mt-1 font-medium">
                Konum izni verilmedi. Tarayıcı izinlerinden GPS erişimini açıp tekrar deneyebilirsiniz.
              </p>
            )}

            {status === "unsupported" && (
              <p className="font-body-md text-body-md text-error mt-1 font-medium">
                Cihazınız veya tarayıcınız coğrafi konum servisini desteklemiyor.
              </p>
            )}

            {status === "done" && nearest && (
              <p className="font-body-md text-body-md text-on-surface mt-1 font-medium">
                Şu an <strong className="text-primary font-bold">{nearest.city.name}</strong> yakınlarındasınız —{" "}
                {nearest.city.shortDescription}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-space-md self-end md:self-center flex-shrink-0">
          {status === "idle" && (
            <button
              onClick={handleFindNearest}
              type="button"
              className="px-space-md py-space-sm rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">my_location</span>
              En Yakın İli Bul
            </button>
          )}

          {status === "done" && nearest && (
            <Link
              to={`/sehir/${nearest.city.slug}`}
              className="px-space-md py-space-sm rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm"
            >
              <span>Rehberi İncele</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
