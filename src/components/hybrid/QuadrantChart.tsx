import { Eyebrow } from "./Eyebrow";
import { quadrantPosition, insights } from "@/data/athlete";
import { StatusDot } from "@/lib/status";
import { Sparkles, ShieldAlert } from "lucide-react";

function MiniQuadrant() {
  const { x, y } = quadrantPosition;
  const cx = x * 100;
  const cy = (1 - y) * 100;
  return (
    <div className="relative h-[120px] w-[120px] shrink-0 overflow-hidden rounded-2xl bg-surface">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
      <span className="absolute left-1.5 top-1.5 text-[8px] font-medium uppercase tracking-wider text-muted-foreground">
        STR
      </span>
      <span className="absolute right-1.5 top-1.5 text-[8px] font-medium uppercase tracking-wider text-muted-foreground">
        AER
      </span>
      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[8px] font-medium uppercase tracking-wider text-muted-foreground">
        Hybrid
      </span>
      <div
        className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-foreground/15"
        style={{ left: `${cx}%`, top: `${cy}%` }}
      />
    </div>
  );
}

export function QuadrantChart() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>Athlete Profile</Eyebrow>
          <h2
            className="mt-1 text-lg tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Hybrid · Aerobic-leaning
          </h2>
        </div>
      </div>

      <div className="mt-4 flex gap-4">
        <MiniQuadrant />
        <div className="min-w-0 flex-1 space-y-3">
          <div>
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-3 w-3 text-muted-foreground" />
              <Eyebrow>Suggestions</Eyebrow>
            </div>
            <ul className="mt-1.5 space-y-1">
              {insights.suggestions.slice(0, 2).map((s) => (
                <li key={s} className="flex gap-1.5 text-xs text-foreground">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                  <span className="leading-snug">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <ShieldAlert className="h-3 w-3 text-muted-foreground" />
              <Eyebrow>Injury Risks</Eyebrow>
            </div>
            <ul className="mt-1.5 space-y-1">
              {insights.injuryRisks.slice(0, 2).map((r) => (
                <li key={r.label} className="flex items-start gap-1.5 text-xs text-foreground">
                  <StatusDot status={r.severity} className="mt-1.5" />
                  <span className="leading-snug">{r.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}