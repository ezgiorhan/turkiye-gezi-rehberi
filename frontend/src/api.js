import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Fotoğraf artık Cloudinary'de saklandığı için "photoUrl" doğrudan tam bir
// https:// adresi olarak gelir; bu durumda olduğu gibi döndürülür. Eski
// (yerel /uploads/... göreli yol) kayıtlarla geriye dönük uyumluluk için
// göreli bir yol gelirse backend origin'iyle birleştirilir.
export const getUploadUrl = (url) => {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  const origin = API_BASE_URL.replace(/\/api\/?$/, "");
  return `${origin}${url}`;
};

export const getCities = () => api.get("/cities").then((res) => res.data);

export const getCityBySlug = (slug) =>
  api.get(`/cities/${slug}`).then((res) => res.data);

export const getCityQuiz = (slug) =>
  api.get(`/cities/${slug}/quiz`).then((res) => res.data);

export const submitQuizResult = (payload) =>
  api.post("/results", payload).then((res) => res.data);

export const getLeaderboard = (slug, limit = 50) =>
  api.get(`/results/${slug}`, { params: { limit } }).then((res) => res.data);

// formData: FormData nesnesi olmalı (citySlug, authorName, comment, rating, photo)
export const submitReview = (formData) =>
  api
    .post("/reviews", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);

export const getReviews = (citySlug, limit = 50) =>
  api.get(`/reviews/${citySlug}`, { params: { limit } }).then((res) => res.data);

export const deleteReview = (reviewId, deleteToken) =>
  api
    .delete(`/reviews/${reviewId}`, { data: { deleteToken } })
    .then((res) => res.data);

export default api;
