import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCities, getCityBySlug } from "../api";
import cityMeta from "../data/cityMeta";

export default function CompareCities() {
  const [cities, setCities] = useState([]);
  const [slug1, setSlug1] = useState("");
  const [slug2, setSlug2] = useState("");
  const [city1, setCity1] = useState(null);
  const [city2, setCity2] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCities()
      .then((data) => {
        setCities(data);
        if (data.length >= 2) {
          setSlug1(data[0].slug);
          setSlug2(data[1].slug);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (slug1) getCityBySlug(slug1).then(setCity1).catch(() => setCity1(null));
  }, [slug1]);

  useEffect(() => {
    if (slug2) getCityBySlug(slug2).then(setCity2).catch(() => setCity2(null));
  }, [slug2]);

  if (loading) {
    return (
      <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg py-20 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-body-md text-body-md text-on-surface-variant">Şehir verileri yükleniyor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg py-space-xl space-y-space-2xl">
      {/* Başlık */}
      <section className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container border border-borderline shadow-sm mb-space-sm">
          <span className="material-symbols-outlined text-[18px] text-primary">compare_arrows</span>
          <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
            Şehir Kıyaslama Aracı
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl sm:text-display text-on-surface font-extrabold tracking-tight">
          İki Şehri Yan Yana Karşılaştır
        </h1>
        <p className="mt-space-xs font-body-md text-body-md text-on-surface-variant leading-relaxed">
          İki farklı il seçin; gezilecek yerlerini, meşhur mutfak lezzetlerini, nüfus ve rakım verilerini doğrudan kıyaslayın.
        </p>
      </section>

      {/* Şehir Seçiciler */}
      <div className="grid grid-cols-1 gap-space-lg sm:grid-cols-2">
        <div
          className="rounded-2xl p-space-lg shadow-sm"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          <label className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary mb-2">
            1. Şehir Seçimi
          </label>
          <select
            value={slug1}
            onChange={(e) => setSlug1(e.target.value)}
            className="w-full rounded-xl px-space-md py-2.5 font-title-lg text-title-lg font-bold text-on-surface outline-none cursor-pointer"
            style={{
              backgroundColor: "rgb(250, 247, 242)",
              border: "1px solid rgb(231, 223, 213)",
            }}
          >
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.region})
              </option>
            ))}
          </select>
        </div>

        <div
          className="rounded-2xl p-space-lg shadow-sm"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          <label className="block font-label-sm text-label-sm font-bold uppercase tracking-wider text-primary mb-2">
            2. Şehir Seçimi
          </label>
          <select
            value={slug2}
            onChange={(e) => setSlug2(e.target.value)}
            className="w-full rounded-xl px-space-md py-2.5 font-title-lg text-title-lg font-bold text-on-surface outline-none cursor-pointer"
            style={{
              backgroundColor: "rgb(250, 247, 242)",
              border: "1px solid rgb(231, 223, 213)",
            }}
          >
            {cities.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.name} ({c.region})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Karşılaştırma Kartları */}
      {city1 && city2 && (
        <div className="grid grid-cols-1 gap-space-lg md:grid-cols-2 items-start">
          {[city1, city2].map((c, idx) => {
            const meta = cityMeta[c.slug] || {};
            const places = c.placesToVisit || c.places || [];
            const foods = c.famousFoods || c.foods || [];
            const facts = c.interestingFacts || c.funFacts || [];

            return (
              <div
                key={c.slug + idx}
                className="rounded-3xl shadow-md p-space-xl space-y-space-lg flex flex-col justify-between"
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  border: "1px solid rgb(231, 223, 213)",
                }}
              >
                {/* Header */}
                <div className="border-b border-borderline pb-space-md">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="px-space-sm py-0.5 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold uppercase">
                      {c.region}
                    </span>
                    {meta.plate && (
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                        Plaka: #{String(meta.plate).padStart(2, "0")}
                      </span>
                    )}
                  </div>

                  <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface mt-space-xs">
                    {c.name}
                  </h2>
                  <p className="mt-1 font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                    {c.shortDescription}
                  </p>

                  <Link
                    to={`/sehir/${c.slug}`}
                    className="mt-space-sm inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold hover:underline"
                  >
                    <span>Tam Şehir Rehberini İncele</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>

                {/* Quick Numbers Bar */}
                <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-surface-container-low border border-borderline">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Nüfus</span>
                    <span className="font-title-lg text-title-lg font-bold text-on-surface">
                      {meta.population ? `${(meta.population / 1000000).toFixed(1)}M` : "--"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Rakım</span>
                    <span className="font-title-lg text-title-lg font-bold text-on-surface">
                      {meta.elevation ? `${meta.elevation}m` : "--"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant block">Yüzölçümü</span>
                    <span className="font-title-lg text-title-lg font-bold text-on-surface">
                      {meta.area ? `${Math.round(meta.area / 1000)}k` : "--"}
                    </span>
                  </div>
                </div>

                {/* Gezilecek Yerler */}
                <div>
                  <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-space-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]">explore</span>
                    <span>Gezilecek Noktalar ({places.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {places.slice(0, 4).map((p, i) => {
                      const pName = p.name || p;
                      const pDesc = p.description || "";
                      return (
                        <div
                          key={i}
                          className="p-space-sm rounded-xl text-body-sm flex flex-col"
                          style={{ backgroundColor: "rgb(250, 247, 242)" }}
                        >
                          <strong className="text-on-surface font-semibold">{pName}</strong>
                          {pDesc && <span className="text-on-surface-variant text-xs line-clamp-1 mt-0.5">{pDesc}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Yöresel Lezzetler */}
                <div>
                  <h3 className="font-title-lg text-title-lg font-bold text-on-surface mb-space-sm flex items-center gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-[20px]">restaurant</span>
                    <span>Yöresel Lezzetler ({foods.length})</span>
                  </h3>
                  <div className="space-y-2">
                    {foods.slice(0, 4).map((f, i) => {
                      const fName = f.name || f;
                      const fDesc = f.description || "";
                      return (
                        <div
                          key={i}
                          className="p-space-sm rounded-xl text-body-sm flex flex-col"
                          style={{ backgroundColor: "rgb(250, 247, 242)" }}
                        >
                          <strong className="text-on-surface font-semibold">🍲 {fName}</strong>
                          {fDesc && <span className="text-on-surface-variant text-xs line-clamp-1 mt-0.5">{fDesc}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* İlginç Bilgi */}
                {facts.length > 0 && (
                  <div
                    className="rounded-2xl p-space-md text-body-sm"
                    style={{
                      backgroundColor: "rgb(237, 231, 223)",
                      border: "1px solid rgb(231, 223, 213)",
                    }}
                  >
                    <div className="flex items-center gap-1 font-bold text-primary mb-1">
                      <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                      <span>Biliyor muydunuz?</span>
                    </div>
                    <p className="text-on-surface text-xs leading-relaxed">{facts[0]}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
