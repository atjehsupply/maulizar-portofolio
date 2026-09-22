"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

type Breach = {
  breach_id: string;
  breached_date: string;
  data_classes: string[];
  domain: string;
  logo?: string;
  description?: string;
  exposure_count: number;
};

type CheckResult = {
  found: boolean;
  breaches: Breach[];
};

async function checkEmail(email: string): Promise<CheckResult | null> {
  try {
    const res = await fetch(
      `https://api.xposedornot.com/v1/check-email/${encodeURIComponent(email)}`
    );

    if (res.status === 404) {
      // Tidak ditemukan di database
      return { found: false, breaches: [] };
    }

    if (!res.ok) {
      // Rate limit atau error lain
      return null;
    }

    const data = await res.json();
    return {
      found: true,
      breaches: data.breaches || [],
    };
  } catch {
    return null;
  }
}

export default function BreachChecker() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<CheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasChecked, setHasChecked] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleCheck = async () => {
    if (!isValidEmail) return;

    setLoading(true);
    setError(null);
    setResult(null);
    setHasChecked(true);

    const res = await checkEmail(email);

    if (res === null) {
      setError(
        "Gagal memeriksa. Kemungkinan rate limit API tercapai atau koneksi bermasalah. Coba lagi beberapa saat."
      );
    } else {
      setResult(res);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setEmail("");
    setResult(null);
    setError(null);
    setHasChecked(false);
  };

  return (
    <div className="space-y-5">
      {/* Intro */}
      <div className="rounded-xl border border-[#10B981]/15 bg-[#10B981]/5 p-4">
        <p className="text-[11px] leading-relaxed text-white/60">
          Cek apakah email kamu pernah muncul di kebocoran data publik. Data
          berasal dari{" "}
          <span className="text-[#10B981]">XposedOrNot</span> — database
          kebocoran open source yang gratis dan tidak memerlukan API key.
        </p>
        <p className="mt-2 text-[10px] leading-relaxed text-white/30">
          Catatan: email akan dikirim ke API XposedOrNot untuk pengecekan. Tidak
          ada data yang disimpan.
        </p>
      </div>

      {/* Input */}
      <div className="space-y-3">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (hasChecked) handleReset();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && isValidEmail && !loading) {
                handleCheck();
              }
            }}
            placeholder="nama@email.com"
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 font-mono text-sm text-white placeholder:text-white/20 focus:border-[#10B981]/40 focus:outline-none"
            autoComplete="email"
            spellCheck={false}
            disabled={loading}
          />
        </div>

        {!hasChecked && (
          <motion.button
            onClick={handleCheck}
            disabled={!isValidEmail || loading}
            className={`w-full rounded-xl py-3 text-xs font-medium uppercase tracking-widest transition-all ${
              isValidEmail && !loading
                ? "bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
            whileHover={isValidEmail ? { scale: 1.01 } : {}}
            whileTap={isValidEmail ? { scale: 0.99 } : {}}
          >
            {loading ? "Memeriksa..." : "Check Email"}
          </motion.button>
        )}

        {hasChecked && (
          <button
            onClick={handleReset}
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-xs font-medium uppercase tracking-widest text-white/60 transition-colors hover:bg-white/10"
          >
            Cek Email Lain
          </button>
        )}
      </div>

      {/* Loading */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center gap-3 py-8"
          >
            <motion.div
              className="h-8 w-8 rounded-full border-2 border-white/10 border-t-[#10B981]"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
            />
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
              Menghubungi database
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-4"
          >
            <div className="flex items-start gap-2.5">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EF4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mt-0.5 h-4 w-4 shrink-0"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              <p className="text-[11px] text-white/60">{error}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Result */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {result.found ? (
              <>
                {/* Found header */}
                <div className="rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EF4444]/20">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#EF4444"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-[#EF4444]">
                        Email ditemukan di database kebocoran
                      </p>
                      <p className="mt-1 text-[11px] text-white/50">
                        Ditemukan dalam{" "}
                        <span className="font-mono text-white/80">
                          {result.breaches.length}
                        </span>{" "}
                        insiden kebocoran data.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Breach list */}
                <div className="space-y-2">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                    Daftar Kebocoran
                  </p>
                  {result.breaches.map((breach, i) => (
                    <motion.div
                      key={breach.breach_id || i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="text-xs font-medium text-white/80">
                            {breach.breach_id || breach.domain || "Unknown Breach"}
                          </p>
                          {breach.breached_date && (
                            <p className="mt-0.5 font-mono text-[10px] text-white/30">
                              {new Date(breach.breached_date).toLocaleDateString(
                                "id-ID",
                                { year: "numeric", month: "long", day: "numeric" }
                              )}
                            </p>
                          )}
                          {breach.data_classes &&
                            breach.data_classes.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {breach.data_classes
                                  .slice(0, 4)
                                  .map((dc, j) => (
                                    <span
                                      key={j}
                                      className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-white/40"
                                    >
                                      {dc}
                                    </span>
                                  ))}
                                {breach.data_classes.length > 4 && (
                                  <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[9px] text-white/30">
                                    +{breach.data_classes.length - 4}
                                  </span>
                                )}
                              </div>
                            )}
                        </div>
                        {breach.exposure_count > 0 && (
                          <div className="shrink-0 text-right">
                            <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">
                              Records
                            </p>
                            <p className="font-mono text-xs text-white/60">
                              {breach.exposure_count.toLocaleString()}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Recommendation */}
                <div className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-4">
                  <div className="flex items-start gap-2.5">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 h-4 w-4 shrink-0"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4M12 16h.01" />
                    </svg>
                    <div className="text-[11px] leading-relaxed text-white/60">
                      <p className="font-medium text-[#F59E0B]/90">
                        Yang perlu dilakukan:
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        <li>
                          • Ganti password akun yang terdampak, terutama jika
                          passwordnya sama dengan akun lain.
                        </li>
                        <li>
                          • Aktifkan autentikasi dua faktor (2FA) di semua akun
                          penting.
                        </li>
                        <li>
                          • Waspadai email phishing yang mengatasnamakan layanan
                          yang terdampak.
                        </li>
                        <li>
                          • Gunakan password manager untuk membuat password
                          unik per akun.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Not found */}
                <div className="rounded-xl border border-[#10B981]/20 bg-[#10B981]/5 p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#10B981]/20">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#10B981]">
                        Email tidak ditemukan di database kebocoran
                      </p>
                      <p className="mt-1 text-[11px] leading-relaxed text-white/50">
                        Email ini belum pernah muncul dalam kebocoran data publik
                        yang terdaftar di XposedOrNot. Tetap waspada dan gunakan
                        praktik keamanan yang baik.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Tips meskipun aman */}
                <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
                  <p className="text-[11px] font-medium text-white/60">
                    Tetap aman meskipun tidak ditemukan:
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[11px] text-white/40">
                    <li>• Gunakan password unik untuk setiap akun.</li>
                    <li>• Aktifkan 2FA di akun penting.</li>
                    <li>• Update software secara rutin.</li>
                    <li>• Waspadai phishing dan tautan mencurigakan.</li>
                  </ul>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}