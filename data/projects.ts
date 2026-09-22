export type Project = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  role: string;
  year: string;
  description: string;
  features: string[];
  techStack: {
    frontend: string[];
    backend: string[];
    database: string[];
    infrastructure: string[];
  };
  security: {
    auth: string;
    dataProtection: string;
    network: string;
    notes: string;
  };
  screenshots: string[];
  thumbnail: string;
  accentColor: string;
  status: "public" | "private" | "nda";
};

export const projects: Project[] = [
  {
    id: "sigliantar",
    name: "SigliAntar",
    tagline: "Sigli Aman, Sigli Antar",
    category: "Local Delivery & E-Commerce",
    role: "Solo Developer",
    year: "2025",
    description:
      "Aplikasi penghubung user dan driver untuk wilayah Kecamatan Sigli, Kabupaten Pidie. Fokus pada kebutuhan lokal: user yang malas keluar rumah bisa langsung menghubungi driver untuk belanja atau kirim barang. Dilengkapi e-wallet sederhana untuk top up saldo dan pembayaran.",
    features: [
      "Penghubung langsung user dan driver",
      "Top up saldo e-wallet SigliPay",
      "Konfirmasi top up via WhatsApp admin",
      "Kategori layanan: Belanja, Kirim Barang, Ojek",
      "Promo pengguna baru",
    ],
    techStack: {
      frontend: ["Flutter"],
      backend: ["Firebase Cloud Functions"],
      database: ["Cloud Firestore"],
      infrastructure: ["Firebase Hosting", "Firebase Auth"],
    },
    security: {
      auth: "Firebase Authentication (phone number + OTP)",
      dataProtection:
        "Firestore Security Rules per-role, validasi input di client dan server",
      network: "HTTPS / TLS 1.3 (default Firebase)",
      notes:
        "Karena skala lokal, arsitektur sengaja dibuat ringan. Fokus keamanan ada di validasi transaksi top up dan pembatasan akses data user-driver.",
    },
    screenshots: ["/images/projects/sigliantar/1.webp"],
    thumbnail: "/images/projects/sigliantar/thumb.webp",
    accentColor: "#1B7A3E",
    status: "private",
  },
  {
    id: "vantage",
    name: "Vantage",
    tagline: "Project Monitoring System",
    category: "B2B Enterprise / Construction Monitoring",
    role: "Solo Developer",
    year: "2025",
    description:
      "Aplikasi B2B untuk monitoring progres proyek konstruksi. Dirancang untuk tiga peran: supervisor, manager, dan owner. Mencakup tracking progres berbasis bobot, kurva S, absensi pekerja lapangan, request material, opname sisa material dengan deteksi selisih, hingga dokumentasi kontrak dan temuan lapangan.",
    features: [
      "Multi-role login: supervisor, manager, owner",
      "Kurva S untuk visualisasi progres vs rencana",
      "Absensi pekerja lapangan",
      "Request material dan tracking",
      "Opname sisa material + peringatan selisih",
      "Perhitungan bobot proyek",
      "Input progres dan dokumentasi kontrak",
      "Foto temuan / kendala lapangan untuk evaluasi",
      "Modul logistik terintegrasi",
    ],
    techStack: {
      frontend: ["Flutter"],
      backend: ["Node.js", "Express"],
      database: ["PostgreSQL", "Redis"],
      infrastructure: ["Docker", "VPS", "Nginx"],
    },
    security: {
      auth: "JWT dengan refresh token, RBAC 3 level",
      dataProtection:
        "Enkripsi data sensitif di database, audit log untuk aksi kritikal",
      network: "HTTPS, API rate limiting, input sanitization",
      notes:
        "Data proyek bersifat komersial dan sensitif. Ada pemisahan akses ketat antar role: supervisor tidak bisa lihat data finansial owner, manager hanya bisa approve di levelnya.",
    },
    screenshots: ["/images/projects/vantage/1.webp"],
    thumbnail: "/images/projects/vantage/thumb.webp",
    accentColor: "#0F766E",
    status: "private",
  },
  {
    id: "shopzone",
    name: "ShopZone",
    tagline: "Belanja Lebih Mudah",
    category: "E-Commerce",
    role: "Solo Developer",
    year: "2025",
    description:
      "Aplikasi e-commerce dengan fitur standar: katalog produk, kategori, keranjang, dan checkout. Dibuat sebagai eksplorasi arsitektur e-commerce mobile dengan fokus pada kecepatan load dan kemudahan navigasi.",
    features: [
      "Katalog produk dengan kategori",
      "Pencarian produk",
      "Keranjang belanja",
      "Checkout dan riwayat pesanan",
      "Promo dan diskon",
    ],
    techStack: {
      frontend: ["Flutter"],
      backend: ["Firebase Cloud Functions"],
      database: ["Cloud Firestore", "Firebase Storage"],
      infrastructure: ["Firebase Hosting"],
    },
    security: {
      auth: "Firebase Authentication (email + Google Sign-In)",
      dataProtection:
        "Firestore Security Rules, validasi stok di server-side transaction",
      network: "HTTPS / TLS 1.3",
      notes:
        "Fokus keamanan di sisi transaksi: mencegah race condition saat checkout, validasi harga di server (tidak percaya harga dari client).",
    },
    screenshots: ["/images/projects/shopzone/1.webp"],
    thumbnail: "/images/projects/shopzone/thumb.webp",
    accentColor: "#1E3A8A",
    status: "private",
  },
  {
    id: "medcare",
    name: "MedCare",
    tagline: "Kesehatan dalam Genggaman",
    category: "Health Ecosystem",
    role: "Solo Developer",
    year: "2025",
    description:
      "Aplikasi kesehatan dengan tiga fitur utama: booking jadwal dokter, konsultasi telemedicine, dan rekam medis digital. Dirancang dengan perhatian khusus pada kerahasiaan data medis.",
    features: [
      "Booking jadwal dokter",
      "Konsultasi telemedicine (chat)",
      "Rekam medis digital",
      "Riwayat kesehatan",
      "Artikel kesehatan",
    ],
    techStack: {
      frontend: ["Flutter"],
      backend: ["Node.js", "Express"],
      database: ["PostgreSQL"],
      infrastructure: ["VPS", "Nginx", "WebRTC"],
    },
    security: {
      auth: "JWT + OTP, session timeout untuk data medis",
      dataProtection:
        "Enkripsi at-rest untuk rekam medis, akses berbasis peran",
      network: "HTTPS, enkripsi end-to-end untuk telemedicine (DTLS-SRTP)",
      notes:
        "Rekam medis adalah data paling sensitif di aplikasi ini. Akses dibatasi: dokter hanya bisa lihat rekam medis pasien yang sedang ditangani. Semua akses tercatat di audit log.",
    },
    screenshots: ["/images/projects/medcare/1.webp"],
    thumbnail: "/images/projects/medcare/thumb.webp",
    accentColor: "#0D9488",
    status: "private",
  },
  {
    id: "fintrack",
    name: "FinTrack",
    tagline: "Kelola Keuangan dengan Bijak",
    category: "Personal Finance",
    role: "Solo Developer",
    year: "2025",
    description:
      "Aplikasi personal finance untuk monitoring keuangan pribadi: pencatatan pemasukan dan pengeluaran, ringkasan bulanan, dan visualisasi data. Fokus pada kemudahan input dan kejelasan laporan.",
    features: [
      "Pencatatan pemasukan dan pengeluaran",
      "Ringkasan bulanan",
      "Visualisasi data (chart)",
      "Kategori transaksi",
      "Riwayat transaksi",
    ],
    techStack: {
      frontend: ["Flutter"],
      backend: ["Firebase Cloud Functions"],
      database: ["Cloud Firestore"],
      infrastructure: ["Firebase Hosting"],
    },
    security: {
      auth: "Firebase Authentication + biometric unlock",
      dataProtection:
        "Enkripsi lokal dengan SQLCipher, data finansial tidak disimpan plaintext",
      network: "HTTPS / TLS 1.3",
      notes:
        "Data finansial adalah target utama. Selain enkripsi lokal, aplikasi memblokir screenshot di halaman sensitif dan tidak menyimpan kredensial di plaintext.",
    },
    screenshots: ["/images/projects/fintrack/1.webp"],
    thumbnail: "/images/projects/fintrack/thumb.webp",
    accentColor: "#1D4ED8",
    status: "private",
  },
];