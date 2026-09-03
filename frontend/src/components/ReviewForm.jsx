import React, { useState } from "react";
import { submitReview } from "../api";
import { saveMyReviewToken } from "../utils/myReviews";
import ImageCropModal from "./ImageCropModal";

const NAME_STORAGE_KEY = "gezi-rehberi-oyuncu-adi"; // Quiz ile aynı isim hafızasını paylaşır

export default function ReviewForm({ citySlug, onSubmitted }) {
  const [authorName, setAuthorName] = useState(() => {
    try {
      return window.localStorage.getItem(NAME_STORAGE_KEY) || "";
    } catch {
      return "";
    }
  });
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [photo, setPhoto] = useState(null); // kırpılmış, göndermeye hazır dosya
  const [photoPreview, setPhotoPreview] = useState(null);
  const [rawImageSrc, setRawImageSrc] = useState(null); // kırpma ekranına gönderilecek ham görsel
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    e.target.value = ""; // aynı dosyayı tekrar seçebilmek için input'u sıfırla
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Fotoğraf 5MB'tan küçük olmalı.");
      return;
    }
    setError(null);

    // Fotoğrafı doğrudan kullanmak yerine önce kırpma ekranını aç - bu sayede
    // her yüklenen fotoğraf, cihazdan bağımsız olarak aynı orana (4:3) sahip
    // olur ve hem PC'de hem telefonda birebir aynı çerçevede görünür.
    const reader = new FileReader();
    reader.onload = () => setRawImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  const handleCropDone = (blob) => {
    const croppedFile = new File([blob], "yorum-fotografi.jpg", { type: "image/jpeg" });
    setPhoto(croppedFile);
    setPhotoPreview(URL.createObjectURL(blob));
    setRawImageSrc(null);
  };

  const handleCropCancel = () => {
    setRawImageSrc(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const cleanName = authorName.trim();
    const cleanComment = comment.trim();

    if (!cleanName) {
      setError("Lütfen bir isim gir.");
      return;
    }
    if (!cleanComment) {
      setError("Lütfen bir yorum yaz.");
      return;
    }

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("citySlug", citySlug);
      formData.append("authorName", cleanName);
      formData.append("comment", cleanComment);
      if (rating > 0) formData.append("rating", rating);
      if (photo) formData.append("photo", photo);

      const newReview = await submitReview(formData);

      // Sunucunun döndürdüğü tek seferlik silme anahtarını sakla - bu sayede
      // bu tarayıcı daha sonra bu yorumu silebilir.
      if (newReview._id && newReview.deleteToken) {
        saveMyReviewToken(newReview._id, newReview.deleteToken);
      }

      try {
        window.localStorage.setItem(NAME_STORAGE_KEY, cleanName);
      } catch {
        // yok say
      }

      setComment("");
      setRating(0);
      setPhoto(null);
      setPhotoPreview(null);
      onSubmitted?.(newReview);
    } catch (err) {
      setError(
        err.response?.data?.message || "Yorum gönderilirken bir hata oluştu."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {rawImageSrc && (
        <ImageCropModal
          imageSrc={rawImageSrc}
          onCancel={handleCropCancel}
          onCropDone={handleCropDone}
        />
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-xl border border-cini-altin/40 bg-white/60 dark:bg-cini-cobalt/40 p-5"
      >
        <h3 className="mb-4 font-display text-lg font-semibold text-cini-cobalt dark:text-cini-krem">
          Bu şehri gezdin mi? Deneyimini paylaş
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            placeholder="Adın"
            maxLength={30}
            className="rounded-lg border border-cini-cobalt/20 dark:border-cini-krem/20 bg-white dark:bg-cini-cobalt/30 dark:text-cini-krem px-4 py-2.5 text-sm text-cini-cobalt dark:text-cini-krem outline-none focus:border-cini-turkuaz"
          />

          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                className="text-2xl leading-none transition hover:scale-110"
                aria-label={`${star} yıldız`}
              >
                {(hoverRating || rating) >= star ? "⭐" : "☆"}
              </button>
            ))}
            <span className="ml-2 text-xs text-cini-cobalt/50 dark:text-cini-krem/50">(opsiyonel)</span>
          </div>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Bu şehir hakkında ne düşünüyorsun? (en fazla 500 karakter)"
          maxLength={500}
          rows={3}
          className="mt-4 w-full rounded-lg border border-cini-cobalt/20 dark:border-cini-krem/20 bg-white dark:bg-cini-cobalt/30 dark:text-cini-krem px-4 py-2.5 text-sm text-cini-cobalt dark:text-cini-krem outline-none focus:border-cini-turkuaz"
        />

        <div className="mt-4 flex flex-wrap items-center gap-4">
          <label className="cursor-pointer rounded-lg border border-dashed border-cini-cobalt/30 dark:border-cini-krem/20 px-4 py-2 text-sm text-cini-cobalt/70 dark:text-cini-krem/70 hover:border-cini-turkuaz hover:text-cini-turkuaz">
            📷 Fotoğraf ekle (opsiyonel)
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handlePhotoChange}
              className="hidden"
            />
          </label>

          {photoPreview && (
            <div className="relative">
              <img
                src={photoPreview}
                alt="Önizleme"
                className="h-16 w-16 rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPhoto(null);
                  setPhotoPreview(null);
                }}
                className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-cini-kiremit text-xs text-white"
                aria-label="Fotoğrafı kaldır"
              >
                ×
              </button>
            </div>
          )}
        </div>

        {error && <p className="mt-3 text-sm text-cini-kiremit">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="mt-4 rounded-full bg-cini-turkuaz px-6 py-2 text-sm font-semibold text-white transition hover:bg-cini-turkuaz/90 disabled:opacity-50"
        >
          {submitting ? "Gönderiliyor…" : "Yorumu Paylaş"}
        </button>
      </form>
    </>
  );
}
