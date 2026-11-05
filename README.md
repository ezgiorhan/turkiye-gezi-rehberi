# 🧭 Türkiye Gezi Rehberi ve Quiz Uygulaması

Türkiye'nin 81 ilini kapsayan, interaktif harita destekli, zengin içerikli şehir rehberi ve mini quiz uygulaması.

Bu proje **MERN Stack** (MongoDB, Express, React, Node.js) mimarisiyle geliştirilmiş olup, dış servis bağımlılığı olmadan (Firebase vb. kullanılmadan) tamamen yerel ve bağımsız bir **JWT + bcrypt** kimlik doğrulama sistemine sahiptir.

---

## 📌 Projenin Amacı ve Özellikleri

- **🗺️ İnteraktif Türkiye Haritası:** 81 ilin tamamının gerçek sınırlarını içeren vektörel harita üzerinden şehir seçimi.
- **📍 Benim Haritam (Kişisel Gezi Takibi):** Kullanıcıların giriş yaparak Türkiye'de gezdikleri illeri harita üzerinde işaretleyebildiği (turuncu renk), 2. tıklamada kaldırabildiği, toplamda ülkenin yüzde kaçını keşfettiğini ve bölge istatistiklerini takip edebildiği kişiselleştirilmiş harita.
- **⚖️ Şehir Karşılaştırma:** İki farklı ili yan yana seçip gezilecek yerlerini ve yöresel yemeklerini kıyaslama.
- **⭐ Favorilerim:** Beğenilen şehirleri profilde kaydetme ve hızlı erişim.
- **🏛️ Zengin Şehir Rehberleri:**
  - **Gezilecek Yerler:** Her yer için Wikipedia REST API üzerinden dinamik ve otomatik görsel eşleştirme.
  - **Yöresel Lezzetler:** İllere özgü meşhur yemekler ve açıklamaları.
  - **İlginç Bilgiler:** Şehirlerin tarihi ve kültürel bilinmeyenleri.
  - **Canlı Hava Durumu:** Şehirlere ait anlık hava durumu bilgisi (Open-Meteo).
  - **En Yakın Şehir Önerisi:** Konum tabanlı akıllı rota önerisi.
- **🎯 Şehre Özel Mini Quiz:**
  - Çoktan seçmeli, açıklamalı mini testler.
  - Süre sayacı ve anlık doğru/yanlış geri bildirimi.
- **🏆 MongoDB Tabanlı Skor Tablosu (Leaderboard):**
  - Skor, tamamlama süresi ve tarihe göre sıralama.
- **🔐 Güvenli Kimlik Doğrulama (Yerel Auth):**
  - **Firebase KESİNLİKLE kullanılmamaktadır.**
  - Şifreler `bcryptjs` ile tuzlanarak (salt) hash'lenir.
  - Oturumlar güvenli JSON Web Token (JWT) ile yönetilir.
  - Giriş yapan kullanıcının adı quiz çözerken otomatik doldurulur.

---

## 📂 Proje Dizin Yapısı

```
turkiye-gezi-rehberi/
├── backend/
│   ├── middleware/
│   │   └── auth.js             # JWT token imzalama ve doğrulama middleware
│   ├── models/
│   │   ├── City.js             # Şehir şeması (yerler, yemekler, quiz)
│   │   ├── QuizResult.js       # Quiz sonuçları ve sıralama şeması
│   │   └── User.js             # Kullanıcı şeması (ad, e-posta, hash'li şifre)
│   ├── routes/
│   │   ├── auth.js             # /api/auth (register, login, me)
│   │   ├── cities.js           # /api/cities (şehir listesi ve detayları)
│   │   └── results.js          # /api/results (quiz sonuçları ve liderlik tablosu)
│   ├── seed/                   # 81 ilin tüm verilerini barındıran tohumlama scriptleri
│   │   ├── akdenizData.js
│   │   ├── doguAnadoluData.js
│   │   ├── egeData.js
│   │   ├── guneydoguAnadoluData.js
│   │   ├── icAnadoluData.js
│   │   ├── karadenizData.js
│   │   ├── marmaraData.js
│   │   ├── seed.js             # Veritabanına aktarım motoru
│   │   └── seedData.js
│   ├── .env                    # Ortam değişkenleri (Port, MongoDB URI, JWT Secret)
│   ├── .env.example
│   ├── package.json
│   └── server.js               # Express sunucu yapılandırması
│
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── AuthModal.jsx        # Giriş Yap & Kayıt Ol modal penceresi
│   │   │   ├── CityDetail.jsx       # Şehir detay sayfası
│   │   │   ├── Home.jsx             # Ana sayfa (harita ve il kartları)
│   │   │   ├── NearestCityBanner.jsx# En yakın il öneri bileşeni
│   │   │   ├── PlaceImage.jsx       # Wikipedia dinamik resim kartı
│   │   │   ├── QuickFacts.jsx       # Şehir hap bilgileri
│   │   │   ├── Quiz.jsx             # Mini quiz ve liderlik tablosu
│   │   │   ├── TurkeyMap.jsx        # SVG Türkiye haritası
│   │   │   ├── UserMenu.jsx         # Header profil menüsü ve çıkış butonu
│   │   │   └── WeatherWidget.jsx    # Canlı hava durumu bileşeni
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # React Auth Context (JWT oturum yönetimi)
│   │   ├── data/
│   │   │   ├── cityMeta.js          # Şehir meta bilgileri ve koordinatlar
│   │   │   └── placeImageOverrides.js
│   │   ├── utils/
│   │   │   ├── geo.js               # Mesafe hesaplama yardımcıları
│   │   │   └── wikiImage.js         # Wikipedia API görsel çekici
│   │   ├── api.js                   # Axios API istemcisi
│   │   ├── App.jsx                  # Ana yönlendirme (Router) ve yerleşim
│   │   ├── index.css                # Tailwind CSS ve özel tema stilleri
│   │   └── index.js
│   ├── tailwind.config.js
│   └── package.json
│
├── CHANGELOG.md                # Proje sürüm ve değişiklik günlüğü
├── README.md                   # Proje dokümantasyonu (bu dosya)
└── .gitignore
```

