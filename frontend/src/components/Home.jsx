import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import TurkeyMap from "./TurkeyMap";
import NearestCityBanner from "./NearestCityBanner";
import { getCities } from "../api";
import { useAuth } from "../context/AuthContext";
import cityMeta from "../data/cityMeta";

const CITY_IMAGES = {
  nevsehir:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDyajSD86YBBhYyfyjw5fIdqWkw-DjFzxGnIWRzYxzV0NrSjLDM2W2-ZDZEL-Ofeyr4JVjv8ZN5HDm3njadLX_xnpeylfu312as6J5nmoaMu0-SRSwRVPKSrHI1zcBhK2TQZScNNbIxxrYNsD2xu7ufRqsQdGHmXhtPv8igWwa5Dl-BkIH5fsCuOiz9g4u8WJVy8HDx_TjhXxYkCbR9toY-KaKHRZO80a-qJT0aq_eH",
  antalya:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCjKX8YCSTmqpYSH45nQgU3QHgDRWcNbQrYkuu0g1cWM_VPZJjPcJQ0OBU2dlmWGBzgX0h7UQBg_6O3OvHPjYNKYMJ7JPOsJ9beR-KLT-Fo-VQ7wb1jpOdIzEaPF7GSpQBUgvBxWr4qPRAuFT_IXrbOa5IyZOx2oRth7Su5REH4T_iCfrnNasHNM06fsPJkBeKNlP8uZU4gbHHM_sFyJOL93iL1TmsWu5c2Uc_5PXV_",
  trabzon:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAnrs9aXNLl6qgLu_w8gp2GgvMTcV2D9u1DsocYjC0ODJWHTjFvnwvZ-3f7OS64efXWlwKZ7MQxxFGb6YllUSalWGijUNMS7grdvohGpBK8SSQsm_bWNLQCUWSwehxCdTq7d5_hYFIA1Kep8Bdk2wkrDUPBEnq_8-sPpoZ4i1l6-IgQcUuxDfg2R_457zig29-_9z97C4MBgwyAm-1nU6kxeP49_NnZvljfMvJLREXD",
  izmir:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCG0vL-wuc9nnawZ15mUt5AJOoC-LtCVUkX5WTROwXRS76lvvtLfkJGyyIUaAKeUPkBrTlAht9ie7NNT3sTRqTPb_ykyx8qxtdcd62Q8GwjUlKIy4hnLAqT6P9TexJy4837zeBfMAOddVlQUL3RV0mLeXMFrFK_hEy4xakr0iKaEWS3pix2GtgvUaBOQqvUXPgWVHikczewoWUpw_3soMUe2l6sUHWFySgDixzR4Ehq",
  mardin:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDranlWc70mtwv2usIeMgUZkjZGPQDv_KHvQheF6-G6zcirs_eqOTtjje0i0YRduHBUWz7B4cKkgvW_f9Swuwqe1ilu4Ab2anXY3N_SXdiZj81jB-bAKYmKVpXiBVkmQaiPJSklMM8FVmkNy7T2OGTI-dLq6humlgPvgjYb1h2idxZeLtODwRJMub1MmCs9R0cJuscmodgjyS9L81VLlBoqXgWL8X4jWyX2Ezmp0usM",
  istanbul:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAkCxaUYUyKp1IM9M73szGEWsOeT52Zv9oyMXcfVviW_5mp3L39pM0EMY8OoqWUGyhR0t8TyDLUlSRT8__3tJw2FqLJPrjG6tqWA0uZB7yepZZSc5qpA1TeOJ6OraABJlDZ6g5E_4Hx5dch33qe9pwH5DEAYWDTcLokw3iF2IX8tthnRtmbpI3yWP2gI39et3uRmMSJ59du5Id2q85XbewC96uWtlZr4rZRl8bVPk5L",
};

const REGIONS = [
  "Tümü",
  "Marmara",
  "Ege",
  "Akdeniz",
  "İç Anadolu",
  "Karadeniz",
  "Doğu Anadolu",
  "Güneydoğu Anadolu",
];

