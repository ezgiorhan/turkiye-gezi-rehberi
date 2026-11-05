import React from "react";
import cityMeta from "../data/cityMeta";

function formatNumber(n) {
  return n.toLocaleString("tr-TR");
}

export default function QuickFacts({ citySlug }) {
  const meta = cityMeta[citySlug];
  if (!meta) return null;

  const items = [
    { label: "Plaka Kodu", value: String(meta.plate).padStart(2, "0"), icon: "🚗" },
    { label: "Rakım", value: `${formatNumber(meta.elevation)} m`, icon: "⛰️" },
    { label: "Yüzölçümü", value: `${formatNumber(meta.area)} km²`, icon: "🗺️" },
    { label: "Nüfus", value: formatNumber(meta.population), icon: "👥" },
  ];

  return (
    <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-2xl p-4 text-center shadow-sm"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          <div className="text-2xl">{item.icon}</div>
          <div className="mt-1 font-headline-sm text-headline-sm font-bold text-primary">
            {item.value}
          </div>
          <div className="text-xs text-on-surface-variant font-medium">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
