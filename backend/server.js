require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const citiesRouter = require("./routes/cities");
const resultsRouter = require("./routes/results");
const authRouter = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/turkiye-gezi-rehberi";

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.use("/api/cities", citiesRouter);
app.use("/api/results", resultsRouter);
app.use("/api/auth", authRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.send(`
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 60px auto; padding: 24px; border: 1px solid #ddd; border-radius: 12px; background: #fafafa;">
      <h2 style="color: #163A5F; margin-top: 0;">🧭 Türkiye Gezi Rehberi - Backend API</h2>
      <p style="color: #444; line-height: 1.6;">Backend sunucusu başarıyla çalışıyor!</p>
      <div style="background: #e8f4fd; border-left: 4px solid #163A5F; padding: 12px 16px; border-radius: 4px; margin: 20px 0;">
        <strong>Kullanıcı Arayüzü:</strong> Uygulamayı kullanmak için lütfen <a href="http://localhost:3000" style="color: #163A5F; font-weight: bold;">http://localhost:3000</a> adresini tarayıcında aç.
      </div>
      <p style="font-size: 13px; color: #777;">Aktif API uç noktaları: <code>/api/cities</code>, <code>/api/results</code>, <code>/api/auth</code>, <code>/api/health</code></p>
    </div>
  `);
});

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB bağlantısı başarılı.");
    app.listen(PORT, () => {
      console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor.`);
    });
  })
  .catch((err) => {
    console.error("MongoDB bağlantı hatası:", err.message);
    process.exit(1);
  });
