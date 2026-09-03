// Wikipedia'nın herkese açık MediaWiki Action API'sini kullanarak bir yer adına
// göre gerçek bir önizleme görseli (thumbnail) bulur. API key gerekmez.
//
// ÖNEMLİ: page/summary/{title} gibi "REST" uç noktaları TAM sayfa başlığı bekler
// ve arama yapmaz; "Ayasofya İstanbul" gibi birleşik bir metin gönderildiğinde
// neredeyse hiç eşleşme bulunmaz. Bunun yerine generator=search kullanan Action
// API'yi tercih ediyoruz - bu, Google'a yazar gibi bulanık arama yapabilir ve
// en iyi eşleşen sayfanın küçük resmini (varsa) döner. origin=* parametresi,
// tarayıcıdan doğrudan (CORS ile) istek atabilmemizi sağlar.

const cache = new Map();

async function searchThumbnail(query, lang) {
  const key = `${lang}:${query}`;
  if (cache.has(key)) return cache.get(key);

  try {
    const url =
      `https://${lang}.wikipedia.org/w/api.php` +
      `?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}` +
      `&gsrlimit=1&prop=pageimages&piprop=thumbnail&pithumbsize=600` +
      `&format=json&origin=*`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("bad response");
    const data = await res.json();

    const pages = data?.query?.pages;
    if (!pages) throw new Error("no pages");

    const page = Object.values(pages)[0];
    const thumb = page?.thumbnail?.source || null;
    cache.set(key, thumb);
    return thumb;
  } catch {
    cache.set(key, null);
    return null;
  }
}

/**
 * Bir yer için en iyi eşleşen görseli bulmaya çalışır.
 * Sırasıyla: (1) sadece yer adıyla TR Wikipedia'da arar - genelde en isabetli
 * sonuç budur, (2) yer adı + şehir adıyla arar (yer adı tek başına belirsizse
 * yardımcı olur), (3) sadece yer adıyla EN Wikipedia'da arar.
 * @param {string} placeName - Yer adı (ör. "Ayasofya")
 * @param {string} [cityName] - Şehir adı, belirsiz yer adlarında yardımcı arama için
 * @returns {Promise<string|null>}
 */
export async function getPlaceThumbnail(placeName, cityName) {
  if (!placeName) return null;

  let thumb = await searchThumbnail(placeName, "tr");
  if (thumb) return thumb;

  if (cityName) {
    thumb = await searchThumbnail(`${placeName} ${cityName}`, "tr");
    if (thumb) return thumb;
  }

  thumb = await searchThumbnail(placeName, "en");
  if (thumb) return thumb;

  return null;
}
