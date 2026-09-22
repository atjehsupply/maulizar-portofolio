"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

// === DATA STATISTIK (Sumber Terverifikasi) ===
const STATS = [
  {
    id: "indonesia-attacks",
    value: 5.5,
    suffix: " Miliar",
    label: "Serangan Siber di Indonesia",
    sublabel: "Sepanjang 2025 (BSSN)",
    description:
      "BSSN mencatat 5,5 miliar anomali trafik yang berpotensi menjadi serangan siber sepanjang 2025 — melonjak lebih dari 7 kali lipat dibanding rata-rata tahunan 2020-2024.",
    source: "BSSN",
    accent: "#EF4444",
    decimals: 1,
  },
  {
    id: "indonesia-increase",
    value: 714,
    suffix: "%",
    label: "Peningkatan Serangan",
    sublabel: "Dibanding rata-rata 2020-2024",
    description:
      "Lonjakan ini menjadikan Indonesia salah satu negara dengan pertumbuhan ancaman siber tercepat di dunia. Sektor keuangan dan layanan publik menjadi target utama.",
    source: "BSSN",
    accent: "#F59E0B",
    decimals: 0,
  },
  {
    id: "global-average",
    value: 4.99,
    suffix: " Juta USD",
    label: "Rata-rata Kerugian Data Breach",
    sublabel: "Global, 2026 (IBM)",
    description:
      "Biaya rata-rata satu insiden kebocoran data secara global mencapai $4,99 juta. Angka ini mencakup deteksi, eskalasi, notifikasi, dan respons pasca-insiden.",
    source: "IBM Cost of a Data Breach 2026",
    accent: "#4A9EFF",
    decimals: 2,
  },
  {
    id: "ai-breach-cost",
    value: 6,
    suffix: " Juta USD",
    label: "Kerugian Serangan Berbasis AI",
    sublabel: "25% insiden malicious (IBM)",
    description:
      "Satu dari empat insiden kebocoran malicious melibatkan AI. Kerugiannya rata-rata $6 juta — sekitar $1 juta lebih tinggi dari rata-rata global.",
    source: "IBM Cost of a Data Breach 2026",
    accent: "#7C3AED",
    decimals: 0,
  },
  {
    id: "vuln-exploit",
    value: 31,
    suffix: "%",
    label: "Kebocoran via Eksploitasi Celah",
    sublabel: "Verizon DBIR 2026",
    description:
      "Untuk pertama kalinya dalam sejarah DBIR, eksploitasi celah software mengalahkan kredensial curian sebagai jalur masuk utama serangan. Angka ini naik dari 20% tahun sebelumnya.",
    source: "Verizon DBIR 2026",
    accent: "#10B981",
    decimals: 0,
  },
  {
    id: "third-party",
    value: 48,
    suffix: "%",
    label: "Kebocoran Melibatkan Pihak Ketiga",
    sublabel: "Verizon DBIR 2026",
    description:
      "Hampir setengah kebocoran data melibatkan vendor, supplier, atau mitra bisnis. Supply chain menjadi attack surface yang makin besar seiring adopsi cloud.",
    source: "Verizon DBIR 2026",
    accent: "#F59E0B",
    decimals: 0,
  },
];

// === COUNT-UP HOOK ===
function useCountUp(target: number, duration = 1500, decimals = 0, start = false) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
    let raf: number;
    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(parseFloat((target * eased).toFixed(decimals)));
      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, decimals, start]);

  return value;
}

// === CARD KOMPONEN ===
function StatCard({ stat, index }: { stat: (typeof STATS)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const displayValue = useCountUp(stat.value, 1600, stat.decimals, inView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/[0.02] p-4"
    >
      {/* Accent glow */}
      <div
        className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full blur-3xl"
        style={{ background: `${stat.accent}30` }}
      />

      {/* Value */}
      <div className="relative flex items-baseline gap-1">
        <motion.span
          className="font-mono text-3xl font-semibold tracking-tight"
          style={{ color: stat.accent }}
        >
          {stat.decimals > 0
            ? displayValue.toFixed(stat.decimals)
            : Math.round(displayValue)}
        </motion.span>
        <span
          className="font-mono text-sm font-medium"
          style={{ color: `${stat.accent}99` }}
        >
          {stat.suffix}
        </span>
      </div>

      {/* Label */}
      <p className="mt-2 text-xs font-medium text-white/80">{stat.label}</p>
      <p className="mt-0.5 font-mono text-[9px] uppercase tracking-widest text-white/30">
        {stat.sublabel}
      </p>

      {/* Description */}
      <p className="mt-3 text-[11px] leading-relaxed text-white/50">
        {stat.description}
      </p>

      {/* Source badge */}
      <div className="mt-3 flex items-center gap-1.5">
        <div
          className="h-1 w-1 rounded-full"
          style={{ background: stat.accent }}
        />
        <span className="font-mono text-[9px] uppercase tracking-widest text-white/20">
          Sumber: {stat.source}
        </span>
      </div>
    </motion.div>
  );
}

// === MAIN COMPONENT ===
export default function SecurityStats() {
  return (
    <div className="space-y-4">
      {/* Intro */}
      <div className="rounded-xl border border-[#10B981]/15 bg-[#10B981]/5 p-4">
        <p className="text-[11px] leading-relaxed text-white/60">
          Data di bawah diambil dari laporan resmi{" "}
          <span className="text-[#10B981]">BSSN</span>,{" "}
          <span className="text-[#10B981]">IBM</span>, dan{" "}
          <span className="text-[#10B981]">Verizon DBIR</span> terbaru. Angka
          ini menunjukkan kenapa keamanan siber bukan lagi opsional — tapi
          kebutuhan dasar.
        </p>
      </div>

      {/* Stats grid */}
      <div className="space-y-3">
        {STATS.map((stat, i) => (
          <StatCard key={stat.id} stat={stat} index={i} />
        ))}
      </div>

      {/* Closing note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
      >
        <p className="text-[11px] italic leading-relaxed text-white/40">
          &ldquo;Keamanan siber harus dipandang sebagai investasi, bukan
          pemborosan. Kita akan membayar lebih kalau sudah kena serangan.&rdquo;
        </p>
        <p className="mt-2 font-mono text-[9px] uppercase tracking-widest text-white/20">
          — Slamet Aji Pamungkas, Deputi BSSN (2026)
        </p>
      </motion.div>
    </div>
  );
}