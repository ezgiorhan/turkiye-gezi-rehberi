import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCityBySlug } from "../api";
import { useAuth } from "../context/AuthContext";
import PlaceImage from "./PlaceImage";
import cityMeta from "../data/cityMeta";

function describeWeather(code) {
  const map = {
    0: { icon: "wb_sunny", text: "Güneşli & Açık", color: "text-amber-300" },
    1: { icon: "partly_cloudy_day", text: "Çoğunlukla Açık", color: "text-amber-200" },
    2: { icon: "partly_cloudy_day", text: "Parçalı Bulutlu", color: "text-sky-200" },
    3: { icon: "cloud", text: "Kapalı & Bulutlu", color: "text-slate-200" },
    45: { icon: "foggy", text: "Sisli", color: "text-slate-300" },
    48: { icon: "foggy", text: "Kırağı Sisi", color: "text-slate-300" },
    51: { icon: "rainy", text: "Hafif Çisenti", color: "text-sky-200" },
    61: { icon: "rainy", text: "Yağmurlu", color: "text-sky-300" },
    71: { icon: "ac_unit", text: "Karlı", color: "text-blue-100" },
    80: { icon: "rainy", text: "Sağanak Yağışlı", color: "text-sky-400" },
    95: { icon: "thunderstorm", text: "Gök Gürültülü Fırtına", color: "text-amber-400" },
  };
  return map[code] || { icon: "wb_sunny", text: "Açık & Ilıman", color: "text-amber-300" };
}

