import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCities } from "../api";
import cityMeta from "../data/cityMeta";

export default function Favorites({ onOpenAuthModal }) {
  const { user, toggleFavorite, toggleVisited } = useAuth();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCities()
      .then(setCities)
      .finally(() => setLoading(false));
  }, []);

  const favSlugs = user?.favoriteCities || [];
  const visitedSlugs = user?.visitedCities || [];
  const favoriteList = cities.filter((c) => favSlugs.includes(c.slug.toLowerCase()));

  if (!user) {
    return (
      <div className="max-w-xl mx-auto py-16 px-4 text-center">
        <div
          className="p-10 rounded-3xl bg-surface border shadow-xl"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          <span className="text-5xl">⭐</span>
          <h1 className="font-headline-xl text-headline-xl font-extrabold text-on-surface mt-4">
            Favori Şehirlerim
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mt-2 leading-relaxed">
            Beğendiğiniz ve daha sonra ziyaret etmek üzere kaydetmek istediğiniz şehirleri favorilerinize eklemek için lütfen giriş yapın.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={onOpenAuthModal}
              type="button"
              className="px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-md active:scale-95"
            >
              Giriş Yap / Kayıt Ol
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg py-space-xl space-y-space-xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div>
          <div className="flex items-center gap-space-xs text-amber-500 font-label-md text-label-md font-bold uppercase tracking-wider">
            <span>⭐</span>
            <span>Kişisel Liste</span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface mt-1 font-bold">
            Favori Şehirlerim ({favoriteList.length})
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            Daha sonra ziyaret etmek veya tekrar incelemek üzere kaydettiğiniz şehir rehberleri.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 rounded-3xl bg-surface animate-pulse border border-borderline"
            />
          ))}
        </div>
      ) : favoriteList.length === 0 ? (
        <div
          className="rounded-3xl p-12 text-center shadow-sm"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          <span className="text-4xl">🌟</span>
          <h3 className="font-title-lg text-title-lg font-bold text-on-surface mt-3">
            Henüz favorilerinize bir şehir eklemediniz
          </h3>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1 mb-6">
            Haritayı veya şehir rehberlerini incelerken kalp ya da yıldız ikonuna tıklayarak şehirleri buraya ekleyebilirsiniz.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-md"
          >
            <span>Haritada Şehirleri Keşfet</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
          {favoriteList.map((c) => {
            const meta = cityMeta[c.slug] || {};
            const plateCode = meta.plate ? String(meta.plate).padStart(2, "0") : "--";
            const isVisited = visitedSlugs.includes(c.slug.toLowerCase());

            return (
              <div
                key={c.slug}
                className="group flex flex-col rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 p-space-lg justify-between"
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  border: "1px solid rgb(231, 223, 213)",
                }}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        #{plateCode} • {c.region}
                      </span>
                      <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-0.5">
                        {c.name}
                      </h2>
                    </div>
                    <button
                      onClick={() => toggleFavorite(c.slug)}
                      title="Favorilerden kaldır"
                      className="w-9 h-9 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center transition-colors"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] font-fill">favorite</span>
                    </button>
                  </div>

                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-3 line-clamp-2 leading-relaxed">
                    {c.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-space-sm">
                    {c.placesToVisit?.slice(0, 2).map((p, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface-variant"
                      >
                        {p.name || p}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-space-lg pt-space-md border-t border-borderline flex items-center justify-between">
                  <button
                    onClick={() => toggleVisited(c.slug)}
                    type="button"
                    className={`px-3 py-1.5 rounded-lg font-label-md text-label-md flex items-center gap-1 transition-colors ${
                      isVisited
                        ? "bg-primary text-on-primary"
                        : "bg-surface-container text-on-surface hover:bg-surface-container-high"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isVisited ? "check_circle" : "add"}
                    </span>
                    <span>{isVisited ? "Gezildi" : "Gezdim"}</span>
                  </button>

                  <Link
                    to={`/sehir/${c.slug}`}
                    className="font-label-md text-label-md text-primary hover:underline font-bold flex items-center gap-1"
                  >
                    <span>Rehbere Git</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
