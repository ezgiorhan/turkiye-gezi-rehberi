const express = require("express");
const router = express.Router();
const City = require("../models/City");

// GET /api/cities
// Haritada göstermek için tüm şehirlerin özet bilgisini döner
router.get("/", async (req, res) => {
  try {
    const cities = await City.find(
      {},
      "slug name region shortDescription heroImage mapPosition"
    ).sort({ name: 1 });
    res.json(cities);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Şehirler yüklenirken bir hata oluştu." });
  }
});

// GET /api/cities/:slug
// Tek bir şehrin tüm detaylarını (quiz dahil) döner
router.get("/:slug", async (req, res) => {
  try {
    const city = await City.findOne({ slug: req.params.slug.toLowerCase() });
    if (!city) {
      return res.status(404).json({ message: "Şehir bulunamadı." });
    }
    res.json(city);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Şehir yüklenirken bir hata oluştu." });
  }
});

// GET /api/cities/:slug/quiz
// Sadece quiz sorularını döner (doğru cevap istemciye yine gider,
// çünkü anlık geri bildirim frontend'de gösteriliyor)
router.get("/:slug/quiz", async (req, res) => {
  try {
    const city = await City.findOne(
      { slug: req.params.slug.toLowerCase() },
      "name slug quiz"
    );
    if (!city) {
      return res.status(404).json({ message: "Şehir bulunamadı." });
    }
    res.json({ name: city.name, slug: city.slug, quiz: city.quiz });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Quiz yüklenirken bir hata oluştu." });
  }
});

module.exports = router;
