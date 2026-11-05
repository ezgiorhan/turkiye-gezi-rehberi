const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { signToken, verifyToken } = require("../middleware/auth");

// --- POST /api/auth/register ---
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "İsim, e-posta ve şifre zorunludur." });
    }
    if (name.trim().length > 30) {
      return res.status(400).json({ message: "İsim en fazla 30 karakter olabilir." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Şifre en az 6 karakter olmalıdır." });
    }

    const exists = await User.findOne({ email: email.toLowerCase().trim() });
    if (exists) {
      return res.status(409).json({ message: "Bu e-posta adresi zaten kayıtlı." });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password,
      visitedCities: [],
      favoriteCities: [],
    });

    const token = signToken({ id: user._id, name: user.name, email: user.email });
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        visitedCities: user.visitedCities,
        favoriteCities: user.favoriteCities,
      },
    });
  } catch (err) {
    console.error("Kayıt hatası:", err.message);
    res.status(500).json({ message: "Kayıt sırasında bir hata oluştu." });
  }
});

// --- POST /api/auth/login ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "E-posta ve şifre zorunludur." });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({ message: "E-posta veya şifre hatalı." });
    }

    const match = await user.comparePassword(password);
    if (!match) {
      return res.status(401).json({ message: "E-posta veya şifre hatalı." });
    }

    const token = signToken({ id: user._id, name: user.name, email: user.email });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        visitedCities: user.visitedCities || [],
        favoriteCities: user.favoriteCities || [],
      },
    });
  } catch (err) {
    console.error("Giriş hatası:", err.message);
    res.status(500).json({ message: "Giriş sırasında bir hata oluştu." });
  }
});

// --- GET /api/auth/me  (korumalı) ---
router.get("/me", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    res.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        visitedCities: user.visitedCities || [],
        favoriteCities: user.favoriteCities || [],
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Sunucu hatası." });
  }
});

// --- POST /api/auth/toggle-visited (korumalı) ---
// İki kez tıklandığında seçimi kaldırır, yoksa ekler
router.post("/toggle-visited", verifyToken, async (req, res) => {
  try {
    const { citySlug } = req.body;
    if (!citySlug) {
      return res.status(400).json({ message: "Şehir slug'ı gereklidir." });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    const slug = citySlug.toLowerCase().trim();
    const index = user.visitedCities.indexOf(slug);

    if (index > -1) {
      // Zaten gezilmişse kaldır (2. tıklama)
      user.visitedCities.splice(index, 1);
    } else {
      // Gezilmemişse ekle
      user.visitedCities.push(slug);
    }

    await user.save();
    res.json({ visitedCities: user.visitedCities });
  } catch (err) {
    console.error("Gezilen il güncelleme hatası:", err);
    res.status(500).json({ message: "Gezilen il güncellenemedi." });
  }
});

// --- PUT /api/auth/visited-cities (korumalı: toplu güncelleme / sıfırlama) ---
router.put("/visited-cities", verifyToken, async (req, res) => {
  try {
    const { visitedCities } = req.body;
    if (!Array.isArray(visitedCities)) {
      return res.status(400).json({ message: "Geçersiz veri formatı." });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    user.visitedCities = visitedCities.map((s) => String(s).toLowerCase().trim());
    await user.save();

    res.json({ visitedCities: user.visitedCities });
  } catch (err) {
    res.status(500).json({ message: "Gezilen iller güncellenemedi." });
  }
});

// --- POST /api/auth/toggle-favorite (korumalı) ---
router.post("/toggle-favorite", verifyToken, async (req, res) => {
  try {
    const { citySlug } = req.body;
    if (!citySlug) {
      return res.status(400).json({ message: "Şehir slug'ı gereklidir." });
    }

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    const slug = citySlug.toLowerCase().trim();
    const index = user.favoriteCities.indexOf(slug);

    if (index > -1) {
      user.favoriteCities.splice(index, 1);
    } else {
      user.favoriteCities.push(slug);
    }

    await user.save();
    res.json({ favoriteCities: user.favoriteCities });
  } catch (err) {
    res.status(500).json({ message: "Favori il güncellenemedi." });
  }
});

module.exports = router;
