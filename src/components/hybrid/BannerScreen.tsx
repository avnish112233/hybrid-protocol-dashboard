import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export function BannerScreen() {
  return (
    <Link
      to="/profile"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-primary text-white"
    >
      {/* angled lane stripes */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        viewBox="0 0 400 800"
        preserveAspectRatio="none"
        aria-hidden
      >
        {Array.from({ length: 14 }).map((_, i) => (
          <line
            key={i}
            x1={-200 + i * 60}
            y1={0}
            x2={100 + i * 60}
            y2={800}
            stroke="black"
            strokeWidth="2"
          />
        ))}
      </svg>

      <header className="relative z-10 px-6 pt-10">
        <div className="text-[11px] font-semibold uppercase tracking-[0.32em]">
          Vital Insights Presents
        </div>
        <div className="mt-2 h-px w-12 bg-black/70" />
      </header>

      <div className="relative z-10 px-6">
        <h1
          className="font-display text-[64px] uppercase leading-[0.88] tracking-tight sm:text-[88px]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Hybrid
          <br />
          Protocol
        </h1>
        <p className="mt-4 max-w-xs text-base font-medium italic text-black/85">
          Built for a Champion.
        </p>
      </div>

      <footer className="relative z-10 px-6 pb-10">
        <div className="mb-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-black/50" />
          <div className="h-2 w-2 rotate-45 bg-black" />
          <div className="h-px flex-1 bg-black/50" />
        </div>
        <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.24em]">
          <span>HYROX · Performance</span>
          <span className="inline-flex items-center gap-1">
            Tap to view your profile <ChevronRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </footer>
    </Link>
  );
}