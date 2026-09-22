"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { useStore } from "@/lib/store";
import DetailHeader from "./DetailHeader";

const BLUR_PLACEHOLDER =
  "data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=";

export default function ProjectsDetail() {
  const openProject = useStore((s) => s.openProject);

  return (
    <div className="relative flex h-full flex-col">
      <DetailHeader
        title="Projects"
        subtitle="Selected Work"
        accent="#7C3AED"
      />

      <div className="no-scrollbar relative flex-1 overflow-y-auto px-6 pb-24">
        <div className="space-y-3">
          {projects.map((project, i) => (
            <motion.button
              key={project.id}
              onClick={() => openProject(project.id)}
              className="group relative w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-left backdrop-blur-xl transition-all duration-200 hover:scale-[1.01] hover:border-white/[0.15] hover:bg-white/[0.05] active:scale-[0.99]"
              style={{ willChange: "transform" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.06, duration: 0.45 }}
            >
              {/* Accent glow */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-30 blur-3xl transition-opacity duration-300 group-hover:opacity-60"
                style={{ background: project.accentColor }}
              />

              {/* Inner content */}
              <div className="relative flex items-center gap-3">
                {/* Thumbnail */}
                <div
                  className="relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02]"
                  style={{ aspectRatio: "20 / 14" }}
                >
                  <Image
                    src={project.thumbnail}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="80px"
                    loading={i === 0 ? "eager" : "lazy"}
                    priority={i === 0}
                    placeholder="blur"
                    blurDataURL={BLUR_PLACEHOLDER}
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />
                </div>

                {/* Text */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <div
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background: project.accentColor,
                        boxShadow: `0 0 6px ${project.accentColor}`,
                      }}
                    />
                    <span className="truncate font-mono text-[9px] uppercase tracking-widest text-white/40">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="mt-1 truncate text-sm font-semibold text-white">
                    {project.name}
                  </h3>

                  <p className="mt-0.5 truncate text-[11px] text-white/50">
                    {project.tagline}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.05] text-white/40 transition-all duration-300 group-hover:bg-white/[0.1] group-hover:text-white">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}