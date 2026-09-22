"use client";

import { motion, AnimatePresence } from "motion/react";
import { useEffect, useMemo, useState } from "react";

// === DETEKSI PATTERN UMUM ===
const COMMON_PATTERNS = [
  "password",
  "123456",
  "12345678",
  "qwerty",
  "abc123",
  "admin",
  "letmein",
  "welcome",
  "monkey",
  "dragon",
  "iloveyou",
  "sunshine",
  "princess",
  "football",
  "baseball",
  "indonesia",
  "jakarta",
  "bandung",
  "surabaya",
];

const KEYBOARD_PATTERNS = [
  "qwerty",
  "asdf",
  "zxcv",
  "1234",
  "qazwsx",
  "1q2w3e",
];

type Analysis = {
  score: number;
  entropy: number;
  length: number;
  hasLower: boolean;
  hasUpper: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasCommonPattern: boolean;
  hasKeyboardPattern: boolean;
  hasRepeated: boolean;
  hasSequential: boolean;
};

function analyzePassword(password: string): Analysis {
  const length = password.length;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[^a-zA-Z0-9]/.test(password);

  const lower = password.toLowerCase();
  const hasCommonPattern = COMMON_PATTERNS.some((p) => lower.includes(p));
  const hasKeyboardPattern = KEYBOARD_PATTERNS.some((p) => lower.includes(p));
  const hasRepeated = /(.)\1{2,}/.test(password);
  const hasSequential = /(012|123|234|345|456|567|678|789|abc|bcd|cde|def)/i.test(
    password
  );

  // Hitung character pool
  let poolSize = 0;
  if (hasLower) poolSize += 26;
  if (hasUpper) poolSize += 26;
  if (hasNumber) poolSize += 10;
  if (hasSymbol) poolSize += 32;

  // Entropy: log2(poolSize^length) = length * log2(poolSize)
  const entropy = poolSize > 0 ? length * Math.log2(poolSize) : 0;

  // Skor dasar dari entropy
  let score = Math.min(100, (entropy / 80) * 100);

  // Penalti untuk pattern lemah
  if (hasCommonPattern) score -= 35;
  if (hasKeyboardPattern) score -= 25;
  if (hasRepeated) score -= 15;
  if (hasSequential) score -= 15;

  // Bonus variasi
  const variety = [hasLower, hasUpper, hasNumber, hasSymbol].filter(Boolean).length;
  if (variety >= 3) score += 10;
  if (variety === 4) score += 10;

  // Penalti untuk panjang kurang
  if (length < 8) score -= 30;
  if (length < 6) score -= 20;

  score = Math.max(0, Math.min(100, Math.round(score)));

  return {
    score,
    entropy: Math.round(entropy),
    length,
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    hasCommonPattern,
    hasKeyboardPattern,
    hasRepeated,
    hasSequential,
  };
}

