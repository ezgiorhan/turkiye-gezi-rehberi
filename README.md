# Türkiye Gezi Rehberi ve Quiz

React + Node.js/Express + MongoDB ile geliştirilmiş, şehir gezi rehberi ve mini quiz uygulaması.

## Dosya Yapısı

```
turkiye-gezi-rehberi/
├── backend/
│   ├── models/City.js          # Mongoose şeması (yerler, yemekler, bilgiler, quiz)
│   ├── routes/cities.js        # /api/cities uç noktaları
│   ├── seed/seedData.js        # İstanbul, İzmir, Ankara örnek verisi
│   ├── seed/egeData.js         # Ege bölgesi (Aydın, Denizli, Manisa, Muğla, Uşak, Kütahya, Afyonkarahisar)
│   ├── seed/marmaraData.js     # Marmara bölgesi (Balıkesir, Bilecik, Bursa, Çanakkale, Edirne, Kırklareli, Kocaeli, Sakarya, Tekirdağ, Yalova)
│   ├── seed/karadenizData.js   # Karadeniz bölgesi (18 il, Bolu dahil)
│   ├── seed/akdenizData.js     # Akdeniz bölgesi (Antalya, Isparta, Burdur, Mersin, Adana, Hatay, Kahramanmaraş, Osmaniye)
│   ├── seed/icAnadoluData.js   # İç Anadolu bölgesi (Çankırı, Konya, Kayseri, Sivas, Yozgat, Kırşehir, Nevşehir, Niğde, Aksaray, Karaman, Eskişehir, Kırıkkale)
│   ├── seed/doguAnadoluData.js         # Doğu Anadolu bölgesi (14 il)
│   ├── seed/guneydoguAnadoluData.js    # Güneydoğu Anadolu bölgesi (9 il)
│   ├── seed/seed.js            # Tüm bölge dosyalarını birleştirip veritabanını dolduran script
│   ├── server.js               # Express uygulaması
│   ├── .env.example
│   └── package.json
└── frontend/
    ├── public/index.html
    ├── src/
    │   ├── api.js               # Axios istekleri
    │   ├── App.jsx               # Router
    │   ├── index.js / index.css
    │   └── components/
    │       ├── Home.jsx          # Harita + şehir listesi
    │       ├── TurkeyMap.jsx     # İnteraktif SVG harita
    │       ├── CityDetail.jsx    # Gezilecek yerler / yemekler / bilgiler
    │       └── Quiz.jsx          # Mini quiz (anlık geri bildirim + skor)
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

## Kurulum — Adım Adım

### 1. MongoDB'yi hazırla
Yerel bir MongoDB çalıştır (ör. `mongod`) ya da MongoDB Atlas'ta ücretsiz bir küme oluştur ve bağlantı adresini al.

### 2. Backend'i kur

```bash
cd backend
npm install
cp .env.example .env
# .env dosyasındaki MONGO_URI'yi kendi bağlantı adresinle güncelle
npm run seed     # İstanbul, İzmir, Ankara verisini veritabanına yükler
npm run dev       # http://localhost:5000 üzerinde çalışır
```

### 3. Frontend'i kur

Yeni bir terminalde:

```bash
cd frontend
npm install
npm start          # http://localhost:3000 üzerinde açılır
```

Varsayılan olarak frontend, backend'e `http://localhost:5000/api` adresinden bağlanır.
Farklı bir adres kullanmak istersen `frontend/.env` dosyası oluşturup
`REACT_APP_API_URL=http://senin-adresin/api` satırını ekleyebilirsin.

### 4. Uygulamayı kullan

1. Ana sayfada haritadan turuncu lale işaretli bir şehre tıkla (İstanbul, İzmir veya Ankara).
2. Gezilecek yerleri, yöresel lezzetleri ve ilginç bilgileri incele.
3. Sayfanın altındaki "Mini Quiz'e Başla" butonuna tıkla.
4. Soruları cevapla, anlık doğru/yanlış geri bildirimini gör, sonunda skorunu öğren.

## Harita Hakkında