export default function CityDetail({ onOpenAuthModal }) {
  const { slug } = useParams();
  const { user, toggleVisited, toggleFavorite } = useAuth();
  const [city, setCity] = useState(null);
  const [status, setStatus] = useState("loading");
  const [weather, setWeather] = useState(null);

  const isVisited = user?.visitedCities?.includes(slug.toLowerCase()) || false;
  const isFavorite = user?.favoriteCities?.includes(slug.toLowerCase()) || false;

  const meta = cityMeta[slug] || {};
  const plateCode = meta.plate ? String(meta.plate).padStart(2, "0") : "81";

  useEffect(() => {
    setStatus("loading");
    getCityBySlug(slug)
      .then((data) => {
        setCity(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setStatus("notfound");
        } else {
          setStatus("error");
        }
      });
  }, [slug]);

  // Open-Meteo live weather
  useEffect(() => {
    if (!meta.lat || !meta.lng) return;
    fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${meta.lat}&longitude=${meta.lng}&current_weather=true&timezone=auto`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current_weather) {
          setWeather(data.current_weather);
        }
      })
      .catch(() => {});
  }, [meta.lat, meta.lng]);

  const handleVisitedClick = async () => {
    if (!user && onOpenAuthModal) {
      onOpenAuthModal();
      return;
    }
    await toggleVisited(city.slug);
  };

  const handleFavoriteClick = async () => {
    if (!user && onOpenAuthModal) {
      onOpenAuthModal();
      return;
    }
    await toggleFavorite(city.slug);
  };

  if (status === "loading") {
    return (
      <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg py-20 text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="font-body-md text-body-md text-on-surface-variant">Şehir rehberi yükleniyor...</p>
      </div>
    );
  }

  if (status === "notfound") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center px-4">
        <div className="p-10 rounded-3xl bg-surface border border-borderline shadow-md">
          <span className="text-5xl">🧭</span>
          <h2 className="font-headline-md text-headline-md font-bold text-on-surface mt-4">
            Şehir Rehberi Hazırlanıyor
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 mb-6">
            Bu şehrin detaylı rehberi ve gezi rotaları henüz sisteme eklenmedi.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Haritaya Dön</span>
          </Link>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="max-w-xl mx-auto py-20 text-center px-4">
        <div className="p-10 rounded-3xl bg-surface border border-error/30 text-error shadow-md">
          <span className="material-symbols-outlined text-4xl mb-2">error</span>
          <p className="font-body-lg text-body-lg font-semibold">
            Şehir bilgileri yüklenirken bir sorun oluştu.
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-6">
            Lütfen bağlantınızı kontrol edip tekrar deneyin.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-space-lg py-space-sm rounded-xl bg-primary text-on-primary font-label-md text-label-md"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    );
  }

  const weatherInfo = describeWeather(weather ? weather.weathercode : 0);
  const temp = weather ? Math.round(weather.temperature) : 21;
  const wind = weather ? Math.round(weather.windspeed) : 11;
  const isBalloonAppropriate = wind < 18;

  return (
    <div className="w-full">
      {/* 1. HERO BANNER SECTION */}
      <section
        className="relative w-full overflow-hidden bg-surface-container-low pt-space-xl pb-space-3xl"
        style={{
          backgroundColor: "rgb(250, 247, 242)",
          borderBottom: "1px solid rgb(231, 223, 213)",
        }}
      >
        <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-0 w-[500px] h-[500px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

        <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg relative z-10">
          {/* Breadcrumb Navigation */}
          <nav
            aria-label="Ekmek Kırıntısı"
            className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md mb-space-lg"
          >
            <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Ana Sayfa</span>
            </Link>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-on-surface-variant">{city.region}</span>
            <span className="material-symbols-outlined text-[14px] text-outline">chevron_right</span>
            <span className="text-on-surface font-semibold">{city.name}</span>
          </nav>

          {/* Main Header Block & Interactive Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-end">
            <div className="lg:col-span-8 flex flex-col gap-space-sm">
              <div className="flex flex-wrap items-center gap-space-sm">
                <span className="px-space-md py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm tracking-wider uppercase font-semibold">
                  {city.region} Bölgesi
                </span>
                <span className="px-space-md py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1 border border-borderline">
                  <span className="material-symbols-outlined text-[15px] text-primary">verified</span>
                  UNESCO &amp; Tarihi Kültür Rotası
                </span>
                <span className="text-on-surface-variant font-label-sm text-label-sm font-bold">
                  #{plateCode}
                </span>
              </div>

              <h1 className="font-display text-headline-xl sm:text-display text-on-surface tracking-tight mt-space-xs font-extrabold">
                {city.name}
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl leading-relaxed">
                {city.shortDescription}
              </p>
            </div>

            {/* User Action Toggles */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-space-sm justify-end items-stretch lg:items-end">
              {/* Visited Toggle Button */}
              <button
                onClick={handleVisitedClick}
                className={`group flex items-center justify-between gap-space-md px-space-lg py-space-md rounded-xl shadow-md transition-all duration-200 active:scale-95 ${
                  isVisited
                    ? "bg-primary text-on-primary hover:bg-primary-container"
                    : "bg-surface hover:bg-surface-container text-on-surface border border-borderline"
                }`}
                type="button"
              >
                <div className="flex items-center gap-space-sm">
                  <span
                    className={`material-symbols-outlined text-[24px] ${
                      isVisited ? "text-on-primary" : "text-primary"
                    }`}
                  >
                    check_circle
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="font-label-lg text-label-lg font-bold leading-none">
                      {isVisited ? "Gezildi Olarak İşaretlendi" : "Gezdim Olarak İşaretle"}
                    </span>
                    <span
                      className={`font-label-sm text-label-sm mt-0.5 ${
                        isVisited ? "text-on-primary/80" : "text-on-surface-variant"
                      }`}
                    >
                      {isVisited ? "Kaldırmak için tekrar tıkla" : "Kişisel haritana ekle"}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px]">
                  {isVisited ? "done_all" : "add"}
                </span>
              </button>

              {/* Favorite Toggle Button */}
              <button
                onClick={handleFavoriteClick}
                className={`group flex items-center justify-between gap-space-md px-space-lg py-space-md rounded-xl transition-all duration-200 active:scale-95 ${
                  isFavorite
                    ? "bg-rose-50 border border-rose-200 text-rose-700 shadow-sm"
                    : "bg-surface hover:bg-surface-container text-on-surface border border-borderline shadow-sm"
                }`}
                type="button"
              >
                <div className="flex items-center gap-space-sm">
                  <span
                    className={`material-symbols-outlined text-[24px] ${
                      isFavorite ? "text-rose-600 font-fill" : "text-rose-500"
                    }`}
                  >
                    favorite
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="font-label-lg text-label-lg font-bold leading-none">
                      {isFavorite ? "Favorilerime Eklendi" : "Favorilere Ekle"}
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      {isFavorite ? "Listenden çıkarmak için tıkla" : "Sonra gezmek üzere kaydet"}
                    </span>
                  </div>
                </div>
                <span className="material-symbols-outlined text-[18px] text-outline">
                  {isFavorite ? "bookmark_added" : "bookmark_border"}
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. QUICK FACTS & LIVE WEATHER DUAL DECK */}
      <section className="w-full -mt-10 relative z-20">
        <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
            {/* 4 Quick Facts Bento Card (Span 7) */}
            <div
              className="lg:col-span-7 rounded-2xl shadow-xl p-space-xl flex flex-col justify-between"
              style={{
                backgroundColor: "rgb(255, 255, 255)",
                border: "1px solid rgb(231, 223, 213)",
              }}
            >
              <div className="flex items-center justify-between mb-space-lg">
                <div className="flex items-center gap-space-sm">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  <span className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant font-bold">
                    Hap Bilgiler
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  {city.name} Özeti
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-md">
                <div
                  className="p-space-md rounded-xl flex flex-col justify-between"
                  style={{
                    backgroundColor: "rgb(250, 247, 242)",
                    border: "1px solid rgb(237, 231, 223)",
                  }}
                >
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Plaka Kodu
                  </span>
                  <div className="mt-space-sm">
                    <span className="font-headline-xl text-headline-xl text-primary font-extrabold leading-none">
                      {plateCode}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-outline mt-space-xs">
                    {city.region}
                  </span>
                </div>

                <div
                  className="p-space-md rounded-xl flex flex-col justify-between"
                  style={{
                    backgroundColor: "rgb(250, 247, 242)",
                    border: "1px solid rgb(237, 231, 223)",
                  }}
                >
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Nüfus
                  </span>
                  <div className="mt-space-sm">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold leading-none">
                      {meta.population ? meta.population.toLocaleString("tr-TR") : "310.000"}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-outline mt-space-xs">
                    TÜİK Güncel
                  </span>
                </div>

                <div
                  className="p-space-md rounded-xl flex flex-col justify-between"
                  style={{
                    backgroundColor: "rgb(250, 247, 242)",
                    border: "1px solid rgb(237, 231, 223)",
                  }}
                >
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Rakım
                  </span>
                  <div className="mt-space-sm">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold leading-none">
                      {meta.elevation || 1050} m
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-outline mt-space-xs">
                    Deniz Seviyesi
                  </span>
                </div>

                <div
                  className="p-space-md rounded-xl flex flex-col justify-between"
                  style={{
                    backgroundColor: "rgb(250, 247, 242)",
                    border: "1px solid rgb(237, 231, 223)",
                  }}
                >
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase">
                    Yüzölçümü
                  </span>
                  <div className="mt-space-sm">
                    <span className="font-headline-md text-headline-md text-on-surface font-bold leading-none">
                      {meta.area ? meta.area.toLocaleString("tr-TR") : "5.460"}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-outline mt-space-xs">
                    km² Coğrafi Alan
                  </span>
                </div>
              </div>
            </div>

            {/* Live Weather & Balloon Aviation Flight Widget (Span 5) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary-container to-primary rounded-2xl shadow-xl p-space-xl text-on-primary flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[20px] text-teal-200">thermostat</span>
                    <span className="font-label-lg text-label-lg font-semibold tracking-wide">
                      {city.name} Canlı Hava
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-teal-100 bg-white/10 px-space-sm py-0.5 rounded-full">
                    {meta.lat || 38.6}° N, {meta.lng || 34.7}° E
                  </span>
                </div>

                {/* Main Temp Row */}
                <div className="flex items-center justify-between mt-space-lg">
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-display text-display font-extrabold leading-none text-white">
                      {temp}
                    </span>
                    <span className="font-headline-xl text-headline-xl text-teal-200">°C</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-space-xs">
                      <span className={`material-symbols-outlined text-[32px] ${weatherInfo.color}`}>
                        {weatherInfo.icon}
                      </span>
                      <span className="font-title-lg text-title-lg font-bold text-white">
                        {weatherInfo.text}
                      </span>
                    </div>
                    <span className="font-body-sm text-body-sm text-teal-100 mt-0.5">
                      Open-Meteo Canlı İstasyon
                    </span>
                  </div>
                </div>

                {/* Sub Metrics */}
                <div className="grid grid-cols-2 gap-space-md mt-space-lg pt-space-md border-t border-white/20">
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-teal-200">air</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-teal-200">Rüzgar Hızı</span>
                      <span className="font-body-md text-body-md font-semibold text-white">
                        {wind} km/sa
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-[20px] text-teal-200">visibility</span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-teal-200">Görüş &amp; Atmosfer</span>
                      <span className="font-body-md text-body-md font-semibold text-white">
                        Berrak / İdeal
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity / Aviation Flight Indicator Badge */}
              <div className="mt-space-lg pt-space-sm">
                <div className="p-space-sm rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-between border border-white/20">
                  <div className="flex items-center gap-space-sm">
                    <span className="text-xl">🎈</span>
                    <span className="font-label-sm text-label-sm font-medium text-white">
                      Açık Hava &amp; Gezi Rotaları
                    </span>
                  </div>
                  <span
                    className={`px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider ${
                      isBalloonAppropriate
                        ? "bg-emerald-400 text-slate-900"
                        : "bg-amber-300 text-slate-900"
                    }`}
                  >
                    {isBalloonAppropriate ? "TURA UYGUN ✓" : "RÜZGARLI"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. GEZİLECEK YERLER (TURİSTİK NOKTALAR) */}
      <section className="w-full py-space-3xl">
        <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-2xl gap-space-md">
            <div>
              <div className="flex items-center gap-space-sm text-primary font-label-md text-label-md font-bold uppercase tracking-widest">
                <span className="material-symbols-outlined text-[18px]">explore</span>
                <span>Unutulmaz Rotalar</span>
              </div>
              <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs font-bold">
                Gezilecek En Önemli Noktalar
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-space-xs">
                {city.name} ilinde mutlaka görülmesi gereken tarihi kalıntılar, milli parklar ve tabiat harikaları.
              </p>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Toplam {city.placesToVisit?.length || 0} Öne Çıkan Lokasyon
              </span>
            </div>
          </div>

          {/* Tourist Attraction Cards Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {city.placesToVisit?.map((place, idx) => {
              const placeName = place.name || place;
              const placeDesc =
                place.description ||
                `${city.name} seyahatinizde keşfedebileceğiniz tarihi ve doğal zenginlik.`;
              return (
                <div
                  key={idx}
                  className="group rounded-2xl shadow-md overflow-hidden flex flex-col hover:-translate-y-1.5 transition-all duration-300"
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    border: "1px solid rgb(231, 223, 213)",
                  }}
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-100">
                    <PlaceImage placeName={placeName} cityName={city.name} />
                    <div className="absolute top-space-sm left-space-sm bg-primary/90 backdrop-blur-md text-on-primary px-space-sm py-1 rounded-full font-label-sm text-label-sm font-bold tracking-wide uppercase">
                      {city.name}
                    </div>
                    <div
                      className="absolute bottom-space-sm right-space-sm backdrop-blur-md text-on-surface px-space-sm py-0.5 rounded-full font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-sm"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}
                    >
                      <span className="material-symbols-outlined text-amber-500 text-[16px]">stars</span>
                      <span>4.9</span>
                    </div>
                  </div>

                  <div className="p-space-lg flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-title-lg text-title-lg text-on-surface font-bold group-hover:text-primary transition-colors">
                        {placeName}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed line-clamp-3">
                        {placeDesc}
                      </p>
                    </div>

                    <div
                      className="mt-space-lg pt-space-md -mx-space-lg -mb-space-lg p-space-md flex items-center justify-between"
                      style={{ backgroundColor: "#FAF7F2", borderTop: "1px solid #EDE7DF" }}
                    >
                      <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="material-symbols-outlined text-[16px] text-primary">schedule</span>
                        <span>2 - 3 Saat</span>
                      </div>
                      <span className="px-space-sm py-0.5 rounded-full bg-teal-100 text-teal-800 font-label-sm text-label-sm font-bold">
                        Müzekart
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. YÖRESEL LEZZETLER & İLGİNÇ BİLGİLER */}
      <section
        className="w-full bg-surface-container-low py-space-3xl"
        style={{
          backgroundColor: "rgb(245, 240, 235)",
          borderTop: "1px solid rgb(231, 223, 213)",
          borderBottom: "1px solid rgb(231, 223, 213)",
        }}
      >
        <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl items-start">
            {/* Yöresel Lezzetler (Span 7) */}
            <div className="lg:col-span-7 flex flex-col gap-space-lg">
              <div>
                <div className="flex items-center gap-space-sm text-primary font-label-md text-label-md font-bold uppercase tracking-widest">
                  <span className="material-symbols-outlined text-[18px]">restaurant</span>
                  <span>Gastronomi &amp; Damak Tadı</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-on-surface mt-space-xs font-bold">
                  {city.name}'in Meşhur Yöresel Lezzetleri
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mt-space-xs">
                  Geleneksel ocaklarda pişen zengin yemeklerden asırlık tatlı mirasına uzanan otantik lezzetler.
                </p>
              </div>

              {/* Culinary Cards Deck */}
              <div className="space-y-space-md">
                {city.famousFoods?.map((food, idx) => {
                  const foodName = food.name || food;
                  const foodDesc =
                    food.description ||
                    `${city.name} mutfağının en seçkin geleneksel lezzeti olarak sofraları süsler.`;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl p-space-lg shadow-sm hover:shadow-md transition-shadow flex flex-col sm:flex-row gap-space-md items-center"
                      style={{
                        backgroundColor: "rgb(255, 255, 255)",
                        border: "1px solid rgb(231, 223, 213)",
                      }}
                    >
                      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-3xl flex-shrink-0">
                        🍲
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-title-lg text-title-lg text-on-surface font-bold">
                            {foodName}
                          </h3>
                          <span className="px-space-sm py-0.5 rounded-full bg-amber-100 text-amber-900 font-label-sm text-label-sm font-semibold">
                            Tescilli Lezzet
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs leading-relaxed">
                          {foodDesc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* İlginç Bilgiler Kutusu (Span 5) */}
            <div className="lg:col-span-5 flex flex-col gap-space-lg">
              <div
                className="rounded-2xl p-space-xl shadow-lg relative overflow-hidden"
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  border: "1px solid rgb(231, 223, 213)",
                }}
              >
                <div className="flex items-center gap-space-sm text-primary font-label-md text-label-md font-bold uppercase tracking-widest mb-space-md">
                  <span className="material-symbols-outlined text-[20px]">lightbulb</span>
                  <span>Biliyor Muydunuz?</span>
                </div>

                <div className="space-y-space-md">
                  {city.interestingFacts?.map((fact, idx) => (
                    <div
                      key={idx}
                      className="p-space-md rounded-xl flex items-start gap-space-md"
                      style={{
                        backgroundColor: "rgb(250, 247, 242)",
                        border: "1px solid rgb(237, 231, 223)",
                      }}
                    >
                      <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface leading-relaxed">
                        {fact}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Location Snapshot Map Feature */}
                <div
                  className="mt-space-lg p-space-md rounded-xl flex items-center justify-between"
                  style={{ backgroundColor: "#EDE7DF" }}
                >
                  <div className="flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[24px]">map</span>
                    <div>
                      <span className="font-label-md text-label-md font-bold text-on-surface block">
                        Coğrafi Konum
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {meta.lat || 39.0}° Kuzey, {meta.lng || 35.0}° Doğu
                      </span>
                    </div>
                  </div>
                  <span className="font-label-sm text-label-sm font-semibold text-primary">
                    {city.region}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. MİNİ QUİZ CTA PANELİ */}
      <section className="w-full py-space-3xl bg-surface" style={{ backgroundColor: "transparent" }}>
        <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-teal-900 to-emerald-950 p-space-xl lg:p-space-3xl text-white shadow-2xl">
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-teal-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-amber-500/20 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
              <div className="lg:col-span-8 flex flex-col gap-space-sm">
                <div className="flex items-center gap-space-xs">
                  <span className="px-space-sm py-1 rounded bg-amber-400 text-slate-950 font-label-sm text-label-sm font-bold uppercase tracking-wider">
                    Şehir Bilgi Yarışması
                  </span>
                  <span className="text-teal-200 font-label-sm text-label-sm">• 3 Soru • Bilgini Test Et</span>
                </div>

                <h2 className="font-headline-xl text-headline-xl font-extrabold text-white leading-tight">
                  {city.name}'i Ne Kadar İyi Tanıyorsun?
                </h2>

                <p className="font-body-lg text-body-lg text-teal-100 max-w-2xl leading-relaxed">
                  3 soruluk interaktif mini bilgi testimizi çöz, Anadolu kaşifi rozetini kap, puanını al ve gezgin seviyeni yükselt!
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
                <Link
                  to={`/sehir/${city.slug}/quiz`}
                  className="inline-flex items-center gap-space-sm px-space-xl py-space-lg rounded-2xl bg-white text-slate-900 font-title-lg text-title-lg font-bold shadow-lg hover:bg-white/95 hover:scale-105 active:scale-95 transition-all duration-200"
                >
                  <span className="material-symbols-outlined text-amber-500 text-[28px]">trophy</span>
                  <span>🏆 {city.name} Mini Quizini Başlat</span>
                </Link>
                <span className="font-label-sm text-label-sm text-teal-200 mt-space-sm">
                  Bugün onlarca gezgin bu testi çözdü
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