// === SHA-1 hash di browser ===
async function sha1(text: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-1", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

// === Cek Pwned Passwords API (k-anonymity) ===
async function checkPwned(password: string): Promise<number | null> {
  try {
    const hash = (await sha1(password)).toUpperCase();
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
    if (!res.ok) return null;

    const text = await res.text();
    const lines = text.split("\n");
    for (const line of lines) {
      const [hashSuffix, count] = line.split(":");
      if (hashSuffix === suffix) {
        return parseInt(count, 10);
      }
    }
    return 0;
  } catch {
    return null;
  }
}

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [pwnedCount, setPwnedCount] = useState<number | null>(null);
  const [checking, setChecking] = useState(false);

  const analysis = useMemo(() => analyzePassword(password), [password]);

  // Debounced breach check
  useEffect(() => {
    if (password.length < 4) {
      setPwnedCount(null);
      return;
    }
    setChecking(true);
    const timer = setTimeout(async () => {
      const count = await checkPwned(password);
      setPwnedCount(count);
      setChecking(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [password]);

  // Warna berdasarkan skor
  const getScoreColor = (score: number) => {
    if (score < 30) return "#EF4444";
    if (score < 60) return "#F59E0B";
    if (score < 80) return "#10B981";
    return "#10B981";
  };

  const getScoreLabel = (score: number) => {
    if (password.length === 0) return "—";
    if (score < 30) return "Lemah";
    if (score < 60) return "Sedang";
    if (score < 80) return "Kuat";
    return "Sangat Kuat";
  };

  const scoreColor = getScoreColor(analysis.score);

  return (
    <div className="space-y-5">
      {/* Intro */}
      <div className="rounded-xl border border-[#10B981]/15 bg-[#10B981]/5 p-4">
        <p className="text-[11px] leading-relaxed text-white/60">
          Cek kekuatan password kamu. Analisis dilakukan{" "}
          <span className="text-[#10B981]">sepenuhnya di browser</span> — password
          tidak pernah dikirim ke server mana pun. Untuk cek kebocoran, hanya 5
          karakter pertama dari hash SHA-1 yang dikirim (metode k-anonymity).
        </p>
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Ketik password untuk dianalisis..."
          className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 pr-12 font-mono text-sm text-white placeholder:text-white/20 focus:border-[#10B981]/40 focus:outline-none"
          autoComplete="off"
          spellCheck={false}
        />
        <button
          onClick={() => setShowPassword((v) => !v)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60"
          aria-label={showPassword ? "Hide" : "Show"}
        >
          {showPassword ? (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>

      {/* Score bar */}
      {password.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
              Strength
            </span>
            <div className="flex items-baseline gap-2">
              <span
                className="font-mono text-2xl font-semibold"
                style={{ color: scoreColor }}
              >
                {analysis.score}
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-widest"
                style={{ color: scoreColor }}
              >
                {getScoreLabel(analysis.score)}
              </span>
            </div>
          </div>

          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{ background: scoreColor }}
              initial={{ width: 0 }}
              animate={{ width: `${analysis.score}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>

          {/* Detail */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <DetailRow label="Panjang" value={`${analysis.length} karakter`} />
            <DetailRow label="Entropy" value={`${analysis.entropy} bits`} />
          </div>

          {/* Checklist */}
          <div className="space-y-1.5 pt-2">
            <CheckRow label="Huruf kecil (a-z)" ok={analysis.hasLower} />
            <CheckRow label="Huruf besar (A-Z)" ok={analysis.hasUpper} />
            <CheckRow label="Angka (0-9)" ok={analysis.hasNumber} />
            <CheckRow label="Simbol (!@#$)" ok={analysis.hasSymbol} />
            <CheckRow
              label="Tidak mengandung pattern umum"
              ok={!analysis.hasCommonPattern}
            />
            <CheckRow
              label="Tidak mengandung pattern keyboard"
              ok={!analysis.hasKeyboardPattern}
            />
            <CheckRow label="Tidak ada karakter berulang" ok={!analysis.hasRepeated} />
            <CheckRow
              label="Tidak ada urutan berurutan"
              ok={!analysis.hasSequential}
            />
          </div>

          {/* Breach check */}
          <div className="pt-3">
            <div className="flex items-center gap-2 pb-2">
              <div className="h-px flex-1 bg-white/5" />
              <span className="font-mono text-[9px] uppercase tracking-widest text-white/30">
                Data Breach Check
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>

            <AnimatePresence mode="wait">
              {checking && (
                <motion.div
                  key="checking"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-3"
                >
                  <motion.div
                    className="h-3 w-3 rounded-full border-2 border-white/20 border-t-[#10B981]"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                  <span className="text-xs text-white/40">Memeriksa...</span>
                </motion.div>
              )}

              {!checking && pwnedCount !== null && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`rounded-xl border p-3 ${
                    pwnedCount > 0
                      ? "border-[#EF4444]/20 bg-[#EF4444]/5"
                      : "border-[#10B981]/20 bg-[#10B981]/5"
                  }`}
                >
                  {pwnedCount > 0 ? (
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
                        <path d="M12 9v4M12 17h.01M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                      </svg>
                      <div>
                        <p className="text-xs font-medium text-[#EF4444]">
                          Password ditemukan di kebocoran data
                        </p>
                        <p className="mt-1 text-[11px] text-white/50">
                          Muncul{" "}
                          <span className="font-mono text-white/80">
                            {pwnedCount.toLocaleString()}
                          </span>{" "}
                          kali dalam database kebocoran publik. Jangan gunakan
                          password ini.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-0.5 h-4 w-4 shrink-0"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <div>
                        <p className="text-xs font-medium text-[#10B981]">
                          Tidak ditemukan di kebocoran publik
                        </p>
                        <p className="mt-1 text-[11px] text-white/50">
                          Password ini belum pernah muncul di database kebocoran
                          yang diketahui.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {!checking && pwnedCount === null && password.length >= 4 && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-3"
                >
                  <p className="text-[11px] text-white/40">
                    Cek akan dimulai otomatis setelah kamu berhenti mengetik.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Warning umum */}
          {analysis.hasCommonPattern && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-3"
            >
              <p className="text-[11px] text-[#F59E0B]/90">
                Password mengandung kata yang sangat umum digunakan. Hindari
                kata seperti <span className="font-mono">password</span>,{" "}
                <span className="font-mono">qwerty</span>, atau{" "}
                <span className="font-mono">admin</span>.
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}

// === Sub-komponen ===
function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/5 bg-white/[0.02] p-2.5">
      <p className="font-mono text-[9px] uppercase tracking-widest text-white/30">
        {label}
      </p>
      <p className="mt-0.5 font-mono text-xs text-white/80">{value}</p>
    </div>
  );
}

function CheckRow({ label, ok }: { label: string; ok: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          ok ? "bg-[#10B981]/20" : "bg-[#EF4444]/20"
        }`}
      >
        {ok ? (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-2.5 w-2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#EF4444"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-2.5 w-2.5"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </div>
      <span
        className={`text-[11px] ${ok ? "text-white/60" : "text-white/40"}`}
      >
        {label}
      </span>
    </div>
  );
}