// Bu tarayıcının gönderdiği yorumların "silme anahtarlarını" saklar.
// Sunucu, her yorum oluşturulduğunda tek seferlik bir deleteToken döner;
// biz bunu burada yorum id'sine göre eşleyerek tutarız. Sadece bu anahtara
// sahip olan (yani yorumu gönderen) kişi kendi yorumunu silebilir.

const KEY = "gezi-rehberi-yorumlarim";

function readMap() {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeMap(map) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(map));
  } catch {
    // yok say
  }
}

export function saveMyReviewToken(reviewId, deleteToken) {
  const map = readMap();
  map[reviewId] = deleteToken;
  writeMap(map);
}

export function getMyReviewToken(reviewId) {
  return readMap()[reviewId] || null;
}

export function removeMyReviewToken(reviewId) {
  const map = readMap();
  delete map[reviewId];
  writeMap(map);
}

export function isMyReview(reviewId) {
  return Boolean(getMyReviewToken(reviewId));
}
