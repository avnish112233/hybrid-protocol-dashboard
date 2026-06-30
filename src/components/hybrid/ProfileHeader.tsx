import { Watch } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { retest } from "@/data/athlete";

/**
 * HYROX-flavored industrial banner — yellow + black with diagonal chevrons.
 */
export function ProfileHeader() {
  return (
    <header
      className="relative overflow-hidden px-5 pb-5 pt-6"
      style={{
        background: "var(--hyrox-black)",
        color: "var(--hyrox-yellow)",
      }}
    >
      {/* Diagonal stripes */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, var(--hyrox-yellow) 0 14px, transparent 14px 32px)",
        }}
      />
      {/* Big chevron motif on the right */}
      <div
        className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 text-[120px] leading-none opacity-20"
        style={{ fontFamily: "var(--font-display)", fontWeight: 900, color: "var(--hyrox-yellow)" }}
      >
        »
      </div>

      <div className="relative flex items-start justify-between">
        <div>
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.32em]"
            style={{ color: "var(--hyrox-yellow)" }}
          >
            Vital Insights
          </div>
          <h1
            className="mt-1 text-3xl uppercase leading-[0.95] tracking-[-0.02em]"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              color: "var(--hyrox-yellow)",
            }}
          >
            Hybrid<br />Protocol<span style={{ color: "var(--hyrox-yellow)" }}>.</span>
          </h1>
          <div
            className="mt-2 inline-block px-2 py-[3px] text-[9px] font-bold uppercase tracking-[0.28em]"
            style={{ background: "var(--hyrox-yellow)", color: "var(--hyrox-black)" }}
          >
            Train · Measure · Repeat
          </div>
        </div>
        <Link
          to="/wearables"
          className="grid h-9 w-9 place-items-center rounded-full border"
          style={{
            borderColor: "color-mix(in oklab, var(--hyrox-yellow) 40%, transparent)",
            color: "var(--hyrox-yellow)",
          }}
          aria-label="Wearables"
        >
          <Watch className="h-4 w-4" />
        </Link>
      </div>

      <p
        className="relative mt-3 text-[10px] font-medium uppercase tracking-[0.2em]"
        style={{ color: "color-mix(in oklab, var(--hyrox-yellow) 75%, transparent)" }}
      >
        Last updated · {retest.lastTested}
      </p>
    </header>
  );
}