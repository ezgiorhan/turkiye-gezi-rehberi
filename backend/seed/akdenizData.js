// AKDENİZ BÖLGESİ (8 il)
module.exports = [
  {
    slug: "antalya",
    name: "Antalya",
    region: "Akdeniz",
    shortDescription:
      "Türkiye'nin turizm başkenti; antik kentleri, turkuaz koyları ve Kaleiçi'nin tarihi dokusuyla bilinen Akdeniz incisi.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      { name: "Kaleiçi", description: "Dar sokakları, Osmanlı-Rum mimarisi ve tarihi limanıyla Antalya'nın kalbi sayılan eski şehir merkezi." },
      { name: "Düden Şelalesi", description: "Şehir içinde ve Lara sahilinde denize dökülen, farklı yükseklikleriyle bilinen iki ayrı şelale." },
      { name: "Aspendos Antik Tiyatrosu", description: "Günümüzde hâlâ konser ve etkinliklerde kullanılan, dünyanın en iyi korunmuş Roma tiyatrolarından biri." },
      { name: "Olimpos ve Yanartaş (Çıralı)", description: "Antik kent kalıntıları ile kayalardan doğal gazın sürekli alev alarak yandığı efsanevi Yanartaş'ın buluştuğu bölge." },
      { name: "Patara Antik Kenti", description: "Likya Birliği'nin başkentlerinden biri olan; antik tiyatrosu, meclis binası ve muazzam kumullarıyla ünlü büyüleyici arkeolojik sit alanı." },
    ],
    foods: [
      { name: "Antalya Piyazı", description: "Tahin, sarımsak ve limonla hazırlanan, beyaz fasulyeli özel bir piyaz çeşidi." },
      { name: "Hibeş", description: "Susam ezmesi (tahin) ve baharatlarla hazırlanan, ekmek üzerine sürülerek yenen sokak lezzeti." },
    ],
    funFacts: [
      "Aspendos Tiyatrosu, akustiği ve korunmuşluğuyla dünyanın en iyi ayakta kalmış Roma tiyatrolarından biri kabul edilir.",
      "Olimpos'taki Yanartaş, yer altından sızan doğal gazın kayalar arasında sürekli alevlenmesiyle oluşur ve antik Kimera efsanesine kaynaklık ettiği düşünülür.",
      "Antalya, yıllık ziyaretçi sayısıyla Türkiye'nin en çok turist ağırlayan illerinden biridir.",
    ],
    quiz: [
      { question: "Aspendos Tiyatrosu hangi medeniyetten kalmadır?", options: ["Roma", "Bizans", "Selçuklu", "Osmanlı"], correctIndex: 0, explanation: "Aspendos, Roma döneminden kalma, günümüzde hâlâ kullanılan bir tiyatrodur." },
      { question: "Yanartaş'ın efsanevi bağlantısı hangi mitolojik yaratıkla ilişkilendirilir?", options: ["Kimera", "Sfenks", "Minotor", "Pegasus"], correctIndex: 0, explanation: "Yanartaş'ın sürekli yanan alevleri, antik Kimera efsanesine kaynaklık ettiği düşünülür." },
      { question: "Kaleiçi, Antalya'nın hangi bölümünü tanımlar?", options: ["Yeni sanayi bölgesi", "Tarihi eski şehir merkezi", "Havalimanı çevresi", "Dağlık kırsal alan"], correctIndex: 1, explanation: "Kaleiçi, Antalya'nın Osmanlı-Rum dokusunu koruyan tarihi eski şehir merkezidir." },
      { question: "Düden Şelalesi nereye dökülür?", options: ["Göle", "Denize", "Bir mağaraya", "Yeraltı nehrine"], correctIndex: 1, explanation: "Düden Şelalesi'nin bir kolu Lara sahilinde doğrudan denize dökülür." },
      { question: "Antalya, Türkiye için hangi sektörde özellikle öne çıkar?", options: ["Ağır sanayi", "Turizm", "Madencilik", "Otomotiv"], correctIndex: 1, explanation: "Antalya, Türkiye'nin en çok turist ağırlayan illerinden biri olarak turizmin başkenti sayılır." },
    ],
  },
  {
    slug: "isparta",
    name: "Isparta",
    region: "Akdeniz",
    shortDescription:
      "Gül üretimiyle 'Gülün Başkenti' olarak anılan, göller ve dağlarla çevrili Akdeniz-İç Anadolu geçiş şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      { name: "Isparta Gül Bahçeleri", description: "Haziran ayında hasat edilen, gül yağı üretiminde kullanılan geniş gül tarlaları." },
      { name: "Eğirdir Gölü", description: "Türkiye'nin dördüncü büyük gölü; adalar ve balıkçı tekneleriyle bilinen tatlı su gölü." },
      { name: "Kovada Gölü Milli Parkı", description: "Zengin bitki örtüsü ve doğa yürüyüşü rotalarıyla bilinen milli park." },
    ],
    foods: [
      { name: "Gül Reçeli", description: "Isparta gülünün taç yapraklarından hazırlanan, kendine özgü kokusuyla bilinen reçel." },
      { name: "Gül Şerbeti", description: "Gül suyu ve şekerle hazırlanan geleneksel, serinletici bir içecek." },
      { name: "Isparta Çökeleği", description: "Yağsız süzme peynirden yapılan, kahvaltılarda tüketilen yöresel bir peynir." },
    ],
    funFacts: [
      "Türkiye'nin gül yağı üretiminin büyük bölümü Isparta'da gerçekleştirilir ve bu yağ dünya parfüm sanayisine ihraç edilir.",
      "Eğirdir Gölü, Türkiye'nin en büyük dördüncü gölü olup tatlı su balıkçılığı ile bilinir.",
      "Isparta gülü, özel bir tür olan 'yağ gülü' (Rosa damascena) çeşididir.",
    ],
    quiz: [
      { question: "Isparta hangi ürünüyle dünya çapında tanınır?", options: ["Çay", "Gül yağı", "Pamuk", "Zeytin"], correctIndex: 1, explanation: "Isparta, gül yağı üretiminde Türkiye'nin ve dünyanın önemli merkezlerindendir." },
      { question: "Eğirdir Gölü, Türkiye'nin kaçıncı büyük gölüdür?", options: ["Birinci", "İkinci", "Dördüncü", "Onuncu"], correctIndex: 2, explanation: "Eğirdir Gölü, Türkiye'nin dördüncü büyük gölüdür." },
      { question: "Isparta gülünün botanik türü hangisidir?", options: ["Rosa damascena", "Rosa canina", "Rosa gallica", "Rosa chinensis"], correctIndex: 0, explanation: "Isparta'da yetiştirilen 'yağ gülü', Rosa damascena türüdür." },
      { question: "Gül hasadı Isparta'da genellikle hangi ayda yapılır?", options: ["Ocak", "Haziran", "Eylül", "Aralık"], correctIndex: 1, explanation: "Gül hasadı, gülün en kokulu olduğu Haziran ayında gerçekleştirilir." },
      { question: "Isparta hangi coğrafi bölgede yer alır?", options: ["Akdeniz", "Karadeniz", "Doğu Anadolu", "Marmara"], correctIndex: 0, explanation: "Isparta, Akdeniz Bölgesi'nin İç Batı Anadolu'ya geçiş kesiminde yer alır." },
    ],
  },
  {
    slug: "burdur",
    name: "Burdur",
    region: "Akdeniz",
    shortDescription:
      "Beyaz kumlu Salda Gölü ve yüksek rakımlı antik kenti Sagalassos ile bilinen, göller bölgesindeki sakin bir şehir.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      { name: "Salda Gölü", description: "Berrak turkuaz suyu ve beyaz kumsallarıyla 'Türkiye'nin Maldivleri' benzetmesiyle anılan doğa harikası göl." },
      { name: "Sagalassos Antik Kenti", description: "Denizden yüksekte kurulmuş, iyi korunmuş tiyatrosu ve heykelleriyle bilinen antik kent." },
      { name: "Burdur Gölü", description: "Şehir merkezinin hemen yanında yer alan, gün batımı manzaraları ve nesli tükenmekte olan dikkuyruk ördeklerine ev sahipliği yapan büyük tektonik göl." },
      { name: "İnsuyu Mağarası", description: "Türkiye'nin turizme açılan ilk mağarası olan; içerisindeki sarkıt, dikitler ve yeraltı gölleriyle dikkat çeken milyon yıllık doğal oluşum." },
    ],
    foods: [
      { name: "Burdur Şişi", description: "Küçük parçalar halinde şişe dizilip ızgarada pişirilen, sade baharatlarla hazırlanan et yemeği." },
      { name: "Gölhisar Kavurması:", description: "Bakır tencerelerde, etin kendi yağıyla ve minimum baharatla saatlerce ağır ateşte pişirilerek hazırlandığı et yemeği." },
    ],
    funFacts: [
      "Salda Gölü'nün beyaz mineral kumsalları, jeolojik benzerliği nedeniyle NASA tarafından Mars araştırmaları kapsamında incelenmiştir.",
      "Sagalassos, deniz seviyesinden yaklaşık 1.500 metre yükseklikte kurulmuş antik kentlerden biridir.",
      "Burdur Gölü, kışın binlerce flamingoya ev sahipliği yapan önemli bir sulak alandır.",
    ],
    quiz: [
      { question: "Salda Gölü hangi kurum tarafından Mars araştırmaları için incelenmiştir?", options: ["ESA", "NASA", "Roscosmos", "JAXA"], correctIndex: 1, explanation: "Salda Gölü'nün beyaz kumsalları, jeolojik benzerliği nedeniyle NASA tarafından incelenmiştir." },
      { question: "Sagalassos Antik Kenti'nin dikkat çeken özelliği nedir?", options: ["Deniz kıyısında olması", "Çok yüksek rakımda kurulmuş olması", "Yer altında olması", "Ahşap yapılı olması"], correctIndex: 1, explanation: "Sagalassos, denizden yaklaşık 1.500 metre yükseklikte kurulmuş bir antik kenttir." },
      { question: "Burdur Gölü hangi kuş türüyle bilinir?", options: ["Flamingo", "Penguen", "Kartal", "Baykuş"], correctIndex: 0, explanation: "Burdur Gölü, kışın flamingo popülasyonuna ev sahipliği yapar." },
      { question: "Salda Gölü'nün suyunun rengi nasıl tanımlanır?", options: ["Kahverengi", "Turkuaz/berrak", "Kırmızımsı", "Siyah"], correctIndex: 1, explanation: "Salda Gölü, berrak turkuaz suyu ve beyaz kumsallarıyla bilinir." },
      { question: "Burdur hangi bölgede yer alır?", options: ["Akdeniz (Göller Bölgesi)", "Karadeniz", "Marmara", "Güneydoğu Anadolu"], correctIndex: 0, explanation: "Burdur, Akdeniz Bölgesi'nin Göller Bölgesi olarak bilinen kesiminde yer alır." },
    ],
  },
  {
    slug: "mersin",
    name: "Mersin",
    region: "Akdeniz",
    shortDescription:
      "Kızkalesi'nin denizdeki siluetiyle, Tarsus'un tarihiyle ve limanıyla bilinen Doğu Akdeniz'in önemli liman kenti.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      { name: "Kızkalesi", description: "Denizin ortasında küçük bir adacık üzerine inşa edilmiş, ortaçağdan kalma etkileyici kale." },
      { name: "Tarsus (Kleopatra Kapısı ve Tarsus Şelalesi)", description: "Aziz Pavlus'un doğduğu şehir olarak bilinen, tarihi kapısı ve şehir merkezindeki şelalesiyle ünlü ilçe." },
      { name: "Soğuksu Milli Parkı", description: "Serin ormanları ve piknik alanlarıyla yaz aylarında sıklıkla tercih edilen doğa parkı." },
    ],
    foods: [
      { name: "Mersin Tantunisi", description: "İnce dilimlenmiş etin özel bir yöntemle kavrulup lavaş içinde servis edildiği meşhur sokak lezzeti." },
      { name: "Cezerye", description: "Havuç, hindistan cevizi ve fındıkla hazırlanan, Mersin'in geleneksel tatlısı." },
      { name: "Mersin Şalgamı", description: "Kırmızı havuç ve turşu suyundan hazırlanan, ekşi ve baharatlı geleneksel içecek." },
    ],
    funFacts: [
      "Tarsus, Hristiyanlığın önemli isimlerinden Aziz Pavlus'un doğum yeri olarak bilinir.",
      "Kızkalesi, karadaki kalesiyle birlikte bir çift kale oluşturur ve denizdeki kale bir adacık üzerine kuruludur.",
      "Mersin, Türkiye'nin Doğu Akdeniz'deki en büyük limanlarından birine sahiptir.",
    ],
    quiz: [
      { question: "Aziz Pavlus'un doğduğu şehir olarak bilinen Mersin ilçesi hangisidir?", options: ["Tarsus", "Erdemli", "Silifke", "Mut"], correctIndex: 0, explanation: "Tarsus, Hristiyanlık tarihinde önemli bir isim olan Aziz Pavlus'un doğum yeridir." },
      { question: "Kızkalesi nerede konumlanmıştır?", options: ["Bir tepe üzerinde", "Denizdeki bir adacıkta", "Bir vadinin içinde", "Bir mağarada"], correctIndex: 1, explanation: "Kızkalesi, denizin ortasındaki küçük bir adacık üzerine inşa edilmiştir." },
      { question: "Cezerye'nin ana malzemesi nedir?", options: ["Elma", "Havuç", "Muz", "Portakal"], correctIndex: 1, explanation: "Cezerye, havuç, hindistan cevizi ve fındıkla hazırlanan geleneksel bir tatlıdır." },
      { question: "Mersin tantunisi nasıl servis edilir?", options: ["Tabakta çorba olarak", "Lavaş içinde", "Şişte", "Fırında güveç olarak"], correctIndex: 1, explanation: "Tantuni, kavrulmuş ince et diliminin lavaş içine sarılmasıyla servis edilir." },
      { question: "Mersin, hangi özelliğiyle ekonomik açıdan önemlidir?", options: ["Büyük bir limana sahip olması", "Kayak merkezleri", "Maden ocakları", "Otomotiv fabrikaları"], correctIndex: 0, explanation: "Mersin, Doğu Akdeniz'in en büyük limanlarından birine ev sahipliği yapar." },
    ],
  },
  {
    slug: "adana",
    name: "Adana",
    region: "Akdeniz",
    shortDescription:
      "Adana Kebap'ın memleketi, tarihi Taşköprü'sü ve Sabancı Merkez Camii'yle bilinen Çukurova'nın kalbi.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      { name: "Taşköprü", description: "Roma döneminden kalma, günümüzde hâlâ yaya geçişine açık olan tarihi köprü." },
      { name: "Sabancı Merkez Camii", description: "Altı minaresiyle bilinen, Türkiye'nin en büyük camilerinden biri." },
      { name: "Varda Köprüsü", description: "Demiryolu tarihine tanıklık eden, etkileyici mimarisiyle bilinen tarihi viyadük." },
    ],
    foods: [
      { name: "Adana Kebap", description: "Elle kıyılmış kuzu etinin baharatlarla yoğrulup şişte közlenmesiyle hazırlanan dünyaca ünlü kebap." },
      { name: "Şalgam Suyu", description: "Kara havuç ve turşu suyundan yapılan, Adana mutfağının vazgeçilmez ekşi içeceği." },
    ],
    funFacts: [
      "Adana Kebap, adını aldığı şehirden dünya mutfaklarına yayılmış en tanınmış Türk yemeklerinden biridir.",
      "Taşköprü, Roma döneminden bu yana kullanılmaya devam eden en eski köprülerden biri kabul edilir.",
      "Sabancı Merkez Camii, altı minaresiyle Türkiye'deki az sayıdaki çok minareli camilerden biridir.",
    ],
    quiz: [
      { question: "Adana Kebap hangi etten yapılır?", options: ["Kıyılmış kuzu eti", "Tavuk göğsü", "Balık", "Hindi"], correctIndex: 0, explanation: "Adana Kebap, elle kıyılmış kuzu etinin baharatlanıp şişte pişirilmesiyle hazırlanır." },
      { question: "Taşköprü hangi dönemden kalmadır?", options: ["Osmanlı", "Roma", "Selçuklu", "Bizans"], correctIndex: 1, explanation: "Taşköprü, Roma döneminden kalma ve hâlâ kullanılan bir köprüdür." },
      { question: "Sabancı Merkez Camii kaç minareye sahiptir?", options: ["İki", "Dört", "Altı", "Sekiz"], correctIndex: 2, explanation: "Sabancı Merkez Camii, altı minaresiyle bilinen büyük bir camidir." },
      { question: "Şalgam suyunun ana malzemesi nedir?", options: ["Kırmızı havuç ve turşu suyu", "Domates", "Elma", "Nar"], correctIndex: 0, explanation: "Şalgam, kara/kırmızı havuç ve turşu suyundan yapılan ekşi bir içecektir." },
      { question: "Adana hangi bölgede yer alır?", options: ["Akdeniz (Çukurova)", "Ege", "Karadeniz", "İç Anadolu"], correctIndex: 0, explanation: "Adana, Akdeniz Bölgesi'nin verimli Çukurova ovasında yer alır." },
    ],
  },
  {
    slug: "hatay",
    name: "Hatay",
    region: "Akdeniz",
    shortDescription:
      "Farklı din ve kültürlerin yüzyıllardır bir arada yaşadığı, zengin mutfağı ve tarihi Antakya'sıyla bilinen sınır şehri.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      { name: "Hatay Arkeoloji Müzesi", description: "Dünyanın en zengin mozaik koleksiyonlarından birine ev sahipliği yapan önemli müze." },
      { name: "St. Pierre Kilisesi", description: "Bir kayaya oyulmuş, dünyanın ilk kiliselerinden biri olarak kabul edilen tarihi mekân." },
      { name: "Habib-i Neccar Camii", description: "Anadolu'nun ilk camilerinden biri olarak bilinen, tarihi öneme sahip yapı." },
    ],
    foods: [
      { name: "Hatay Künefesi", description: "İnce tel kadayıf ve özel bir peynirle hazırlanan, şehrin en tanınmış tatlısı." },
      { name: "Ali Nazik", description: "Közlenmiş patlıcan püresi üzerine kızarmış kıymalı etin eklenmesiyle hazırlanan zengin bir yemek." },
      { name: "Hatay Kebapları", description: "Onlarca çeşidiyle bilinen, bölgeye özgü baharat karışımlarıyla hazırlanan kebap kültürü." },
    ],
    funFacts: [
      "Hatay Arkeoloji Müzesi, dünyanın en büyük Roma mozaiği koleksiyonlarından birini barındırır.",
      "Antakya, erken Hristiyanlık tarihinde önemli bir merkez olmuş ve St. Pierre Kilisesi burada yer alır.",
      "Hatay mutfağı, UNESCO tarafından 'Yaratıcı Şehirler Ağı - Gastronomi' kategorisinde tanınmıştır.",
    ],
    quiz: [
      { question: "Hatay Arkeoloji Müzesi neyiyle dünyaca tanınır?", options: ["Mumya koleksiyonu", "Mozaik koleksiyonu", "Silah koleksiyonu", "Para koleksiyonu"], correctIndex: 1, explanation: "Müze, dünyanın en zengin Roma mozaiği koleksiyonlarından birine sahiptir." },
      { question: "St. Pierre Kilisesi'nin özelliği nedir?", options: ["Ahşap yapılı olması", "Bir kayaya oyulmuş olması", "Yeraltında olması", "Cam tavanlı olması"], correctIndex: 1, explanation: "St. Pierre Kilisesi, bir kayaya oyularak inşa edilmiş, dünyanın ilk kiliselerinden biridir." },
      { question: "Hatay mutfağı UNESCO'dan hangi tanınırlığı almıştır?", options: ["Dünya Mirası", "Yaratıcı Şehirler Ağı - Gastronomi", "Somut Olmayan Miras Ödülü", "Kızıl Liste"], correctIndex: 1, explanation: "Hatay, UNESCO Yaratıcı Şehirler Ağı'na gastronomi alanında dahil edilmiştir." },
      { question: "Ali Nazik yemeğinin temel malzemesi nedir?", options: ["Közlenmiş patlıcan püresi", "Haşlanmış nohut", "Kızarmış patates", "Pilav"], correctIndex: 0, explanation: "Ali Nazik, közlenmiş patlıcan püresi üzerine kıymalı etin eklenmesiyle hazırlanır." },
      { question: "Habib-i Neccar Camii ne açıdan önemlidir?", options: ["Anadolu'nun ilk camilerinden biri olması", "Dünyanın en büyük camisi olması", "Yalnızca modern bir yapı olması", "Yeraltında olması"], correctIndex: 0, explanation: "Habib-i Neccar Camii, Anadolu'nun ilk camilerinden biri olarak kabul edilir." },
    ],
  },
  {
    slug: "kahramanmaras",
    name: "Kahramanmaraş",
    region: "Akdeniz",
    shortDescription:
      "Dövülerek yapılan dondurmasıyla dünyaca tanınan, Kurtuluş Savaşı'ndaki direnişiyle 'Kahraman' unvanını kazanmış şehir.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      { name: "Ahır Dağı", description: "Kış aylarında kayak yapılabilen, şehre hakim yüksek bir dağlık alan." },
      { name: "Kahramanmaraş Kalesi", description: "Şehir merkezine hakim tepede yer alan, tarihi çok eski dönemlere uzanan kale." },
      { name: "Yedikuyular Tabiat Parkı", description: "Piknik alanları ve doğa yürüyüşü rotalarıyla bilinen yeşil bir dinlenme alanı." },
    ],
    foods: [
      { name: "Maraş Dondurması", description: "Keçi sütü ve salep kullanılarak dövülerek yapılan, yoğun ve dayanıklı kıvamıyla ünlü dondurma." },
      { name: "Maraş Biberi (Pul Biber)", description: "Az acılı, tatlı-acı dengeli aroması ve koyu rengiyle dünyaca tanınan pul biber çeşidi." },
      { name: "Maraş Tarhanası", description: "Yoğurt, un ve sebzelerle hazırlanıp kurutulan, kış aylarında çorba yapımında kullanılan malzeme." },
    ],
    funFacts: [
      "Şehir, Kurtuluş Savaşı sırasında halkın işgale karşı gösterdiği direniş nedeniyle 'Kahraman' unvanını almıştır.",
      "Maraş Dondurması, uzun sopalarla dövülerek hazırlanan özel tekniğiyle dünyada eşi az bulunan bir dondurma türüdür.",
      "Maraş biberi (pul biber), Türk mutfağının en çok kullanılan baharatlarından biri haline gelmiştir.",
    ],
    quiz: [
      { question: "Kahramanmaraş, 'Kahraman' unvanını hangi olay nedeniyle almıştır?", options: ["Bir deprem sonrası yeniden inşa", "Kurtuluş Savaşı'ndaki direniş", "Bir spor başarısı", "Bir bilimsel keşif"], correctIndex: 1, explanation: "Şehir, Kurtuluş Savaşı sırasındaki işgale karşı direnişiyle bu unvanı kazanmıştır." },
      { question: "Maraş Dondurması hangi özelliğiyle bilinir?", options: ["Çok hızlı erimesi", "Dövülerek yapılması ve yoğun kıvamı", "Şekersiz olması", "Sadece meyveli olması"], correctIndex: 1, explanation: "Maraş Dondurması, keçi sütü ve salepten dövülerek yapılan yoğun kıvamıyla tanınır." },
      { question: "Maraş biberi hangi tatla bilinir?", options: ["Aşırı acı", "Tatlı-acı dengeli", "Tamamen tatlı", "Ekşi"], correctIndex: 1, explanation: "Maraş biberi, az acılı ve tatlı-acı dengeli aromasıyla tanınan bir pul biber çeşididir." },
      { question: "Ahır Dağı hangi kış sporuyla bilinir?", options: ["Buz pateni", "Kayak", "Kızak yarışı", "Curling"], correctIndex: 1, explanation: "Ahır Dağı, kış aylarında kayak yapılabilen bir dağlık alandır." },
      { question: "Maraş dondurmasının yapımında hangi malzeme kullanılır?", options: ["Salep", "Jelatin", "Nişasta", "Agar agar"], correctIndex: 0, explanation: "Salep, Maraş dondurmasına karakteristik kıvamını veren malzemelerden biridir." },
    ],
  },
  {
    slug: "osmaniye",
    name: "Osmaniye",
    region: "Akdeniz",
    shortDescription:
      "Hitit dönemine ait çift dilli yazıtlarıyla ünlü Karatepe-Aslantaş'a ev sahipliği yapan, yer fıstığı üretimiyle bilinen genç bir Akdeniz ili.",
    heroImage: "",
    mapPosition: { x: 0, y: 0 },
    places: [
      { name: "Karatepe-Aslantaş Açık Hava Müzesi", description: "Geç Hitit dönemine ait, Fenike ve hiyeroglif Hitit dilinde çift dilli yazıtlarıyla bilinen önemli ören yeri." },
      { name: "Düziçi Yaylaları", description: "Serin havası ve yeşil dokusuyla yaz aylarında tercih edilen yayla bölgesi." },
      { name: "Osmaniye Kenti Merkez Parkları", description: "Şehir içindeki geniş yeşil alanlar ve aile etkinlikleri için düzenlenmiş rekreasyon alanları." },
    ],
    foods: [
      { name: "Osmaniye Yer Fıstığı", description: "Bölgenin verimli topraklarında yetişen, Türkiye'nin önemli yer fıstığı üretim merkezi olan Osmaniye'nin başlıca ürünü." },
      { name: "Katmer", description: "İnce açılmış hamurun iç harçla katlanıp pişirilmesiyle hazırlanan tuzlu veya tatlı hamur işi." },
      { name: "Osmaniye Kebapları", description: "Bölgeye özgü baharat karışımlarıyla hazırlanan çeşitli kebap tarifleri." },
    ],
    funFacts: [
      "Karatepe-Aslantaş'taki yazıtlar, Fenike alfabesinin çözülmesine katkı sağlayan önemli çift dilli metinlerden biridir.",
      "Osmaniye, Türkiye'nin önde gelen yer fıstığı üretim merkezlerinden biridir.",
      "Osmaniye, 1996 yılında il statüsü kazanmış, Türkiye'nin nispeten genç illerinden biridir.",
    ],
    quiz: [
      { question: "Karatepe-Aslantaş hangi dönemden kalma yazıtlarla bilinir?", options: ["Geç Hitit dönemi", "Roma dönemi", "Osmanlı dönemi", "Bizans dönemi"], correctIndex: 0, explanation: "Karatepe-Aslantaş, geç Hitit dönemine ait çift dilli yazıtlarıyla tanınır." },
      { question: "Karatepe yazıtları hangi iki dilde/yazı sisteminde yazılmıştır?", options: ["Latin ve Arap", "Fenike ve hiyeroglif Hitit", "Yunan ve Latin", "Sümer ve Akad"], correctIndex: 1, explanation: "Yazıtlar, Fenike alfabesi ve hiyeroglif Hitit yazısıyla çift dilli olarak yazılmıştır." },
      { question: "Osmaniye, hangi tarım ürünüyle özellikle tanınır?", options: ["Fındık", "Yer fıstığı", "Çay", "Muz"], correctIndex: 1, explanation: "Osmaniye, Türkiye'nin önemli yer fıstığı üretim merkezlerinden biridir." },
      { question: "Osmaniye ne zaman il statüsü kazanmıştır?", options: ["1923", "1996", "1950", "2010"], correctIndex: 1, explanation: "Osmaniye, 1996 yılında il statüsüne kavuşmuştur." },
      { question: "Osmaniye hangi bölgede yer alır?", options: ["Akdeniz", "Güneydoğu Anadolu", "Ege", "Karadeniz"], correctIndex: 0, explanation: "Osmaniye, Akdeniz Bölgesi'nin doğu kesiminde yer alır." },
    ],
  },
];
