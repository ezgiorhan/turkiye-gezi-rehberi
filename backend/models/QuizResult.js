const mongoose = require("mongoose");

const QuizResultSchema = new mongoose.Schema(
  {
    citySlug: { type: String, required: true, index: true },
    cityName: { type: String, required: true },
    playerName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 30,
    },
    score: { type: Number, required: true, min: 0 },
    total: { type: Number, required: true, min: 1 },
    percent: { type: Number, required: true, min: 0, max: 100 },
    // Quiz'i bitirme süresi (saniye) - eşit skorlarda sıralama için kullanılır
    timeTakenSeconds: { type: Number, default: null },
  },
  { timestamps: true }
);

// Bir şehrin sıralamasını hızlıca çekmek için: en yüksek skor, en kısa süre, en erken tarih
QuizResultSchema.index({ citySlug: 1, score: -1, timeTakenSeconds: 1, createdAt: 1 });

module.exports = mongoose.model("QuizResult", QuizResultSchema);
