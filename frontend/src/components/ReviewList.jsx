import React, { useState } from "react";
import { getUploadUrl, deleteReview } from "../api";
import { isMyReview, getMyReviewToken, removeMyReviewToken } from "../utils/myReviews";

function formatDate(isoString) {
  try {
    return new Date(isoString).toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

function Stars({ rating }) {
  if (!rating) return null;
  return (
    <span className="text-sm text-cini-altin">
      {"⭐".repeat(rating)}
      <span className="text-cini-cobalt/20 dark:text-cini-krem/20">{"⭐".repeat(5 - rating)}</span>
    </span>
  );
}

export default function ReviewList({ reviews, loading, onDeleted }) {
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState(null);

  const handleDelete = async (reviewId) => {
    const token = getMyReviewToken(reviewId);
    if (!token) return;

    if (!window.confirm("Bu yorumu silmek istediğine emin misin?")) return;

    setError(null);
    setDeletingId(reviewId);
    try {
      await deleteReview(reviewId, token);
      removeMyReviewToken(reviewId);
      onDeleted?.(reviewId);
    } catch (err) {
      setError(
        err.response?.data?.message || "Yorum silinirken bir hata oluştu."
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <p className="text-center text-sm text-cini-cobalt/60 dark:text-cini-krem/60">Yorumlar yükleniyor…</p>;
  }

  if (!reviews || reviews.length === 0) {
    return (
      <p className="py-4 text-center text-sm text-cini-cobalt/60 dark:text-cini-krem/60">
        Bu şehir için henüz yorum yok. İlk yorumu sen yazabilirsin!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {error && <p className="text-sm text-cini-kiremit">{error}</p>}
      {reviews.map((r) => {
        const mine = isMyReview(r._id);
        return (
          <div
            key={r._id}
            className="rounded-xl border border-cini-altin/30 bg-white/60 dark:bg-cini-cobalt/40 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-cini-cobalt dark:text-cini-krem">
                  {r.authorName}
                </span>
                <Stars rating={r.rating} />
                {mine && (
                  <span className="rounded-full bg-cini-turkuaz/15 px-2 py-0.5 text-[10px] font-medium text-cini-turkuaz">
                    Senin yorumun
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-cini-cobalt/50 dark:text-cini-krem/50">
                  {formatDate(r.createdAt)}
                </span>
                {mine && (
                  <button
                    onClick={() => handleDelete(r._id)}
                    disabled={deletingId === r._id}
                    className="text-xs font-medium text-cini-kiremit hover:underline disabled:opacity-50"
                  >
                    {deletingId === r._id ? "Siliniyor…" : "🗑️ Sil"}
                  </button>
                )}
              </div>
            </div>

            <p className="mt-2 text-sm text-cini-cobalt/80 dark:text-cini-krem/80">{r.comment}</p>

            {r.photoUrl && (
              <img
                src={getUploadUrl(r.photoUrl)}
                alt={`${r.authorName} tarafından paylaşılan fotoğraf`}
                loading="lazy"
                className="mt-3 max-h-72 w-full rounded-lg object-cover"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
