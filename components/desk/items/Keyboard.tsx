"use client";

export default function Keyboard() {
  return (
    <div className="relative w-44 rounded-md bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1e] p-1.5 shadow-[0_8px_20px_rgba(0,0,0,0.5)]">
      {/* Baris keyboard */}
      {[10, 9, 8].map((keys, row) => (
        <div key={row} className="mb-0.5 flex gap-0.5">
          {Array.from({ length: keys }).map((_, i) => (
            <div
              key={i}
              className="h-1.5 flex-1 rounded-sm bg-[#0a0a0e] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
            />
          ))}
        </div>
      ))}

      {/* Spacebar */}
      <div className="mt-0.5 h-1.5 w-1/3 mx-auto rounded-sm bg-[#0a0a0e] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]" />

      {/* RGB glow di sisi */}
      <div className="pointer-events-none absolute inset-0 rounded-md shadow-[0_0_16px_rgba(124,58,237,0.3)]" />
    </div>
  );
}