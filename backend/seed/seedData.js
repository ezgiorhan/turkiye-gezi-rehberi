// Örnek (seed) şehir verileri
// mapPosition, frontend'deki SVG haritanın viewBox="0 0 800 320" koordinat sistemine göredir.

module.exports = [
  {
    slug: "istanbul",
    name: "İstanbul",
    region: "Marmara",
    shortDescription:
      "İki kıtayı birbirine bağlayan, tarihi ve kültürel zenginliğiyle dünyaca ünlü şehir.",
    heroImage: "",
    mapPosition: { x: 147, y: 72 },
    places: [
      {
        name: "Ayasofya",
        description:
          "Önce kilise, sonra cami, uzun yıllar müze olarak hizmet veren, dev kubbesiyle bilinen tarihi yapı.",
      },
      {
        name: "Topkapı Sarayı",
        description:
          "Osmanlı padişahlarının yaklaşık 400 yıl boyunca yaşadığı, bugün müze olarak ziyaret edilen saray kompleksi.",
      },
      {
        name: "Kapalıçarşı",
        description:
          "Yüzlerce dükkânı barındıran, dünyanın en eski ve en büyük kapalı çarşılarından biri.",
      },
      {
        name: "Galata Kulesi",
        description:
          "Cenevizliler tarafından inşa edilen, şehrin panoramik manzarasını sunan tarihi kule.",
      },
      {
        name: "Boğaz Turu",
        description:
          "Avrupa ve Asya yakalarını tekneyle gezerek boğazın tarihi yalılarını ve köprülerini görme fırsatı.",
      },
    ],
    foods: [
      {
        name: "İstanbul Balık Ekmek",
        description:
          "Eminönü sahilinde, ızgarada pişirilmiş balığın ekmek arasında servis edildiği klasik sokak lezzeti.",
      },
      {
        name: "Midye Dolma",
        description: "Baharatlı pilavla doldurulmuş, limonla servis edilen midye.",
      },
      {
        name: "Kokoreç",
        description: "Izgara edilmiş kuzu bağırsağının baharatlarla hazırlandığı sokak lezzeti.",
      },
      {
        name: "Lokum ve Türk Kahvesi",
        description: "Şehrin yüzyıllardır süregelen ikram kültürünün vazgeçilmez ikilisi.",
      },
    ],
    funFacts: [
      "İstanbul, dünyada iki farklı kıtaya (Avrupa ve Asya) yayılmış nadir şehirlerden biridir.",
      "Şehir tarih boyunca Bizantion, Konstantinopolis ve İstanbul olmak üzere farklı isimlerle anılmıştır.",
      "Yerebatan Sarnıcı, Bizans döneminden kalma yer altı su deposu olup 336 mermer sütuna sahiptir.",
      "Kapalıçarşı, 15. yüzyılda inşa edilmiş olup bugün hâlâ 60'tan fazla sokağa ve binlerce dükkâna ev sahipliği yapmaktadır.",
    ],
    quiz: [
      {
        question: "İstanbul hangi iki kıtayı birbirine bağlar?",
        options: ["Avrupa - Afrika", "Avrupa - Asya", "Asya - Afrika", "Avrupa - Amerika"],
        correctIndex: 1,
        explanation: "İstanbul, Boğaziçi ile Avrupa ve Asya kıtalarını birbirine bağlar.",
      },
      {
        question: "Aşağıdakilerden hangisi Osmanlı padişahlarının yaşadığı saraydır?",
        options: ["Dolmabahçe Sarayı", "Topkapı Sarayı", "Beylerbeyi Sarayı", "Çırağan Sarayı"],
        correctIndex: 1,
        explanation:
          "Topkapı Sarayı, yaklaşık 400 yıl boyunca Osmanlı padişahlarının idari ve yaşam merkezi olmuştur.",
      },
      {
        question: "Ayasofya tarih boyunca hangi işlevlerde kullanılmıştır?",
        options: [
          "Sadece cami",
          "Sadece kilise",
          "Kilise, cami ve müze",
          "Sadece müze",
        ],
        correctIndex: 2,
        explanation: "Ayasofya sırasıyla kilise, cami ve müze olarak kullanılmıştır.",
      },
      {
        question: "İstanbul'un ünlü sokak lezzetlerinden biri olan 'balık ekmek' nerede meşhurdur?",
        options: ["Kadıköy sahili", "Eminönü sahili", "Bebek sahili", "Moda sahili"],
        correctIndex: 1,
        explanation: "Eminönü sahili, balık ekmek kültürüyle özdeşleşmiştir.",
      },
      {
        question: "Yerebatan Sarnıcı hangi döneme aittir?",
        options: ["Osmanlı", "Selçuklu", "Bizans", "Cumhuriyet"],
        correctIndex: 2,
        explanation: "Yerebatan Sarnıcı, Bizans döneminde su ihtiyacını karşılamak için inşa edilmiştir.",
      },
      {
        question: "Kapalıçarşı yaklaşık kaç sokaktan oluşur?",
        options: ["10'dan az", "20 civarı", "60'tan fazla", "5"],
        correctIndex: 2,
        explanation: "Kapalıçarşı, 60'tan fazla sokağa ve binlerce dükkâna sahiptir.",
      },
    ],
  },
  {
    slug: "izmir",
    name: "İzmir",
    region: "Ege",
    shortDescription:
      "Ege'nin incisi olarak bilinen, denizi, tarihi ve özgür ruhuyla öne çıkan liman şehri.",
    heroImage: "",
    mapPosition: { x: 67, y: 196 },
    places: [
      {
        name: "Saat Kulesi (Konak)",
        description:
          "1901 yılında inşa edilen, İzmir'in simgesi hâline gelmiş tarihi meydan yapısı.",
      },
      {
        name: "Kadifekale",
        description:
          "Şehre hâkim tepede yer alan, Büyük İskender döneminden kalma antik kale kalıntısı.",
      },
      {
        name: "Efes Antik Kenti",
        description:
          "İzmir'e yakın konumuyla, Celsus Kütüphanesi ve antik tiyatrosuyla ünlü UNESCO Dünya Mirası alanı.",
      },
      {
        name: "Kordon (Birinci Kordon)",
        description: "Körfez boyunca uzanan, yürüyüş ve gün batımı manzarasıyla ünlü sahil şeridi.",
      },
      {
        name: "Alsancak",
        description: "Canlı sokak hayatı, kafeleri ve tarihi binalarıyla bilinen semt.",
      },
    ],
    foods: [
      {
        name: "İzmir Boyoz",
        description:
          "Sefarad Yahudilerinden İzmir mutfağına geçen, tahin ve un hamurundan yapılan geleneksel açma.",
      },
      {
        name: "Midye Dolma ve Midye Tava",
        description: "Ege kıyılarının vazgeçilmez deniz ürünü lezzetleri.",
      },
      {
        name: "İzmir Kumru",
        description: "Özel bir ekmek türü içinde sucuk, sosis, kaşar ve domates ile hazırlanan sandviç.",
      },
      {
        name: "Şevketi Bostan Yemeği",
        description: "Ege mutfağına özgü, çoğu bölgede bilinmeyen otsu bir sebze yemeği.",
      },
    ],
    funFacts: [
      "İzmir, antik dönemde 'Smyrna' adıyla anılıyordu ve Homeros'un doğum yeri olduğu iddia edilir.",
      "Kentin simgesi Saat Kulesi, Osmanlı padişahı II. Abdülhamid'in tahta çıkışının 25. yılı anısına yapılmıştır.",
      "Efes Antik Kenti, dünyanın en iyi korunmuş antik kentlerinden biri olarak kabul edilir.",
      "İzmir'in özgür ve modern kültürüyle 'Gavur İzmir' lakabıyla anıldığı dönemler olmuştur.",
    ],
    quiz: [
      {
        question: "İzmir'in antik dönemdeki adı nedir?",
        options: ["Efes", "Smyrna", "Bergama", "Milet"],
        correctIndex: 1,
        explanation: "Antik dönemde İzmir, 'Smyrna' adıyla anılırdı.",
      },
      {
        question: "İzmir'in simgesi hâline gelen tarihi yapı hangisidir?",
        options: ["Kadifekale", "Saat Kulesi", "Kızlarağası Hanı", "Konak Camii"],
        correctIndex: 1,
        explanation: "Saat Kulesi, 1901 yılında inşa edilmiş ve şehrin simgesi olmuştur.",
      },
      {
        question: "Aşağıdakilerden hangisi İzmir'e özgü bir lezzettir?",
        options: ["Boyoz", "Mantı", "Pide", "Künefe"],
        correctIndex: 0,
        explanation: "Boyoz, Sefarad mutfağından İzmir'e geçmiş geleneksel bir lezzettir.",
      },
      {
        question: "Efes Antik Kenti hangi bölgeye yakın konumdadır?",
        options: ["Ankara", "İstanbul", "İzmir", "Antalya"],
        correctIndex: 2,
        explanation: "Efes Antik Kenti, İzmir'e (Selçuk ilçesine) yakın konumdadır.",
      },
      {
        question: "İzmir Kordon nerede yer alır?",
        options: ["Şehir merkezinde bir dağın tepesinde", "Körfez kıyısında", "Kentin dışında bir ormanda", "Kadifekale'nin içinde"],
        correctIndex: 1,
        explanation: "Kordon, İzmir Körfezi boyunca uzanan sahil şerididir.",
      },
    ],
  },
  {
    slug: "ankara",
    name: "Ankara",
    region: "İç Anadolu",
    shortDescription: "Türkiye Cumhuriyeti'nin başkenti; tarihi, kültürel ve idari önemiyle öne çıkan şehir.",
    heroImage: "",
    mapPosition: { x: 310, y: 123 },
    places: [
      {
        name: "Anıtkabir",
        description: "Cumhuriyetin kurucusu Mustafa Kemal Atatürk'ün anıt mezarı ve müzesi.",
      },
      {
        name: "Ankara Kalesi",
        description: "Şehre hâkim tepede yer alan, Roma dönemine kadar uzanan tarihi kale.",
      },
      {
        name: "Anadolu Medeniyetleri Müzesi",
        description: "Anadolu'nun farklı uygarlıklarına ait eserleri barındıran, Avrupa Yılın Müzesi ödüllü müze.",
      },
      {
        name: "Kocatepe Camii",
        description: "Şehrin siluetine hâkim, Osmanlı mimarisinden ilham alan büyük cami.",
      },
      {
        name: "Gençlik Parkı",
        description: "Ailelerin ve gençlerin sıklıkla vakit geçirdiği, göleti ve eğlence alanlarıyla bilinen park.",
      },
    ],
    foods: [
      {
        name: "Ankara Tava",
        description: "Kuzu eti, patates ve baharatlarla fırında pişirilen geleneksel bir yemek.",
      },
      {
        name: "Beypazarı Kurusu",
        description: "Ankara'nın Beypazarı ilçesine özgü, tereyağlı ve kıtır bir hamur işi.",
      },
      {
        name: "Ankara Simidi",
        description: "Pekmeze batırılıp bol susamla harmanlanarak taş fırınlarda odun ateşinde pişirilen, kendine has çıtırlığı ve lezzetiyle tescilli sokak lezzeti.",
      },
    ],
    funFacts: [
      "Ankara, 1923 yılında Türkiye Cumhuriyeti'nin başkenti ilan edilmiştir.",
      "Şehrin adı, tarihte 'Ankyra' ve 'Engürü' gibi farklı biçimlerde anılmıştır.",
      "Ankara Kalesi'nin temelleri Hitit dönemine kadar uzanmaktadır.",
      "Anadolu Medeniyetleri Müzesi, 1997 yılında Avrupa'nın Yılın Müzesi ödülünü kazanmıştır.",
    ],
    quiz: [
      {
        question: "Ankara hangi yıl Türkiye Cumhuriyeti'nin başkenti ilan edilmiştir?",
        options: ["1920", "1923", "1930", "1938"],
        correctIndex: 1,
        explanation: "Ankara, 13 Ekim 1923'te başkent ilan edilmiştir.",
      },
      {
        question: "Anıtkabir kime aittir?",
        options: ["II. Abdülhamid", "Mustafa Kemal Atatürk", "İsmet İnönü", "Fatih Sultan Mehmet"],
        correctIndex: 1,
        explanation: "Anıtkabir, Mustafa Kemal Atatürk'ün anıt mezarıdır.",
      },
      {
        question: "Anadolu Medeniyetleri Müzesi hangi ödülü kazanmıştır?",
        options: ["Nobel Ödülü", "Avrupa Yılın Müzesi Ödülü", "UNESCO Onur Ödülü", "Grammy Ödülü"],
        correctIndex: 1,
        explanation: "Müze, 1997 yılında Avrupa Yılın Müzesi ödülünü kazanmıştır.",
      },
      {
        question: "Ankara Kalesi'nin temelleri hangi döneme kadar uzanır?",
        options: ["Osmanlı", "Selçuklu", "Hitit", "Roma İmparatorluğu sonrası"],
        correctIndex: 2,
        explanation: "Kalenin temelleri Hitit dönemine kadar uzanmaktadır.",
      },
      {
        question: "Beypazarı Kurusu hangi ilin bir ilçesine özgüdür?",
        options: ["İzmir", "Ankara", "İstanbul", "Konya"],
        correctIndex: 1,
        explanation: "Beypazarı, Ankara'nın bir ilçesidir ve kurusuyla ünlüdür.",
      },
      {
        question: "Kocatepe Camii mimari olarak hangi dönemden ilham alır?",
        options: ["Selçuklu", "Osmanlı", "Bizans", "Modern minimalizm"],
        correctIndex: 1,
        explanation: "Kocatepe Camii, klasik Osmanlı cami mimarisinden ilham alınarak inşa edilmiştir.",
      },
    ],
  },
];
