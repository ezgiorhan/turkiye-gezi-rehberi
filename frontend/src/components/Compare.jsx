import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCities, getCityBySlug } from "../api";
import cityMeta from "../data/cityMeta";

function formatNumber(n) {
  if (n === undefined || n === null) return "-";
  return n.toLocaleString("tr-TR");
}

export default function Compare() {
  const [cities, setCities] = useState([]);
  const [slugA, setSlugA] = useState("");
  const [slugB, setSlugB] = useState("");
  const [detailA, setDetailA] = useState(null);
  const [detailB, setDetailB] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCities()
      .then((data) => {
        setCities(data);
        if (data.length >= 2) {
          setSlugA(data[0].slug);
          setSlugB(data[1].slug);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!slugA) return;
    getCityBySlug(slugA).then(setDetailA).catch(() => setDetailA(null));
  }, [slugA]);

  useEffect(() => {
    if (!slugB) return;
    getCityBySlug(slugB).then(setDetailB).catch(() => setDetailB(null));
  }, [slugB]);

  const metaA = cityMeta[slugA];
  const metaB = cityMeta[slugB];

  const comparisonRows =
    detailA && detailB
      ? [
          { label: "Bölge", a: detailA.region, b: detailB.region },
          { label: "Plaka", a: metaA?.plate ?? "-", b: metaB?.plate ?? "-" },
          {
            label: "Rakım",
            a: metaA ? `${formatNumber(metaA.elevation)} m` : "-",
            b: metaB ? `${formatNumber(metaB.elevation)} m` : "-",
          },
          {
            label: "Yüzölçümü",
            a: metaA ? `${formatNumber(metaA.area)} km²` : "-",
            b: metaB ? `${formatNumber(metaB.area)} km²` : "-",
          },
          {
            label: "Nüfus (yaklaşık)",
            a: metaA ? formatNumber(metaA.population) : "-",
            b: metaB ? formatNumber(metaB.population) : "-",
          },
          {
            label: "Gezilecek Yer Sayısı",
            a: detailA.places?.length ?? "-",
            b: detailB.places?.length ?? "-",
          },
          {
            label: "Yerel Yemek Sayısı",
            a: detailA.foods?.length ?? "-",
            b: detailB.foods?.length ?? "-",
          },
          {
            label: "Quiz Soru Sayısı",
            a: detailA.quiz?.length ?? "-",
            b: detailB.quiz?.length ?? "-",
          },
        ]
      : [];

  return (
    <div>
      <h1 className="mb-2 font-display text-3xl font-bold text-cini-cobalt dark:text-cini-krem sm:text-4xl">
        ⚖️ Şehir Karşılaştır
      </h1>
      <p className="mb-8 text-sm text-cini-cobalt/70 dark:text-cini-krem/70">
        İki ili yan yana koyup hızlıca karşılaştır.
      </p>

      {loading ? (
        <p className="text-center text-cini-cobalt/60 dark:text-cini-krem/60">Yükleniyor…</p>
      ) : (
        <>
          <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <select
              value={slugA}
              onChange={(e) => setSlugA(e.target.value)}
              className="rounded-lg border border-cini-cobalt/20 dark:border-cini-krem/20 bg-white dark:bg-cini-cobalt/30 dark:text-cini-krem px-4 py-2.5 text-cini-cobalt dark:text-cini-krem outline-none focus:border-cini-turkuaz"
            >
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
            <select
              value={slugB}
              onChange={(e) => setSlugB(e.target.value)}
              className="rounded-lg border border-cini-cobalt/20 dark:border-cini-krem/20 bg-white dark:bg-cini-cobalt/30 dark:text-cini-krem px-4 py-2.5 text-cini-cobalt dark:text-cini-krem outline-none focus:border-cini-turkuaz"
            >
              {cities.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {detailA && detailB && (
            <div className="overflow-hidden rounded-xl border border-cini-altin/30">
              <table className="w-full text-sm">
                <thead className="bg-cini-cobalt text-cini-krem">
                  <tr>
                    <th className="px-3 py-2 text-left">Özellik</th>
                    <th className="px-3 py-2 text-center">{detailA.name}</th>
                    <th className="px-3 py-2 text-center">{detailB.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={i} className="border-t border-cini-altin/20 odd:bg-white/40 dark:bg-cini-cobalt/40">
                      <td className="px-3 py-2 font-medium text-cini-cobalt/80 dark:text-cini-krem/80">
                        {row.label}
                      </td>
                      <td className="px-3 py-2 text-center text-cini-cobalt dark:text-cini-krem">{row.a}</td>
                      <td className="px-3 py-2 text-center text-cini-cobalt dark:text-cini-krem">{row.b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {detailA && detailB && (
            <div className="mt-6 flex justify-center gap-6 text-sm">
              <Link to={`/sehir/${slugA}`} className="text-cini-turkuaz underline">
                {detailA.name} sayfasına git →
              </Link>
              <Link to={`/sehir/${slugB}`} className="text-cini-turkuaz underline">
                {detailB.name} sayfasına git →
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
