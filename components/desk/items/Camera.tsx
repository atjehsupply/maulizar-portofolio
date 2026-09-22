"use client";

export default function Camera() {
  return (
    <div className="relative w-20 rotate-[5deg]">
      {/* Body kamera */}
      <div className="relative h-14 rounded-md bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1e] shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
        {/* Top bump (viewfinder) */}
        <div className="absolute -top-1 left-3 h-3 w-6 rounded-t-sm bg-[#1a1a1e]" />

        {/* Lensa */}
        <div className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-black ring-2 ring-[#3a3a3e]">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#1a1a3e] to-[#0a0a1e] ring-1 ring-[#4A9EFF]/30">
            <div className="absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-[#4A9EFF]/50 blur-sm" />
          </div>
        </div>

        {/* Flash */}
        <div className="absolute right-2 top-2 h-2 w-3 rounded-sm bg-amber-200/20" />

        {/* Tombol shutter */}
        <div className="absolute right-3 top-0 h-1.5 w-3 rounded-sm bg-[#EF4444]" />
      </div>
    </div>
  );
}