Harita artık gerçek il sınırlarını kullanıyor: `react-simple-maps`, [alpers/Turkey-Maps-GeoJSON](https://github.com/alpers/Turkey-Maps-GeoJSON)
deposundaki açık kaynak `tr-cities.json` dosyasını (Türkiye'nin 81 ilinin gerçek
sınırları) çalışma zamanında çekip çiziyor. Bu yüzden **frontend'in çalıştığı
tarayıcının internete erişimi olmalı** (geojson dosyası her sayfa yüklemesinde
GitHub'dan indirilir).

Veritabanında verisi olan iller turkuaz renkte ve tıklanabilir, henüz veri
girilmemiş iller ise koyu lacivert (pasif) görünür.

## Yeni Şehir Eklemek

🎉 **Türkiye'nin 81 ilinin tamamı tamamlandı!** Haritadaki her il artık turkuaz
renkte, tıklanabilir ve dolu: Marmara (11), Ege (8), Karadeniz (18), Akdeniz (8),
İç Anadolu (13), Doğu Anadolu (14), Güneydoğu Anadolu (9).

Yine de bir ilin içeriğini genişletmek (daha fazla gezilecek yer, yemek, quiz
sorusu eklemek) istersen ilgili bölge dosyasını (`backend/seed/*.js`) bulup
şehrin objesini düzenlemen, ardından `npm run seed` komutunu tekrar çalıştırman
yeterli.

> Not: Önceki bir sürümde Çankırı yanlışlıkla Karadeniz'e eklenmişti — düzeltilip
> İç Anadolu'ya taşındı, Karadeniz'e ise eksik olan Bolu eklendi.

1. İlgili bölge için yeni bir dosya oluştur, ör. `backend/seed/akdenizData.js`
   (veya mevcut bir dosyaya ekle) — `egeData.js` / `marmaraData.js` ile aynı formatta
   bir dizi döndürmesi yeterli (slug, name, region, places, foods, funFacts, quiz).
2. `backend/seed/seed.js` dosyasının en üstüne yeni dosyayı `require` et ve
   `allCities` dizisine ekle:
   ```js
   const akdenizData = require("./akdenizData");
   const allCities = [...baseData, ...egeData, ...marmaraData, ...akdenizData];
   ```
3. `slug` alanının, ilin GeoJSON'daki adıyla eşleşecek şekilde yazıldığından emin ol
   (Türkçe karakterler otomatik sadeleştirilip karşılaştırıldığı için `"sanliurfa"`,
   `"kirikkale"` gibi standart il isimleri sorunsuz eşleşir).
4. `npm run seed` komutunu tekrar çalıştır (mevcut tüm şehirleri siler, hepsini yeniden yazar).
5. Şehir otomatik olarak haritada turkuaz renkte, tıklanabilir bir il olarak görünecek —
   manuel koordinat girmene gerek yok.

## Gezilecek Yerlerde Görsel

Şehir detay sayfasındaki "Gezilecek Yerler" kartlarının artık her birinde gerçek bir
fotoğraf var. Görseller elle eklenmiyor — `frontend/src/utils/wikiImage.js`, yer adını
Wikipedia'nın herkese açık REST API'sine (`/api/rest_v1/page/summary/...`) sorup ilgili
sayfanın küçük önizleme görselini (thumbnail) çeker. Önce Türkçe Wikipedia'da arar,
bulamazsa İngilizce Wikipedia'ya bakar; hiçbirinde bulamazsa kırık resim yerine zarif
bir degrade + ikon gösterir. Bu sayede yeni bir şehir/yer eklediğinde görsel için ekstra
bir şey yapmana gerek kalmıyor — sistem otomatik çalışır. API key gerekmez, istek sayısı
sınırlı olduğundan aynı yer için sonuç tarayıcı oturumu boyunca önbelleğe alınır.

## API Uç Noktaları

| Metod | Yol                        | Açıklama                                   |
|-------|-----------------------------|---------------------------------------------|
| GET   | `/api/cities`               | Tüm şehirlerin özet listesi (harita için)   |
| GET   | `/api/cities/:slug`         | Bir şehrin tüm detayları                    |
| GET   | `/api/cities/:slug/quiz`    | Sadece o şehrin quiz soruları                |
| POST  | `/api/results`               | Quiz sonucunu kaydeder (isim, skor, süre)   |
| GET   | `/api/results/:citySlug`     | O şehrin herkese açık skor sıralaması       |
| GET   | `/api/health`                | Sunucu durum kontrolü                       |

## Quiz Sıralaması Nasıl Çalışır?

1. Kullanıcı quiz'e başlamadan önce bir isim girer (isim `localStorage`'da saklanır,
   bir sonraki ziyarette otomatik doldurulur).
2. Quiz bitince skor, doğru sayısı ve geçen süre `POST /api/results` ile MongoDB'ye
   (`QuizResult` koleksiyonu) kaydedilir.
3. Sonuç ekranında, aynı şehirde daha önce quiz çözen herkesin skoru
   `GET /api/results/:citySlug` ile çekilir ve skor → süre → kayıt zamanı
   sırasına göre sıralanmış halde herkese açık bir tabloda gösterilir.
4. Kullanıcının kendi sonucu az önce gönderildiği için tabloda vurgulanır.
