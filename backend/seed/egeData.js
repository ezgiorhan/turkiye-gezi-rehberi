// EGE BÖLGESİ - ek şehirler (İzmir zaten seedData.js içinde tanımlı)
module.exports = [
  {
    slug: "aydin",
    name: "Aydın",
    region: "Ege",
    shortDescription:
      "Kuru incirin, zeytinin ve antik kentlerin buluştuğu, Kuşadası'yla turizmin de kalbi olan Ege ili.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Aphrodisias Antik Kenti",
        description:
          "Aşk ve güzellik tanrıçası Afrodit'e adanmış, UNESCO Dünya Mirası Listesi'nde yer alan antik kent.",
      },
      {
        name: "Kuşadası ve Güvercinada",
        description: "Ege'nin en canlı turizm merkezlerinden biri; küçük kalesiyle ünlü Güvercinada'ya ada içinde yürüyerek ulaşılır.",
      },
      {
        name: "Dilek Yarımadası - Büyük Menderes Deltası Milli Parkı",
        description: "Zengin bitki örtüsü ve kuş türleriyle bilinen, doğal plajlara sahip milli park.",
      },
      {
        name: "Nysa Antik Kenti",
        description: "Tiyatrosu ve kütüphane kalıntılarıyla dikkat çeken, Roma dönemine damgasını vurmuş antik yerleşim.",
      },
    ],
    foods: [
      {
        name: "Aydın Kuru İnciri",
        description: "Dünya kuru incir üretiminin büyük bölümünün karşılandığı, Aydın'ın coğrafi işaretli ürünü.",
      },
      {
        name: "Çine Kestanesi",
        description: "Çine ilçesine özgü, iri ve tatlı kestane çeşidi; kestane şekeri ve haşlamasında kullanılır.",
      },
      {
        name: "Zeytinyağlı Yemekler",
        description: "Bölgenin bereketli zeytinliklerinden elde edilen yağla hazırlanan geleneksel Ege lezzetleri.",
      },
    ],
    funFacts: [
      "Aydın, dünya kuru incir üretiminin önemli bir kısmını tek başına karşılar.",
      "Aphrodisias, hem antik heykeltıraşlık okuluyla hem de UNESCO Dünya Mirası statüsüyle tanınır.",
      "Söke ovası, Türkiye'nin önemli pirinç üretim merkezlerinden biridir.",
    ],
    quiz: [
      {
        question: "Aphrodisias Antik Kenti kime adanmıştır?",
        options: ["Zeus", "Afrodit", "Apollon", "Athena"],
        correctIndex: 1,
        explanation: "Aphrodisias, aşk ve güzellik tanrıçası Afrodit'e adanmış bir antik kenttir.",
      },
      {
        question: "Aydın hangi tarım ürünüyle dünya çapında tanınır?",
        options: ["Kuru incir", "Çay", "Fındık", "Muz"],
        correctIndex: 0,
        explanation: "Aydın, dünya kuru incir üretiminin önemli merkezlerinden biridir.",
      },
      {
        question: "Aşağıdakilerden hangisi Aydın sınırları içindedir?",
        options: ["Kuşadası", "Bodrum", "Marmaris", "Fethiye"],
        correctIndex: 0,
        explanation: "Kuşadası, Aydın iline bağlı önemli bir turizm ilçesidir.",
      },
      {
        question: "Çine ilçesi hangi ürünüyle ünlüdür?",
        options: ["Fındık", "Kestane", "Çay", "Muz"],
        correctIndex: 1,
        explanation: "Çine kestanesi, iriliği ve tadıyla bilinen yerel bir üründür.",
      },
      {
        question: "Dilek Yarımadası Milli Parkı hangi özelliğiyle bilinir?",
        options: [
          "Kayak merkezi olması",
          "Zengin bitki örtüsü ve doğal plajları",
          "Yüksek dağları",
          "Çöl iklimi",
        ],
        correctIndex: 1,
        explanation: "Park, zengin bitki örtüsü, kuş türleri ve doğal plajlarıyla tanınır.",
      },
    ],
  },
  {
    slug: "denizli",
    name: "Denizli",
    region: "Ege",
    shortDescription:
      "Beyaz travertenleriyle dünyaca ünlü Pamukkale'ye ev sahipliği yapan, tekstil sanayisiyle de bilinen Ege şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Pamukkale (Hierapolis Antik Kenti)",
        description:
          "Beyaz kireç taraçaları ve termal sularıyla UNESCO Dünya Mirası Listesi'nde yer alan eşsiz doğal oluşum.",
      },
      {
        name: "Kaklık Mağarası",
        description: "Yeraltındaki Pamukkale olarak bilinen; içerisindeki küçük traverten basamakları, sülfürlü termal suyu ve sarkıtlarıyla gizemli bir yer altı cenneti.",
      },
      {
        name: "Laodikeia Antik Kenti",
        description: "Hristiyanlığın yedi kilisesinden biri olarak anılan, geniş sütunlu caddeleriyle etkileyici antik kent.",
      },
      
    ],
    foods: [
      {
        name: "Denizli Kebabı",
        description: "İnce dilimlenmiş etin özel bir teknikle pişirildiği, yöreye has kebap çeşidi.",
      },
      {
        name: "Keşkek",
        description: "Buğday ve etin uzun süre pişirilip dövülmesiyle hazırlanan, düğünlerde ikram edilen geleneksel yemek.",
      },
    ],
    funFacts: [
      "Pamukkale'nin beyaz traverten terasları, kalsiyum karbonat içeren termal suların birikmesiyle binlerce yılda oluşmuştur.",
      "Denizli, Türkiye'nin en önemli tekstil ve kot kumaşı üretim merkezlerinden biridir.",
      "Denizli horozunun gün doğumundaki ötüşü, şehrin sembollerinden biri haline gelmiştir.",
    ],
    quiz: [
      {
        question: "Pamukkale'nin beyaz taraçaları neyin birikmesiyle oluşmuştur?",
        options: ["Tuz", "Kalsiyum karbonat", "Kum", "Volkanik kül"],
        correctIndex: 1,
        explanation: "Termal sulardaki kalsiyum karbonatın binlerce yılda birikmesiyle traverten taraçalar oluşmuştur.",
      },
      {
        question: "Hierapolis Antik Kenti hangi ilimizdedir?",
        options: ["Denizli", "Aydın", "Muğla", "Manisa"],
        correctIndex: 0,
        explanation: "Hierapolis, Pamukkale ile birlikte Denizli sınırları içindedir.",
      },
      {
        question: "Denizli, hangi sanayi dalıyla öne çıkar?",
        options: ["Otomotiv", "Tekstil", "Petrokimya", "Madencilik"],
        correctIndex: 1,
        explanation: "Denizli, özellikle kot kumaşı üretimiyle Türkiye'nin önemli tekstil merkezlerindendir.",
      },
      {
        question: "Laodikeia hangi dinî bağlamda anılır?",
        options: [
          "Budizm'in kutsal kenti",
          "Hristiyanlığın yedi kilisesinden biri",
          "İslam'ın ilk mescidi",
          "Musevi hac yeri",
        ],
        correctIndex: 1,
        explanation: "Laodikeia, Hristiyanlık tarihinde bahsi geçen yedi kiliseden biri olarak bilinir.",
      },
      {
        question: "Buldan ilçesi hangi el sanatıyla tanınır?",
        options: ["Çinicilik", "El dokuması kumaş", "Bakırcılık", "Halıcılık"],
        correctIndex: 1,
        explanation: "Buldan, geleneksel el dokuması kumaşlarıyla bilinir.",
      },
    ],
  },
  {
    slug: "manisa",
    name: "Manisa",
    region: "Ege",
    shortDescription:
      "Lidya Krallığı'nın izlerini taşıyan, Mesir Macunu ve Spil Dağı'yla anılan tarihi Ege şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Sardes Antik Kenti",
        description: "Antik Lidya Krallığı'nın başkenti; Artemis Tapınağı ve gösterişli gymnasium kalıntılarıyla bilinir.",
      },
      {
        name: "Spil Dağı Milli Parkı",
        description: "Efsanevi 'Ağlayan Kaya' formasyonuna ev sahipliği yapan, Manisa'ya hakim doğal park.",
      },
      {
        name: "Manisa Ulu Camii",
        description: "14. yüzyıldan kalma, Saruhanoğulları dönemi mimarisini yansıtan tarihi cami.",
      },
      {
        name: "Manisa Kalesi",
        description: "Şehre yukarıdan bakan, Bizans dönemine kadar uzanan tarihi kale kalıntısı.",
      },
    ],
    foods: [
      {
        name: "Mesir Macunu",
        description: "Onlarca baharatın bir araya getirilmesiyle hazırlanan, şifa amaçlı tüketilen geleneksel macun.",
      },
      {
        name: "Manisa Kırma Zeytini",
        description: "Bölgeye özgü yöntemle hazırlanan, hafif acımsı tadıyla bilinen kırma zeytin.",
      },
      {
        name: "Alaşehir Üzümü",
        description: "Manisa'nın Alaşehir ilçesinde yetişen, kuru üzüm üretiminde kullanılan ünlü çekirdeksiz üzüm.",
      },
    ],
    funFacts: [
      "Sardes, tarihte ilk metal parayı bastığı düşünülen Lidya Krallığı'nın başkentiydi.",
      "Mesir Macunu Şenliği, 16. yüzyıldan bu yana her yıl kutlanan bir gelenektir.",
      "Spil Dağı'ndaki 'Ağlayan Kaya', antik mitolojide Kraliçe Niobe'nin taşa dönüşmüş hali olarak anlatılır.",
    ],
    quiz: [
      {
        question: "Sardes Antik Kenti hangi krallığın başkentiydi?",
        options: ["Frigya", "Lidya", "Karya", "İyonya"],
        correctIndex: 1,
        explanation: "Sardes, Lidya Krallığı'nın başkenti olarak tarihe geçmiştir.",
      },
      {
        question: "Mesir Macunu geleneksel olarak ne amaçla hazırlanır?",
        options: ["Süsleme", "Şifa/sağlık amaçlı", "Boyama", "Dokuma"],
        correctIndex: 1,
        explanation: "Mesir Macunu, çok sayıda baharatla hazırlanan, şifa amaçlı tüketilen bir karışımdır.",
      },
      {
        question: "'Ağlayan Kaya' formasyonu hangi dağdadır?",
        options: ["Uludağ", "Spil Dağı", "Erciyes", "Kaçkar"],
        correctIndex: 1,
        explanation: "Ağlayan Kaya, Manisa'daki Spil Dağı Milli Parkı içinde yer alır.",
      },
      {
        question: "Lidyalılar tarih açısından hangi buluşla anılır?",
        options: ["İlk yazı", "İlk metal para", "İlk tekerlek", "İlk takvim"],
        correctIndex: 1,
        explanation: "Lidyalıların ilk metal parayı bastığı kabul edilir.",
      },
      {
        question: "Alaşehir hangi tarım ürünüyle tanınır?",
        options: ["Zeytin", "Üzüm", "Pamuk", "Fındık"],
        correctIndex: 1,
        explanation: "Alaşehir, özellikle kuru üzüm üretimiyle bilinen bir Manisa ilçesidir.",
      },
    ],
  },
  {
    slug: "mugla",
    name: "Muğla",
    region: "Ege",
    shortDescription:
      "Bodrum, Marmaris ve Ölüdeniz gibi dünyaca ünlü tatil beldelerini barındıran, turkuaz kıyılarıyla anılan Ege ili.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Bodrum Kalesi ve Sualtı Arkeoloji Müzesi",
        description: "St. Jean Şövalyeleri tarafından inşa edilen kale; içinde önemli bir sualtı arkeolojisi müzesi barındırır.",
      },
      {
        name: "Ölüdeniz",
        description: "Turkuaz rengi ve sakin koyuyla dünyanın en çok fotoğraflanan plajlarından biri.",
      },
      {
        name: "Dalyan ve Kaunos Antik Kenti",
        description: "Kayalara oyulmuş kral mezarları ve caretta caretta kaplumbağalarının yuvalama alanıyla ünlü bölge.",
      },
      {
        name: "Marmaris",
        description: "Marina, koylar ve gece hayatıyla bilinen, Muğla'nın en hareketli turizm merkezlerinden biri.",
      },
    ],
    foods: [
      {
        name: "Muğla Çökeleği",
        description: "Yağsız süzme peynirin baharatlarla harmanlanmasıyla hazırlanan geleneksel bir peynir çeşidi.",
      },
      {
        name: "Milas Zeytinyağı",
        description: "Coğrafi işaret tescilli, kendine has aromasıyla bilinen soğuk sıkım zeytinyağı.",
      },
      {
        name: "Muğla Keşkeği",
        description: "Buğday ve etle hazırlanan, bölgede özel günlerde ikram edilen doyurucu bir yemek.",
      },
    ],
    funFacts: [
      "Antik Dünyanın Yedi Harikası'ndan biri olan Halikarnas Mozolesi, bugünkü Bodrum'da inşa edilmişti.",
      "Dalyan'daki kumsallar, nesli tehlike altındaki caretta caretta deniz kaplumbağalarının en önemli yuvalama alanlarındandır.",
      "Muğla, Türkiye'nin en fazla koruma altındaki plajına (Mavi Bayrak) sahip illerinden biridir.",
    ],
    quiz: [
      {
        question: "Antik Dünyanın Yedi Harikası'ndan Halikarnas Mozolesi hangi ilçededir?",
        options: ["Marmaris", "Bodrum", "Fethiye", "Datça"],
        correctIndex: 1,
        explanation: "Halikarnas Mozolesi, günümüzde Muğla'nın Bodrum ilçesinde bulunuyordu.",
      },
      {
        question: "Dalyan bölgesi hangi canlı türüyle özellikle bilinir?",
        options: ["Flamingo", "Caretta caretta kaplumbağası", "Penguen", "Fok"],
        correctIndex: 1,
        explanation: "Dalyan kumsalları, caretta caretta kaplumbağalarının önemli yuvalama alanlarındandır.",
      },
      {
        question: "Ölüdeniz, hangi özelliğiyle dünyaca tanınır?",
        options: ["Kayak merkezi olmasıyla", "Turkuaz rengi ve sakin koyuyla", "Çöl manzarasıyla", "Volkanik yapısıyla"],
        correctIndex: 1,
        explanation: "Ölüdeniz, turkuaz suyu ve sakin koyuyla dünyanın en tanınmış plajlarından biridir.",
      },
      {
        question: "Milas ilçesi hangi ürünüyle öne çıkar?",
        options: ["Zeytinyağı", "Çay", "Fındık", "Pamuk"],
        correctIndex: 0,
        explanation: "Milas zeytinyağı, coğrafi işaret tescilli, kendine özgü bir üründür.",
      },
      {
        question: "Bodrum Kalesi'ni kimler inşa etmiştir?",
        options: ["Osmanlılar", "St. Jean Şövalyeleri", "Selçuklular", "Venedikliler"],
        correctIndex: 1,
        explanation: "Bodrum Kalesi, St. Jean (Rodos) Şövalyeleri tarafından inşa edilmiştir.",
      },
    ],
  },
  {
    slug: "usak",
    name: "Uşak",
    region: "Ege",
    shortDescription:
      "Lidya Definesi'yle gündeme gelen, halıcılığı ve Ulubey Kanyonları'yla bilinen İç Ege şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Uşak Müzesi",
        description: "Dünyaca ünlü Lidya Definesi (Karun Hazinesi) parçalarının sergilendiği arkeoloji müzesi.",
      },
      {
        name: "Ulubey Kanyonları",
        description: "Kilometrelerce uzanan etkileyici jeolojik oluşumuyla dünyanın önemli kanyonlarından biri kabul edilir.",
      },
      {
        name: "Clandras Köprüsü",
        description: "Frigyalılar döneminden kalma, Banaz Çayı üzerine kurulu tarihi su kemeri ve etkileyici taş kemer mimarisi.",
      },
      {
        name: "Blaundus Antik Kenti",
        description: "Ulubey kanyonlarının eteklerinde, Helenistik döneme ait kalıntıları, stadyumu ve kaya mezarlarıyla büyüleyici bir antik yerleşim.",
      },
      {
        name: "Taşyaran Vadisi Doğal Parkı",
        description: "Su ve rüzgarın milyonlarca yılda oyarak oluşturduğu rengarenk kayalarıyla eşsiz bir jeolojik oluşum.",
      },
    ],
    foods: [
      {
        name: "Uşak Tarhanası",
        description: "İçerisindeki kurutulmuş sebzeler, baharatlar ve yoğurtla uzun süre kaynatılarak yapılan, coğrafi işaretli, tescilli ve şifa deposu geleneksel çorba.",
      },
      {
        name: "Uşak Keşkeği",
        description: "Dövülmüş buğday ve etin özel bakır kazanlarda sahurdan akşama kadar odun ateşinde dövülerek püre kıvamına getirildiği düğün yemeklerinin baş tacı.",
      },
      {
        name: "Döndürme Böreği",
        description: "İnce açılmış hamurların arasına haşhaş, tahin veya peynir sürülerek kat kat hazırlanan, özellikle çay saatlerinin vazgeçilmezi olan nefis bir hamur işi.",
      },
    ],
    funFacts: [
      "Uşak Müzesi'ndeki Lidya Definesi (Karun Hazinesi), 1990'larda yurt dışına kaçırılıp uzun bir hukuk mücadelesinin ardından Türkiye'ye geri getirilmiştir.",
      "Ulubey Kanyonları, uzunluğuyla dünyanın sayılı büyük kanyonlarından biri olarak anılır.",
      "Uşak, Osmanlı döneminden beri halıcılığıyla tanınan bir üretim merkezidir.",
    ],
    quiz: [
      {
        question: "Uşak Müzesi hangi tarihi hazineyle bilinir?",
        options: ["Truva Hazinesi", "Lidya Definesi (Karun Hazinesi)", "Bizans Hazinesi", "Frig Hazinesi"],
        correctIndex: 1,
        explanation: "Uşak Müzesi, dünyaca ünlü Lidya Definesi'nin (Karun Hazinesi) parçalarını sergiler.",
      },
      {
        question: "Ulubey Kanyonları hangi özelliğiyle öne çıkar?",
        options: ["Volkanik kraterleriyle", "Uzunluğu ve büyüklüğüyle", "Buzul yapısıyla", "Mercan resifleriyle"],
        correctIndex: 1,
        explanation: "Ulubey Kanyonları, dünyanın sayılı büyük kanyonlarından biri olarak anılır.",
      },
      {
        question: "Uşak hangi el sanatıyla tarihsel olarak tanınır?",
        options: ["Çinicilik", "Halıcılık", "Bakırcılık", "Cam işçiliği"],
        correctIndex: 1,
        explanation: "Uşak, Osmanlı döneminden beri halı üretimiyle bilinen bir şehirdir.",
      },
      {
        question: "Karun Hazinesi ile ilgili aşağıdakilerden hangisi doğrudur?",
        options: [
          "Hiç yurt dışına çıkmamıştır",
          "Yurt dışına kaçırılıp geri getirilmiştir",
          "Hâlâ yurt dışındadır",
          "Sahte olduğu için müzeye konmamıştır",
        ],
        correctIndex: 1,
        explanation: "Define, 1990'larda yurt dışına kaçırılmış, hukuki mücadele sonucu Türkiye'ye geri getirilmiştir.",
      },
      {
        question: "Uşak hangi coğrafi bölgede yer alır?",
        options: ["Karadeniz", "Ege", "Akdeniz", "Doğu Anadolu"],
        correctIndex: 1,
        explanation: "Uşak, İç Ege bölümünde yer alan bir Ege ilidir.",
      },
    ],
  },
  {
    slug: "kutahya",
    name: "Kütahya",
    region: "Ege",
    shortDescription:
      "Osmanlı'dan beri sürdürülen çinicilik geleneğiyle ünlü, Aizanoi Antik Kenti'ne ev sahipliği yapan İç Ege şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Kütahya Çini Müzesi",
        description: "Selçuklu'dan günümüze uzanan çini sanatının en güzel örneklerinin sergilendiği müze.",
      },
      {
        name: "Aizanoi Antik Kenti",
        description: "Anadolu'nun en iyi korunmuş Zeus Tapınağı'na sahip, dünyanın ilk borsa binası kalıntısını barındıran antik kent.",
      },
      {
        name: "Frig Vadisi",
        description: "Kayalara oyulmuş anıtları ve doğa yürüyüşü rotalarıyla bilinen tarihi ve doğal vadi.",
      },
    ],
    foods: [
      {
        name: "Kütahya Çeşnili Tava",
        description: "Kuzu eti, patates ve özel baharat karışımıyla fırında pişirilen yöresel bir yemek.",
      },
      {
        name: "Zerde",
        description: "Safran ile renklendirilen, pirinç ve şerbetle hazırlanan geleneksel bir tatlı.",
      },
      {
        name: "Kütahya Künefesi",
        description: "İnce tel kadayıf ve peynirle hazırlanıp şerbetlenen, bölgede sevilen bir tatlı çeşidi.",
      },
    ],
    funFacts: [
      "Kütahya çinisi, Osmanlı döneminden bu yana desen zenginliği ve rengiyle tanınır.",
      "Aizanoi'de bulunan yapı, dünyanın bilinen ilk borsa binalarından biri olarak kabul edilir.",
      "Aizanoi'deki Zeus Tapınağı, Anadolu'daki en iyi korunmuş antik tapınaklardan biridir.",
    ],
    quiz: [
      {
        question: "Kütahya, hangi geleneksel el sanatıyla ünlüdür?",
        options: ["Halıcılık", "Çinicilik", "Bakırcılık", "Cam işçiliği"],
        correctIndex: 1,
        explanation: "Kütahya, Osmanlı döneminden beri sürdürülen çinicilik geleneğiyle tanınır.",
      },
      {
        question: "Aizanoi Antik Kenti'nde hangi tanrıya adanmış tapınak bulunur?",
        options: ["Apollon", "Zeus", "Athena", "Poseidon"],
        correctIndex: 1,
        explanation: "Aizanoi'deki Zeus Tapınağı, Anadolu'nun en iyi korunmuş örneklerinden biridir.",
      },
      {
        question: "Aizanoi'de bulunan yapılardan biri, dünyanın ilk örneklerinden hangisi olarak kabul edilir?",
        options: ["Tiyatro", "Borsa binası", "Kütüphane", "Hastane"],
        correctIndex: 1,
        explanation: "Aizanoi'deki bir yapı, dünyanın bilinen ilk borsa binalarından biri olarak kabul edilir.",
      },
      {
        question: "Frig Vadisi hangi özelliğiyle bilinir?",
        options: [
          "Denizden oluşan mağaralarıyla",
          "Kayalara oyulmuş anıtlarıyla",
          "Yüksek gökdelenleriyle",
          "Volkanik gölleriyle",
        ],
        correctIndex: 1,
        explanation: "Frig Vadisi, kayalara oyulmuş tarihi anıtlarıyla ve doğa rotalarıyla bilinir.",
      },
      {
        question: "Kütahya hangi bölgede yer alır?",
        options: ["Marmara", "Ege", "Karadeniz", "Akdeniz"],
        correctIndex: 1,
        explanation: "Kütahya, İç Ege bölümünde yer alan bir Ege ilidir.",
      },
    ],
  },
  {
    slug: "afyonkarahisar",
    name: "Afyonkarahisar",
    region: "Ege",
    shortDescription:
      "Kaymağı ve termal kaplıcalarıyla bilinen, Kurtuluş Savaşı'nın dönüm noktalarından birine ev sahipliği yapan şehir.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      {
        name: "Afyon Kalesi",
        description: "Şehre hakim yüksek bir kayalık üzerinde yer alan, tarihi çok eski dönemlere uzanan kale.",
      },
      {
        name: "Sandıklı Termal Bölgesi",
        description: "Şifalı termal sularıyla bilinen, sağlık turizminin merkezlerinden biri.",
      },
      {
        name: "Frig Vadisi (Yazılıkaya)",
        description: "Frig uygarlığından kalma kaya anıtları ve yazıtlarla dolu, açık hava müzesi niteliğinde vadi.",
      },
    ],
    foods: [
      {
        name: "Afyon Kaymağı",
        description: "Manda sütünden elde edilen, yoğun kıvamı ve zengin lezzetiyle Türkiye çapında ünlü kaymak.",
      },
      {
        name: "Afyon Sucuğu",
        description: "Özel baharat karışımıyla hazırlanan, coğrafi işaret tescilli meşhur sucuk.",
      },
      {
        name: "Haşhaşlı Ekmek",
        description: "Haşhaş tohumuyla hazırlanan, bölgeye özgü lezzetli bir ekmek çeşidi.",
      },
    ],
    funFacts: [
      "Kurtuluş Savaşı'nın dönüm noktalarından Başkumandanlık Meydan Muharebesi, Afyonkarahisar ve çevresinde gerçekleşmiştir.",
      "Afyon, adını haşhaş (afyon) bitkisinin yasal olarak yetiştirildiği bir bölge olmasından alır.",
      "Afyon kaymağı, Türkiye'nin en tanınmış süt ürünlerinden biridir.",
    ],
    quiz: [
      {
        question: "Başkumandanlık Meydan Muharebesi nerede gerçekleşmiştir?",
        options: ["Sakarya", "Afyonkarahisar", "Dumlupınar", "İnönü"],
        correctIndex: 1,
        explanation: "Meydan Muharebesi, Afyonkarahisar ve çevresinde gerçekleşmiştir.",
      },
      {
        question: "Afyonkarahisar, hangi süt ürünüyle ünlüdür?",
        options: ["Kaymak", "Tereyağı", "Lor peyniri", "Ayran"],
        correctIndex: 0,
        explanation: "Afyon kaymağı, Türkiye genelinde tanınan meşhur bir üründür.",
      },
      {
        question: "Şehrin adı hangi bitkiyle ilişkilidir?",
        options: ["Buğday", "Haşhaş (afyon)", "Pamuk", "Tütün"],
        correctIndex: 1,
        explanation: "Afyon, haşhaş bitkisinin yasal yetiştirildiği bir bölge olmasından adını almıştır.",
      },
      {
        question: "Frig Vadisi (Yazılıkaya) hangi uygarlıktan kalmadır?",
        options: ["Lidya", "Frig", "Hitit", "Karya"],
        correctIndex: 1,
        explanation: "Yazılıkaya, Frig uygarlığından kalma kaya anıtlarıyla bilinir.",
      },
      {
        question: "Sandıklı bölgesi hangi turizm türüyle öne çıkar?",
        options: ["Kış turizmi", "Termal (sağlık) turizmi", "Yayla turizmi", "Deniz turizmi"],
        correctIndex: 1,
        explanation: "Sandıklı, şifalı termal sularıyla sağlık turizmi merkezlerinden biridir.",
      },
    ],
  },
];
