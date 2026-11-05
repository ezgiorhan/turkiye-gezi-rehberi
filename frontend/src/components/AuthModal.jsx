import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ onClose }) {
  const { register, login, error, clearError, loading } = useAuth();
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState(null);

  const errorMsg = localError || error;

  const switchTab = (t) => {
    setTab(t);
    setLocalError(null);
    clearError();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);
    clearError();

    if (!email.trim() || !password) {
      setLocalError("E-posta ve şifre zorunludur.");
      return;
    }
    if (tab === "register" && !name.trim()) {
      setLocalError("Sıralamada görünecek bir isim yazmalısın.");
      return;
    }

    try {
      if (tab === "login") {
        await login(email.trim(), password);
      } else {
        await register(name.trim(), email.trim(), password);
      }
      onClose();
    } catch {
      // Hata AuthContext'te tutulur
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-on-background/50 backdrop-blur-md transition-all duration-300"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-surface-container-lowest shadow-[0_24px_64px_-12px_rgba(15,23,42,0.24)] overflow-hidden"
        style={{ backgroundColor: "rgb(255, 255, 255)", border: "1px solid rgb(231, 223, 213)" }}
      >
        {/* Modal Header Art Pattern */}
        <div className="relative h-28 bg-gradient-to-r from-primary to-primary-container p-space-lg flex flex-col justify-end text-on-primary">
          <button
            onClick={onClose}
            className="absolute top-space-md right-space-md w-8 h-8 rounded-full bg-black/20 hover:bg-black/40 text-on-primary flex items-center justify-center transition-colors"
            type="button"
            aria-label="Kapat"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
          <h3 className="font-headline-sm text-headline-sm font-bold">Gezgin Hesabına Eriş</h3>
          <p className="font-label-sm text-label-sm opacity-85">
            Rotanı kaydet, rozet kazan ve Türkiye haritanı doldur.
          </p>
        </div>

        <div className="p-space-xl">
          {/* Auth Tabs Toggle */}
          <div
            className="grid grid-cols-2 p-1 rounded-xl mb-space-lg"
            style={{ backgroundColor: "rgb(237, 231, 223)" }}
          >
            <button
              onClick={() => switchTab("login")}
              className={`py-space-xs rounded-lg font-label-lg text-label-lg transition-all ${
                tab === "login"
                  ? "bg-surface text-on-surface font-semibold shadow-sm"
                  : "text-on-surface-variant font-medium hover:text-on-surface"
              }`}
              type="button"
            >
              Giriş Yap
            </button>
            <button
              onClick={() => switchTab("register")}
              className={`py-space-xs rounded-lg font-label-lg text-label-lg transition-all ${
                tab === "register"
                  ? "bg-surface text-on-surface font-semibold shadow-sm"
                  : "text-on-surface-variant font-medium hover:text-on-surface"
              }`}
              type="button"
            >
              Kayıt Ol
            </button>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-space-md" onSubmit={handleSubmit}>
            {/* Name Field (Visible on Register) */}
            {tab === "register" && (
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Adınız ve Soyadınız
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-[20px]">
                    person
                  </span>
                  <input
                    className="w-full h-12 pl-11 pr-space-md rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface border border-borderline"
                    placeholder="Deniz Yılmaz"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={30}
                    autoFocus
                  />
                </div>
              </div>
            )}

            {/* Email Field */}
            <div className="flex flex-col gap-1.5">
              <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                E-posta Adresi
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  mail
                </span>
                <input
                  className="w-full h-12 pl-11 pr-space-md rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface border border-borderline"
                  placeholder="gezgin@rehber.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                  Şifre
                </label>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-space-md top-1/2 -translate-y-1/2 text-outline text-[20px]">
                  lock
                </span>
                <input
                  className="w-full h-12 pl-11 pr-space-md rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-surface border border-borderline"
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={tab === "login" ? "current-password" : "new-password"}
                />
              </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <p className="rounded-xl bg-error-container text-on-error-container px-space-md py-space-xs text-body-sm font-medium">
                {errorMsg}
              </p>
            )}

            {/* JWT Security Info Notice */}
            <div className="p-space-sm rounded-xl bg-surface-container-low flex items-center gap-space-sm text-on-surface-variant border border-borderline/60">
              <span className="material-symbols-outlined text-[18px] text-primary">verified_user</span>
              <span className="font-label-sm text-label-sm">
                JWT 256-bit şifreleme ve güvenli oturum anahtarı ile korunur.
              </span>
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-12 rounded-xl bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:bg-primary-container transition-all flex items-center justify-center gap-space-xs shadow-md shadow-primary/25 mt-space-xs disabled:opacity-50"
              type="submit"
              disabled={loading}
            >
              <span>{loading ? "İşleniyor..." : tab === "login" ? "Giriş Yap" : "Hesap Oluştur"}</span>
              <span className="material-symbols-outlined text-[20px]">login</span>
            </button>
          </form>

          {/* Terms Footer */}
          <div className="text-center mt-space-md font-label-sm text-label-sm text-outline">
            Devam ederek{" "}
            <span className="underline text-on-surface">Kullanım Şartları</span> ve{" "}
            <span className="underline text-on-surface">Gizlilik Politikası</span>'nı onaylamış olursunuz.
          </div>
        </div>
      </div>
    </div>
  );
}