export default function Home({ onOpenAuthModal }) {
  const { user, toggleVisited, toggleFavorite } = useAuth();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Tümü");
  const [sortBy, setSortBy] = useState("rating");

  useEffect(() => {
    getCities()
      .then((data) => setCities(data))
      .catch(() => setError("Şehirler yüklenemedi. Sunucunun çalıştığından emin olun."))
      .finally(() => setLoading(false));
  }, []);

  const visitedSet = useMemo(() => new Set(user?.visitedCities || []), [user]);
  const favoriteSet = useMemo(() => new Set(user?.favoriteCities || []), [user]);

  // Filtering & Sorting
  const filteredCities = useMemo(() => {
    let list = [...cities];

    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter((c) => {
        const inName = c.name?.toLowerCase().includes(q);
        const inRegion = c.region?.toLowerCase().includes(q);
        const inDesc = c.shortDescription?.toLowerCase().includes(q);
        const inFoods = c.famousFoods?.some((f) => (f.name || f).toLowerCase().includes(q));
        const inPlaces = c.placesToVisit?.some((p) => (p.name || p).toLowerCase().includes(q));
        return inName || inRegion || inDesc || inFoods || inPlaces;
      });
    }

    // Region
    if (selectedRegion !== "Tümü") {
      list = list.filter((c) => c.region === selectedRegion);
    }

    // Sort
    if (sortBy === "places") {
      list.sort((a, b) => (b.placesToVisit?.length || 0) - (a.placesToVisit?.length || 0));
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name, "tr"));
    } else if (sortBy === "visited") {
      list.sort((a, b) => {
        const aV = visitedSet.has(a.slug) ? 1 : 0;
        const bV = visitedSet.has(b.slug) ? 1 : 0;
        return bV - aV;
      });
    }

    return list;
  }, [cities, searchTerm, selectedRegion, sortBy, visitedSet]);

  const handleFavoriteClick = async (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user && onOpenAuthModal) {
      onOpenAuthModal();
      return;
    }
    await toggleFavorite(slug);
  };

  const handleVisitedClick = async (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user && onOpenAuthModal) {
      onOpenAuthModal();
      return;
    }
    await toggleVisited(slug);
  };

  return (
    <div className="w-full">
      {/* 1. HERO SECTION WITH CINEMATIC ATMOSPHERE */}
      <section
        className="relative w-full overflow-hidden bg-surface-container-low pt-space-xl pb-space-3xl"
        style={{
          backgroundColor: "rgb(245, 240, 235)",
          borderBottom: "1px solid rgb(231, 223, 213)",
        }}
      >
        <div className="absolute -top-32 right-[-10%] w-[680px] h-[680px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-[-5%] w-[480px] h-[480px] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-lg items-center">
            {/* Left: Editorial Content & Explorer Bar */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              <div
                className="inline-flex items-center gap-space-xs self-start px-space-md py-1.5 rounded-full shadow-sm"
                style={{
                  backgroundColor: "rgb(237, 231, 223)",
                  border: "1px solid rgb(231, 223, 213)",
                }}
              >
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label-sm text-label-sm text-primary tracking-widest uppercase font-bold">
                  81 İl, Binlerce Rota &amp; Otantik Keşif
                </span>
              </div>

              <h1 className="font-display text-headline-xl sm:text-display text-on-surface tracking-tight leading-[1.08] max-w-3xl font-extrabold">
                Türkiye'nin 81 İlini Keşfet, Kendi Gezi Hikayeni Yaz
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                İnteraktif harita ile 81 ili keşfedin, gezdiğiniz şehirleri işaretleyin, yöresel lezzetleri ve saklı kalmış tarihi rotaları öğrenin.
              </p>

              {/* Glassy Explorer Search Bar */}
              <div
                className="p-space-xs rounded-2xl bg-surface max-w-2xl mt-space-sm"
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  border: "1px solid rgb(231, 223, 213)",
                  boxShadow: "rgba(15, 118, 110, 0.08) 0px 16px 36px -12px",
                }}
              >
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-xs">
                  <div
                    className="flex items-center flex-1 px-space-md py-space-sm gap-space-sm rounded-xl"
                    style={{
                      backgroundColor: "rgb(250, 247, 242)",
                      border: "1px solid rgb(237, 231, 223)",
                    }}
                  >
                    <span className="material-symbols-outlined text-primary text-[24px]">search</span>
                    <input
                      className="w-full bg-transparent text-on-surface placeholder:text-outline font-body-md text-body-md focus:outline-none"
                      placeholder="Şehir, bölge veya lezzet ara... (örn: Nevşehir, Karadeniz, Testi Kebabı)"
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                      <button
                        type="button"
                        onClick={() => setSearchTerm("")}
                        className="text-on-surface-variant hover:text-on-surface"
                      >
                        <span className="material-symbols-outlined text-[18px]">close</span>
                      </button>
                    )}
                  </div>
                  <button
                    className="px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all flex items-center justify-center gap-space-xs shadow-md shadow-primary/20 hover:-translate-y-0.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">travel_explore</span>
                    <span>Keşfe Başla</span>
                  </button>
                </div>
              </div>

              {/* Region Filter Pills */}
              <div className="flex flex-wrap items-center gap-space-xs pt-space-xs">
                {REGIONS.map((reg) => {
                  const isActive = selectedRegion === reg;
                  return (
                    <button
                      key={reg}
                      type="button"
                      onClick={() => setSelectedRegion(reg)}
                      className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all shadow-sm ${
                        isActive
                          ? "bg-primary text-on-primary font-semibold"
                          : "bg-surface text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                      style={{
                        border: isActive ? "none" : "1px solid rgb(231, 223, 213)",
                      }}
                    >
                      {reg}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Dynamic Traveler Card Visual */}
            <div className="lg:col-span-4 relative flex justify-center lg:justify-end">
              <div
                className="relative w-full max-w-[380px] p-space-lg rounded-3xl bg-surface"
                style={{
                  backgroundColor: "rgb(255, 255, 255)",
                  border: "1px solid rgb(231, 223, 213)",
                  boxShadow: "rgba(30, 27, 26, 0.08) 0px 20px 48px -12px",
                }}
              >
                <div className="relative h-60 rounded-2xl overflow-hidden mb-space-md group">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{
                      backgroundImage: `url('${CITY_IMAGES.nevsehir}')`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  <div className="absolute top-space-sm left-space-sm">
                    <span className="px-space-sm py-1 rounded-full bg-surface/90 backdrop-blur-md font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                      Günün Rotası
                    </span>
                  </div>
                  <div className="absolute top-space-sm right-space-sm">
                    <span className="px-space-sm py-1 rounded-full bg-amber-100 text-amber-900 font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[14px] text-amber-600">star</span> 4.95
                    </span>
                  </div>
                  <div className="absolute bottom-space-sm left-space-sm right-space-sm text-white">
                    <span className="font-label-sm text-label-sm opacity-90 block">İç Anadolu Harikası</span>
                    <span className="font-headline-sm text-headline-sm font-bold tracking-tight block">
                      Nevşehir (Kapadokya)
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-on-surface-variant font-label-md text-label-md mb-space-md px-1">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">restaurant</span> Testi Kebabı
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-primary">location_city</span> 26 Gezi Noktası
                  </span>
                </div>

                <Link
                  to="/sehir/nevsehir"
                  className="w-full py-space-sm rounded-xl bg-primary text-on-primary font-label-md text-label-md flex items-center justify-center gap-space-xs hover:bg-primary-container transition-all shadow-sm"
                >
                  <span>Rehberi İncele</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NEAREST CITY NOTIFICATION BANNER */}
      <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg">
        <NearestCityBanner cities={cities} />
      </div>

      {/* 3. INTERACTIVE VECTOR TURKEY MAP SECTION */}
      <section className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg w-full mb-space-3xl">
        <div className="mb-4">
          <div className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            İnteraktif Vektör Harita
          </div>
          <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs tracking-tight">
            Haritaya Dokun, Şehrin Ruhunu Keşfet
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-1">
            81 ilin üzerine gelin, bölge sınırlarını inceleyin ve doğrudan şehrin kapsamlı rehberine geçiş yapın.
          </p>
        </div>

        {loading ? (
          <div
            className="w-full h-80 rounded-2xl flex items-center justify-center bg-surface animate-pulse"
            style={{ border: "1px solid rgb(231, 223, 213)" }}
          >
            <span className="text-on-surface-variant font-body-md">Harita verileri yükleniyor...</span>
          </div>
        ) : (
          <TurkeyMap cities={cities} />
        )}
      </section>

      {/* 4. FEATURED CITIES GRID SECTION */}
      <section className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg w-full pb-space-3xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-2xl">
          <div>
            <div className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
              Popüler Duraklar
            </div>
            <h2 className="font-headline-xl text-headline-xl text-on-surface mt-space-xs tracking-tight">
              Öne Çıkan Şehir Rehberleri
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Anadolu'nun zengin mutfağı, binlerce yıllık antik mirasları ve doğa harikalarıyla dolu gezi rotaları.
            </p>
          </div>

          <div className="flex items-center gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface-variant">Sırala:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-space-md py-space-xs rounded-xl bg-surface font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer"
              style={{
                backgroundColor: "rgb(255, 255, 255)",
                border: "1px solid rgb(231, 223, 213)",
              }}
            >
              <option value="rating">En Yüksek Puan</option>
              <option value="places">Gezilecek Yer Sayısı</option>
              <option value="name">İsme Göre (A-Z)</option>
              {user && <option value="visited">Gezilen Durumuna Göre</option>}
            </select>
          </div>
        </div>

        {/* City Cards Bento / Mosaic Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-96 rounded-3xl bg-surface animate-pulse"
                style={{ border: "1px solid rgb(231, 223, 213)" }}
              />
            ))}
          </div>
        ) : error ? (
          <div className="p-8 text-center text-error bg-surface rounded-2xl border border-error/20">
            {error}
          </div>
        ) : filteredCities.length === 0 ? (
          <div className="p-12 text-center bg-surface rounded-3xl border border-borderline">
            <span className="text-4xl">🔍</span>
            <h3 className="font-title-lg text-title-lg font-bold text-on-surface mt-3">
              Aradığınız kriterlere uygun şehir bulunamadı
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant mt-1">
              Farklı bir arama terimi deneyebilir veya bölge filtresini "Tümü" olarak değiştirebilirsiniz.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-lg">
            {filteredCities.map((c) => {
              const meta = cityMeta[c.slug] || {};
              const plateCode = meta.plate ? String(meta.plate).padStart(2, "0") : "--";
              const isVisited = visitedSet.has(c.slug);
              const isFav = favoriteSet.has(c.slug);
              const bgImg =
                CITY_IMAGES[c.slug] ||
                `https://source.unsplash.com/featured/800x600/?${encodeURIComponent(c.name)},turkey`;
              const spotsCount = c.placesToVisit?.length || 12;

              return (
                <article
                  key={c.slug}
                  className="city-card group flex flex-col rounded-3xl bg-surface shadow-[0_12px_32px_-8px_rgba(15,23,42,0.06)] hover:shadow-[0_24px_48px_-12px_rgba(15,118,110,0.14)] hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                  style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    border: "1px solid rgb(231, 223, 213)",
                  }}
                >
                  {/* Top Image & Floating Badges */}
                  <div className="relative h-64 overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${bgImg}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20" />

                    <div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs">
                      <span className="px-space-sm py-1 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm font-bold uppercase">
                        {c.region}
                      </span>
                      <span className="px-space-sm py-1 rounded-full bg-surface/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[14px] text-amber-500">wb_sunny</span>
                        21°C
                      </span>
                    </div>

                    <div className="absolute top-space-sm right-space-sm">
                      <button
                        onClick={(e) => handleFavoriteClick(e, c.slug)}
                        className={`w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-transform hover:scale-110 shadow-sm ${
                          isFav
                            ? "bg-rose-50 text-rose-600 border border-rose-200"
                            : "bg-surface/85 text-on-surface hover:text-rose-500"
                        }`}
                        title={isFav ? "Favorilerden Kaldır" : "Favorilere Ekle"}
                        type="button"
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            isFav ? "font-fill" : ""
                          }`}
                        >
                          favorite
                        </span>
                      </button>
                    </div>

                    <div className="absolute bottom-space-sm left-space-sm right-space-sm flex items-end justify-between text-white">
                      <div>
                        <span className="font-label-sm text-label-sm opacity-90">{plateCode} Plaka Kodu</span>
                        <h3 className="font-headline-md text-headline-md font-bold tracking-tight">{c.name}</h3>
                      </div>
                      <span className="px-space-sm py-1 rounded-full bg-surface/90 text-on-surface backdrop-blur-md font-label-sm text-label-sm font-bold">
                        {spotsCount} Nokta
                      </span>
                    </div>
                  </div>

                  {/* Card Content & Action Buttons */}
                  <div className="p-space-lg flex flex-col flex-1 justify-between gap-space-md">
                    <div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                        {c.shortDescription}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mt-space-sm">
                        {c.placesToVisit?.slice(0, 2).map((p, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-on-surface-variant font-medium"
                          >
                            {p.name || p}
                          </span>
                        ))}
                        {c.famousFoods?.slice(0, 1).map((f, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md bg-surface-container font-label-sm text-label-sm text-primary font-medium"
                          >
                            🍴 {f.name || f}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-space-sm flex items-center justify-between gap-space-sm border-t border-borderline">
                      <button
                        onClick={(e) => handleVisitedClick(e, c.slug)}
                        className={`px-space-md py-space-xs rounded-xl font-label-md text-label-md flex items-center gap-1.5 transition-colors ${
                          isVisited
                            ? "bg-primary text-on-primary shadow-sm"
                            : "bg-surface-container hover:bg-surface-container-high text-on-surface"
                        }`}
                        type="button"
                        title={isVisited ? "Gezildi olarak işaretli (kaldırmak için tıkla)" : "Gezdim olarak işaretle"}
                      >
                        <span
                          className={`material-symbols-outlined text-[18px] ${
                            isVisited ? "text-on-primary" : "text-outline"
                          }`}
                        >
                          check_circle
                        </span>
                        <span>{isVisited ? "Gezildi ✓" : "Gezdim"}</span>
                      </button>

                      <Link
                        to={`/sehir/${c.slug}`}
                        className="px-space-md py-space-xs rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1 shadow-sm"
                      >
                        <span>Rehberi Gör</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
