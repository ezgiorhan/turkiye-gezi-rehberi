const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    citySlug: { type: String, required: true, index: true },
    cityName: { type: String, required: true },
    authorName: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 30,
    },
    comment: {
      type: String,
      required: true,
      trim: true,
      minlength: 1,
      maxlength: 500,
    },
    rating: { type: Number, min: 1, max: 5, default: null },
    // Fotoğraf Cloudinary'de (bulut depolama) saklanır; photoUrl doğrudan
    // Cloudinary'nin verdiği tam ve kalıcı URL'dir. photoPublicId, yorum
    // silindiğinde Cloudinary'deki dosyayı da silebilmek için tutulur.
    photoUrl: { type: String, default: null },
    photoPublicId: { type: String, default: null },
    // Giriş sistemi olmadığı için, yorumu kimin sildirebileceğini anlamak amacıyla
    // rastgele bir "silme anahtarı" üretilir. Bu anahtar SADECE yorum oluşturulduğu
    // anda tek seferlik yanıt olarak istemciye döner ve tarayıcıda saklanır; normal
    // listeleme (GET) isteklerinde asla dönmez (bkz. routes/reviews.js).
    deleteToken: { type: String, required: true },
  },
  { timestamps: true }
);

// Bir şehrin yorumlarını en yeniden eskiye hızlıca çekmek için
ReviewSchema.index({ citySlug: 1, createdAt: -1 });

module.exports = mongoose.model("Review", ReviewSchema);
