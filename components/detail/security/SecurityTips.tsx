"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

type Tip = {
  id: string;
  icon: React.ReactNode;
  title: string;
  summary: string;
  detail: string;
  category: "password" | "network" | "device" | "data";
  accent: string;
};

const TIPS: Tip[] = [
  {
    id: "password-manager",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
    title: "Gunakan Password Manager",
    summary: "Ingat satu password, bukan dua puluh.",
    detail:
      "Data Verizon DBIR 2025 menunjukkan bahwa, dalam kasus median, hanya 49% password user yang unik antar layanan. Artinya separuh password dipakai ulang di beberapa akun. Password manager membantu kamu membuat password unik yang panjang dan kompleks untuk setiap akun, tanpa perlu menghafalnya. Kamu hanya perlu mengingat satu master password.",
    category: "password",
    accent: "#4A9EFF",
  },
  {
    id: "2fa",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M9 9h.01M15 9h.01M9 15h6" />
      </svg>
    ),
    title: "Aktifkan 2FA di Semua Akun Penting",
    summary: "Password saja tidak cukup.",
    detail:
      "Verizon DBIR 2025 mencatat bahwa 22% kebocoran data menggunakan kredensial yang dicuri sebagai jalur masuk awal. Dengan 2FA, penyerang yang punya password kamu tetap tidak bisa masuk tanpa kode kedua dari perangkatmu. Prioritas: email utama, perbankan, akun kerja, media sosial.",
    category: "password",
    accent: "#10B981",
  },
  {
    id: "update",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M21 2v6h-6" />
        <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
        <path d="M3 22v-6h6" />
        <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
      </svg>
    ),
    title: "Update Software Secara Rutin",
    summary: "Celah yang sudah ditambal tidak bisa dieksploitasi.",
    detail:
      "IBM Cost of a Data Breach 2025 mencatat bahwa eksploitasi celah software menjadi jalur masuk utama serangan (20%), naik 34% dari tahun sebelumnya. CISA menambahkan 245 celah baru ke catalog KEV (Known Exploited Vulnerabilities) di 2025 — total 1.484 celah yang sudah terbukti dieksploitasi. Pastikan OS, browser, dan aplikasi kamu selalu versi terbaru.",
    category: "device",
    accent: "#F59E0B",
  },
  {
    id: "phishing",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    title: "Waspadai Phishing & Deepfake",
    summary: "60% kebocoran data melibatkan elemen manusia.",
    detail:
      "IBM 2025 mencatat bahwa 16% kebocoran malicious menggunakan AI, sering untuk phishing dan deepfake. Verizon DBIR 2025 menunjukkan bahwa 60% kebocoran data melibatkan elemen manusia. Cek pengirim email, jangan klik tautan mencurigakan, dan verifikasi permintaan sensitif lewat channel lain (telepon, tatap muka).",
    category: "network",
    accent: "#EF4444",
  },
  {
    id: "third-party",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      </svg>
    ),
    title: "Pahami Risiko Pihak Ketiga",
    summary: "30% kebocoran melibatkan vendor atau mitra.",
    detail:
      "Verizon DBIR 2025 mencatat bahwa persentase kebocoran yang melibatkan pihak ketiga naik dua kali lipat dalam setahun, dari 15% ke 30%. Untuk organisasi: audit akses vendor, terapkan prinsip least privilege, dan pastikan ada kontrak keamanan yang jelas. Untuk individu: hati-hati saat memberikan akses ke aplikasi pihak ketiga via OAuth.",
    category: "data",
    accent: "#7C3AED",
  },
  {
    id: "data-protection",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
    title: "Lindungi Data Pribadi",
    summary: "Kebocoran data di Indonesia mencapai 56 juta kasus dalam satu tahun.",
    detail:
      "BSSN mencatat lonjakan drastis insiden kebocoran data dari 1,67 juta menjadi 56 juta kasus hanya dalam satu tahun. Bjorka membocorkan 341.000 data personel Polri pada Oktober 2025. Lindungi data pribadi: jangan bagikan NIK sembarangan, gunakan email terpisah untuk layanan publik vs pribadi, dan cek secara berkala apakah email kamu terdampak kebocoran.",
    category: "data",
    accent: "#10B981",
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  password: "Password",
  network: "Jaringan",
  device: "Perangkat",
  data: "Data",
};

export default function SecurityTips() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      {/* Intro */}
      <div className="rounded-xl border border-[#10B981]/15 bg-[#10B981]/5 p-4">
        <p className="text-[11px] leading-relaxed text-white/60">
          Tips praktis yang bisa langsung diterapkan. Sumber: laporan resmi{" "}
          <span className="text-[#10B981]">BSSN</span>,{" "}
          <span className="text-[#10B981]">IBM</span>,{" "}
          <span className="text-[#10B981]">Verizon DBIR</span>, dan{" "}
          <span className="text-[#10B981]">OWASP</span>.
        </p>
      </div>

      {/* Tips list */}
      <div className="space-y-2">
        {TIPS.map((tip, i) => {
          const isOpen = expanded === tip.id;
          return (
            <motion.div
              key={tip.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className="overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]"
            >
              <button
                onClick={() => setExpanded(isOpen ? null : tip.id)}
                className="flex w-full items-center gap-3 p-3.5 text-left transition-colors hover:bg-white/[0.03]"
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `${tip.accent}20`,
                    color: tip.accent,
                  }}
                >
                  {tip.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="rounded-full px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest"
                      style={{
                        background: `${tip.accent}15`,
                        color: `${tip.accent}CC`,
                      }}
                    >
                      {CATEGORY_LABELS[tip.category]}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-white/85">
                    {tip.title}
                  </p>
                  <p className="mt-0.5 text-[10px] text-white/40">
                    {tip.summary}
                  </p>
                </div>
                <motion.svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 text-white/30"
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path d="M6 9l6 6 6-6" />
                </motion.svg>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="border-t border-white/5 px-3.5 py-3">
                      <p className="text-[11px] leading-relaxed text-white/55">
                        {tip.detail}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* Closing */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
      >
        <p className="text-[11px] leading-relaxed text-white/50">
          Keamanan siber bukan produk yang bisa dibeli sekali, tapi praktik yang
          harus dijalankan terus-menerus. Mulai dari yang kecil: password manager,
          2FA, dan update rutin. Sisanya mengikuti.
        </p>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-white/20">
          Maulizar Nauval — BSSN Certified
        </p>
      </motion.div>
    </div>
  );
}