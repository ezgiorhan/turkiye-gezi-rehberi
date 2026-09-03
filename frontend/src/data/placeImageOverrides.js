// Bazı yerler için Wikipedia araması yanlış veya uygun olmayan bir görsel
// bulabiliyor (ör. yer haritası, ilgisiz bir sayfa vb.). Böyle durumlarda
// buraya "Şehir Adı:Yer Adı" formatında bir anahtar ve doğru gördüğün bir
// görsel URL'si ekle — sistem önce burayı kontrol eder, varsa Wikipedia
// aramasını hiç yapmaz.
//
// Şehir Adı ve Yer Adı, ilgili seed dosyasındaki (backend/seed/*.js) "name"
// alanlarıyla BİREBİR AYNI yazılmalı (Türkçe karakterler dahil).
//
// Örnek kullanım:
// "Uşak:Ulubey Kanyonları": "https://upload.wikimedia.org/wikipedia/commons/x/xx/Ulubey_Canyon.jpg",

const placeImageOverrides = {
  "Uşak:Ulubey Kanyonları": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/UlubeyKanyonu.jpg/960px-UlubeyKanyonu.jpg?utm_source=tr.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  "Uşak:Taşyaran Vadisi Doğal Parkı": "https://upload.wikimedia.org/wikipedia/commons/4/42/U%C5%9Fak_Ta%C5%9Fyaran_Valley_04.jpg?utm_source=tr.wikipedia.org&utm_campaign=index&utm_content=original", 
  "Amasya:Yalıboyu Evleri" : "https://upload.wikimedia.org/wikipedia/commons/e/e1/Amasya_evleri_ve_Ye%C5%9Fil%C4%B1rmak.jpg?utm_source=tr.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
  "Ankara:Anadolu Medeniyetleri Müzesi": "https://upload.wikimedia.org/wikipedia/commons/f/ff/Musem_Of_Anatolian_Civilisations_Ankara.JPG?utm_source=tr.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
  "Bartın:İnkumu Plajı": "https://upload.wikimedia.org/wikipedia/commons/8/8a/KUM_ZAMBAKLARI_%282%29.jpg?utm_source=tr.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
  "Bursa:Ulu Cami": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/71_Bursa_la_Grande_Moschea_%28Edited%29.jpg/960px-71_Bursa_la_Grande_Moschea_%28Edited%29.jpg?utm_source=tr.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  "Bursa:Uludağ Milli Parkı": "https://upload.wikimedia.org/wikipedia/commons/3/30/Uluda%C4%9F_Kayak_Merkezi-_Uludag_Ski_Center.jpg?utm_source=tr.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
  "Denizli:Pamukkale (Hierapolis Antik Kenti)": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Pamukkale_30.jpg/960px-Pamukkale_30.jpg?utm_source=tr.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
  "Diyarbakır:Ulu Cami": "https://upload.wikimedia.org/wikipedia/commons/d/d0/Great_Mosque%2C_Diyarbakir.jpg?utm_source=tr.wikipedia.org&utm_campaign=imageinfo&utm_content=original",
  "Bolu:Kartalkaya Kayak Merkezi": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Kartalkaya.jpg/960px-Kartalkaya.jpg?utm_source=en.wikipedia.org&utm_campaign=imageinfo&utm_content=thumbnail",

};


export default placeImageOverrides;
