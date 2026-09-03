import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCities } from "../api";
import { getFavorites } from "../utils/favorites";
import FavoriteButton from "./FavoriteButton";

export default function Favorites() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [, forceUpdate] = useState(0); // favori kaldırıldığında listeyi yenilemek için

  useEffect(() => {
    getCities()
      .then((data) => setCities(data))
      .catch(() => setError("Şehirler yüklenemedi. Sunucunun çalıştığından emin olun."))
      .finally(() => setLoading(false));
  }, []);

  const favoriteSlugs = getFavorites();
  const favoriteCities = cities.filter((c) => favoriteSlugs.includes(c.slug));

  return (
    <div>
      <h1 className="mb-2 font-display text-3xl font-bold text-cini-cobalt dark:text-cini-krem sm:text-4xl">
        ⭐ Gezi Listem
      </h1>
      <p className="mb-8 text-sm text-cini-cobalt/70 dark:text-cini-krem/70">
        Yıldızladığın şehirler burada listelenir. Bu liste yalnızca bu tarayıcıda saklanır.
      </p>

      {loading && <p className="text-center text-cini-cobalt/60 dark:text-cini-krem/60">Yükleniyor…</p>}
      {error && <p className="text-center text-cini-kiremit">{error}</p>}

      {!loading && !error && favoriteCities.length === 0 && (
        <div className="rounded-xl border border-cini-altin/40 bg-white/60 dark:bg-cini-cobalt/40 p-8 text-center">
          <p className="text-cini-cobalt/70 dark:text-cini-krem/70">
            Henüz favori eklemedin. Şehir sayfalarındaki ☆ ikonuna tıklayarak buraya
            ekleyebilirsin.
          </p>
          <Link to="/" className="mt-4 inline-block text-cini-turkuaz underline">
            Haritaya dön
          </Link>
        </div>
      )}

      {!loading && !error && favoriteCities.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {favoriteCities.map((c) => (
            <div
              key={c.slug}
              className="relative rounded-xl border border-cini-altin/40 bg-white/60 dark:bg-cini-cobalt/40 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="absolute right-4 top-4">
                <FavoriteButton
                  citySlug={c.slug}
                  onToggle={() => forceUpdate((n) => n + 1)}
                />
              </div>
              <Link to={`/sehir/${c.slug}`}>
                <h3 className="pr-8 font-display text-xl font-semibold text-cini-cobalt dark:text-cini-krem">
                  {c.name}
                </h3>
                <span className="mt-1 inline-block rounded-full bg-cini-turkuaz/15 px-2 py-0.5 text-[11px] font-medium text-cini-turkuaz">
                  {c.region}
                </span>
                <p className="mt-2 text-sm text-cini-cobalt/70 dark:text-cini-krem/70">{c.shortDescription}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
