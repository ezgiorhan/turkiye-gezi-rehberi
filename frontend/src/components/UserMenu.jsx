import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserMenu({ onLoginClick }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visitedCount = user?.visitedCities?.length || 0;
  const getBadgeTitle = (count) => {
    if (count >= 50) return "Türkiye Fatihi";
    if (count >= 20) return "Anadolu Fatihi";
    if (count >= 10) return "Usta Kaşif";
    if (count >= 5) return "Gezgin Ruh";
    if (count >= 1) return "Yol Meraklısı";
    return "Yeni Gezgin";
  };

  if (!user) {
    return (
      <button
        onClick={onLoginClick}
        className="flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-primary text-on-primary font-label-lg text-label-lg hover:bg-primary-container transition-all shadow-sm"
        type="button"
      >
        <span className="material-symbols-outlined text-[18px]">login</span>
        <span>Giriş / Kayıt</span>
      </button>
    );
  }

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "GZ";

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-space-sm p-space-xs pr-space-md rounded-full bg-surface-container-low hover:bg-surface-container hover:text-on-surface transition-all"
        type="button"
        style={{ backgroundColor: "rgb(237, 231, 223)", border: "1px solid rgb(231, 223, 213)" }}
      >
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-bold text-on-primary text-xs shadow-sm">
          {initials}
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="font-label-lg text-label-lg text-on-surface leading-tight font-semibold">
            {user.name}
          </span>
          <span className="font-label-sm text-[11px] text-secondary font-bold tracking-wider uppercase">
            {getBadgeTitle(visitedCount)}
          </span>
        </div>
        <span
          className={`material-symbols-outlined text-on-surface-variant text-[18px] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-space-xs w-60 rounded-xl bg-surface-container-lowest shadow-[0_24px_48px_-12px_rgba(15,23,42,0.16),0_4px_12px_-2px_rgba(15,118,110,0.08)] py-space-xs z-50"
          style={{ backgroundColor: "rgb(255, 255, 255)", border: "1px solid rgb(231, 223, 213)" }}
        >
          <div className="px-space-md py-space-sm pb-space-xs border-b border-borderline">
            <div className="font-label-lg text-label-lg text-on-surface font-bold">{user.name}</div>
            <div className="font-label-sm text-label-sm text-secondary truncate">{user.email}</div>
            <div className="mt-1 px-2 py-0.5 rounded bg-primary/10 text-primary text-[11px] font-semibold inline-block">
              {visitedCount} / 81 İl Gezildi
            </div>
          </div>

          <Link
            to="/benim-haritam"
            onClick={() => setOpen(false)}
            className="flex items-center gap-space-sm px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">map</span>
            Benim Haritam
          </Link>

          <Link
            to="/favorilerim"
            onClick={() => setOpen(false)}
            className="flex items-center gap-space-sm px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">star</span>
            Favorilerim ({user?.favoriteCities?.length || 0})
          </Link>

          <Link
            to="/karsilastir"
            onClick={() => setOpen(false)}
            className="flex items-center gap-space-sm px-space-md py-space-sm font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">compare_arrows</span>
            Şehir Karşılaştır
          </Link>

          <div className="my-space-xs bg-borderline h-[1px]" />

          <button
            onClick={() => {
              setOpen(false);
              logout();
            }}
            className="w-full text-left flex items-center gap-space-sm px-space-md py-space-sm font-label-lg text-label-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Çıkış Yap
          </button>
        </div>
      )}
    </div>
  );
}
