import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import api, { getMe, toggleVisitedCity, updateVisitedCities, toggleFavoriteCity } from "../api";

const AuthContext = createContext(null);

const TOKEN_KEY = "gezi-auth-token";
const USER_KEY  = "gezi-auth-user";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth, AuthProvider içinde kullanılmalı.");
  return ctx;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Token'ı axios header'ına uygula
  const applyToken = useCallback((token) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem(TOKEN_KEY, token);
    } else {
      delete api.defaults.headers.common["Authorization"];
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  // Sayfa açılışında token varsa oturumu doğrula ve kullanıcı bilgilerini yenile
  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (token) {
      applyToken(token);
      getMe()
        .then((freshUser) => {
          setUser(freshUser);
          localStorage.setItem(USER_KEY, JSON.stringify(freshUser));
        })
        .catch(() => {
          // Token geçersizse temizle
          applyToken(null);
          setUser(null);
        });
    }
  }, [applyToken]);

  // --- Kayıt ---
  async function register(name, email, password) {
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", { name, email, password });
      applyToken(data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.message || "Kayıt başarısız.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  // --- Giriş ---
  async function login(email, password) {
    setError(null);
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      applyToken(data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));
      setUser(data.user);
      return data.user;
    } catch (err) {
      const msg = err.response?.data?.message || "Giriş başarısız.";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  }

  // --- Çıkış ---
  function logout() {
    applyToken(null);
    setUser(null);
    setError(null);
  }

  // --- Gezilen İl Ekle/Kaldır (Toggle) ---
  async function toggleVisited(citySlug) {
    if (!user) return;
    const slug = citySlug.toLowerCase().trim();
    const currentList = user.visitedCities || [];
    const isAlreadyVisited = currentList.includes(slug);

    // İyimser UI güncellemesi (anında turuncu/normal olsun)
    const nextList = isAlreadyVisited
      ? currentList.filter((s) => s !== slug)
      : [...currentList, slug];

    const updatedUser = { ...user, visitedCities: nextList };
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    try {
      const res = await toggleVisitedCity(slug);
      const serverUser = { ...user, visitedCities: res.visitedCities };
      setUser(serverUser);
      localStorage.setItem(USER_KEY, JSON.stringify(serverUser));
    } catch (err) {
      console.error("Gezilen il kaydedilemedi:", err);
      // Hata durumunda geri al
      setUser(user);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  // --- Tüm Gezilen İlleri Sıfırla ---
  async function clearVisited() {
    if (!user) return;
    const updatedUser = { ...user, visitedCities: [] };
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    try {
      await updateVisitedCities([]);
    } catch (err) {
      console.error("Sıfırlama hatası:", err);
    }
  }

  // --- Favori İl Ekle/Kaldır ---
  async function toggleFavorite(citySlug) {
    if (!user) return;
    const slug = citySlug.toLowerCase().trim();
    const currentList = user.favoriteCities || [];
    const isAlreadyFav = currentList.includes(slug);

    const nextList = isAlreadyFav
      ? currentList.filter((s) => s !== slug)
      : [...currentList, slug];

    const updatedUser = { ...user, favoriteCities: nextList };
    setUser(updatedUser);
    localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

    try {
      const res = await toggleFavoriteCity(slug);
      const serverUser = { ...user, favoriteCities: res.favoriteCities };
      setUser(serverUser);
      localStorage.setItem(USER_KEY, JSON.stringify(serverUser));
    } catch (err) {
      console.error("Favori kaydedilemedi:", err);
      setUser(user);
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        clearError: () => setError(null),
        register,
        login,
        logout,
        toggleVisited,
        clearVisited,
        toggleFavorite,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
