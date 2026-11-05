import React, { useEffect, useState } from "react";
import cityMeta from "../data/cityMeta";

function describeWeatherCode(code) {
  const map = {
    0: { icon: "wb_sunny", text: "Açık & Güneşli" },
    1: { icon: "partly_cloudy_day", text: "Çoğunlukla Açık" },
    2: { icon: "partly_cloudy_day", text: "Parçalı Bulutlu" },
    3: { icon: "cloud", text: "Kapalı & Bulutlu" },
    45: { icon: "foggy", text: "Sisli" },
    48: { icon: "foggy", text: "Kırağı Sisi" },
    51: { icon: "rainy", text: "Hafif Çisenti" },
    61: { icon: "rainy", text: "Yağmurlu" },
    71: { icon: "ac_unit", text: "Karlı" },
    80: { icon: "rainy", text: "Sağanak" },
    95: { icon: "thunderstorm", text: "Gök Gürültülü Fırtına" },
  };
  return map[code] || { icon: "wb_sunny", text: "Ilıman" };
}

export default function WeatherWidget({ citySlug }) {
  const [weather, setWeather] = useState(undefined);
  const meta = cityMeta[citySlug];

  useEffect(() => {
    if (!meta || !meta.lat || !meta.lng) return;
    let active = true;

    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${meta.lat}&longitude=${meta.lng}&current_weather=true&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        if (active) setWeather(data.current_weather || null);
      })
      .catch(() => {
        if (active) setWeather(null);
      });

    return () => {
      active = false;
    };
  }, [citySlug, meta]);

  if (!meta) return null;

  if (weather === undefined) {
    return (
      <div className="mb-6 flex items-center gap-3 rounded-2xl bg-surface p-4 border border-borderline">
        <div className="h-6 w-6 animate-pulse rounded-full bg-slate-200" />
        <span className="text-xs text-on-surface-variant">Hava durumu yükleniyor...</span>
      </div>
    );
  }

  if (!weather) return null;

  const { icon, text } = describeWeatherCode(weather.weathercode);

  return (
    <div
      className="mb-6 flex items-center justify-between rounded-2xl p-4 shadow-sm"
      style={{
        backgroundColor: "rgb(255, 255, 255)",
        border: "1px solid rgb(231, 223, 213)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="material-symbols-outlined text-amber-500 text-3xl">{icon}</span>
        <div>
          <div className="text-base font-bold text-on-surface">
            {Math.round(weather.temperature)}°C
          </div>
          <div className="text-xs text-on-surface-variant">{text}</div>
        </div>
      </div>
      <div className="text-right text-xs text-on-surface-variant font-medium">
        Rüzgar: {Math.round(weather.windspeed)} km/sa
        <br />
        <span className="text-[10px] text-primary">Open-Meteo İstasyonu</span>
      </div>
    </div>
  );
}
