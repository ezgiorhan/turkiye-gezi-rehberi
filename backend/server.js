require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const citiesRouter = require("./routes/cities");
const resultsRouter = require("./routes/results");
const reviewsRouter = require("./routes/reviews");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI =
  process.env.MONGO_URI || "mongodb://127.0.0.1:27017/turkiye-gezi-rehberi";

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:3000" }));
app.use(express.json());

app.use("/api/cities", citiesRouter);
app.use("/api/results", resultsRouter);
app.use("/api/reviews", reviewsRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
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
