export type Milestone = {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  tag: string;
};

export type WorkshopItem = {
  id: string;
  projectId: string;
  title: string;
  subtitle: string;
  challenge: string;
  approach: string;
  result: string;
  accent: string;
};

export const milestones: Milestone[] = [
  {
    id: "2015",
    year: "2015",
    title: "The Beginning",
    subtitle: "Cyber Security",
    description:
      "Awal karier di bidang keamanan siber. Vulnerability assessment, incident response, dan network security. Sertifikasi BSSN diraih di periode ini.",
    accent: "#10B981",
    tag: "Security",
  },
  {
    id: "2017",
    year: "2017",
    title: "The Pivot",
    subtitle: "Software Engineering",
    description:
      "Transisi dari security analyst ke software engineer. Mulai mengembangkan aplikasi web dan mobile, sambil tetap membawa mindset keamanan.",
    accent: "#4A9EFF",
    tag: "Engineering",
  },
  {
    id: "2020",
    year: "2020",
    title: "The Expansion",
    subtitle: "Full-Stack & Consultant",
    description:
      "Mengerjakan puluhan project lintas industri: fintech, logistik, retail, enterprise. Mulai membantu klien melakukan security audit dan penetration testing.",
    accent: "#7C3AED",
    tag: "Full-Stack",
  },
  {
    id: "2023",
    year: "2023",
    title: "The Focus",
    subtitle: "Mobile Multiplatform",
    description:
      "Fokus pada pengembangan aplikasi mobile multiplatform. Mendalami Flutter, arsitektur aplikasi, dan integrasi backend yang aman.",
    accent: "#F59E0B",
    tag: "Mobile",
  },
  {
    id: "2025",
    year: "2025",
    title: "The Milestone",
    subtitle: "5 Apps Shipped",
    description:
      "Menyelesaikan 5 aplikasi mobile multiplatform: SigliAntar, Vantage, ShopZone, MedCare, dan FinTrack. Solo dari desain arsitektur sampai deploy.",
    accent: "#EF4444",
    tag: "Delivery",
  },
  {
    id: "2026",
    year: "2026",
    title: "The Portfolio",
    subtitle: "This Immersive Experience",
    description:
      "Membangun portofolio imersif ini — kombinasi iPhone 3D, galaksi interaktif, Security Lab, dan 3D art. Sebuah pernyataan visual tentang siapa saya.",
    accent: "#4A9EFF",
    tag: "Now",
  },
];

export const workshopItems: WorkshopItem[] = [
  {
    id: "ws-sigliantar",
    projectId: "sigliantar",
    title: "SigliAntar",
    subtitle: "Local Delivery Ecosystem",
    challenge:
      "Bagaimana membangun platform delivery yang benar-benar cocok untuk skala kecamatan — ringan, murah, tapi tetap fungsional?",
    approach:
      "Pakai Firebase sebagai backend supaya tidak perlu server sendiri. Fokus pada satu alur: user → driver → konfirmasi. Hilangkan fitur yang tidak esensial. Hasilnya aplikasi yang bisa jalan di HP murah sekalipun.",
    result:
      "Berhasil dipakai warga Kecamatan Sigli. Driver bisa terima order via WhatsApp, user tinggal klik. Tidak ada server cost bulanan.",
    accent: "#1B7A3E",
  },
  {
    id: "ws-vantage",
    projectId: "vantage",
    title: "Vantage",
    subtitle: "Enterprise Monitoring",
    challenge:
      "Bagaimana merancang sistem multi-role yang bisa dipakai supervisor, manager, dan owner — dengan data yang sensitif dan harus tetap aman?",
    approach:
      "Pakai RBAC (Role-Based Access Control) 3 level. Data finansial dan operasional dipisah. Setiap aksi kritikal dicatat di audit log. Kurva S dihitung real-time dari progress lapangan.",
    result:
      "Aplikasi dipakai untuk monitoring proyek konstruksi. Owner bisa lihat progress tanpa harus ke lapangan. Opname material otomatis deteksi selisih.",
    accent: "#0F766E",
  },
  {
    id: "ws-fintrack",
    projectId: "fintrack",
    title: "FinTrack",
    subtitle: "Personal Finance",
    challenge:
      "Data finansial adalah target utama penyerang. Bagaimana membangun aplikasi personal finance yang aman, tapi tetap nyaman dipakai?",
    approach:
      "Enkripsi lokal dengan SQLCipher — data tidak disimpan plaintext di device. Biometric unlock (fingerprint/Face ID). Blokir screenshot di halaman sensitif. Tidak ada kredensial yang disimpan plaintext.",
    result:
      "Aplikasi personal finance yang bisa dipakai tanpa khawatir data bocor kalau HP hilang. Password saja tidak cukup — butuh biometrik.",
    accent: "#1D4ED8",
  },
];