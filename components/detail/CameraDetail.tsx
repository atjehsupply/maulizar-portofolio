"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useCamera } from "@/lib/useCamera";
import { useStore } from "@/lib/store";
import DetailHeader from "./DetailHeader";

export default function CameraDetail() {
  const { videoRef, state, error, facingMode, start, stop, capture, switchCamera } =
    useCamera();
  const addSelfie = useStore((s) => s.addSelfie);
  const [flash, setFlash] = useState(false);
  const [lastCapture, setLastCapture] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // TIDAK ADA useEffect auto-start.
  // User harus klik tombol untuk request permission —
  // ini syarat browser (khususnya Safari/iOS).

  const handleCapture = () => {
    const data = capture();
    if (!data) return;

    setFlash(true);
    setTimeout(() => setFlash(false), 200);

    setLastCapture(data);
    setShowPreview(true);

    // Simpan ke store
    addSelfie(data);
  };

  const handleRetake = () => {
    setShowPreview(false);
    setLastCapture(null);
  };

  const handleStop = () => {
    stop();
    setShowPreview(false);
    setLastCapture(null);
  };

  return (
    <div className="relative flex h-full flex-col bg-black">
      <DetailHeader title="Camera" subtitle="Selfie Mode" accent="#EF4444" />

      <div className="no-scrollbar relative flex-1 overflow-hidden">
        {/* Viewfinder */}
        <div className="relative h-full w-full overflow-hidden">
          {/* Video element — selalu ada, disembunyikan kalau preview */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              state === "active" && !showPreview ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transform: facingMode === "user" ? "scaleX(-1)" : "none",
            }}
          />

          {/* Preview hasil capture */}
          <AnimatePresence>
            {showPreview && lastCapture && (
              <motion.img
                key="preview"
                src={lastCapture}
                alt="Captured"
                className="absolute inset-0 h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </AnimatePresence>

          {/* Flash effect */}
          <AnimatePresence>
            {flash && (
              <motion.div
                className="pointer-events-none absolute inset-0 bg-white"
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            )}
          </AnimatePresence>

          {/* State: idle — belum mulai, tampilkan tombol */}
          {state === "idle" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-black px-8 text-center">
              <motion.div
                className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EF4444]/10"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-9 w-9"
                >
                  <path d="M3 8a2 2 0 0 1 2-2h2l1.5-2h7L17 6h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
              </motion.div>

              <div>
                <p className="text-sm font-medium text-white/80">
                  Selfie Mode
                </p>
                <p className="mt-1 max-w-xs text-[11px] leading-relaxed text-white/40">
                  Izinkan akses kamera untuk mengambil selfie. Foto akan
                  tersimpan di Galeri.
                </p>
              </div>

              <motion.button
                onClick={start}
                className="rounded-full bg-[#EF4444] px-6 py-2.5 text-xs font-medium uppercase tracking-widest text-white shadow-[0_0_24px_rgba(239,68,68,0.4)]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mulai Kamera
              </motion.button>

              <p className="font-mono text-[9px] uppercase tracking-widest text-white/20">
                Data tidak dikirim ke server
              </p>
            </div>
          )}

          {/* State: requesting */}
          {state === "requesting" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black">
              <motion.div
                className="h-8 w-8 rounded-full border-2 border-white/20 border-t-[#EF4444]"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              <p className="font-mono text-[10px] uppercase tracking-widest text-white/40">
                Meminta akses kamera
              </p>
            </div>
          )}

          {/* State: denied / error */}
          {(state === "denied" || state === "error") && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black px-8 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4M12 16h.01" />
                </svg>
              </div>
              <p className="text-sm text-white/70">
                {error || "Gagal mengakses kamera."}
              </p>
              <button
                onClick={start}
                className="rounded-full bg-white/10 px-4 py-2 text-xs text-white transition-colors hover:bg-white/20"
              >
                Coba lagi
              </button>
            </div>
          )}

          {/* Grid overlay ala iOS Camera */}
          {state === "active" && !showPreview && (
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/3 top-0 h-full w-px bg-white/10" />
              <div className="absolute left-2/3 top-0 h-full w-px bg-white/10" />
              <div className="absolute left-0 top-1/3 h-px w-full bg-white/10" />
              <div className="absolute left-0 top-2/3 h-px w-full bg-white/10" />
            </div>
          )}
        </div>
      </div>

      {/* Kontrol bawah — hanya saat active */}
      {state === "active" && (
        <div className="relative z-10 flex items-center justify-center gap-8 border-t border-white/5 bg-black px-6 py-5">
          {!showPreview ? (
            <>
              {/* Switch camera */}
              <button
                onClick={switchCamera}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Switch camera"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <path d="M12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" />
                </svg>
              </button>

              {/* Shutter */}
              <motion.button
                onClick={handleCapture}
                className="flex h-16 w-16 items-center justify-center rounded-full border-4 border-white bg-transparent"
                whileTap={{ scale: 0.9 }}
                aria-label="Capture"
              >
                <div className="h-12 w-12 rounded-full bg-white" />
              </motion.button>

              {/* Stop */}
              <button
                onClick={handleStop}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Stop"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <rect x="6" y="6" width="12" height="12" rx="2" />
                </svg>
              </button>
            </>
          ) : (
            <>
              {/* Retake */}
              <button
                onClick={handleRetake}
                className="rounded-full bg-white/5 px-5 py-2 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                Ulangi
              </button>

              <div className="font-mono text-[10px] uppercase tracking-widest text-[#10B981]">
                Tersimpan di Galeri
              </div>

              {/* Stop setelah preview */}
              <button
                onClick={handleStop}
                className="rounded-full bg-white/5 px-5 py-2 text-xs text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              >
                Selesai
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}