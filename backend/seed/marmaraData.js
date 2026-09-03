// MARMARA BÖLGESİ - ek şehirler (İstanbul zaten seedData.js içinde tanımlı)
module.exports = [
  {
    slug: "balikesir",
    name: "Balıkesir",
    region: "Marmara",
    shortDescription:
      "Zeytinyağı üretimi, Kazdağları'nın doğası ve Cunda Adası'nın tarihi dokusuyla bilinen Marmara ili.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Cunda (Alibey) Adası",
        description: "Rum mimarisinden izler taşıyan taş evleri ve balık restoranlarıyla bilinen şirin ada.",
      },
      {
        name: "Kazdağları Milli Parkı",
        description: "Zengin bitki örtüsü ve endemik türleriyle bilinen, mitolojide de adı geçen dağlık koruma alanı.",
      },
      {
        name: "Sarımsaklı Plajı",
        description: "Ayvalık'ın ince kumlu, uzun sahil şeridiyle yaz aylarında yoğun ilgi gören plajı.",
      },
      {
        name: "Ayvalık Tarihi Çarşısı",
        description: "Dar sokakları ve zeytinyağı sabunu dükkânlarıyla bilinen, tarihi dokusu korunmuş çarşı.",
      },
    ],
    foods: [
      {
        name: "Ayvalık Tostu",
        description: "Sucuk, sosis, kaşar gibi malzemelerle hazırlanan, özel ekmeği ile bilinen meşhur tost çeşidi.",
      },
      {
        name: "Balıkesir Zeytinyağı",
        description: "Bölgenin bereketli zeytinliklerinden elde edilen, soğuk sıkım yöntemiyle üretilen kaliteli yağ.",
      },
      {
        name: "Yağlı Yaprak Sarma",
        description: "Asma yaprağının et ve pirinçle doldurulup zeytinyağıyla pişirildiği geleneksel yemek.",
      },
    ],
    funFacts: [
      "Kazdağları, mitolojide tanrıların Truva Savaşı'nı izlediği dağ olarak anlatılır.",
      "Ayvalık, zeytinyağı üretimi ve tarihi Rum mimarisiyle Türkiye'nin önemli kültür turizmi merkezlerinden biridir.",
      "Balıkesir, Türkiye'nin en fazla zeytin ağacına sahip illerinden biridir.",
    ],
    quiz: [
      {
        question: "Kazdağları mitolojide hangi olayla anılır?",
        options: [
          "Truva Savaşı'nın izlendiği dağ",
          "Zeus'un doğduğu yer",
          "Herkül'ün mücadelesi",
          "Athena'nın tapınağı",
        ],
        correctIndex: 0,
        explanation: "Mitolojiye göre tanrılar Truva Savaşı'nı Kazdağları'ndan izlemiştir.",
      },
      {
        question: "Cunda Adası hangi ilçeye bağlıdır?",
        options: ["Bandırma", "Ayvalık", "Edremit", "Burhaniye"],
        correctIndex: 1,
        explanation: "Cunda (Alibey) Adası, Balıkesir'in Ayvalık ilçesine bağlıdır.",
      },
      {
        question: "Balıkesir hangi tarım ürünüyle özellikle öne çıkar?",
        options: ["Çay", "Zeytin", "Muz", "Pamuk"],
        correctIndex: 1,
        explanation: "Balıkesir, Türkiye'nin önemli zeytin ve zeytinyağı üreticilerinden biridir.",
      },
      {
        question: "Ayvalık tostunun ayırt edici özelliği nedir?",
        options: ["Tatlı olması", "Özel ekmeği ve iç malzemesi", "Soğuk servis edilmesi", "Vejeteryan olması"],
        correctIndex: 1,
        explanation: "Ayvalık tostu, kendine özgü ekmeği ve dolgu malzemeleriyle tanınır.",
      },
      {
        question: "Sarımsaklı Plajı hangi ilçenin sahilindedir?",
        options: ["Erdek", "Ayvalık", "Gönen", "Burhaniye"],
        correctIndex: 1,
        explanation: "Sarımsaklı, Ayvalık'ın ince kumlu ve uzun sahil şeridine sahip plajıdır.",
      },
    ],
  },
  {
    slug: "bilecik",
    name: "Bilecik",
    region: "Marmara",
    shortDescription:
      "Osmanlı Devleti'nin doğduğu topraklar olarak bilinen, Söğüt ve ipekböcekçiliği geleneğiyle tanınan sakin bir Marmara ili.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Şeyh Edebali Türbesi",
        description: "Osmanlı Devleti'nin kuruluş fikrinin temellerini atan, Osman Gazi'nin kayınpederi ve hocası Şeyh Edebali'nin türbesinin yer aldığı, şehre hakim manzaralı manevi merkez.",
      },
      {
        name: "Söğüt Millet Bahçesi ve Tarihi Merkezi",
        description: "Osmanlı'nın kuruluşuna dair sergiler ve etkinliklerin düzenlendiği tarihi ilçe merkezi.",
      },
    ],
    foods: [
      {
        name: "Nohutlu Mantı",
        description: "Bilecik usulü hazırlanan hamur mantılarının içerisine haşlanmış nohut eklenerek servis edildiği, kendine has aroması olan geleneksel hamur işi.",
      },
      {
        name: "Dağ Eriği Ekşisi (Erik Marmelati)",
        description: "Yörede yetişen yabani eriklerin kaynatılarak yoğunlaştırılmasıyla elde edilen, yemeklere ve çorbalara ekşimsi bir lezzet veren geleneksel sos.",
      },
    ],
    funFacts: [
      "Osmanlı Devleti'nin çekirdeği, Bilecik'in Söğüt ilçesinde atılmıştır.",
      "Bilecik, uzun yıllar ipekböcekçiliği ile anılan bir üretim merkeziydi.",
      "Şehir, Marmara ile İç Anadolu arasında geçiş bölgesinde, tarihi İpek Yolu güzergâhı üzerinde yer alır.",
    ],
    quiz: [
      {
        question: "Osmanlı Devleti'nin kurulduğu yer olarak bilinen ilçe hangisidir?",
        options: ["Söğüt", "Bozüyük", "Pamukova", "Osmaneli"],
        correctIndex: 0,
        explanation: "Söğüt, Osmanlı Devleti'nin kurulduğu yer olarak kabul edilir.",
      },
      {
        question: "Ertuğrul Gazi kiminle akrabadır?",
        options: ["Osman Gazi'nin babası", "Orhan Gazi'nin oğlu", "Fatih Sultan Mehmet'in dedesi", "II. Murad'ın kardeşi"],
        correctIndex: 0,
        explanation: "Ertuğrul Gazi, Osmanlı Devleti'nin kurucusu Osman Gazi'nin babasıdır.",
      },
      {
        question: "Bilecik geçmişte hangi geleneksel üretimle bilinirdi?",
        options: ["Halıcılık", "İpekböcekçiliği", "Bakırcılık", "Çinicilik"],
        correctIndex: 1,
        explanation: "Bilecik, uzun süre ipekböcekçiliği ile tanınan bir bölgeydi.",
      },
      {
        question: "Bilecik hangi coğrafi bölgede yer alır?",
        options: ["Marmara", "Ege", "Akdeniz", "İç Anadolu"],
        correctIndex: 0,
        explanation: "Bilecik, Marmara Bölgesi'nin Güney Marmara bölümünde yer alır.",
      },
      {
        question: "Bilecik peyniri nasıl bir lezzete sahiptir?",
        options: ["Aşırı tatlı", "Hafif ekşimsi", "Acı", "Tuzsuz"],
        correctIndex: 1,
        explanation: "Bilecik peyniri, hafif ekşimsi lezzetiyle bilinen yöresel bir peynirdir.",
      },
    ],
  },
  {
    slug: "bursa",
    name: "Bursa",
    region: "Marmara",
    shortDescription:
      "Osmanlı'nın ilk başkenti, yeşil dokusu, termal kaplıcaları ve İskender Kebap'ın memleketi olan tarihi şehir.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Ulu Cami",
        description: "20 kubbesi ve içindeki büyük şadırvanıyla bilinen, Osmanlı erken dönem mimarisinin başyapıtlarından.",
      },
      {
        name: "Cumalıkızık Köyü",
        description: "Osmanlı dönemi ahşap evleriyle korunmuş, UNESCO Dünya Mirası Listesi'nde yer alan tarihi köy.",
      },
      {
        name: "Uludağ Milli Parkı",
        description: "Kış aylarında kayak, yaz aylarında yayla turizmiyle bilinen, teleferikle ulaşılan doğa harikası.",
      },
      {
        name: "Yeşil Türbe ve Yeşil Cami",
        description: "Çinileriyle ünlü, Osmanlı mimarisinin en zarif örneklerinden sayılan tarihi yapı topluluğu.",
      },
       {
        name: "Tophane Saat Kulesi",
        description: "Şehre hakim bir tepede yer alan tarihi saat kulesi ve Osmanlı İmparatorluğu'nun kurucularının ebedi istirahatgâhlarının bulunduğu manevi alan.",
      },
       {
        name: "Koza Han",
        description: "İpek ticaretinin kalbinin attığı, avlusundaki çınar ağaçları ve iki katlı tarihi yapısıyla ipek şallar alıp kahve içmek için en popüler tarihi han.",
      },
    ],
    foods: [
      {
        name: "İskender Kebap",
        description: "İnce dilimlenmiş döner etinin, tereyağı ve domates sosuyla pide üzerinde servis edildiği ünlü kebap.",
      },
      {
        name: "Bursa Kestane Şekeri",
        description: "Kestanenin şerbetlenerek hazırlandığı, Bursa'ya özgü zarif bir tatlı.",
      },
      {
        name: "Cantık",
        description: "Mayalı hamurun üzerine kıymalı (veya kaşarlı/peynirli) harç konularak taş fırınlarda odun ateşinde pişirilen geleneksel Bursa pidesi.",
      },
      {
        name: "Tahinli Pide",
        description: "İnce açılmış hamurun üzerine sürülen bol tahin ve şeker karışımıyla fırınlanan, özellikle kahvaltılarda ve çay saatlerinde tüketilen nefis hamur işi.",
      },
      {
        name: "Pideli Köfte",
        description: "Bursa mutfağının İskender Kebabı'nı tahtından sallayabilecek kadar iddialı, tescilli ve en lezzetli yöresel simgesidir.",
      },
    ],
    funFacts: [
      "Bursa, Osmanlı Devleti'nin İstanbul'un fethinden önceki ilk başkentiydi.",
      "İskender Kebap, adını 19. yüzyılda bu yemeği icat eden İskender Efendi'den alır.",
      "Cumalıkızık, Osmanlı dönemi kırsal mimarisini günümüze taşıyan nadir köylerden biridir.",
    ],
    quiz: [
      {
        question: "Bursa, Osmanlı Devleti için ne ifade eder?",
        options: ["İlk başkent", "Son başkent", "Hiçbir zaman başkent olmadı", "Yalnızca askeri üs"],
        correctIndex: 0,
        explanation: "Bursa, Osmanlı Devleti'nin İstanbul'dan önceki ilk başkentiydi.",
      },
      {
        question: "İskender Kebap adını kimden alır?",
        options: ["Bir padişahtan", "İskender Efendi'den", "Bir şairden", "Bir komutandan"],
        correctIndex: 1,
        explanation: "Yemek, 19. yüzyılda bu tarifi geliştiren İskender Efendi'nin adını taşır.",
      },
      {
        question: "Cumalıkızık Köyü hangi statüyle korunmaktadır?",
        options: ["Hiçbir statüsü yok", "UNESCO Dünya Mirası", "Yalnızca yerel koruma", "Askeri bölge"],
        correctIndex: 1,
        explanation: "Cumalıkızık, UNESCO Dünya Mirası Listesi'nde yer alan tarihi bir köydür.",
      },
      {
        question: "Uludağ hangi mevsimde özellikle popülerdir?",
        options: ["Sadece yazın", "Sadece güzün", "Kışın (kayak) ve yazın (yayla)", "Hiçbir mevsimde"],
        correctIndex: 2,
        explanation: "Uludağ, kışın kayak, yazın ise yayla turizmiyle yıl boyunca ziyaretçi çeker.",
      },
      {
        question: "Bursa hangi tatlısıyla ünlüdür?",
        options: ["Kestane şekeri", "Lokum", "Baklava", "Şekerpare"],
        correctIndex: 0,
        explanation: "Bursa kestane şekeri, şehrin en tanınmış tatlılarından biridir.",
      },
    ],
  },
  {
    slug: "canakkale",
    name: "Çanakkale",
    region: "Marmara",
    shortDescription:
      "Truva'nın efsanevi topraklarına ve 1915 Çanakkale Savaşları'nın tarihine ev sahipliği yapan, iki kıtayı birbirine bağlayan boğaz şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Gelibolu Yarımadası Tarihi Milli Parkı",
        description: "1915 Çanakkale Savaşları'nın yaşandığı, anıtları ve şehitlikleriyle dolu tarihi alan.",
      },
      {
        name: "Truva Antik Kenti",
        description: "Homeros'un İlyada destanına konu olan, UNESCO Dünya Mirası Listesi'ndeki efsanevi antik kent.",
      },
      {
        name: "Assos (Behramkale)",
        description: "Aristoteles'in ders verdiği antik kent kalıntıları ve deniz manzaralı taş köy dokusuyla bilinir.",
      },
      {
        name: "Çanakkale Boğazı ve Sahil Şeridi",
        description: "Avrupa ve Asya kıtalarını ayıran, tarih boyunca stratejik önem taşımış dar deniz geçidi.",
      },
    ],
    foods: [
      {
        name: "Çanakkale Peyniri (Kelle Peyniri)",
        description: "Özel bir kalıpta hazırlanan, sert dokusu ve karakteristik tadıyla bilinen geleneksel peynir.",
      },
      {
        name: "Midye Tava ve Midye Dolma",
        description: "Boğaz kıyısında yaygın olarak tüketilen, taze midyeyle hazırlanan iki klasik deniz lezzeti.",
      },
      {
        name: "Ezine Peyniri",
        description: "Çanakkale'nin Ezine ilçesine özgü, koyun sütünden yapılan coğrafi işaretli beyaz peynir.",
      },
    ],
    funFacts: [
      "Homeros'un İlyada destanında anlatılan Truva Savaşı'nın geçtiği kent, Çanakkale'de bulunmaktadır.",
      "1915 Çanakkale Deniz ve Kara Savaşları, Birinci Dünya Savaşı'nın önemli cephelerinden biriydi.",
      "Çanakkale Boğazı, Avrupa ve Asya kıtalarını birbirinden ayıran stratejik bir su yoludur.",
    ],
    quiz: [
      {
        question: "Truva Antik Kenti hangi destana konu olmuştur?",
        options: ["Odysseia'nın devamı", "İlyada", "Aeneid'in girişi", "Gılgamış Destanı"],
        correctIndex: 1,
        explanation: "Truva, Homeros'un İlyada destanına konu olan efsanevi kenttir.",
      },
      {
        question: "1915 Çanakkale Savaşları hangi büyük savaşın bir cephesiydi?",
        options: ["İkinci Dünya Savaşı", "Birinci Dünya Savaşı", "Kırım Savaşı", "Balkan Savaşları"],
        correctIndex: 1,
        explanation: "Çanakkale Savaşları, Birinci Dünya Savaşı'nın önemli cephelerinden biriydi.",
      },
      {
        question: "Çanakkale Boğazı hangi iki kıtayı ayırır?",
        options: ["Avrupa - Afrika", "Avrupa - Asya", "Asya - Afrika", "Avrupa - Amerika"],
        correctIndex: 1,
        explanation: "Çanakkale Boğazı, Avrupa ve Asya kıtalarını birbirinden ayırır.",
      },
      {
        question: "Assos antik kentinde hangi ünlü filozof ders vermiştir?",
        options: ["Sokrates", "Aristoteles", "Platon", "Pisagor"],
        correctIndex: 1,
        explanation: "Aristoteles, Assos'ta bir dönem ders vermiş ve burada bir felsefe okulu kurmuştur.",
      },
      {
        question: "Ezine ilçesi hangi ürünüyle tanınır?",
        options: ["Zeytinyağı", "Peynir", "Bal", "Kestane"],
        correctIndex: 1,
        explanation: "Ezine peyniri, coğrafi işaret tescilli, koyun sütünden yapılan ünlü bir peynirdir.",
      },
    ],
  },
  {
    slug: "edirne",
    name: "Edirne",
    region: "Marmara",
    shortDescription:
      "Osmanlı'nın İstanbul'dan önceki başkenti, Mimar Sinan'ın ustalık eseri Selimiye Camii'ne ev sahipliği yapan sınır şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Selimiye Camii",
        description: "Mimar Sinan'ın 'ustalık eserim' dediği, UNESCO Dünya Mirası Listesi'ndeki muhteşem cami.",
      },
      {
        name: "Edirne Sarayı (Saray-ı Cedid-i Amire) Kalıntıları",
        description: "Osmanlı padişahlarının bir dönem ikamet ettiği, bugün kalıntıları ziyaret edilebilen saray alanı.",
      },
      {
        name: "Üç Şerefeli Cami",
        description: "Farklı yüksekliklerdeki dört minaresiyle bilinen, erken Osmanlı mimarisinin önemli örneği.",
      },
    ],
    foods: [
      {
        name: "Edirne Tava Ciğeri",
        description: "İnce dilimlenip kızartılan dana ciğerinin, kırmızı biber ve sarımsaklı yoğurtla servis edildiği meşhur lezzet.",
      },
      {
        name: "Deva-i Misk Macunu",
        description: "Tarihi kaynaklarda geçen, baharatlarla hazırlanan geleneksel bir macun çeşidi.",
      },
      {
        name: "Edirne Peyniri",
        description: "Bölgeye özgü üretim yöntemiyle hazırlanan, beyaz peynir çeşidi.",
      },
    ],
    funFacts: [
      "Edirne, İstanbul'un fethinden önce uzun süre Osmanlı Devleti'nin başkentliğini yapmıştır.",
      "Kırkpınar Yağlı Güreşleri, dünyanın en eski sürekli düzenlenen spor organizasyonlarından biri kabul edilir.",
      "Mimar Sinan, Selimiye Camii'ni kendi ifadesiyle 'ustalık eserim' olarak tanımlamıştır.",
    ],
    quiz: [
      {
        question: "Selimiye Camii'yi kim inşa etmiştir?",
        options: ["Mimar Sinan", "Mimar Kemalettin", "Mimar Vedat Tek", "Davut Ağa"],
        correctIndex: 0,
        explanation: "Selimiye Camii, Mimar Sinan'ın kendi ifadesiyle ustalık eseridir.",
      },
      {
        question: "Edirne, İstanbul'un fethinden önce Osmanlı için ne anlam taşırdı?",
        options: ["Hiç önemi yoktu", "Başkentti", "Sadece askeri kışlaydı", "Terk edilmiş bir bölgeydi"],
        correctIndex: 1,
        explanation: "Edirne, İstanbul'un fethinden önce Osmanlı Devleti'nin başkentiydi.",
      },
      {
        question: "Kırkpınar, hangi spor dalıyla özdeşleşmiştir?",
        options: ["Güreş", "Okçuluk", "Binicilik", "Cirit"],
        correctIndex: 0,
        explanation: "Kırkpınar, geleneksel yağlı güreşlerin düzenlendiği tarihi bir etkinliktir.",
      },
      {
        question: "Üç Şerefeli Cami'nin dikkat çeken özelliği nedir?",
        options: [
          "Minaresi olmaması",
          "Farklı yükseklikte dört minaresi",
          "Yer altında olması",
          "Ahşap yapılı olması",
        ],
        correctIndex: 1,
        explanation: "Cami, farklı yüksekliklerdeki dört minaresiyle bilinir.",
      },
      {
        question: "Edirne hangi ülkelerle sınır komşuluğuna sahiptir?",
        options: ["Yunanistan ve Bulgaristan", "Suriye ve Irak", "Gürcistan ve Ermenistan", "İran"],
        correctIndex: 0,
        explanation: "Edirne, Yunanistan ve Bulgaristan ile sınır komşusu bir sınır şehridir.",
      },
    ],
  },
  {
    slug: "kirklareli",
    name: "Kırklareli",
    region: "Marmara",
    shortDescription:
      "Trakya'nın yeşil ormanları, longoz alanları ve tarih öncesi höyükleriyle bilinen, sakin bir sınır ili.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "İğneada Longoz Ormanları Milli Parkı",
        description: "Avrupa'nın nadir subasar (longoz) ormanlarından birine ev sahipliği yapan koruma alanı.",
      },
      {
        name: "Dupnisa Mağarası",
        description: "Sarkıt ve dikitleriyle bilinen, Trakya'nın en büyük mağara sistemlerinden biri.",
      },
      {
        name: "Kırklareli Höyüğü",
        description: "Anadolu'nun en eski yerleşim izlerinden bazılarını barındıran önemli arkeolojik alan.",
      },
    ],
    foods: [
      {
        name: "Kırklareli Köftesi",
        description: "Bölgeye özgü baharat karışımıyla hazırlanan, ızgarada pişirilen lezzetli köfte çeşidi.",
      },
      {
        name: "Kaymaklı Ceviz Sucuğu (Pestil-Sucuk)",
        description: "Üzüm pekmezi ve cevizle hazırlanan, Trakya'ya özgü geleneksel bir atıştırmalık.",
      },
      {
        name: "Trakya Ayçiçeği Yağı Ürünleri",
        description: "Bölgenin geniş ayçiçeği tarlalarından elde edilen, mutfaklarda yaygın kullanılan yağ.",
      },
    ],
    funFacts: [
      "İğneada'daki longoz ormanları, Avrupa'da bu tür ekosistemlerin nadir korunmuş örneklerinden biridir.",
      "Kırklareli Höyüğü'ndeki kazılar, bölgedeki yerleşim tarihinin binlerce yıl öncesine uzandığını gösterir.",
      "Kırklareli ve çevresi, Trakya'nın önemli tahıl ve ayçiçeği üretim alanlarındandır.",
    ],
    quiz: [
      {
        question: "İğneada hangi ekosistem türüyle tanınır?",
        options: ["Çöl", "Longoz (subasar) ormanı", "Tundra", "Mercan resifi"],
        correctIndex: 1,
        explanation: "İğneada, Avrupa'nın nadir longoz ormanlarından birine ev sahipliği yapar.",
      },
      {
        question: "Dupnisa neresiyle bilinir?",
        options: ["Şelalesiyle", "Mağarasıyla", "Volkanik gölüyle", "Adasıyla"],
        correctIndex: 1,
        explanation: "Dupnisa Mağarası, Trakya'nın en büyük mağara sistemlerinden biridir.",
      },
      {
        question: "Kırklareli Höyüğü hangi açıdan önemlidir?",
        options: [
          "Modern mimarisiyle",
          "Anadolu'nun en eski yerleşim izlerinden bazılarını barındırmasıyla",
          "Askeri tarihiyle",
          "Denizcilik geçmişiyle",
        ],
        correctIndex: 1,
        explanation: "Höyükte yapılan kazılar, çok eski dönemlere uzanan yerleşim izleri ortaya koymuştur.",
      },
      {
        question: "Kırklareli hangi bölgede yer alır?",
        options: ["Trakya (Marmara)", "İç Anadolu", "Karadeniz", "Ege"],
        correctIndex: 0,
        explanation: "Kırklareli, Marmara Bölgesi'nin Trakya bölümünde yer alır.",
      },
      {
        question: "Bölge tarım açısından hangi üründe öne çıkar?",
        options: ["Muz", "Ayçiçeği", "Çay", "Zeytin"],
        correctIndex: 1,
        explanation: "Trakya bölgesi, ayçiçeği üretiminde Türkiye'nin önemli merkezlerinden biridir.",
      },
    ],
  },
  {
    slug: "kocaeli",
    name: "Kocaeli",
    region: "Marmara",
    shortDescription:
      "İzmit Körfezi kıyısında yer alan, sanayisiyle ve Hereke'nin dünyaca ünlü ipek halılarıyla bilinen Marmara ili.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "İzmit Körfezi Sahil Şeridi",
        description: "Yürüyüş parkurları ve dinlenme alanlarıyla şehrin en çok tercih edilen sahil bölgesi.",
      },
      {
        name: "Kartepe Kayak Merkezi",
        description: "İstanbul'a yakınlığıyla bilinen, kış aylarında kayak severlerin uğrak noktası.",
      },
      {
        name: "Hereke",
        description: "Osmanlı saraylarına halı üreten fabrikasıyla ün kazanmış, dünyaca tanınan ipek halıcılık merkezi.",
      },
    ],
    foods: [
      {
        name: "İzmit Pişmaniyesi",
        description: "İnce lifler halinde çekilen şeker ve una dayalı, İzmit'e özgü meşhur tatlı.",
      },
      {
        name: "Midye Dolma",
        description: "Körfez kıyısında yaygın olarak tüketilen, pirinçli iç harcıyla hazırlanan klasik midye dolma.",
      },
      {
        name: "Kocaeli Böreği",
        description: "Yöresel malzemelerle hazırlanan, ince yufka katlarından oluşan geleneksel börek çeşidi.",
      },
    ],
    funFacts: [
      "Hereke ipek halıları, kalitesi ve inceliğiyle dünya çapında koleksiyoncular tarafından aranır.",
      "Kocaeli, Osmanlı döneminden itibaren donanma tersaneleriyle önemli bir denizcilik merkeziydi.",
      "Şehir, günümüzde Türkiye'nin en büyük sanayi bölgelerinden birine ev sahipliği yapar.",
    ],
    quiz: [
      {
        question: "Hereke hangi el sanatıyla dünya çapında tanınır?",
        options: ["Çinicilik", "İpek halıcılık", "Bakırcılık", "Cam işçiliği"],
        correctIndex: 1,
        explanation: "Hereke, Osmanlı saraylarına da halı üreten ipek halıcılığıyla ünlüdür.",
      },
      {
        question: "Kocaeli'nin kıyısında bulunduğu körfez hangisidir?",
        options: ["İzmit Körfezi", "Gemlik Körfezi", "İzmir Körfezi", "Edremit Körfezi"],
        correctIndex: 0,
        explanation: "Kocaeli, İzmit Körfezi kıyısında konumlanmıştır.",
      },
      {
        question: "Kocaeli günümüzde hangi sektörle öne çıkar?",
        options: ["Tarım", "Sanayi", "Balıkçılık", "Ormancılık"],
        correctIndex: 1,
        explanation: "Kocaeli, Türkiye'nin en büyük sanayi bölgelerinden birine sahiptir.",
      },
      {
        question: "İzmit hangi tatlısıyla bilinir?",
        options: ["Baklava", "Pişmaniye", "Kadayıf", "Lokum"],
        correctIndex: 1,
        explanation: "İzmit pişmaniyesi, şehrin en tanınmış tatlılarından biridir.",
      },
      {
        question: "Kartepe hangi mevsimde özellikle tercih edilir?",
        options: ["Yaz (deniz turizmi)", "Kış (kayak turizmi)", "Sonbahar (hasat)", "İlkbahar (yayla)"],
        correctIndex: 1,
        explanation: "Kartepe, kış aylarında kayak merkezi olarak yoğun ilgi görür.",
      },
    ],
  },
  {
    slug: "sakarya",
    name: "Sakarya",
    region: "Marmara",
    shortDescription:
      "Sapanca Gölü'nün doğal güzelliğiyle ve Kurtuluş Savaşı'nın dönüm noktası Sakarya Meydan Muharebesi'yle bilinen yeşil bir Marmara ili.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Sapanca Gölü",
        description: "Yeşillikler içinde uzanan, çevresindeki kafe ve yürüyüş parkurlarıyla popüler bir doğa noktası.",
      },
      {
        name: "Kartepe",
        description: "Sapanca'ya yakın, teleferikle ulaşılan, hem yaz hem kış turizmine uygun bir yayla ve kayak bölgesi.",
      },
      {
        name: "Maşukiye",
        description: "Şelaleleri, alabalık restoranları ve serin havasıyla bilinen doğa cenneti.",
      },
    ],
    foods: [
      {
        name: "Geyve Tarhanası",
        description: "Yoğurt ve unla hazırlanıp güneşte kurutulan, kış aylarının vazgeçilmez çorbası için kullanılan malzeme.",
      },
      {
        name: "Alabalık",
        description: "Maşukiye ve çevresindeki dere kenarı restoranlarında taze olarak servis edilen bölgesel lezzet.",
      },
      {
        name: "Sakarya Kaymağı",
        description: "Bölgenin yeşil ve sulak arazilerinde üretilen, yoğun kıvamlı kaymak.",
      },
    ],
    funFacts: [
      "Sakarya Meydan Muharebesi, Kurtuluş Savaşı'nın en kritik dönüm noktalarından biri olarak tarihe geçmiştir.",
      "Sapanca Gölü, çevresindeki illere önemli miktarda içme suyu sağlar.",
      "Maşukiye, İstanbul'a yakınlığıyla hafta sonu doğa kaçamaklarının popüler adreslerinden biridir.",
    ],
    quiz: [
      {
        question: "Sakarya Meydan Muharebesi hangi savaş döneminde gerçekleşmiştir?",
        options: ["Birinci Dünya Savaşı", "Kurtuluş Savaşı", "Balkan Savaşları", "İkinci Dünya Savaşı"],
        correctIndex: 1,
        explanation: "Sakarya Meydan Muharebesi, Kurtuluş Savaşı'nın kritik bir dönüm noktasıdır.",
      },
      {
        question: "Sapanca Gölü, çevresindeki iller için ne işlev görür?",
        options: ["Sadece turizm", "İçme suyu kaynağı", "Sadece balıkçılık", "Enerji üretimi"],
        correctIndex: 1,
        explanation: "Sapanca Gölü, bölgeye içme suyu sağlayan önemli bir kaynaktır.",
      },
      {
        question: "Maşukiye hangi özelliğiyle bilinir?",
        options: ["Çölleriyle", "Şelaleleri ve alabalık restoranlarıyla", "Antik kentleriyle", "Plajlarıyla"],
        correctIndex: 1,
        explanation: "Maşukiye, şelaleleri ve dere kenarındaki alabalık restoranlarıyla ünlüdür.",
      },
      {
        question: "Kartepe hangi bölgeye yakın konumdadır?",
        options: ["Sapanca", "Bolu", "Yalova", "Bilecik"],
        correctIndex: 0,
        explanation: "Kartepe, Sapanca Gölü'ne yakın bir yayla ve kayak bölgesidir.",
      },
      {
        question: "Geyve tarhanası hangi malzemelerden yapılır?",
        options: ["Et ve pirinç", "Yoğurt ve un", "Balık ve sebze", "Süt ve şeker"],
        correctIndex: 1,
        explanation: "Tarhana, yoğurt ve unun karıştırılıp kurutulmasıyla hazırlanır.",
      },
    ],
  },
  {
    slug: "tekirdag",
    name: "Tekirdağ",
    region: "Marmara",
    shortDescription:
      "Meşhur köftesi, bağcılığı ve Marmara Denizi kıyısındaki sahil şeridiyle bilinen Trakya şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Tekirdağ Sahili",
        description: "Marmara Denizi'ne uzanan, yürüyüş ve bisiklet parkurlarıyla bilinen uzun sahil şeridi.",
      },
      {
        name: "Şarköy Bağları",
        description: "Bağcılık geleneğiyle ünlü, şarap üretiminde de kullanılan üzüm bağlarının bulunduğu ilçe.",
      },
      {
        name: "Ganos Dağı",
        description: "Şarköy sırtlarında yükselen, doğa yürüyüşü ve manzara noktalarıyla bilinen dağlık alan.",
      },
    ],
    foods: [
      {
        name: "Tekirdağ Köftesi",
        description: "İnce, uzun şekliyle bilinen, közde pişirilen ve Türkiye'nin en tanınmış köftelerinden biri.",
      },
      {
        name: "Tekirdağ Rakısı",
        description: "Bölgenin üzüm bağlarından elde edilen, geleneksel yöntemlerle üretilen ünlü rakı.",
      },
      {
        name: "Hoşmerim",
        description: "Lor peyniri ve irmikle hazırlanan, hafif tatlı bir yöresel tatlı çeşidi.",
      },
    ],
    funFacts: [
      "Tekirdağ köftesi, ince ve uzun şekliyle Türkiye'nin en çok taklit edilen köfte tariflerinden biridir.",
      "Şarköy bölgesi, antik çağlardan beri bağcılık ve şarapçılıkla anılır.",
      "Tekirdağ, Marmara Denizi kıyısında geniş bir sahil şeridine sahiptir.",
    ],
    quiz: [
      {
        question: "Tekirdağ köftesinin ayırt edici şekli nasıldır?",
        options: ["Yuvarlak", "İnce ve uzun", "Kare", "Yassı ve geniş"],
        correctIndex: 1,
        explanation: "Tekirdağ köftesi, ince ve uzun şekliyle diğer köftelerden ayrılır.",
      },
      {
        question: "Şarköy ilçesi hangi tarım ürünüyle bilinir?",
        options: ["Zeytin", "Üzüm", "Fındık", "Pamuk"],
        correctIndex: 1,
        explanation: "Şarköy, bağcılık geleneği ve üzüm bağlarıyla ünlüdür.",
      },
      {
        question: "Tekirdağ hangi denize kıyısı vardır?",
        options: ["Karadeniz", "Marmara Denizi", "Ege Denizi", "Akdeniz"],
        correctIndex: 1,
        explanation: "Tekirdağ, Marmara Denizi kıyısında yer alan bir ildir.",
      },
      {
        question: "Ganos Dağı hangi ilçenin sırtlarında yer alır?",
        options: ["Malkara", "Şarköy", "Çorlu", "Süleymanpaşa"],
        correctIndex: 1,
        explanation: "Ganos Dağı, Şarköy ilçesinin sırtlarında yükselir.",
      },
      {
        question: "Tekirdağ, hangi içecek üretimiyle de bilinir?",
        options: ["Bira", "Rakı", "Kahve", "Çay"],
        correctIndex: 1,
        explanation: "Tekirdağ rakısı, bölgenin bağlarından elde edilen üzümle üretilen ünlü bir içkidir.",
      },
    ],
  },
  {
    slug: "yalova",
    name: "Yalova",
    region: "Marmara",
    shortDescription:
      "Termal kaplıcaları ve kivi bahçeleriyle bilinen, Türkiye'nin en küçük illerinden biri olan sakin bir Marmara şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Yalova Termal Kaplıcaları",
        description: "Şifalı sularıyla bilinen, Osmanlı döneminden beri kullanılan tarihi termal tesisler.",
      },
      {
        name: "Yalova Atatürk Bahçesi (Yürüyen Köşk)",
        description: "Atatürk'ün sıkça ziyaret ettiği, bitki çeşitliliğiyle bilinen tarihi bahçe ve köşk.",
      },
      {
        name: "Çınarcık Sahili",
        description: "Marmara Denizi'ne kıyısı olan, yaz aylarında yoğun ilgi gören sahil beldesi.",
      },
    ],
    foods: [
      {
        name: "Yalova Kivisi",
        description: "Bölgenin nemli ikliminde yetişen, Türkiye'nin kivi üretiminde öncü olduğu meşhur meyve.",
      },
      {
        name: "Termal Kestanesi",
        description: "Yalova'nın ormanlık alanlarında yetişen, kestane şekeri ve haşlamasında kullanılan iri kestane.",
      },
      {
        name: "Yalova Balı",
        description: "Bölgenin zengin bitki örtüsünden beslenen arılardan elde edilen, kaliteli doğal bal.",
      },
    ],
    funFacts: [
      "Yalova, yüzölçümü bakımından Türkiye'nin en küçük illerinden biridir.",
      "Atatürk, Yalova Termal bölgesini sıkça ziyaret etmiş ve burada uzun süreler geçirmiştir.",
      "Yalova, Türkiye'de kivi üretiminin öncü illerinden biri olarak bilinir.",
    ],
    quiz: [
      {
        question: "Yalova, yüzölçümü açısından nasıl bir ildir?",
        options: ["Türkiye'nin en büyük ili", "Türkiye'nin en küçük illerinden biri", "Ortalama büyüklükte", "İkinci en büyük il"],
        correctIndex: 1,
        explanation: "Yalova, yüzölçümü bakımından Türkiye'nin en küçük illerinden biridir.",
      },
      {
        question: "Atatürk'ün sıkça ziyaret ettiği bölge hangisidir?",
        options: ["Çınarcık", "Termal", "Altınova", "Armutlu"],
        correctIndex: 1,
        explanation: "Atatürk, Yalova Termal bölgesini sıkça ziyaret etmiştir.",
      },
      {
        question: "Yalova hangi meyvenin üretiminde öncü illerden biridir?",
        options: ["Muz", "Kivi", "Ananas", "Mango"],
        correctIndex: 1,
        explanation: "Yalova, Türkiye'de kivi üretiminde öncü illerden biridir.",
      },
      {
        question: "Yalova Termal Kaplıcaları'nın özelliği nedir?",
        options: ["Soğuk suları", "Şifalı termal suları", "Tuzlu göl olması", "Yapay havuz olması"],
        correctIndex: 1,
        explanation: "Yalova Termal, Osmanlı döneminden beri kullanılan şifalı sularıyla bilinir.",
      },
      {
        question: "Çınarcık hangi denize kıyısı olan bir Yalova ilçesidir?",
        options: ["Ege Denizi", "Marmara Denizi", "Karadeniz", "Akdeniz"],
        correctIndex: 1,
        explanation: "Çınarcık, Marmara Denizi kıyısında yer alan bir Yalova ilçesidir.",
      },
    ],
  },
];
