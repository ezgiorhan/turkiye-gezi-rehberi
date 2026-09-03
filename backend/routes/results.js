const express = require("express");
const router = express.Router();
const City = require("../models/City");
const QuizResult = require("../models/QuizResult");

// Basit metin temizliği - HTML/script enjeksiyonuna karşı
function sanitizeName(raw) {
  return String(raw || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 30);
}

// POST /api/results
// Body: { citySlug, playerName, score, total, timeTakenSeconds }
router.post("/", async (req, res) => {
  try {
    const { citySlug, playerName, score, total, timeTakenSeconds } = req.body;

    if (!citySlug || typeof score !== "number" || typeof total !== "number") {
      return res.status(400).json({ message: "Eksik veya hatalı veri." });
    }

    const cleanName = sanitizeName(playerName);
    if (!cleanName) {
      return res.status(400).json({ message: "Lütfen bir isim gir." });
    }
    if (score < 0 || total < 1 || score > total) {
      return res.status(400).json({ message: "Skor değerleri geçersiz." });
    }

    const city = await City.findOne({ slug: citySlug.toLowerCase() }, "slug name");
    if (!city) {
      return res.status(404).json({ message: "Şehir bulunamadı." });
    }

    const percent = Math.round((score / total) * 100);

    const result = await QuizResult.create({
      citySlug: city.slug,
      cityName: city.name,
      playerName: cleanName,
      score,
      total,
      percent,
      timeTakenSeconds:
        typeof timeTakenSeconds === "number" && timeTakenSeconds >= 0
          ? Math.round(timeTakenSeconds)
          : null,
    });

    // Kullanıcının bu sonuçla kaçıncı sırada olduğunu hesapla
    const rank =
      (await QuizResult.countDocuments({
        citySlug: city.slug,
        $or: [
          { score: { $gt: result.score } },
          {
            score: result.score,
            timeTakenSeconds: { $lt: result.timeTakenSeconds ?? Infinity },
          },
        ],
      })) + 1;

    res.status(201).json({ result, rank });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Sonuç kaydedilirken bir hata oluştu." });
  }
});

// GET /api/results/:citySlug?limit=50
// Bir şehrin herkese açık skor tablosu
router.get("/:citySlug", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const results = await QuizResult.find({
      citySlug: req.params.citySlug.toLowerCase(),
    })
      .sort({ score: -1, timeTakenSeconds: 1, createdAt: 1 })
      .limit(limit)
      .select("playerName score total percent timeTakenSeconds createdAt");

    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Skor tablosu yüklenirken bir hata oluştu." });
  }
});

module.exports = router;
