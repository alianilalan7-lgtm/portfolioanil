export interface BlogStat {
  label: string;
  value: string;
}

export type BlogContentBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "stats"; items: BlogStat[] };

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  status: "published" | "draft";
  content?: BlogContentBlock[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: "saas-uygulamasi-gelistirme-maliyeti-2026",
    title: "SaaS Uygulamasi Gelistirme Maliyeti 2026: Gercek Fiyat Rehberi",
    excerpt:
      "2026'da SaaS uygulamasi gelistirme maliyetini etkileyen ana faktorleri, gercek fiyat araliklarini ve MVP ile daha hizli cikis stratejisini anlatiyorum.",
    publishedAt: "2026-02-21",
    readTime: "8 min",
    category: "SaaS",
    tags: ["SaaS", "MVP", "Freelance", "Maliyet"],
    featured: true,
    status: "published",
    content: [
      { type: "heading", text: "Giris" },
      {
        type: "paragraph",
        text: "\"SaaS uygulamasi yaptirmak ne kadar?\" Freelance developerlara en cok sorulan sorulardan biri bu.",
      },
      {
        type: "paragraph",
        text: "2026 yilinda bir SaaS uygulamasi gelistirme maliyeti; ozelliklere, ekip yapisina ve teknoloji secimine gore ciddi sekilde degisir. Bu rehberde gercekci fiyat araliklarini, maliyeti etkileyen faktorleri ve nasil daha hizli MVP cikarabilecegini goreceksin.",
      },
      { type: "heading", text: "SaaS Nedir? Kisaca" },
      {
        type: "paragraph",
        text: "SaaS (Software as a Service), kullanicilarin uygulamayi internet uzerinden abonelikle kullandigi yazilim modelidir.",
      },
      { type: "subheading", text: "Ornek Uygulamalar" },
      {
        type: "list",
        items: [
          "CRM sistemleri",
          "Rezervasyon uygulamalari",
          "Dashboard paneller",
          "AI araclari",
        ],
      },
      {
        type: "paragraph",
        text: "Bugun bircok startup SaaS modeli ile buyuyor.",
      },
      { type: "heading", text: "2026 SaaS Gelistirme Maliyet Araliklari" },
      { type: "subheading", text: "Basit MVP SaaS" },
      { type: "paragraph", text: "Ornek: rezervasyon sistemi, dashboard panel." },
      { type: "subheading", text: "Ozellikler" },
      {
        type: "list",
        items: ["Kullanici girisi", "Admin panel", "Veritabani", "Temel dashboard"],
      },
      {
        type: "stats",
        items: [
          { label: "Sure", value: "4-8 hafta" },
          { label: "Maliyet", value: "4.000 - 10.000 USD" },
        ],
      },
      { type: "subheading", text: "Orta Seviye SaaS" },
      { type: "paragraph", text: "Ornek: AI entegrasyonlu web uygulamasi." },
      { type: "subheading", text: "Ozellikler" },
      {
        type: "list",
        items: [
          "Rol bazli kullanici sistemi",
          "Odeme altyapisi",
          "API entegrasyonlari",
          "Raporlama sistemi",
        ],
      },
      {
        type: "stats",
        items: [
          { label: "Sure", value: "2-4 ay" },
          { label: "Maliyet", value: "10.000 - 25.000 USD" },
        ],
      },
      { type: "subheading", text: "Gelismis SaaS Platformu" },
      { type: "paragraph", text: "Ornek: marketplace, AI platformu." },
      { type: "subheading", text: "Ozellikler" },
      {
        type: "list",
        items: [
          "Coklu kullanici rolleri",
          "Abonelik sistemi",
          "Gelismis dashboard",
          "Olceklenebilir mimari",
        ],
      },
      {
        type: "stats",
        items: [
          { label: "Sure", value: "4-8 ay" },
          { label: "Maliyet", value: "25.000 - 60.000 USD" },
        ],
      },
      { type: "heading", text: "Maliyeti En Cok Etkileyen Faktorler" },
      { type: "subheading", text: "1. Ozellik Sayisi" },
      {
        type: "paragraph",
        text: "En buyuk maliyet belirleyicisi ozellik sayisidir. Her yeni ozellik, yeni gelistirme suresi demektir.",
      },
      { type: "subheading", text: "2. AI Entegrasyonu" },
      {
        type: "paragraph",
        text: "OpenAI, otomasyon ve veri analizi gibi ozellikler maliyeti artirir ama urun degerini de katlar.",
      },
      { type: "subheading", text: "3. Ajans mi Freelance mi?" },
      {
        type: "list",
        items: [
          "Ajanslar genelde yuzde 50-100 daha pahali olabilir.",
          "Freelance developer modeli daha hizli ve daha esnek ilerleyebilir.",
          "Bir cok startup bu nedenle ilk versiyonda freelance ile baslar.",
        ],
      },
      { type: "heading", text: "SaaS Maliyetini Nasil Dusurursunuz?" },
      {
        type: "list",
        items: [
          "MVP yaklasimi kullanin: Once en kucuk calisan urunu cikarin.",
          "Modern stack secin: Next.js + Supabase gibi araclar sureyi ciddi sekilde kisaltir.",
          "Kucuk baslayin, buyutun: Basarili SaaS urunlerinin cogu MVP ile baslar.",
        ],
      },
      { type: "heading", text: "Sonuc" },
      {
        type: "paragraph",
        text: "2026 yilinda SaaS gelistirme maliyeti genis bir araliga sahiptir, ancak dogru MVP yaklasimiyla hizli ve verimli sekilde baslamak mumkundur.",
      },
      {
        type: "paragraph",
        text: "SaaS fikrini hizlica urune donusturmek istiyorsan iletisime gecebilirsin.",
      },
    ],
  },
  {
    slug: "mvp-nedir-startuplar-icin-hizli-urun-gelistirme-rehberi",
    title: "MVP Nedir? Startuplar Icin Hizli Urun Gelistirme Rehberi",
    excerpt:
      "MVP yaklasimi ile urunu en gerekli ozelliklerle hizlica yayina alarak fikri test etmenin ve riskleri azaltmanin pratik yolunu anlatiyorum.",
    publishedAt: "2026-02-20",
    readTime: "6 min",
    category: "Startup",
    tags: ["MVP", "Startup", "SaaS", "Urun Gelistirme"],
    status: "published",
    content: [
      { type: "heading", text: "MVP Nedir?" },
      {
        type: "paragraph",
        text: "MVP (Minimum Viable Product), urunun en temel haliyle hizlica yayinlanmasidir.",
      },
      { type: "subheading", text: "Amac" },
      {
        type: "list",
        items: [
          "Fikri test etmek",
          "Gercek kullanici gormek",
          "Zaman ve para kaybetmemek",
        ],
      },
      {
        type: "paragraph",
        text: "Bugun Airbnb, Dropbox ve Uber gibi urunler ilk asamada MVP yaklasimi ile basladi.",
      },
      { type: "heading", text: "Neden MVP ile Baslamalisiniz?" },
      {
        type: "paragraph",
        text: "Startup'larin cogu, kimsenin istemedigi ozelliklere fazla zaman harcadigi icin basarisiz olur. MVP bu riski azaltir.",
      },
      { type: "heading", text: "MVP'de Olmasi Gerekenler" },
      {
        type: "paragraph",
        text: "Bir SaaS MVP genellikle su temel parcalari icerir:",
      },
      {
        type: "list",
        items: [
          "Kullanici kayit ve giris",
          "Temel dashboard",
          "Ana ozellik",
          "Basit admin panel",
        ],
      },
      {
        type: "paragraph",
        text: "Ilk surum icin bunlar yeterlidir.",
      },
      { type: "heading", text: "MVP Gelistirme Sureci" },
      { type: "subheading", text: "1. Fikir dogrulama" },
      {
        type: "paragraph",
        text: "Hedef kullanici kim ve problem ne, netlestirilir.",
      },
      { type: "subheading", text: "2. Ozellikleri azaltma" },
      {
        type: "paragraph",
        text: "En kritik degeri veren tek ozellige odaklanilir.",
      },
      { type: "subheading", text: "3. Hizli gelistirme" },
      {
        type: "paragraph",
        text: "Modern bir stack ile gelistirme suresi kisaltilir.",
      },
      { type: "subheading", text: "4. Yayinlama" },
      {
        type: "paragraph",
        text: "Gercek kullanicilar urunu test eder ve veriye dayali geri bildirim toplanir.",
      },
      { type: "heading", text: "MVP Gelistirme Suresi" },
      {
        type: "stats",
        items: [
          { label: "Ortalama", value: "4-8 hafta" },
          { label: "Ajans ile", value: "3-6 ay" },
        ],
      },
      {
        type: "paragraph",
        text: "Bu nedenle pek cok startup ilk etapta freelance developer modeliyle ilerler.",
      },
      { type: "heading", text: "Sonuc" },
      {
        type: "paragraph",
        text: "MVP, riskleri azaltmanin ve urunu hizlica pazara cikarmanin en dogru yollarindan biridir.",
      },
      {
        type: "paragraph",
        text: "MVP gelistirmek icin iletisime gecebilirsin.",
      },
    ],
  },
  {
    slug: "kucuk-isletmeler-icin-yapay-zeka-otomasyonu-gercek-kullanim",
    title: "Kucuk Isletmeler Icin Yapay Zeka Otomasyonu (Gercek Kullanim Senaryolari)",
    excerpt:
      "Kucuk isletmelerde AI otomasyonunun zaman kazandirip maliyet dusuren ve satis artiran pratik kullanim senaryolarini ozetliyorum.",
    publishedAt: "2026-02-19",
    readTime: "6 min",
    category: "AI Automation",
    tags: ["AI", "Otomasyon", "Kucuk Isletme", "Verimlilik"],
    status: "published",
    content: [
      { type: "heading", text: "Giris" },
      {
        type: "paragraph",
        text: "Yapay zeka artik sadece buyuk sirketler icin degil.",
      },
      {
        type: "paragraph",
        text: "Kucuk isletmeler de AI otomasyonu ile zaman kazaniyor, maliyet dusuruyor ve satis artiriyor.",
      },
      { type: "subheading", text: "1. Otomatik musteri destek chatbotlari" },
      {
        type: "paragraph",
        text: "Web sitesine eklenen AI chatbotlar 7/24 musteri sorularini yanitlar, randevu alir ve sik sorulan sorulari cevaplar.",
      },
      {
        type: "paragraph",
        text: "Bir cok isletme bu modelle destek maliyetini ciddi oranda azaltabiliyor.",
      },
      { type: "subheading", text: "2. Ic operasyon otomasyonu" },
      {
        type: "list",
        items: [
          "Raporlarin otomatik hazirlanmasi",
          "Tekrarlayan Excel islerinin azalmasi",
          "Anlik dashboard olusumu",
        ],
      },
      {
        type: "paragraph",
        text: "Bu yaklasim, saatler suren operasyonel isleri dakikalar seviyesine indirebilir.",
      },
      { type: "subheading", text: "3. Rezervasyon ve randevu sistemleri" },
      {
        type: "paragraph",
        text: "Restoran, klinik ve guzellik salonu gibi isletmelerde AI destekli rezervasyon sistemleri cift rezervasyonu engeller, hatirlatma gonderir ve no-show oranini dusurur.",
      },
      { type: "subheading", text: "4. Satis ve pazarlama otomasyonu" },
      {
        type: "list",
        items: [
          "Email icerigi uretimi",
          "Kampanya onerileri",
          "Icerik planlama ve uretim destegi",
        ],
      },
      {
        type: "paragraph",
        text: "Bu, kucuk isletmeler icin olceklenebilir bir buyume avantaji sunar.",
      },
      { type: "heading", text: "Sonuc" },
      {
        type: "paragraph",
        text: "AI otomasyonu artik bir luks degil, rekabet avantaji saglayan temel bir arac haline geldi.",
      },
    ],
  },
  {
    slug: "freelancer-mi-ajans-mi-web-uygulamasi-gelistirirken-hangisi-daha-mantikli",
    title: "Freelancer mi Ajans mi? Web Uygulamasi Gelistirirken Hangisi Daha Mantikli?",
    excerpt:
      "Web uygulamasi veya SaaS projesinde ajans ve freelance modelini maliyet, hiz, esneklik ve iletisim acisindan karsilastiriyoruz.",
    publishedAt: "2026-02-18",
    readTime: "6 min",
    category: "Freelance",
    tags: ["Freelance", "Ajans", "SaaS", "Maliyet"],
    status: "published",
    content: [
      { type: "heading", text: "Giris" },
      {
        type: "paragraph",
        text: "Bir web uygulamasi ya da SaaS projesi baslatirken en kritik kararlardan biri sunu secmektir: Freelancer ile mi calisilmali yoksa bir ajansla mi?",
      },
      {
        type: "paragraph",
        text: "Bu yazida maliyet, hiz, esneklik ve iletisim acisindan iki modeli karsilastiriyoruz.",
      },
      { type: "heading", text: "Ajans ile Calismanin Avantajlari" },
      {
        type: "list",
        items: [
          "Buyuk ekip",
          "Tasarim, yazilim ve pazarlama disiplinlerinin birlikte ilerlemesi",
          "Kurumsal surec yapisi",
        ],
      },
      {
        type: "paragraph",
        text: "Ancak maliyet genellikle daha yuksektir.",
      },
      {
        type: "stats",
        items: [{ label: "Ortalama ajans maliyeti", value: "15.000 - 100.000 USD" }],
      },
      { type: "heading", text: "Freelance Developer ile Calismanin Avantajlari" },
      {
        type: "list",
        items: [
          "Daha dusuk maliyet",
          "Dogrudan iletisim",
          "Daha hizli karar alma",
          "Daha esnek gelistirme sureci",
        ],
      },
      {
        type: "stats",
        items: [{ label: "Ortalama freelance SaaS maliyeti", value: "4.000 - 25.000 USD" }],
      },
      {
        type: "paragraph",
        text: "Startup'larin buyuk bolumu MVP asamasinda freelance modeli tercih eder.",
      },
      { type: "heading", text: "Hangisi Size Uygun?" },
      {
        type: "list",
        items: [
          "MVP gelistiriyorsan: Freelancer",
          "Buyuk kurumsal platform hedefliyorsan: Ajans",
          "Hizli test yapmak istiyorsan: Freelancer",
          "6+ kisilik ekip gerekiyorsa: Ajans",
        ],
      },
      { type: "heading", text: "Sonuc" },
      {
        type: "paragraph",
        text: "Cogu startup icin ilk adimda freelance developer ile calismak daha mantiklidir.",
      },
      {
        type: "paragraph",
        text: "Projeni birlikte degerlendirmek icin iletisime gecebilirsin.",
      },
    ],
  },
  {
    slug: "kucuk-isletmeler-icin-online-rezervasyon-sistemi-nasil-kurulur",
    title: "Kucuk Isletmeler Icin Online Rezervasyon Sistemi Nasil Kurulur?",
    excerpt:
      "Restoran, klinik, guzellik salonu ve danismanlik isletmeleri icin online rezervasyon sistemini dogru kurmanin temel adimlarini anlatiyorum.",
    publishedAt: "2026-02-17",
    readTime: "6 min",
    category: "SaaS",
    tags: ["Rezervasyon", "Kucuk Isletme", "Operasyon", "SaaS"],
    status: "published",
    content: [
      { type: "heading", text: "Giris" },
      {
        type: "paragraph",
        text: "Restoran, klinik, guzellik salonu veya danismanlik hizmeti veriyorsan online rezervasyon sistemi artik zorunlu hale geldi.",
      },
      {
        type: "paragraph",
        text: "Peki rezervasyon sistemi nasil kurulur?",
      },
      { type: "subheading", text: "1. Ihtiyaclari Belirleyin" },
      {
        type: "list",
        items: [
          "Saatlik mi gunluk mu planlama gerekiyor?",
          "Calisan bazli planlama olacak mi?",
          "SMS hatirlatma gerekli mi?",
        ],
      },
      { type: "subheading", text: "2. Temel Ozellikler" },
      {
        type: "paragraph",
        text: "Bir rezervasyon sisteminde su ozellikler bulunmalidir:",
      },
      {
        type: "list",
        items: [
          "Takvim gorunumu",
          "Admin panel",
          "Musteri kaydi",
          "Hatirlatma sistemi",
          "Cakisma kontrolu",
        ],
      },
      { type: "subheading", text: "3. Hazir Sistem mi Ozel Yazilim mi?" },
      {
        type: "list",
        items: [
          "Hazir sistem: Aylik abonelik modeli ve sinirli ozellestirme",
          "Ozel yazilim: Isine gore tasarlanir ve uzun vadede daha esnektir",
        ],
      },
      { type: "subheading", text: "4. Ortalama Kurulum Maliyeti" },
      {
        type: "stats",
        items: [
          { label: "Basit rezervasyon sistemi", value: "3.000 - 8.000 USD" },
          { label: "AI destekli sistem", value: "8.000 - 15.000 USD" },
        ],
      },
      { type: "heading", text: "Sonuc" },
      {
        type: "paragraph",
        text: "Dogru rezervasyon sistemi no-show oranini dusurur ve operasyonu kolaylastirir.",
      },
      {
        type: "paragraph",
        text: "Isletmen icin ozel rezervasyon sistemi gelistirmek istersen iletisime gecebilirsin.",
      },
    ],
  },
  {
    slug: "supabase-mi-firebase-mi-startuplar-icin-hangisi-daha-mantikli",
    title: "Supabase mi Firebase mi? Startuplar Icin Hangisi Daha Mantikli?",
    excerpt:
      "Startup backend seciminde Supabase ve Firebase'i avantajlari, esneklik ve uzun vadeli surdurulebilirlik acisindan karsilastiriyorum.",
    publishedAt: "2026-02-16",
    readTime: "5 min",
    category: "Backend",
    tags: ["Supabase", "Firebase", "Startup", "Mimari"],
    status: "published",
    content: [
      { type: "heading", text: "Giris" },
      {
        type: "paragraph",
        text: "Startup kurarken backend secimi cok kritiktir. En cok karsilastirilan iki teknoloji Supabase ve Firebase'dir.",
      },
      { type: "heading", text: "Supabase Avantajlari" },
      {
        type: "list",
        items: [
          "PostgreSQL tabanli",
          "Acik kaynak",
          "SQL destegi",
          "Daha esnek veri yapisi",
        ],
      },
      { type: "heading", text: "Firebase Avantajlari" },
      {
        type: "list",
        items: [
          "Google altyapisi",
          "Gercek zamanli veri",
          "Hizli baslangic",
        ],
      },
      { type: "heading", text: "Startup'lar Icin Hangisi?" },
      {
        type: "paragraph",
        text: "Eger SQL biliyorsan, olceklenebilir SaaS kuruyorsan ve vendor lock-in istemiyorsan Supabase genellikle daha mantikli bir secenektir.",
      },
      { type: "heading", text: "Sonuc" },
      {
        type: "paragraph",
        text: "Uzun vadeli SaaS projelerinde Supabase cogu zaman daha surdurulebilir bir tercih olur.",
      },
      {
        type: "paragraph",
        text: "Projen icin dogru mimariyi belirlemek istersen iletisime gecebilirsin.",
      },
    ],
  },
  {
    slug: "ai-dashboard-nedir-isletmeler-icin-gercek-zamanli-veri-yonetimi",
    title: "AI Dashboard Nedir? Isletmeler Icin Gercek Zamanli Veri Yonetimi",
    excerpt:
      "AI dashboard yapisinin isletmelere otomatik raporlama, satis analizi ve tahminleme gibi alanlarda nasil deger kattigini anlatiyorum.",
    publishedAt: "2026-02-15",
    readTime: "5 min",
    category: "AI",
    tags: ["AI Dashboard", "Veri", "Analitik", "Isletme"],
    status: "published",
    content: [
      { type: "heading", text: "Giris" },
      {
        type: "paragraph",
        text: "AI dashboard, verileri analiz eden ve anlamli icgoruler ureten akilli yonetim panelleridir.",
      },
      { type: "heading", text: "AI Dashboard Ne Saglar?" },
      {
        type: "list",
        items: [
          "Otomatik rapor uretimi",
          "Satis analizi",
          "Performans takibi",
          "Tahminleme",
        ],
      },
      { type: "heading", text: "Hangi Isletmeler Icin Uygun?" },
      {
        type: "list",
        items: ["Perakende", "E-ticaret", "Lojistik", "Ajanslar"],
      },
      { type: "heading", text: "Ortalama Gelistirme Suresi" },
      {
        type: "stats",
        items: [{ label: "Sure", value: "4-10 hafta" }],
      },
      { type: "heading", text: "Sonuc" },
      {
        type: "paragraph",
        text: "Veriyi anlamayan isletme rekabet edemez.",
      },
      {
        type: "paragraph",
        text: "Isletmene ozel AI dashboard gelistirmek icin iletisime gecebilirsin.",
      },
    ],
  },
  {
    slug: "vardiya-planlama-yazilimi-nedir-perakende-icin-dijital-cozum",
    title: "Vardiya Planlama Yazilimi Nedir? Perakende Icin Dijital Cozum",
    excerpt:
      "Manuel vardiya planlamayi dijitallestiren yazilimlarin perakende operasyonlarinda verimlilik ve kar marji etkisini anlatiyorum.",
    publishedAt: "2026-02-14",
    readTime: "5 min",
    category: "SaaS",
    tags: ["Vardiya", "Perakende", "Planlama", "Operasyon"],
    status: "published",
    content: [
      { type: "heading", text: "Giris" },
      {
        type: "paragraph",
        text: "Manuel vardiya planlama hatalara ve verimsizlige yol acar. Vardiya planlama yazilimi bu sureci otomatiklestirir.",
      },
      { type: "heading", text: "Sagladigi Avantajlar" },
      {
        type: "list",
        items: [
          "Personel ihtiyaci analizi",
          "Fazla mesai kontrolu",
          "Satisa gore planlama",
          "KPI takibi",
        ],
      },
      { type: "heading", text: "Kimler Icin Uygun?" },
      {
        type: "list",
        items: ["Magazalar", "Zincir isletmeler", "Restoranlar"],
      },
      { type: "heading", text: "Sonuc" },
      {
        type: "paragraph",
        text: "Dogru planlama kar marjini artirir.",
      },
      {
        type: "paragraph",
        text: "Perakende operasyonlari icin ozel planlama sistemi gelistirmek istersen iletisime gecebilirsin.",
      },
    ],
  },
  {
    slug: "web-uygulamasi-gelistirme-suresi-ne-kadar-surer",
    title: "Web Uygulamasi Gelistirme Suresi Ne Kadar Surer?",
    excerpt:
      "Web uygulamalarinda gelistirme suresini etkileyen temel kalemleri ve basit, orta, gelismis projeler icin ortalama sure araliklarini ozetliyorum.",
    publishedAt: "2026-02-13",
    readTime: "4 min",
    category: "Product",
    tags: ["Web Uygulamasi", "Sure", "Planlama", "MVP"],
    status: "published",
    content: [
      { type: "heading", text: "Basit Uygulama" },
      {
        type: "stats",
        items: [{ label: "Ortalama sure", value: "4-6 hafta" }],
      },
      { type: "heading", text: "Orta Seviye" },
      {
        type: "stats",
        items: [{ label: "Ortalama sure", value: "2-4 ay" }],
      },
      { type: "heading", text: "Gelismis Platform" },
      {
        type: "stats",
        items: [{ label: "Ortalama sure", value: "4-8 ay" }],
      },
      { type: "heading", text: "Sureyi Etkileyen Faktorler" },
      {
        type: "list",
        items: ["Ozellik sayisi", "Ekip buyuklugu", "Tasarim karmasikligi"],
      },
      {
        type: "paragraph",
        text: "Projenin tahmini suresini netlestirmek icin iletisime gecebilirsin.",
      },
    ],
  },
  {
    slug: "ai-product-builder-nedir-yeni-nesil-yazilim-gelistirme-modeli",
    title: "AI Product Builder Nedir? Yeni Nesil Yazilim Gelistirme Modeli",
    excerpt:
      "AI Product Builder rolu, MVP teslimi, AI entegrasyonu ve otomasyon kurulumunu hizlandirarak urun gelistirmede yeni bir model sunar.",
    publishedAt: "2026-02-12",
    readTime: "5 min",
    category: "AI Engineering",
    tags: ["AI Product Builder", "MVP", "Otomasyon", "SaaS"],
    status: "published",
    content: [
      { type: "heading", text: "Giris" },
      {
        type: "paragraph",
        text: "AI Product Builder, yazilim gelistirme surecini yapay zeka ile hizlandiran uzman gelistiricidir.",
      },
      { type: "heading", text: "Ne Yapar?" },
      {
        type: "list",
        items: [
          "Fikri MVP'ye donusturur",
          "AI entegrasyonu yapar",
          "Otomasyon sistemleri kurar",
          "SaaS mimarisi tasarlar",
        ],
      },
      { type: "heading", text: "Neden Onemlidir?" },
      {
        type: "paragraph",
        text: "Geleneksel gelistirme aylar surerken AI destekli gelistirme sureci genelde yuzde 30-50 hizlanabilir.",
      },
      { type: "heading", text: "Sonuc" },
      {
        type: "paragraph",
        text: "AI destekli urun gelistirme artik net bir rekabet avantajidir.",
      },
      {
        type: "paragraph",
        text: "AI tabanli urun gelistirmek icin iletisime gecebilirsin.",
      },
    ],
  },
];
