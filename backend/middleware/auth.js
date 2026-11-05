const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "gezi-rehberi-secret";
const JWT_EXPIRES = "7d";

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Giriş yapmanız gerekiyor." });
  }
  const token = authHeader.slice(7);
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Geçersiz veya süresi dolmuş token." });
  }
}

module.exports = { signToken, verifyToken };
