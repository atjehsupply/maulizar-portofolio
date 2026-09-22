"use client";

export default function Laptop() {
  return (
    <div className="relative w-40">
      {/* Layar */}
      <div className="relative mx-auto w-[85%] rounded-t-md bg-gradient-to-b from-[#1a1a1e] to-[#0a0a0e] p-1.5 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-[#0a0a12]">
          {/* Code editor mockup */}
          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-1/5 border-r border-white/5 bg-black/30 p-1">
              <div className="space-y-0.5">
                <div className="h-1 w-full rounded-sm bg-[#4A9EFF]/30" />
                <div className="h-1 w-3/4 rounded-sm bg-white/10" />
                <div className="h-1 w-full rounded-sm bg-white/10" />
                <div className="h-1 w-2/3 rounded-sm bg-white/10" />
              </div>
            </div>

            {/* Code area */}
            <div className="flex-1 space-y-0.5 p-1.5">
              <div className="flex gap-1">
                <div className="h-1 w-4 rounded-sm bg-[#7C3AED]/60" />
                <div className="h-1 w-8 rounded-sm bg-white/20" />
              </div>
              <div className="flex gap-1 pl-2">
                <div className="h-1 w-3 rounded-sm bg-[#10B981]/60" />
                <div className="h-1 w-10 rounded-sm bg-white/15" />
              </div>
              <div className="flex gap-1 pl-2">
                <div className="h-1 w-2 rounded-sm bg-[#F59E0B]/60" />
                <div className="h-1 w-6 rounded-sm bg-white/15" />
              </div>
              <div className="flex gap-1">
                <div className="h-1 w-5 rounded-sm bg-[#7C3AED]/60" />
                <div className="h-1 w-7 rounded-sm bg-white/20" />
              </div>
              <div className="flex gap-1 pl-2">
                <div className="h-1 w-3 rounded-sm bg-[#4A9EFF]/60" />
                <div className="h-1 w-4 rounded-sm bg-white/15" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Base / keyboard laptop */}
      <div className="mx-auto h-1.5 w-full rounded-b-md bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1e] shadow-[0_2px_4px_rgba(0,0,0,0.4)]" />
      {/* Trackpad */}
      <div className="mx-auto mt-0.5 h-0.5 w-8 rounded-sm bg-[#0a0a0e]" />
    </div>
  );
}