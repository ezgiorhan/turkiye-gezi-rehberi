import React, { useState } from "react";
import { Link } from "react-router-dom";
import cityMeta from "../data/cityMeta";
import { haversineDistanceKm } from "../utils/geo";

// Kullanıcının tarayıcı konumunu (izin verirse) kullanarak, veritabanında
// rehberi hazır olan şehirlerden en yakınını bulup önerir.
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
    <div className="mb-8 rounded-xl border border-cini-altin/40 bg-cini-cobalt/5 dark:bg-cini-krem/5 p-5 text-center">
      {status === "idle" && (
        <>
          <p className="mb-3 text-sm text-cini-cobalt/80 dark:text-cini-krem/80">
            📍 Konumunu paylaşırsan, sana en yakın gezilecek ili önerelim.
          </p>
          <button
            onClick={handleFindNearest}
            className="rounded-full bg-cini-turkuaz px-5 py-2 text-sm font-semibold text-white transition hover:bg-cini-turkuaz/90"
          >
            Bana En Yakın Şehri Bul
          </button>
        </>
      )}

      {status === "loading" && (
        <p className="text-sm text-cini-cobalt/60 dark:text-cini-krem/60">Konumun alınıyor…</p>
      )}

      {status === "denied" && (
        <p className="text-sm text-cini-kiremit">
          Konum izni verilmedi. Tarayıcı ayarlarından izin verip tekrar
          deneyebilirsin.
        </p>
      )}

      {status === "unsupported" && (
        <p className="text-sm text-cini-kiremit">
          Tarayıcın konum servisini desteklemiyor.
        </p>
      )}

      {status === "done" && nearest && (
        <p className="text-sm text-cini-cobalt dark:text-cini-krem">
          📍 Sana en yakın gezilecek il:{" "}
          <Link
            to={`/sehir/${nearest.city.slug}`}
            className="font-semibold text-cini-turkuaz underline hover:text-cini-kiremit"
          >
            {nearest.city.name}
          </Link>{" "}
          — yaklaşık {Math.round(nearest.distanceKm)} km uzaklıkta.
        </p>
      )}

      {status === "done" && !nearest && (
        <p className="text-sm text-cini-cobalt/60 dark:text-cini-krem/60">
          Şu anda önerebileceğimiz bir şehir bulunamadı.
        </p>
      )}
    </div>
  );
}
