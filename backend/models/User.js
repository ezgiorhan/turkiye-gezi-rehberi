const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // Kullanıcının "Benim Haritam" üzerinde gezildi olarak işaretlediği iller (slug dizisi)
    visitedCities: {
      type: [String],
      default: [],
    },
    // Kullanıcının favorilere eklediği iller (slug dizisi)
    favoriteCities: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Kaydetmeden önce şifreyi hashle
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Şifre doğrulama metodu
UserSchema.methods.comparePassword = function (plain) {
  return bcrypt.compare(plain, this.password);
};

module.exports = mongoose.model("User", UserSchema);
