// Favori şehirleri tarayıcının localStorage'ında saklayan yardımcı fonksiyonlar.
// Giriş/kayıt gerektirmez, sadece bu tarayıcıda kalıcıdır.

const FAVORITES_KEY = "gezi-rehberi-favoriler";

function readFavorites() {
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavorites(slugs) {
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(slugs));
  } catch {
    // localStorage kullanılamıyorsa sessizce yok say
  }
}

export function isFavorite(slug) {
  return readFavorites().includes(slug);
}

export function toggleFavorite(slug) {
  const current = readFavorites();
  const next = current.includes(slug)
    ? current.filter((s) => s !== slug)
    : [...current, slug];
  writeFavorites(next);
  return next;
}

export function getFavorites() {
  return readFavorites();
}