---

## 🚀 Kurulum ve Çalıştırma

### 1. Ön Hazırlık
- Bilgisayarınızda **Node.js** (v18+) ve **MongoDB** (yerel veya MongoDB Atlas) kurulu ve çalışır durumda olmalıdır.

### 2. Backend Kurulumu
1. Terminalde `backend` klasörüne gidin:
   ```bash
   cd backend
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. `.env` dosyasını kontrol edin (gerekirse MongoDB URI ve JWT Secret düzenleyin):
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/turkiye-gezi-rehberi
   CLIENT_ORIGIN=http://localhost:3000
   JWT_SECRET=gezi-rehberi-super-secret-key-degistir
   ```
4. Veritabanına 81 ili yüklemek için tohumlama scriptini çalıştırın:
   ```bash
   npm run seed
   ```
5. Sunucuyu başlatın:
   ```bash
   npm run dev
   ```
   *Sunucu `http://localhost:5000` adresinde çalışacaktır.*

### 3. Frontend Kurulumu
1. Yeni bir terminal açıp `frontend` klasörüne gidin:
   ```bash
   cd frontend
   ```
2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```
3. Uygulamayı başlatın:
   ```bash
   npm start
   ```
   *Uygulama otomatik olarak `http://localhost:3000` adresinde açılacaktır.*

---

## 📡 API Uç Noktaları (Endpoints)

### 🔐 Kimlik Doğrulama & Kullanıcı Verileri (`/api/auth`)
| Metot | Uç Nokta | Yetki | Açıklama |
|---|---|---|---|
| `POST` | `/api/auth/register` | Herkese Açık | Yeni kullanıcı kaydı (`name`, `email`, `password`) |
| `POST` | `/api/auth/login` | Herkese Açık | Giriş yapma ve JWT token alma |
| `GET` | `/api/auth/me` | Token Gerekli | Oturum bilgilerini, gezilen ve favori illeri döner |
| `POST` | `/api/auth/toggle-visited` | Token Gerekli | Bir ili gezildi olarak ekler / 2. tıklamada kaldırır |
| `PUT` | `/api/auth/visited-cities` | Token Gerekli | Gezilen iller listesini toplu günceller / sıfırlar |
| `POST` | `/api/auth/toggle-favorite` | Token Gerekli | Bir ili favorilere ekler / kaldırır |

### 🏙️ Şehirler (`/api/cities`)
| Metot | Uç Nokta | Yetki | Açıklama |
|---|---|---|---|
| `GET` | `/api/cities` | Herkese Açık | 81 ilin özet listesi (harita için) |
| `GET` | `/api/cities/:slug` | Herkese Açık | Seçilen ilin tüm detayları |
| `GET` | `/api/cities/:slug/quiz` | Herkese Açık | Seçilen ilin quiz soruları |

### 🏆 Quiz ve Sıralama (`/api/results`)
| Metot | Uç Nokta | Yetki | Açıklama |
|---|---|---|---|
| `POST` | `/api/results` | Herkese Açık | Quiz sonucunu kaydeder (skor, süre, oyuncu adı) |
| `GET` | `/api/results/:citySlug` | Herkese Açık | O ilin skor tablosu (liderlik sıralaması) |

---

## 🔒 Güvenlik Notları
- Şifreler veritabanına asla düz metin (plain-text) kaydedilmez. `bcryptjs` kullanılarak 10 salt turu ile hash'lenir.
- Giriş başarılı olduğunda 7 gün geçerli bir JWT (JSON Web Token) üretilir ve istemcide saklanır.
- Korumalı istekler HTTP `Authorization: Bearer <token>` başlığıyla doğrulanır.
- XSS ve enjeksiyonlara karşı veri temizliği (sanitization) mevcuttur.
