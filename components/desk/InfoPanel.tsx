"use client";

import { motion, AnimatePresence } from "motion/react";
import { profile } from "@/data/profile";
import { contacts } from "@/data/contacts";
import { useStore } from "@/lib/store";

type InfoPanelProps = {
  itemId: string | null;
  onClose: () => void;
};

export default function InfoPanel({ itemId, onClose }: InfoPanelProps) {
  const openDetail = useStore((s) => s.openDetail);

  return (
    <AnimatePresence>
      {itemId && (
        <>
          {/* Backdrop mobile */}
          <motion.div
            className="absolute inset-0 z-30 bg-black/60 backdrop-blur-md md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="no-scrollbar absolute bottom-0 left-0 right-0 z-40 max-h-[70%] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-[#0A0A12] p-5 md:bottom-auto md:left-auto md:right-4 md:top-20 md:max-h-[80%] md:w-80 md:rounded-2xl md:border md:border-white/10"
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle bar (mobile) */}
            <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-white/20 md:hidden" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                className="h-3.5 w-3.5"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Konten berdasarkan item */}
            {itemId === "polaroid" && (
              <ContentBlock title="About Me" subtitle="Siapa di balik ini">
                <p className="text-sm font-semibold text-white">
                  {profile.name}
                </p>
                <p className="mt-0.5 text-xs text-[#4A9EFF]">{profile.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-white/60">
                  {profile.bio[0]}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-white/60">
                  {profile.bio[1]}
                </p>
              </ContentBlock>
            )}

            {itemId === "notebook" && (
              <ContentBlock title="The Story" subtitle="Latar belakang">
                {/* Highlight */}
                <div className="mb-5 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-3">
                    <p className="font-mono text-2xl font-semibold text-[#F59E0B]">
                      100+
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/40">
                      Project Selesai
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-3">
                    <p className="font-mono text-2xl font-semibold text-[#F59E0B]">
                      15
                    </p>
                    <p className="mt-0.5 text-[10px] uppercase tracking-widest text-white/40">
                      Tahun Pengalaman
                    </p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                  {profile.experience.map((exp, i) => (
                    <div
                      key={i}
                      className="relative border-l-2 border-[#F59E0B]/30 pl-4"
                    >
                      {/* Dot */}
                      <div className="absolute -left-[5px] top-1 h-2 w-2 rounded-full bg-[#F59E0B] shadow-[0_0_8px_#F59E0B]" />

                      <p className="font-mono text-[9px] uppercase tracking-widest text-[#F59E0B]/70">
                        {exp.period}
                      </p>
                      <p className="mt-0.5 text-xs font-medium text-white">
                        {exp.role}
                      </p>
                      <p className="mt-1.5 text-[11px] leading-relaxed text-white/50">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </ContentBlock>
            )}

            {itemId === "laptop" && (
              <ContentBlock title="Skills" subtitle="Engineering">
                <div className="space-y-3">
                  {Object.entries(profile.skills).map(([cat, items]) => (
                    <div key={cat}>
                      <p className="mb-1.5 text-[10px] uppercase tracking-wider text-white/40">
                        {cat}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {items.map((s) => (
                          <span
                            key={s}
                            className="rounded border border-[#7C3AED]/20 bg-[#7C3AED]/5 px-1.5 py-0.5 font-mono text-[9px] text-[#7C3AED]/80"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </ContentBlock>
            )}

            {itemId === "certificate" && (
              <ContentBlock title="Certification" subtitle="BSSN">
                {profile.certifications.map((cert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl border border-[#10B981]/20 bg-[#10B981]/5 p-3"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#10B981]/20">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5"
                      >
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {cert.name}
                      </p>
                      <p className="mt-0.5 text-[11px] text-white/50">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                ))}
              </ContentBlock>
            )}

            {itemId === "camera" && (
              <ContentBlock title="3D Art" subtitle="Visual Passion">
                <p className="text-xs leading-relaxed text-white/60">
                  Di luar pekerjaan teknis, saya membuat 3D art — dark fantasy
                  dan sci-fi — sebagai sarana eksplorasi visual dan naratif.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    openDetail("gallery");
                  }}
                  className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#EF4444]/20 bg-[#EF4444]/5 p-3 text-left transition-colors hover:bg-[#EF4444]/10"
                >
                  <span className="text-xs font-medium text-[#EF4444]">
                    Lihat 13 karya 3D
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </ContentBlock>
            )}

            {itemId === "coffee" && (
              <ContentBlock title="Fun Fact" subtitle="Kepribadian">
                <p className="text-xs leading-relaxed text-white/60">
                  Saya lebih produktif saat malam. Kebanyakan project di
                  portofolio ini dikerjakan setelah jam 10 malam, ditemani
                  kopi hitam tanpa gula.
                </p>
                <p className="mt-3 text-xs italic leading-relaxed text-white/40">
                  &ldquo;Build by day, craft by night.&rdquo;
                </p>
              </ContentBlock>
            )}

            {itemId === "keyboard" && (
              <ContentBlock title="Setup" subtitle="Tools & Environment">
                <div className="space-y-2">
                  {[
                    "VS Code",
                    "Flutter SDK",
                    "Node.js",
                    "Docker",
                    "Postman",
                    "Git",
                    "Blender",
                  ].map((t) => (
                    <div
                      key={t}
                      className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2"
                    >
                      <div className="h-1 w-1 rounded-full bg-[#6B7280]" />
                      <span className="font-mono text-[11px] text-white/70">
                        {t}
                      </span>
                    </div>
                  ))}
                </div>
              </ContentBlock>
            )}

            {itemId === "pen-paper" && (
              <ContentBlock title="Contact" subtitle="Ayo ngobrol">
                <p className="text-xs leading-relaxed text-white/60">
                  Terbuka untuk diskusi project, kolaborasi, atau sekadar
                  bertukar ide.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    openDetail("contact");
                  }}
                  className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#10B981]/20 bg-[#10B981]/5 p-3 text-left transition-colors hover:bg-[#10B981]/10"
                >
                  <span className="text-xs font-medium text-[#10B981]">
                    Buka halaman Contact
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </ContentBlock>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ContentBlock({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
        {subtitle}
      </p>
      <h3 className="mt-1 text-lg font-semibold tracking-tight text-white">
        {title}
      </h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}