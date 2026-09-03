import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import TurkeyMap from "./TurkeyMap";
import NearestCityBanner from "./NearestCityBanner";
import SearchBar from "./SearchBar";
import FavoriteButton from "./FavoriteButton";
import { getCities } from "../api";

// Türkçe karakterleri sadeleştirip küçük harfe çevirerek arama karşılaştırması yapar
function normalizeTr(str) {
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

export default function Home() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getCities()
      .then((data) => setCities(data))
      .catch(() => setError("Şehirler yüklenemedi. Sunucunun çalıştığından emin olun."))
      .finally(() => setLoading(false));
  }, []);

  const filteredCities = query.trim()
    ? cities.filter((c) => {
        const q = normalizeTr(query);
        return normalizeTr(c.name).includes(q) || normalizeTr(c.region).includes(q);
      })
    : cities;

  const handleSearchSubmit = () => {
    if (filteredCities.length > 0) {
      navigate(`/sehir/${filteredCities[0].slug}`);
    }
  };

  return (
    <div>
      <section className="mb-10 text-center">
        <h1 className="font-display text-4xl font-semibold text-cini-cobalt dark:text-cini-krem sm:text-5xl">
          Şehri seç, hikâyesini keşfet
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-cini-cobalt/70 dark:text-cini-krem/70 sm:text-base">
          Haritadan bir şehre tıkla; gezilecek yerleri, yöresel lezzetleri ve
          ilginç bilgileri öğren, sonra mini quiz ile bilgini test et.
        </p>
      </section>

      {loading && (
        <p className="text-center text-cini-cobalt/60 dark:text-cini-krem/60">Harita yükleniyor…</p>
      )}
      {error && (
        <p className="text-center text-cini-kiremit">{error}</p>
      )}

      {!loading && !error && (
        <>
          <SearchBar value={query} onChange={setQuery} onSubmit={handleSearchSubmit} />
          <NearestCityBanner cities={cities} />
          <TurkeyMap cities={cities} />

          <section className="mt-10">
            <h2 className="mb-4 font-display text-2xl font-semibold text-cini-cobalt dark:text-cini-krem">
              {query.trim()
                ? `Arama Sonuçları (${filteredCities.length})`
                : "Rehberi Hazır Olan Şehirler"}
            </h2>

            {query.trim() && filteredCities.length === 0 && (
              <p className="text-center text-cini-cobalt/60 dark:text-cini-krem/60">
                "{query}" ile eşleşen bir şehir bulunamadı.
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCities.map((c) => (
                <div key={c.slug} className="relative">
                  <div className="absolute right-4 top-4 z-10">
                    <FavoriteButton citySlug={c.slug} />
                  </div>
                  <Link
                    to={`/sehir/${c.slug}`}
                    className="group block h-full rounded-xl border border-cini-altin/40 bg-white/60 dark:bg-cini-cobalt/40 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="mb-1 flex items-center justify-between pr-8">
                      <h3 className="font-display text-xl font-semibold text-cini-cobalt dark:text-cini-krem">
                        {c.name}
                      </h3>
                      <span className="rounded-full bg-cini-turkuaz/15 px-2 py-0.5 text-[11px] font-medium text-cini-turkuaz">
                        {c.region}
                      </span>
                    </div>
                    <p className="text-sm text-cini-cobalt/70 dark:text-cini-krem/70">{c.shortDescription}</p>
                    <span className="mt-3 inline-block text-xs font-semibold text-cini-kiremit group-hover:underline">
                      Rehberi gör →
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
