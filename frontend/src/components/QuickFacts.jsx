import React from "react";
import cityMeta from "../data/cityMeta";

function formatNumber(n) {
  return n.toLocaleString("tr-TR");
}

// Şehrin plaka kodu, rakımı, yüzölçümü ve nüfusunu gösteren küçük bilgi kutusu.
// Veriler frontend/src/data/cityMeta.js dosyasından gelir (bkz. o dosyadaki
// "yaklaşık değer" notu).
export default function QuickFacts({ citySlug }) {
  const meta = cityMeta[citySlug];
  if (!meta) return null;

  const items = [
    { label: "Plaka", value: meta.plate, icon: "🚗" },
    { label: "Rakım", value: `${formatNumber(meta.elevation)} m`, icon: "⛰️" },
    { label: "Yüzölçümü", value: `${formatNumber(meta.area)} km²`, icon: "🗺️" },
    { label: "Nüfus (yaklaşık)", value: formatNumber(meta.population), icon: "👥" },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-lg border border-cini-altin/30 bg-white/60 dark:bg-cini-cobalt/40 p-3 text-center"
        >
          <div className="text-xl">{item.icon}</div>
          <div className="mt-1 text-sm font-semibold text-cini-cobalt dark:text-cini-krem">
            {item.value}
          </div>
          <div className="text-xs text-cini-cobalt/60 dark:text-cini-krem/60">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
