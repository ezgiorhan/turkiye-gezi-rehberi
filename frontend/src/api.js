import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCities = () => api.get("/cities").then((res) => res.data);

export const getCityBySlug = (slug) =>
  api.get(`/cities/${slug}`).then((res) => res.data);

export const getCityQuiz = (slug) =>
  api.get(`/cities/${slug}/quiz`).then((res) => res.data);

export const submitQuizResult = (payload) =>
  api.post("/results", payload).then((res) => res.data);

export const getLeaderboard = (slug, limit = 50) =>
  api.get(`/results/${slug}`, { params: { limit } }).then((res) => res.data);

// Kullanıcı işlemleri
export const toggleVisitedCity = (citySlug) =>
  api.post("/auth/toggle-visited", { citySlug }).then((res) => res.data);

export const updateVisitedCities = (visitedCities) =>
  api.put("/auth/visited-cities", { visitedCities }).then((res) => res.data);

export const toggleFavoriteCity = (citySlug) =>
  api.post("/auth/toggle-favorite", { citySlug }).then((res) => res.data);

export const getMe = () =>
  api.get("/auth/me").then((res) => res.data.user);

export default api;
