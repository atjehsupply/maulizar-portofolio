"use client";

export default function PenPaper() {
  return (
    <div className="relative w-28">
      {/* Kertas */}
      <div className="relative h-24 rotate-[-8deg] rounded-sm bg-[#F5F0E1] p-2 shadow-[0_6px_16px_rgba(0,0,0,0.4)]">
        {/* Lipatan */}
        <div className="absolute right-0 top-0 h-6 w-6 rounded-bl-sm bg-gradient-to-bl from-gray-300 to-transparent" />

        {/* Tulisan */}
        <div className="space-y-1.5 pt-1">
          <div className="h-px w-3/4 bg-gray-700/30" />
          <div className="h-px w-full bg-gray-700/30" />
          <div className="h-px w-2/3 bg-gray-700/30" />
          <div className="h-px w-5/6 bg-gray-700/30" />
        </div>

        {/* Tulisan tangan kecil */}
        <p
          className="absolute bottom-2 right-2 text-[6px] italic text-gray-700/60"
          style={{ fontFamily: "serif" }}
        >
          let&apos;s talk
        </p>
      </div>

      {/* Pena */}
      <div className="absolute -bottom-2 right-2 h-1.5 w-16 rotate-[15deg] rounded-full bg-gradient-to-r from-[#1a1a1e] via-[#3a3a3e] to-[#1a1a1e] shadow-md">
        <div className="absolute right-0 top-0 h-full w-2 rounded-r-full bg-[#F59E0B]" />
      </div>
    </div>
  );
}