const express = require("express");
const crypto = require("crypto");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const router = express.Router();
const City = require("../models/City");
const Review = require("../models/Review");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

// Dosyayı diske yazmadan doğrudan bellekte tutuyoruz (multer.memoryStorage),
// ardından Cloudinary'ye yüklüyoruz - böylece sunucunun diskine hiç dokunmuyor
// ve sunucu yeniden başlasa/deploy edilse bile fotoğraf kaybolmuyor.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
      return cb(new Error("Sadece jpg, jpeg, png, webp veya gif dosyaları yüklenebilir."));
    }
    cb(null, true);
  },
});

function uploadBufferToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "turkiye-gezi-rehberi", resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

function sanitizeText(raw, maxLen) {
  return String(raw || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, maxLen);
}

// POST /api/reviews
// multipart/form-data: citySlug, authorName, comment, rating (opsiyonel), photo (opsiyonel dosya)
router.post("/", upload.single("photo"), async (req, res) => {
  try {
    const { citySlug, authorName, comment, rating } = req.body;

    if (!citySlug) {
      return res.status(400).json({ message: "Şehir belirtilmedi." });
    }

    const cleanName = sanitizeText(authorName, 30);
    const cleanComment = sanitizeText(comment, 500);

    if (!cleanName) {
      return res.status(400).json({ message: "Lütfen bir isim gir." });
    }
    if (!cleanComment) {
      return res.status(400).json({ message: "Lütfen bir yorum yaz." });
    }

    const city = await City.findOne({ slug: citySlug.toLowerCase() }, "slug name");
    if (!city) {
      return res.status(404).json({ message: "Şehir bulunamadı." });
    }

    let ratingValue = null;
    if (rating !== undefined && rating !== "" && rating !== null) {
      const parsed = Number(rating);
      if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= 5) {
        ratingValue = Math.round(parsed);
      }
    }

    let photoUrl = null;
    let photoPublicId = null;
    if (req.file) {
      const result = await uploadBufferToCloudinary(req.file.buffer);
      photoUrl = result.secure_url;
      photoPublicId = result.public_id;
    }

    // Bu yorumu daha sonra silebilmesi için tek seferlik, rastgele bir anahtar üret.
    // Bu anahtar SADECE bu yanıtla (creation response) döner, GET isteklerinde asla
    // görünmez - böylece başkaları bu yorumu silemez.
    const deleteToken = crypto.randomBytes(16).toString("hex");

    const review = await Review.create({
      citySlug: city.slug,
      cityName: city.name,
      authorName: cleanName,
      comment: cleanComment,
      rating: ratingValue,
      photoUrl,
      photoPublicId,
      deleteToken,
    });

    res.status(201).json(review);
  } catch (err) {
    console.error(err);
    if (err.message && err.message.includes("jpg, jpeg, png")) {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: "Yorum kaydedilirken bir hata oluştu." });
  }
});

// GET /api/reviews/:citySlug?limit=50
// Bir şehrin yorumlarını en yeniden eskiye sıralı döner.
// deleteToken ve photoPublicId alanları bilerek DIŞLANIR - biri yalnızca
// sahiplik doğrulaması, diğeri sadece sunucu tarafı Cloudinary yönetimi içindir.
router.get("/:citySlug", async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 50, 100);
    const reviews = await Review.find({
      citySlug: req.params.citySlug.toLowerCase(),
    })
      .select("-deleteToken -photoPublicId")
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Yorumlar yüklenirken bir hata oluştu." });
  }
});

// DELETE /api/reviews/:id
// Body: { deleteToken }
// Sadece yorumu oluşturduğunda aldığı silme anahtarını gönderen kişi silebilir.
router.delete("/:id", async (req, res) => {
  try {
    const { deleteToken } = req.body;

    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: "Yorum bulunamadı." });
    }

    if (!deleteToken || review.deleteToken !== deleteToken) {
      return res.status(403).json({ message: "Bu yorumu silme yetkin yok." });
    }

    // Yorumla ilişkili fotoğraf varsa Cloudinary'den de sil
    if (review.photoPublicId) {
      try {
        await cloudinary.uploader.destroy(review.photoPublicId);
      } catch (cloudErr) {
        console.error("Cloudinary silme hatası:", cloudErr.message);
        // fotoğraf silinemese bile yorumu silmeye devam et
      }
    }

    await review.deleteOne();
    res.json({ message: "Yorum silindi." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Yorum silinirken bir hata oluştu." });
  }
});

module.exports = router;
