"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { projects } from "@/data/projects";
import { useStore } from "@/lib/store";

export default function ProjectItemDetail() {
  const activeProjectId = useStore((s) => s.activeProjectId);
  const closeProject = useStore((s) => s.closeProject);

  const project = projects.find((p) => p.id === activeProjectId);
  if (!project) return null;

  return (
    <div className="relative flex h-full flex-col">
      {/* Header iOS-style */}
      <div className="relative z-20 flex items-center gap-3 px-6 pt-8 pb-4">
        <motion.button
          onClick={closeProject}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/60 backdrop-blur-md transition-colors hover:bg-white/10 hover:text-white"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Back"
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
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>
        <span
          className="font-mono text-[10px] uppercase tracking-[0.25em] leading-relaxed"
          style={{ color: `${project.accentColor}99` }}
        >
          {project.category}
        </span>
      </div>

      {/* Konten scrollable — tanpa scrollbar */}
      <div className="no-scrollbar relative flex-1 overflow-y-auto px-6 pb-24">
        {/* Judul */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl font-semibold tracking-tight text-white">
            {project.name}
          </h1>
          <p className="mt-1 text-sm" style={{ color: project.accentColor }}>
            {project.tagline}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-white/60">
              {project.role}
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-white/60">
              {project.year}
            </span>
          </div>
        </motion.div>

        {/* Screenshot — tampil utuh, tidak terpotong */}
        {project.screenshots[0] && (
          <motion.div
            className="relative mt-6 w-full overflow-hidden rounded-2xl border border-white/10 bg-black/40"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Image
              src={project.screenshots[0]}
              alt={project.name}
              width={800}
              height={600}
              className="h-auto w-full object-contain"
              sizes="(max-width: 768px) 100vw, 400px"
              priority
            />
          </motion.div>
        )}

        {/* Description */}
        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            About
          </h3>
          <p className="text-sm leading-relaxed text-white/70">
            {project.description}
          </p>
        </motion.section>

        {/* Features */}
        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Features
          </h3>
          <ul className="space-y-2">
            {project.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                <span
                  className="mt-1.5 h-1 w-1 shrink-0 rounded-full"
                  style={{ background: project.accentColor }}
                />
                {feature}
              </li>
            ))}
          </ul>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3 className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
            Tech Stack
          </h3>
          <div className="space-y-3">
            {Object.entries(project.techStack).map(([category, items]) => (
              <div key={category}>
                <p className="mb-1.5 text-[10px] uppercase tracking-wider text-white/30">
                  {category}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] text-white/70"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Security */}
        <motion.section
          className="mt-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#10B981]/70">
              Security
            </h3>
          </div>

          <div className="mt-3 space-y-2.5 rounded-xl border border-[#10B981]/15 bg-[#10B981]/5 p-4">
            {[
              { label: "Authentication", value: project.security.auth },
              { label: "Data Protection", value: project.security.dataProtection },
              { label: "Network", value: project.security.network },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[10px] uppercase tracking-wider text-[#10B981]/60">
                  {item.label}
                </p>
                <p className="mt-0.5 text-xs text-white/70">{item.value}</p>
              </div>
            ))}
            <div className="border-t border-[#10B981]/10 pt-2.5">
              <p className="text-xs italic leading-relaxed text-white/50">
                {project.security.notes}
              </p>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}