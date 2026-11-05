import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCities } from "../api";
import MyTurkeyMap from "./MyTurkeyMap";

// Seviyeler ve Rozet Hesaplama
function getTravelerLevel(visitedCount) {
  if (visitedCount >= 81) {
    return {
      title: "Türkiye Fatihi",
      level: 6,
      icon: "military_tech",
      desc: "81 ilin tamamını fethettiniz! Ülkenin yaşayan efsanesisiniz.",
      nextNeeded: 0,
      nextTitle: "Maksimum Seviye",
    };
  }
  if (visitedCount >= 60) {
    return {
      title: "Kıdemli Seyyah",
      level: 5,
      icon: "explore",
      desc: "Türkiye'nin dört bir yanını gezdiniz, keşfetmediğiniz çok az rota kaldı.",
      nextNeeded: 81 - visitedCount,
      nextTitle: "Türkiye Fatihi",
    };
  }
  if (visitedCount >= 40) {
    return {
      title: "Usta Kaşif",
      level: 4,
      icon: "terrain",
      desc: "Ülkenin yarısından fazlasını gördünüz! Tam bir Anadolu aşığısınız.",
      nextNeeded: 60 - visitedCount,
      nextTitle: "Kıdemli Seyyah",
    };
  }
  if (visitedCount >= 20) {
    return {
      title: "Gezgin Ruh",
      level: 3,
      icon: "backpack",
      desc: "Harika bir seyahat ivmesi yakaladınız. Yollar sizi çağırıyor.",
      nextNeeded: 40 - visitedCount,
      nextTitle: "Usta Kaşif",
    };
  }
  if (visitedCount >= 8) {
    return {
      title: "Yol Meraklısı",
      level: 2,
      icon: "directions_car",
      desc: "Keşif yolculuğunuz hız kesmeden devam ediyor. Yeni rotalar yolda.",
      nextNeeded: 20 - visitedCount,
      nextTitle: "Gezgin Ruh",
    };
  }
  if (visitedCount >= 1) {
    return {
      title: "Yeni Gezgin",
      level: 1,
      icon: "eco",
      desc: "Yolculuk başladı! Yeni iller ve gizli lezzetler sizi bekliyor.",
      nextNeeded: 8 - visitedCount,
      nextTitle: "Yol Meraklısı",
    };
  }
  return {
    title: "İlk Adım",
    level: 0,
    icon: "map",
    desc: "Gezdiğiniz illeri haritadan veya aşağıdaki listeden işaretlemeye başlayın.",
    nextNeeded: 1,
    nextTitle: "Yeni Gezgin",
  };
}

const REGION_LIST = [
  { name: "Marmara", total: 11 },
  { name: "Ege", total: 8 },
  { name: "Akdeniz", total: 8 },
  { name: "İç Anadolu", total: 13 },
  { name: "Karadeniz", total: 18 },
  { name: "Doğu Anadolu", total: 14 },
  { name: "Güneydoğu Anadolu", total: 9 },
];

