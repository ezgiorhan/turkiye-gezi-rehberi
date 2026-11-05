# 📝 Proje Değişiklik Günlüğü (Changelog)

Bu belgede, Türkiye Gezi Rehberi projesinde yapılan tüm mimari güncellemeler, yeni özellikler, hata düzeltmeleri ve veritabanı değişiklikleri kronolojik olarak kayıt altına alınır.

---

## [v1.4.0] - 2026-11-01

### 🎨 Stitch Yüksek Sadakatli Tasarım Sistemi & Frontend Yeniden Yapılandırma
Google Stitch üzerinde hazırlanan yüksek sadakatli (high-fidelity) tasarım kodları ve mimarisi birebir React (SPA) bileşenlerine dönüştürüldü:

- **Tasarım Sistemi & Stil Entegrasyonu:**
  - **Global Arka Plan:** `#F5F0EB` (Sıcak keten/kumtaşı).
  - **Primary Rengi:** `#0F766E` (Derin turkuaz).
  - **Kartlar & Yüzeyler:** `#FFFFFF` ve `#FAF7F2` katmanları.
  - **Çerçeveler:** `#E7DFD5`.
  - **Fontlar:** `Plus Jakarta Sans` ve `Material Symbols Outlined` ikon kütüphanesi entegre edildi.
  - `tailwind.config.js` ve `index.css` Stitch tasarım token'ları ile güncellendi.

- **Header & Navigasyon (`App.jsx`, `UserMenu.jsx`):**
  - Modern Stitch header: Logo, marka başlığı, `Harita`, `Karşılaştır`, `Benim Haritam` (canlı `{visitedCount}/81` rozetiyle) ve `⭐ Favorilerim` (canlı `{favCount}` rozetiyle).
  - Tema değiştirme ikonu ve dinamik kullanıcı durum menüsü (Avatar baş harfleri, Usta Kaşif seviyesi, çıkış butonu / giriş yap butonu).

- **Ana Sayfa (`Home.jsx`):**
  - **Sinematik Hero Alanı:** "81 İl, Binlerce Rota & Otantik Keşif" başlığı, cam efektli arama çubuğu ve 8 coğrafi bölge hap filtreleri (`Tümü`, `Marmara`, `Ege` vb.).
  - **Dinamik Gezgin Kartı:** Günün rotası (Kapadokya / Nevşehir), puanı, lezzeti ve hızlı rota yönlendirmesi.
  - **GPS Yakınlık Sensörü (`NearestCityBanner.jsx`):** Tarayıcı konumundan en yakın ili ve mesafeyi hesaplayıp öneren şık bildirim kartı.
  - **İnteraktif Vektör Harita:** 81 il sınırları, yakınlaştırma/uzaklaştırma araç çubuğu ve dinamik popover tooltip kartı.
  - **Öne Çıkan Şehir Rehberleri Izgarası:** 6+ zengin şehir kartı; görsel, bölge etiketi, canlı hava durumu hapı, favori kalp butonu, plaka kodu, gezi noktası sayısı, gezdim/gezildi durum butonu ve rehber bağlantısı.

- **Şehir Detayı (`CityDetail.jsx`):**
  - **Hero Bölümü:** Ekmek kırıntısı (Breadcrumb), bölge ve UNESCO miras etiketi, plaka kodu, "Gezdim Olarak İşaretle" ve "Favorilere Ekle" etkileşimli butonları.
  - **Çiftli Veri Güvertesi (Bento Grid):** 4 Hap Bilgi (Plaka, Nüfus, Rakım, Yüzölçümü) + Open-Meteo destekli Canlı Hava Durumu ve Açık Hava / Balon Uçuş Sensörü.
  - **Gezilecek En Önemli Noktalar:** Wikipedia görselleri ve Müzekart geçerlilik etiketli turistik nokta kartları bento ızgarası.
  - **Yöresel Lezzetler & İlginç Bilgiler:** Bölünmüş gastronomi kartları güvertesi ve "Biliyor Muydunuz?" kutusu ile coğrafi koordinat kartı.
  - **Mini Quiz CTA Paneli:** 3 aşamalı mini bilgi testine doğrudan yönlendiren degrade ödül kartı.

