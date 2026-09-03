import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCityBySlug, getReviews } from "../api";
import PlaceImage from "./PlaceImage";
import QuickFacts from "./QuickFacts";
import WeatherWidget from "./WeatherWidget";
import FavoriteButton from "./FavoriteButton";
import ReviewForm from "./ReviewForm";
import ReviewList from "./ReviewList";

function Section({ title, icon, children }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 flex items-center gap-2 font-display text-2xl font-semibold text-cini-cobalt dark:text-cini-krem">
        <span>{icon}</span> {title}
      </h2>
      {children}
    </section>
  );
}

export default function CityDetail() {
  const { slug } = useParams();
  const [city, setCity] = useState(null);
  const [status, setStatus] = useState("loading"); // loading | ready | notfound | error

  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);

  useEffect(() => {
    setStatus("loading");
    getCityBySlug(slug)
      .then((data) => {
        setCity(data);
        setStatus("ready");
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setStatus("notfound");
        } else {
          setStatus("error");
        }
      });
  }, [slug]);

  useEffect(() => {
    setReviewsLoading(true);
    getReviews(slug)
      .then((data) => setReviews(data))
      .catch(() => setReviews([]))
      .finally(() => setReviewsLoading(false));
  }, [slug]);

  const handleReviewSubmitted = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const handleReviewDeleted = (reviewId) => {
    setReviews((prev) => prev.filter((r) => r._id !== reviewId));
  };

  if (status === "loading") {
    return <p className="text-center text-cini-cobalt/60 dark:text-cini-krem/60">Şehir yükleniyor…</p>;
  }

  if (status === "notfound") {
    return (
      <div className="text-center">
        <p className="mb-4 text-lg text-cini-cobalt dark:text-cini-krem">
          Bu şehrin rehberi henüz eklenmedi. Yakında burada olacak!
        </p>
        <Link to="/" className="text-cini-kiremit underline">
          Haritaya dön
        </Link>
      </div>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-cini-kiremit">
        Şehir yüklenirken bir sorun oluştu. Sunucunun çalıştığından emin olun.
      </p>
    );
  }

  return (
    <div>
      <Link to="/" className="text-sm text-cini-turkuaz hover:underline">
        ← Haritaya dön
      </Link>

      <header className="mb-8 mt-3 border-b border-cini-altin/40 pb-6">
        <span className="rounded-full bg-cini-turkuaz/15 px-3 py-1 text-xs font-medium text-cini-turkuaz">
          {city.region}
        </span>
        <div className="mt-3 flex items-center gap-3">
          <h1 className="font-display text-4xl font-bold text-cini-cobalt dark:text-cini-krem sm:text-5xl">
            {city.name}
          </h1>
          <FavoriteButton citySlug={city.slug} />
        </div>
        <p className="mt-2 max-w-2xl text-cini-cobalt/75 dark:text-cini-krem/75">{city.shortDescription}</p>
      </header>

      <QuickFacts citySlug={city.slug} />
      <WeatherWidget citySlug={city.slug} />

      <Section title="Gezilecek Yerler" icon="🗺️">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {city.places.map((p) => (
            <li
              key={p.name}
              className="overflow-hidden rounded-lg border border-cini-altin/30 bg-white/60 dark:bg-cini-cobalt/40"
            >
              <PlaceImage placeName={p.name} cityName={city.name} alt={p.name} />
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-cini-cobalt dark:text-cini-krem">
                  {p.name}
                </h3>
                <p className="mt-1 text-sm text-cini-cobalt/75 dark:text-cini-krem/75">{p.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Yenilecek Yiyecekler" icon="🍽️">
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {city.foods.map((f) => (
            <li
              key={f.name}
              className="rounded-lg border border-cini-altin/30 bg-white/60 dark:bg-cini-cobalt/40 p-4"
            >
              <h3 className="font-display text-lg font-semibold text-cini-cobalt dark:text-cini-krem">
                {f.name}
              </h3>
              <p className="mt-1 text-sm text-cini-cobalt/75 dark:text-cini-krem/75">{f.description}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Tarihi ve İlginç Bilgiler" icon="📜">
        <ul className="space-y-2">
          {city.funFacts.map((fact, i) => (
            <li
              key={i}
              className="rounded-lg border-l-4 border-cini-kiremit bg-white/50 dark:bg-cini-cobalt/40 p-3 text-sm text-cini-cobalt/80 dark:text-cini-krem/80"
            >
              {fact}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Ziyaretçi Yorumları" icon="💬">
        <div className="mb-6">
          <ReviewForm citySlug={city.slug} onSubmitted={handleReviewSubmitted} />
        </div>
        <ReviewList reviews={reviews} loading={reviewsLoading} onDeleted={handleReviewDeleted} />
      </Section>

      <div className="mt-10 text-center">
        <Link
          to={`/sehir/${city.slug}/quiz`}
          className="inline-block rounded-full bg-cini-kiremit px-8 py-3 font-display text-lg font-semibold text-cini-krem shadow-md transition hover:bg-cini-kiremit/90 hover:shadow-lg"
        >
          🧠 Mini Quiz'e Başla
        </Link>
      </div>
    </div>
  );
}