export default function MyMap({ onOpenAuthModal }) {
  const { user, toggleVisited, clearVisited } = useAuth();
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    getCities()
      .then((data) => setCities(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const visitedSlugs = user?.visitedCities || [];
  const totalCities = 81;
  const visitedCount = visitedSlugs.length;
  const percentage = Math.round((visitedCount / totalCities) * 1000) / 10;
  const levelInfo = getTravelerLevel(visitedCount);

  // Bölgelere göre istatistik
  const regionStats = useMemo(() => {
    const stats = {};
    REGION_LIST.forEach((r) => {
      stats[r.name] = { total: r.total, visited: 0 };
    });

    cities.forEach((c) => {
      const reg = c.region;
      if (stats[reg]) {
        if (visitedSlugs.includes(c.slug.toLowerCase())) {
          stats[reg].visited += 1;
        }
      }
    });

    return stats;
  }, [cities, visitedSlugs]);

  // Arama için 81 il listesi
  const filtered81Cities = useMemo(() => {
    if (!searchQuery.trim()) return cities;
    const q = searchQuery.toLowerCase().trim();
    return cities.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.region && c.region.toLowerCase().includes(q))
    );
  }, [cities, searchQuery]);

  // İstatistikleri Paylaş butonu
  const handleShare = () => {
    const text = `🇹🇷 Türkiye Gezi Rehberi'nde 81 ilin ${visitedCount}'ini (%${percentage}) gezdim! Gezgin Seviyem: ${levelInfo.title}. Sen de keşfet: ${window.location.origin}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2500);
    } else {
      alert(text);
    }
  };

  // Haritayı Sıfırla
  const handleResetMap = async () => {
    if (
      window.confirm(
        "Gezdiğiniz tüm illeri haritadan temizlemek istediğinize emin misiniz? Bu işlem geri alınamaz."
      )
    ) {
      await clearVisited();
    }
  };

  // --- GİRİŞ YAPILMAMIŞSA: AUTH KİLİT EKRANI ---
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
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-4xl"
            style={{ backgroundColor: "rgb(250, 247, 242)" }}
          >
            🗺️
          </div>

          <h1 className="font-headline-xl text-headline-xl font-extrabold text-on-surface">
            Benim Haritam &amp; Gezgin Takibi
          </h1>

          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mt-3 leading-relaxed">
            Türkiye genelinde gezdiğiniz illeri işaretlemek, keşif yüzdelerinizi ve bölgesel seyahat istatistiklerinizi kaydetmek için lütfen giriş yapın.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAuthModal}
              type="button"
              className="w-full sm:w-auto px-space-xl py-space-md rounded-xl bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-md active:scale-95"
            >
              Giriş Yap / Kayıt Ol →
            </button>
            <Link
              to="/"
              className="w-full sm:w-auto px-space-xl py-space-md rounded-xl bg-surface-container text-on-surface font-label-lg text-label-lg hover:bg-surface-container-high transition-all border border-borderline"
            >
              Ana Sayfaya Dön
            </Link>
          </div>

          <p className="font-body-sm text-body-sm text-on-surface-variant mt-6">
            Hesabınız yoksa ücretsiz olarak 10 saniyede kayıt olabilirsiniz.
          </p>
        </div>
      </div>
    );
  }

  // --- GİRİŞ YAPILMIŞSA: KULLANICI HARİTASI ---
  const initials = (user.name || "Gezgin")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg py-space-xl space-y-space-2xl">
      {/* Üst Kullanıcı Bilgi & Yetki Durum Çubuğu */}
      <div
        className="flex flex-col md:flex-row md:items-center justify-between gap-space-md p-space-md rounded-2xl shadow-sm"
        style={{
          backgroundColor: "rgb(250, 247, 242)",
          border: "1px solid rgb(231, 223, 213)",
        }}
      >
        <div className="flex items-center gap-space-md">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-on-primary font-headline-sm text-headline-sm font-bold shadow-md">
              {initials}
            </div>
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs flex-wrap">
              <span className="font-title-lg text-title-lg text-on-surface font-bold">
                {user.name}
              </span>
              <span className="px-space-xs py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Gezgin Pasaportu #81-TR
              </span>
            </div>
            <div className="flex items-center gap-space-xs font-body-sm text-body-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">verified_user</span>
              <span>
                Giriş yapıldı: <strong className="text-on-surface font-semibold">{user.email}</strong> (JWT Auth &amp; MongoDB Atlas senkronize)
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-space-sm flex-wrap self-end md:self-auto">
          <button
            onClick={handleShare}
            type="button"
            className="flex items-center gap-space-xs px-space-md py-space-sm rounded-xl bg-surface text-primary font-label-md text-label-md shadow-sm hover:bg-surface-container transition-all active:scale-95 border border-borderline"
          >
            <span className="material-symbols-outlined text-[18px]">share</span>
            <span>{copyFeedback ? "Kopyalandı! ✓" : "İstatistikleri Paylaş 📤"}</span>
          </button>

          {visitedCount > 0 && (
            <button
              onClick={handleResetMap}
              type="button"
              className="flex items-center gap-space-xs px-space-md py-space-sm rounded-xl bg-rose-50 text-rose-700 font-label-md text-label-md shadow-sm hover:bg-rose-100 transition-all border border-rose-200"
            >
              <span className="material-symbols-outlined text-[18px]">delete</span>
              <span>Haritayı Sıfırla 🗑️</span>
            </button>
          )}
        </div>
      </div>

      {/* 1. İlerleme & Başarı Paneli (Bento Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
        {/* Ana İlerleme Kartı */}
        <div
          className="lg:col-span-8 p-space-xl rounded-2xl shadow-md flex flex-col justify-between relative overflow-hidden"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          <div className="flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg uppercase tracking-wider text-primary font-bold">
                Kişisel Keşif Rotası
              </span>
              <span className="flex items-center gap-space-xs font-label-sm text-label-sm text-primary bg-primary/10 px-space-sm py-space-xs rounded-full font-semibold">
                <span className="material-symbols-outlined text-[14px]">bolt</span> Gerçek Zamanlı Takip
              </span>
            </div>

            <div className="flex items-baseline gap-space-sm flex-wrap mt-space-xs">
              <h2 className="font-display text-headline-xl sm:text-display text-on-surface leading-none tracking-tight font-extrabold">
                <span>{visitedCount}</span>
                <span className="text-on-surface-variant font-headline-xl font-normal"> / 81</span>
              </h2>
              <span className="font-headline-md text-headline-md text-primary font-bold">
                İl Gezildi
              </span>
              <span className="ml-auto font-headline-sm text-headline-sm text-amber-900 bg-amber-100 px-space-md py-space-xs rounded-xl shadow-sm font-bold">
                %{percentage} Tamamlandı
              </span>
            </div>
          </div>

          {/* Custom Progress Bar */}
          <div className="my-space-lg flex flex-col gap-space-xs">
            <div className="w-full h-4 rounded-full bg-slate-100 overflow-hidden shadow-inner p-0.5 border border-borderline">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-600 via-primary to-amber-500 transition-all duration-700 ease-out shadow-sm"
                style={{ width: `${Math.max(percentage, 2)}%` }}
              />
            </div>
            <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant px-space-xs">
              <span>Başlangıç (0 İl)</span>
              <span className="font-semibold text-primary">
                {levelInfo.nextNeeded > 0
                  ? `Hedef: ${levelInfo.nextTitle} (${levelInfo.nextNeeded} İl Kaldı)`
                  : "Maksimum Hedefe Ulaşıldı"}
              </span>
              <span>81 İl</span>
            </div>
          </div>

          {/* Alt Seviye Bildirimi */}
          <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md p-space-md rounded-xl"
            style={{ backgroundColor: "rgb(250, 247, 242)", border: "1px solid rgb(237, 231, 223)" }}
          >
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-md shrink-0">
                <span className="material-symbols-outlined text-[28px]">{levelInfo.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-lg text-title-lg text-on-surface font-bold leading-snug">
                  {levelInfo.title} <span className="text-primary font-medium">(Seviye {levelInfo.level})</span>
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {levelInfo.desc}
                </span>
              </div>
            </div>

            {levelInfo.nextNeeded > 0 && (
              <div className="flex items-center gap-space-xs self-start sm:self-auto shrink-0 bg-white px-3 py-1.5 rounded-lg border border-borderline">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                <span className="font-label-sm text-label-sm text-primary font-bold uppercase tracking-wider">
                  Hedefe {levelInfo.nextNeeded} İl
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Sağ Mini Rozetler & İstatistik Vitrini */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          <div
            className="p-space-lg rounded-2xl shadow-md flex flex-col justify-between h-full"
            style={{
              backgroundColor: "rgb(255, 255, 255)",
              border: "1px solid rgb(231, 223, 213)",
            }}
          >
            <div className="flex items-center justify-between">
              <span className="font-label-lg text-label-lg font-bold text-on-surface">
                Kazanılan Rozetler
              </span>
              <span className="material-symbols-outlined text-primary">military_tech</span>
            </div>

            <div className="grid grid-cols-3 gap-space-sm my-space-md text-center">
              <div
                className={`flex flex-col items-center p-space-sm rounded-xl transition-all ${
                  visitedCount >= 1 ? "bg-teal-50 border border-teal-200" : "bg-slate-50 opacity-40"
                }`}
              >
                <span className="text-2xl">🌱</span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface mt-1">
                  İlk Keşif
                </span>
                <span className="text-[10px] text-on-surface-variant">1 İl</span>
              </div>

              <div
                className={`flex flex-col items-center p-space-sm rounded-xl transition-all ${
                  visitedCount >= 10 ? "bg-amber-50 border border-amber-200" : "bg-slate-50 opacity-40"
                }`}
              >
                <span className="text-2xl">🧭</span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface mt-1">
                  Yol Ustası
                </span>
                <span className="text-[10px] text-on-surface-variant">10 İl</span>
              </div>

              <div
                className={`flex flex-col items-center p-space-sm rounded-xl transition-all ${
                  visitedCount >= 40 ? "bg-purple-50 border border-purple-200" : "bg-slate-50 opacity-40"
                }`}
              >
                <span className="text-2xl">👑</span>
                <span className="font-label-sm text-label-sm font-bold text-on-surface mt-1">
                  Fatih
                </span>
                <span className="text-[10px] text-on-surface-variant">40+ İl</span>
              </div>
            </div>

            <div
              className="p-space-sm rounded-xl flex items-center justify-between"
              style={{ backgroundColor: "rgb(250, 247, 242)", border: "1px solid rgb(237, 231, 223)" }}
            >
              <span className="font-label-sm text-label-sm text-on-surface-variant">Kalan Şehirler</span>
              <span className="font-headline-sm text-headline-sm text-primary font-bold">
                {81 - visitedCount} İl
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Bölgesel İstatistikler (7 Coğrafi Bölge Kartları) */}
      <div
        className="p-space-xl rounded-2xl shadow-md flex flex-col gap-space-md"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid rgb(231, 223, 213)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-xs">
          <div>
            <span className="font-label-lg text-label-lg uppercase tracking-wider text-primary font-bold">
              Coğrafi Kapsam
            </span>
            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">
              Bölgesel Keşif Dengesi
            </h3>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md">
            Türkiye'nin 7 coğrafi bölgesindeki seyahat dağılımınız ve tamamlanma yüzdeleri.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-space-sm">
          {REGION_LIST.map((r) => {
            const stats = regionStats[r.name] || { total: r.total, visited: 0 };
            const regPercent = stats.total > 0 ? Math.round((stats.visited / stats.total) * 100) : 0;
            const remaining = stats.total - stats.visited;

            return (
              <div
                key={r.name}
                className="p-space-md rounded-xl shadow-sm flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow"
                style={{
                  backgroundColor: "rgb(250, 247, 242)",
                  border: "1px solid rgb(237, 231, 223)",
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-bold uppercase">
                    {r.name}
                  </span>
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                    {stats.visited} / {stats.total}
                  </span>
                  <span className="font-label-md text-label-md text-primary font-semibold">
                    %{regPercent}
                  </span>
                </div>

                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${regPercent}%` }}
                  />
                </div>

                <span className="font-label-sm text-[11px] text-on-surface-variant">
                  {remaining > 0 ? `${remaining} il keşfedilmeyi bekliyor` : "Bölge tamamlandı! 🎉"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. İnteraktif Gezgin Haritası (SVG Map Canvas) */}
      <div
        className="p-space-xl rounded-2xl shadow-md flex flex-col gap-space-md relative"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid rgb(231, 223, 213)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm">
          <div>
            <div className="flex items-center gap-space-xs">
              <span className="w-3 h-3 rounded-full bg-primary animate-pulse" />
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
                İnteraktif Gezgin Haritası
              </h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              İle tıkla: <span className="text-[#C1440E] font-semibold">Turuncu renkle Gezildi olur</span> / 2. kez tıkla: <span className="text-primary font-semibold">Seçim kaldırılır</span>.
            </p>
          </div>

          <div
            className="flex items-center gap-space-md px-space-md py-space-xs rounded-xl self-start md:self-auto"
            style={{ backgroundColor: "rgb(250, 247, 242)", border: "1px solid rgb(237, 231, 223)" }}
          >
            <div className="flex items-center gap-space-xs">
              <span className="w-3.5 h-3.5 rounded bg-[#C1440E]" />
              <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                Gezilen İller ({visitedCount})
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <span className="w-3.5 h-3.5 rounded bg-[#0F766E]" />
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Gezilmeyen ({81 - visitedCount})
              </span>
            </div>
          </div>
        </div>

        {/* Map Canvas */}
        <MyTurkeyMap
          cities={cities}
          visitedSlugs={visitedSlugs}
          onToggleCity={toggleVisited}
        />
      </div>

      {/* 4. Gezilen İller Etiket Paneli (Badges & Quick Removal) */}
      <div
        className="p-space-xl rounded-2xl shadow-md flex flex-col gap-space-md"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid rgb(231, 223, 213)",
        }}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Gezilen İller Koleksiyonu
            </h3>
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              Herhangi bir etiket üzerindeki çarpı ikonuna basarak ili listenizden kolayca kaldırabilirsiniz.
            </span>
          </div>
          <span className="px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-md text-label-md self-start sm:self-auto font-semibold">
            {visitedCount} Aktif İl
          </span>
        </div>

        {visitedSlugs.length === 0 ? (
          <div className="py-8 text-center text-on-surface-variant">
            Henüz haritadan bir il işaretlemediniz. Yukarıdaki haritadan veya aşağıdaki listeden gezdiğiniz illere dokunun!
          </div>
        ) : (
          <div className="flex flex-wrap gap-space-xs pt-space-xs">
            {visitedSlugs.map((slug) => {
              const c = cities.find((x) => x.slug === slug);
              const displayName = c ? c.name : slug.charAt(0).toUpperCase() + slug.slice(1);

              return (
                <div
                  key={slug}
                  className="flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-[#C1440E] hover:text-white transition-all group shadow-sm text-body-sm font-semibold border border-borderline"
                >
                  <Link to={`/sehir/${slug}`} className="hover:underline">
                    {displayName}
                  </Link>
                  <button
                    type="button"
                    onClick={() => toggleVisited(slug)}
                    aria-label={`${displayName} sil`}
                    className="w-4 h-4 rounded-full flex items-center justify-center text-on-surface-variant group-hover:text-white hover:bg-black/20 transition-colors ml-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Hızlı Arama & 81 İl Seçim Kataloğu */}
      <div
        className="p-space-xl rounded-2xl shadow-md flex flex-col gap-space-lg"
        style={{
          backgroundColor: "rgb(255, 255, 255)",
          border: "1px solid rgb(231, 223, 213)",
        }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div>
            <h3 className="font-headline-md text-headline-md text-on-surface font-bold">
              Tüm İller (81 İl Seçim Kataloğu)
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              İsim arayarak veya listeden istediğiniz ile tıklayarak gezi pasaportunuza anında ekleyip çıkartın.
            </p>
          </div>

          {/* Arama Girişi */}
          <div className="relative w-full md:w-80">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-[20px]">
              search
            </span>
            <input
              className="w-full pl-10 pr-space-md py-2.5 rounded-xl text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              style={{
                backgroundColor: "rgb(250, 247, 242)",
                border: "1px solid rgb(231, 223, 213)",
              }}
              placeholder="81 il arasından ara..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Alfabetik 81 İl Chip Izgarası */}
        <div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-space-xs max-h-[380px] overflow-y-auto p-space-sm rounded-xl"
          style={{
            backgroundColor: "rgb(250, 247, 242)",
            border: "1px solid rgb(231, 223, 213)",
          }}
        >
          {filtered81Cities.map((c) => {
            const isVisited = visitedSlugs.includes(c.slug.toLowerCase());

            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => toggleVisited(c.slug)}
                className={`flex items-center justify-between p-2 rounded-lg font-label-md text-label-md transition-all text-left truncate active:scale-95 border ${
                  isVisited
                    ? "bg-[#C1440E] text-white border-[#C1440E] shadow-sm font-bold"
                    : "bg-white text-on-surface hover:bg-slate-50 border-borderline"
                }`}
                title={isVisited ? "Gezildi (Kaldırmak için tıkla)" : "Gezdim olarak işaretle"}
              >
                <span className="truncate">{c.name}</span>
                <span className="material-symbols-outlined text-[16px] ml-1 shrink-0">
                  {isVisited ? "check_circle" : "add_circle"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
