// Karanlık/aydınlık mod tercihini yöneten yardımcı fonksiyonlar.
// Tercih localStorage'da saklanır; hiç tercih yoksa tarayıcının/işletim
// sisteminin sistem temasına (prefers-color-scheme) bakılır.

const THEME_KEY = "gezi-rehberi-tema";

export function getInitialTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;
  } catch {
    // localStorage kullanılamıyorsa sessizce devam et
  }

  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}

export function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // yok say
  }
}
