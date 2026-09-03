const mongoose = require("mongoose");

// Gezilecek yer alt-şeması
const PlaceSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

// Yöresel yemek alt-şeması
const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

// Quiz sorusu alt-şeması
const QuizQuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    options: {
      type: [String],
      required: true,
      validate: (arr) => arr.length >= 2 && arr.length <= 6,
    },
    correctIndex: { type: Number, required: true },
    explanation: { type: String, default: "" },
  },
  { _id: false }
);

const CitySchema = new mongoose.Schema(
  {
    slug: { type: String, required: true, unique: true, index: true }, // ör: "istanbul"
    name: { type: String, required: true }, // ör: "İstanbul"
    region: { type: String, required: true }, // ör: "Marmara"
    shortDescription: { type: String, required: true },
    heroImage: { type: String, default: "" },
    // Not: Harita artık gerçek il sınırlarını (react-simple-maps) kullanıyor ve
    // şehri "slug" alanına göre eşleştiriyor; mapPosition yalnızca ileride nokta
    // tabanlı bir görünüm eklenmek istenirse kullanılabilecek opsiyonel bir alandır.
    mapPosition: {
      x: { type: Number },
      y: { type: Number },
    },
    places: { type: [PlaceSchema], default: [] },
    foods: { type: [FoodSchema], default: [] },
    funFacts: { type: [String], default: [] },
    quiz: { type: [QuizQuestionSchema], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", CitySchema);