- **Benim Haritam (`MyMap.jsx` & `MyTurkeyMap.jsx`):**
  - **Kullanıcı Bilgi & Yetki Durum Çubuğu:** İsim, avatar, JWT Auth durumu, "İstatistikleri Paylaş 📤" ve "Haritayı Sıfırla 🗑️" butonları.
  - **İlerleme & Başarı Paneli:** Tamamlanma yüzdesi, degrade dolgulu ilerleme çubuğu, gezgin seviyesi kartı ve kazanılan rozetler vitrini.
  - **Bölgesel İstatistikler:** 7 coğrafi bölgenin ayrı ayrı tamamlanma yüzdeleri ve ilerleme çubukları.
  - **İnteraktif Gezgin Haritası:** Gezilen iller turuncu (`#C1440E`), gezilmeyenler turkuaz (`#0F766E`); 1. tıklamada gezildi olarak işaretleme, 2. tıklamada seçimi kaldırma.
  - **Gezilen İller Etiket Paneli:** Çarpı butonu ile hızlı kaldırma imkanı sağlayan etiket koleksiyonu.
  - **81 İl Seçim Kataloğu:** Canlı arama kutusu ve tek tıkla gezildi işaretlenebilen alfabetik çip ızgarası.

- **Şehir Karşılaştırma (`CompareCities.jsx`):**
  - İki ili yan yana seçerek nüfus, rakım, yüzölçümü, gezilecek yerler, yöresel lezzetler ve ilginç bilgileri kıyaslama arayüzü Stitch stiline uyarlandı.

- **Favorilerim (`Favorites.jsx`):**
  - Kaydedilen şehir kartları, favoriden çıkarma butonu ve hızlı rehber geçişleri Stitch renk paletiyle modernize edildi.

- **Şehir Bilgi Testi (`Quiz.jsx`):**
  - Şık isim giriş ekranı, soru kartları, anlık şık doğrulaması, sonuç ekranı ve MongoDB canlı liderlik tablosu Stitch tasarımına entegre edildi.

---

## [v1.3.0] - 2026-10-31

### 🗺️ "Benim Haritam" ve Kişisel Gezi Takibi
- **Navigasyon Menüsü Entegrasyonu:**
  - Header menüsüne "Karşılaştır" ve "⭐ Favorilerim" arasına **`🗺️ Benim Haritam`** seçeneği eklendi.
- **Oturum Kontrolü (Auth Guard):**
  - Kullanıcı giriş yapmamışsa, harita sayfasına girildiğinde bilgilendirici kilit kartı ve doğrudan oturum açma/kayıt olma butonu sunuldu.
- **İnteraktif Gezgin Haritası (`MyTurkeyMap.jsx`):**
  - Ana haritadakiyle aynı renk ve sınır yapısını kullanan interaktif harita oluşturuldu.
  - Bir il seçildiğinde rengi **turuncu (`#C1440E`)** olur.
  - Seçilmiş bir ile **2. defa tıklandığında seçim kaldırılır** ve il normal rengine (`#0E9AA7`) döner.
- **Gezgin İlerlemesi ve İstatistik Paneli:**
  - `X / 81 İl Gezildi` sayacı ve yüzdelik ilerleme çubuğu (`%XX.X`).
  - Dinamik gezgin rozetleri ("Yeni Gezgin", "Yol Meraklısı", "Usta Kaşif", "Kıdemli Seyyah", "Türkiye Fatihi").
  - 7 coğrafi bölgenin ayrı ayrı tamamlanma yüzdeleri.
  - Gezilen iller listesi (rozet etiketler) ve tek tıkla arama/filtreleme.
- **MongoDB Veri Kalıcılığı:**
  - `User` modeline `visitedCities: [String]` ve `favoriteCities: [String]` alanları eklendi.
  - `POST /api/auth/toggle-visited`, `PUT /api/auth/visited-cities` ve `POST /api/auth/toggle-favorite` uç noktaları geliştirildi.
  - Sayfa yenilense veya farklı cihazdan girilse dahi işaretlenen illerin kaybolmaması sağlandı.

