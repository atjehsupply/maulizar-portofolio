"use client";

export default function Certificate() {
  return (
    <div className="relative w-36 rotate-[-6deg] rounded-sm border-2 border-amber-200/30 bg-gradient-to-br from-amber-50 to-amber-100 p-3 shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
      {/* Border dekoratif */}
      <div className="absolute inset-1 rounded-sm border border-amber-700/30" />

      <div className="relative flex flex-col items-center gap-1 text-center">
        {/* Logo shield */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="#059669"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>

        <p className="font-mono text-[7px] font-bold uppercase tracking-widest text-amber-900">
          BSSN
        </p>
        <p className="text-[8px] font-medium text-amber-900/70">
          Certified
        </p>

        {/* Garis dekoratif */}
        <div className="mt-1 h-px w-12 bg-amber-900/30" />
        <p className="text-[6px] uppercase tracking-widest text-amber-900/50">
          Cyber Security
        </p>
      </div>
    </div>
  );
}