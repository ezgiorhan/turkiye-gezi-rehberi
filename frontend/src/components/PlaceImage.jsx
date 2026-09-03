import React, { useEffect, useState } from "react";
import { getPlaceThumbnail } from "../utils/wikiImage";
import placeImageOverrides from "../data/placeImageOverrides";

// "placeName" (ve isteğe bağlı "cityName") ile gösterilecek görseli bulur.
// Önce elle tanımlanmış override listesine bakar (bkz. src/data/placeImageOverrides.js);
// orada yoksa Wikipedia'dan otomatik arama yapar. Görsel hiçbir yerde bulunamazsa
// zarifçe bir simge + degrade arka plana düşer, kırık resim ikonu göstermez.
export default function PlaceImage({ placeName, cityName, alt }) {
  const [src, setSrc] = useState(undefined); // undefined = yükleniyor, null = görsel yok

  useEffect(() => {
    let active = true;
    setSrc(undefined);

    const overrideKey = `${cityName}:${placeName}`;
    const overrideUrl = placeImageOverrides[overrideKey];
    if (overrideUrl) {
      setSrc(overrideUrl);
      return;
    }

    getPlaceThumbnail(placeName, cityName).then((url) => {
      if (active) setSrc(url);
    });
    return () => {
      active = false;
    };
  }, [placeName, cityName]);

  if (src === undefined) {
    return (
      <div className="aspect-[4/3] w-full animate-pulse rounded-t-lg bg-cini-cobalt/10 dark:bg-cini-krem/10" />
    );
  }

  if (!src) {
    return (
      <div className="flex aspect-[4/3] w-full items-center justify-center rounded-t-lg bg-gradient-to-br from-cini-turkuaz/20 to-cini-cobalt/20">
        <span className="text-3xl opacity-40">🏛️</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt || placeName}
      loading="lazy"
      className="aspect-[4/3] w-full rounded-t-lg object-cover"
    />
  );
}
