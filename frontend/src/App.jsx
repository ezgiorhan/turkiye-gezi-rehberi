import React, { useState } from "react";
import { BrowserRouter, Routes, Route, NavLink, Link } from "react-router-dom";
import Home from "./components/Home";
import CityDetail from "./components/CityDetail";
import Quiz from "./components/Quiz";
import MyMap from "./components/MyMap";
import CompareCities from "./components/CompareCities";
import Favorites from "./components/Favorites";
import { AuthProvider, useAuth } from "./context/AuthContext";
import AuthModal from "./components/AuthModal";
import UserMenu from "./components/UserMenu";

const LOGO_URL =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBQbYeegmeQJjEdQqzcMqmByhKlzF_nKUFxcyUE4kHwEoB7ebS-k3VL50Gq4nfMLmRxdY7SgTFVoFHiK0zkLn953H4JlZoa89pY7GgdaPAusJcVbmi-6acFB93tHGD6wLuXcoyISzrUlECqZXvDhtezLKeJsTFrduADMS1uilRsdDsd5TGKkwdFsykfB-VyC61aCB3-luKqb1LFaOAdanPaQ1MPKUwS0TQcMYNDqxmS";

function AppShell() {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user } = useAuth();

  const visitedCount = user?.visitedCities?.length || 0;
  const favCount = user?.favoriteCities?.length || 0;

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "px-space-md py-space-sm transition-all flex items-center gap-space-xs bg-primary-container text-on-primary font-semibold rounded-lg shadow-sm"
      : "px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all flex items-center gap-space-xs";

  return (
    <div className="bg-surface text-on-surface font-body-md min-h-screen flex flex-col" style={{ backgroundColor: "rgb(245, 240, 235)" }}>
      {/* STITCH HEADER */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
        style={{
          backgroundColor: "rgba(245, 240, 235, 0.92)",
          borderBottom: "1px solid rgb(231, 223, 213)",
          backdropFilter: "blur(16px)",
        }}
      >
        <div className="h-20 max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg flex items-center justify-between gap-space-md">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-space-md flex-shrink-0 group">
            <img
              alt="Türkiye Gezi Rehberi Logosu"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src={LOGO_URL}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="flex flex-col">
              <span className="font-title-lg text-title-lg text-on-surface tracking-tight leading-none font-bold">
                Türkiye Gezi Rehberi
              </span>
              <span className="font-label-md text-label-md text-primary tracking-wide mt-space-xs font-semibold">
                81 İl Keşif &amp; Takip
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-space-xs p-space-xs rounded-xl bg-surface-container-low"
            style={{
              backgroundColor: "rgb(237, 231, 223)",
              border: "1px solid rgb(231, 223, 213)",
            }}
          >
            <NavLink to="/" end className={navLinkClass}>
              Harita
            </NavLink>
            <NavLink to="/karsilastir" className={navLinkClass}>
              Karşılaştır
            </NavLink>
            <NavLink to="/benim-haritam" className={navLinkClass}>
              Benim Haritam
              <span className="px-space-xs py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm ml-space-xs">
                {visitedCount}/81
              </span>
            </NavLink>
            <NavLink to="/favorilerim" className={navLinkClass}>
              <span className="text-amber-500 mr-1 text-base">⭐</span>
              Favorilerim
              <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary font-label-sm text-label-sm ml-space-xs">
                {favCount}
              </span>
            </NavLink>
          </nav>

          {/* User Auth Action Menu & Theme Toggle */}
          <div className="flex items-center gap-space-sm">
            <button
              type="button"
              title="Tema"
              className="w-10 h-10 rounded-full border border-borderline flex items-center justify-center bg-surface hover:bg-surface-container transition-colors text-amber-500 shadow-sm"
            >
              <span className="material-symbols-outlined text-[20px]">light_mode</span>
            </button>
            <UserMenu onLoginClick={() => setShowAuthModal(true)} />
          </div>
        </div>
      </header>

      {/* MAIN CONTENT ROUTER AREA */}
      <main className="w-full pt-20 bg-surface flex-1" style={{ backgroundColor: "transparent" }}>
        <Routes>
          <Route path="/" element={<Home onOpenAuthModal={() => setShowAuthModal(true)} />} />
          <Route path="/sehir/:slug" element={<CityDetail onOpenAuthModal={() => setShowAuthModal(true)} />} />
          <Route path="/sehir/:slug/quiz" element={<Quiz onOpenAuthModal={() => setShowAuthModal(true)} />} />
          <Route path="/benim-haritam" element={<MyMap onOpenAuthModal={() => setShowAuthModal(true)} />} />
          <Route path="/karsilastir" element={<CompareCities onOpenAuthModal={() => setShowAuthModal(true)} />} />
          <Route path="/favorilerim" element={<Favorites onOpenAuthModal={() => setShowAuthModal(true)} />} />
        </Routes>
      </main>

      {/* STITCH FOOTER */}
      <footer
        className="w-full bg-surface-container-low shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-space-xl mt-space-3xl"
        style={{
          backgroundColor: "rgb(250, 247, 242)",
          borderTop: "1px solid rgb(231, 223, 213)",
        }}
      >
        <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg flex flex-col md:flex-row items-center justify-between gap-space-lg text-center md:text-left">
          <div className="flex items-center gap-space-md">
            <img
              alt="Türkiye Gezi Rehberi Logosu"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="flex flex-col">
              <span className="font-title-lg text-title-lg text-on-surface font-bold">
                Türkiye Gezi Rehberi
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Anadolu'nun her köşesini keşfet, deneyimle ve haritana işle.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-space-lg">
            <Link
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
              to="/"
            >
              İnteraktif Harita
            </Link>
            <Link
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
              to="/karsilastir"
            >
              Şehir Karşılaştırma
            </Link>
            <Link
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
              to="/benim-haritam"
            >
              Gezgin Pasaportu
            </Link>
            <Link
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors"
              to="/favorilerim"
            >
              Kaydedilenler
            </Link>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Social Links */}
        <div className="max-w-[1340px] mx-auto px-margin-sm lg:px-margin-lg mt-space-lg pt-space-md border-t border-borderline flex flex-col sm:flex-row items-center justify-between gap-space-md text-center sm:text-left">
          <div className="font-body-sm text-body-sm text-on-surface-variant">
            © 2026 Türkiye Gezi Rehberi. Tüm hakları saklıdır.
          </div>

          <div className="flex items-center gap-space-sm">
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium mr-1">
              Geliştirici:
            </span>

            {/* GitHub Link */}
            <a
              href="https://github.com/ezgiorhan"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profilim"
              title="GitHub: @ezgiorhan"
              className="w-9 h-9 rounded-full bg-surface border border-borderline flex items-center justify-center text-on-surface hover:text-primary hover:border-primary hover:scale-105 transition-all shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/hatice-ezgi-orhan-57b382364"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profilim"
              title="LinkedIn: Hatice Ezgi Orhan"
              className="w-9 h-9 rounded-full bg-surface border border-borderline flex items-center justify-center text-[#0A66C2] hover:bg-blue-50 hover:border-[#0A66C2] hover:scale-105 transition-all shadow-sm"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* AUTH MODAL */}
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppShell />
      </AuthProvider>
    </BrowserRouter>
  );
}