### ⚖️ "Karşılaştır" ve ⭐ "Favorilerim" Sayfaları
- `/karsilastir` rotası: İki ili açılır menüden seçerek yemeklerini, gezilecek yerlerini ve bilgilerini yan yana kıyaslama sayfası eklendi.
- `/favorilerim` rotası: Kullanıcının favorilediği şehirleri görüntüleyebileceği sayfa ve `CityDetail` sayfasına "Favorilere Ekle" butonu entegre edildi.

---

## [v1.2.0] - 2026-10-31

### 🚀 Yeni Özellikler & İyileştirmeler
- **Yerel Kimlik Doğrulama Sistemi (JWT + Bcrypt):**
  - Üçüncü parti servis bağımlılıkları (Firebase vb.) tamamen kaldırıldı; üniversite ve ödev kriterlerine tam uyumlu, MongoDB tabanlı yerel kullanıcı kimlik doğrulama mimarisi kuruldu.
  - Şifreler `bcryptjs` kütüphanesi ile salt'lanarak veritabanında güvenle hash'lendi.
  - Oturum doğrulama için 7 gün geçerli JSON Web Token (`jsonwebtoken`) altyapısı sağlandı.
- **Frontend Kullanıcı Arayüzü Entegrasyonu:**
  - `AuthModal.jsx` bileşeni eklendi: Tek bir pencereden "Giriş Yap" ve "Kayıt Ol" sekmeleri arasında geçiş imkanı sağlandı.
  - `UserMenu.jsx` bileşeni eklendi: Header'da giriş yapmamış kullanıcıya "Giriş Yap" butonu; giriş yapmış kullanıcıya ise adının baş harfini içeren avatar, isim ve "Çıkış Yap" menüsü sunuldu.
  - `AuthContext.jsx` eklendi: Oturum durumu React genelinde yönetildi ve Axios HTTP istek başlıklarına (`Authorization: Bearer <token>`) otomatik entegre edildi.
  - `Quiz.jsx` entegrasyonu: Kullanıcı giriş yapmışsa ismi quiz ekranında otomatik olarak dolduruldu.

### 🧹 Temizlik ve Dizin Düzenlemesi
- Proje ana dizininde bulunan ve çakışmaya yol açan mükerrer iç klasör (`turkiye-gezi-rehberi/`) temizlendi.
- Eksik olan `NearestCityBanner.jsx`, `QuickFacts.jsx`, `WeatherWidget.jsx`, `cityMeta.js` ve `geo.js` dosyaları ana frontend dizinine taşındı.
- Firebase ile ilgili tüm paketler, konfigürasyon dosyaları ve ortam değişkenleri tamamen kaldırıldı.
- Express backend sunucusunun kök dizinine (`GET /`) kullanıcı dostu bilgilendirici karşılama sayfası eklendi.
- Frontend üretim derlemesi (`npm run build`) test edilerek tüm bileşenlerin hatasız derlendiği doğrulandı.

---

## [v1.1.0] - Önceki Sürüm

### 🗺️ Harita ve Şehir Kapsamı
- Türkiye'nin 81 ilinin tamamı için tohum verileri (`backend/seed/`) hazırlandı.
- `react-simple-maps` ile açık kaynak GeoJSON üzerinden vektörel sınır çizimi entegre edildi.
- Wikipedia REST API üzerinden şehir gezilecek yerlerine dinamik fotoğraf getirme mekanizması eklendi.
- Quiz sonuçları için MongoDB tabanlı liderlik tablosu (skor ve süreye göre sıralama) oluşturuldu.

---

## 📌 Gelecek Değişiklikler İçin Not
Bundan sonra projede yapılacak olan tüm rota, arayüz, stil veya veritabanı değişiklikleri bu dosyaya tarih ve sürüm bilgisiyle eklenecektir.
