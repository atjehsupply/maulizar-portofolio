"use client";

export default function Notebook() {
  return (
    <div className="relative h-32 w-24 rotate-[4deg]">
      {/* Cover buku */}
      <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-[#8B4513] to-[#5C2E0A] shadow-[0_8px_24px_rgba(0,0,0,0.5)]" />

      {/* Spine */}
      <div className="absolute left-0 top-0 h-full w-1.5 rounded-l-sm bg-[#3D1E06]" />

      {/* Halaman */}
      <div className="absolute right-0 top-0 h-full w-[calc(100%-6px)] rounded-r-sm bg-gradient-to-br from-[#F5F0E1] to-[#E8DFC8]" />

      {/* Garis halaman */}
      <div className="absolute right-2 top-3 bottom-3 left-4 space-y-1.5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="h-px bg-[#8B7355]/20" />
        ))}
      </div>

      {/* Pita bookmark */}
      <div className="absolute right-6 top-0 h-6 w-1 bg-[#8B0000]" />
    </div>
  );
}