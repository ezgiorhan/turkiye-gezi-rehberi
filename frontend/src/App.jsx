import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import CityDetail from "./components/CityDetail";
import Quiz from "./components/Quiz";
import Favorites from "./components/Favorites";
import Compare from "./components/Compare";
import { getInitialTheme, applyTheme } from "./utils/theme";

function App() {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cini-krem bg-tile-pattern [background-size:18px_18px] font-body text-cini-cobalt transition-colors dark:bg-cini-lacivert2 dark:text-cini-krem">
        <header className="border-b border-cini-altin/40 bg-cini-cobalt">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
            <Link to="/" className="group flex items-center gap-3">
              <span className="text-2xl">🧭</span>
              <span className="font-display text-2xl font-semibold tracking-wide text-cini-krem group-hover:text-cini-altin transition-colors">
                Türkiye Gezi Rehberi
              </span>
            </Link>
            <nav className="flex items-center gap-5">
              <Link
                to="/"
                className="text-sm font-medium text-cini-krem/80 hover:text-cini-altin transition-colors"
              >
                Harita
              </Link>
              <Link
                to="/karsilastir"
                className="text-sm font-medium text-cini-krem/80 hover:text-cini-altin transition-colors"
              >
                Karşılaştır
              </Link>
              <Link
                to="/favorilerim"
                className="text-sm font-medium text-cini-krem/80 hover:text-cini-altin transition-colors"
              >
                ⭐ Favorilerim
              </Link>
              <button
                onClick={toggleTheme}
                aria-label={theme === "dark" ? "Aydınlık moda geç" : "Karanlık moda geç"}
                title={theme === "dark" ? "Aydınlık moda geç" : "Karanlık moda geç"}
                className="rounded-full border border-cini-krem/30 px-3 py-1.5 text-sm text-cini-krem/80 transition-colors hover:border-cini-altin hover:text-cini-altin"
              >
                {theme === "dark" ? "☀️" : "🌙"}
              </button>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-6 py-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sehir/:slug" element={<CityDetail />} />
            <Route path="/sehir/:slug/quiz" element={<Quiz />} />
            <Route path="/favorilerim" element={<Favorites />} />
            <Route path="/karsilastir" element={<Compare />} />
          </Routes>
        </main>

        <footer className="mt-16 border-t border-cini-altin/30 py-6 text-center text-xs text-cini-cobalt/60 dark:text-cini-krem/50">
          Türkiye Gezi Rehberi — 81 il, 81 hikâye.
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
