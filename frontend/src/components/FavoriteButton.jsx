import React, { useEffect, useState } from "react";
import { isFavorite, toggleFavorite } from "../utils/favorites";

// Bir şehri favorilere ekleyip çıkarmaya yarayan yıldız butonu.
// Bir <Link> içinde kullanılırsa tıklamanın linke gitmesini engellemek için
// preventDefault/stopPropagation uygular.
export default function FavoriteButton({ citySlug, onToggle, className = "" }) {
  const [fav, setFav] = useState(false);

  useEffect(() => {
    setFav(isFavorite(citySlug));
  }, [citySlug]);

  const handleClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const next = toggleFavorite(citySlug);
    const nowFav = next.includes(citySlug);
    setFav(nowFav);
    onToggle?.(citySlug, nowFav);
  };

  return (
    <button
      onClick={handleClick}
      aria-label={fav ? "Favorilerden çıkar" : "Favorilere ekle"}
      title={fav ? "Favorilerden çıkar" : "Favorilere ekle"}
      className={`text-2xl leading-none transition hover:scale-110 ${className}`}
    >
      {fav ? "⭐" : "☆"}
    </button>
  );
}
