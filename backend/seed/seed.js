require("dotenv").config();
const mongoose = require("mongoose");
const City = require("../models/City");

const baseData = require("./seedData");
const egeData = require("./egeData");
const marmaraData = require("./marmaraData");
const karadenizData = require("./karadenizData");
const akdenizData = require("./akdenizData");
const icAnadoluData = require("./icAnadoluData");
const doguAnadoluData = require("./doguAnadoluData");
const guneydoguAnadoluData = require("./guneydoguAnadoluData");

// Tüm bölge dosyalarını tek bir listede birleştir (Türkiye'nin 81 ili)
const allCities = [
  ...baseData,
  ...egeData,
  ...marmaraData,
  ...karadenizData,
  ...akdenizData,
  ...icAnadoluData,
  ...doguAnadoluData,
  ...guneydoguAnadoluData,
];

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/turkiye-gezi-rehberi";

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB bağlantısı başarılı, seed işlemi başlıyor...");

    await City.deleteMany({});
    console.log("Mevcut şehir verileri temizlendi.");

    const inserted = await City.insertMany(allCities);
    console.log(`${inserted.length} şehir başarıyla eklendi:`);
    inserted.forEach((c) => console.log(` - ${c.name} (${c.slug}) [${c.region}]`));

    process.exit(0);
  } catch (err) {
    console.error("Seed işlemi sırasında hata oluştu:", err);
    process.exit(1);
  }
}

seed();
