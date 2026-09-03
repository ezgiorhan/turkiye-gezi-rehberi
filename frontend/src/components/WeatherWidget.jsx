import React, { useEffect, useState } from "react";
import cityMeta from "../data/cityMeta";

// WMO hava durumu kodlarını basit bir emoji + Türkçe açıklamaya çevirir.
// Kaynak: Open-Meteo WMO Weather interpretation codes.
function describeWeatherCode(code) {
  const map = {
    0: { icon: "☀️", text: "Açık" },
    1: { icon: "🌤️", text: "Çoğunlukla açık" },
    2: { icon: "⛅", text: "Parçalı bulutlu" },
    3: { icon: "☁️", text: "Kapalı" },
    45: { icon: "🌫️", text: "Sisli" },
    48: { icon: "🌫️", text: "Kırağı sisi" },
    51: { icon: "🌦️", text: "Hafif çisenti" },
    53: { icon: "🌦️", text: "Çisenti" },
    55: { icon: "🌦️", text: "Yoğun çisenti" },
    61: { icon: "🌧️", text: "Hafif yağmur" },
    63: { icon: "🌧️", text: "Yağmurlu" },
    65: { icon: "🌧️", text: "Şiddetli yağmur" },
    71: { icon: "🌨️", text: "Hafif kar" },
    73: { icon: "🌨️", text: "Karlı" },
    75: { icon: "❄️", text: "Yoğun kar" },
    80: { icon: "🌦️", text: "Sağanak" },
    81: { icon: "🌧️", text: "Kuvvetli sağanak" },
    82: { icon: "⛈️", text: "Şiddetli sağanak" },
    95: { icon: "⛈️", text: "Gök gürültülü fırtına" },
    96: { icon: "⛈️", text: "Dolu ile fırtına" },
    99: { icon: "⛈️", text: "Şiddetli dolu fırtınası" },
  };
  return map[code] || { icon: "🌡️", text: "Bilinmiyor" };
}

// Şehrin anlık hava durumunu, koordinatlar üzerinden ücretsiz ve API anahtarı
// gerektirmeyen Open-Meteo servisinden çeker.
export default function WeatherWidget({ citySlug }) {
  const [weather, setWeather] = useState(undefined); // undefined = yükleniyor, null = hata
  const meta = cityMeta[citySlug];

  useEffect(() => {
    if (!meta) return;
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
      <div className="mb-8 flex items-center gap-3 rounded-lg border border-cini-altin/30 bg-white/60 dark:bg-cini-cobalt/40 p-4">
        <div className="h-8 w-8 animate-pulse rounded-full bg-cini-cobalt/10 dark:bg-cini-krem/10" />
        <span className="text-sm text-cini-cobalt/60 dark:text-cini-krem/60">Hava durumu yükleniyor…</span>
      </div>
    );
  }

  if (!weather) {
    return null; // sessizce gizle - kritik bir özellik değil
  }

  const { icon, text } = describeWeatherCode(weather.weathercode);

  return (
    <div className="mb-8 flex items-center justify-between rounded-lg border border-cini-altin/30 bg-white/60 dark:bg-cini-cobalt/40 p-4">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{icon}</span>
        <div>
          <div className="text-lg font-semibold text-cini-cobalt dark:text-cini-krem">
            {Math.round(weather.temperature)}°C
          </div>
          <div className="text-xs text-cini-cobalt/60 dark:text-cini-krem/60">{text}</div>
        </div>
      </div>
      <div className="text-right text-xs text-cini-cobalt/50 dark:text-cini-krem/50">
        Rüzgar {Math.round(weather.windspeed)} km/sa
        <br />
        Open-Meteo verisi
      </div>
    </div>
  );
}
