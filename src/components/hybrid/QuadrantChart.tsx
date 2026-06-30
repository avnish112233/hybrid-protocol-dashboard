import { Eyebrow } from "./Eyebrow";
import { AccentCallout } from "./AccentCallout";
import { athleteMetrics, insights } from "@/data/athlete";
import { useReferenceConfig } from "@/hooks/useReferenceConfig";
import { computeQuadrant, type QuadrantResult } from "@/lib/quadrant";

function Quadrant({ result }: { result: QuadrantResult }) {
  const cx = result.x * 100;
  const cy = (1 - result.y) * 100;

  const tintTL = "color-mix(in oklab, var(--status-normal) 8%, transparent)";
  const tintTR = "color-mix(in oklab, var(--status-optimal) 8%, transparent)";
  const tintBL = "color-mix(in oklab, var(--status-suboptimal) 6%, transparent)";
  const tintBR = "color-mix(in oklab, var(--status-suboptimal) 4%, transparent)";

  return (
    <div className="relative mx-auto h-[220px] w-full max-w-[280px] overflow-hidden rounded-2xl bg-surface">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
        <div style={{ background: tintTL }} />
        <div style={{ background: tintTR }} />
        <div style={{ background: tintBL }} />
        <div style={{ background: tintBR }} />
      </div>

      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />

      <span className="absolute left-[25%] top-2 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/60">Strength Elite</span>
      <span className="absolute left-[75%] top-2 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/60">Hybrid Elite</span>
      <span className="absolute left-[25%] bottom-2 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/60">Str. Foundation</span>
      <span className="absolute left-[75%] bottom-2 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground/60">Aero. Foundation</span>

      <span className="absolute left-1 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-center text-[7px] font-bold uppercase tracking-widest text-muted-foreground/50">Capacity</span>

      <div
        className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-foreground/15 shadow-sm"
        style={{ left: `${cx}%`, top: `${cy}%` }}
      />

      <div className="absolute right-2 bottom-8 flex flex-col gap-1 items-end">
        <span className="text-[7px] uppercase tracking-wider text-muted-foreground/50">Aerobic</span>
        <div className="w-12 h-1 rounded-full bg-border overflow-hidden">
          <div className="h-full rounded-full bg-foreground/40" style={{ width: `${result.aerobicScore * 100}%` }} />
        </div>
        <span className="text-[7px] uppercase tracking-wider text-muted-foreground/50">Strength</span>
        <div className="w-12 h-1 rounded-full bg-border overflow-hidden">
          <div className="h-full rounded-full bg-foreground/40" style={{ width: `${result.strengthScore * 100}%` }} />
        </div>
      </div>
    </div>
  );
}

export function QuadrantChart() {
  const config = useReferenceConfig();
  const result = computeQuadrant(athleteMetrics, config.quadrant);

  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-xs font-medium text-foreground">Athlete profile</h2>
          <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">
            Capacity vs. aerobic/strength mix — calibrated to HYROX age-group population
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--card-border)] bg-surface px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
          {result.label}
        </span>
      </div>

      <div className="mt-4 rounded-xl border border-[var(--card-border)] bg-card p-3">
        <Quadrant result={result} />
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-surface px-3 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Aerobic</div>
          <div className="mt-1 text-sm font-semibold text-foreground">{result.aerobicLabel}</div>
          <div className="text-[10px] text-muted-foreground">{Math.round(result.aerobicScore * 100)}th pct</div>
        </div>
        <div className="rounded-xl bg-surface px-3 py-2">
          <div className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">Strength</div>
          <div className="mt-1 text-sm font-semibold text-foreground">{result.strengthLabel}</div>
          <div className="text-[10px] text-muted-foreground">{Math.round(result.strengthScore * 100)}th pct</div>
        </div>
      </div>

      <AccentCallout tone="orange" className="mt-4">
        <div className="text-[13px] font-semibold text-foreground">What this means for you</div>
        <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">{result.insight}</p>
      </AccentCallout>

      <div className="mt-4">
        <Eyebrow>Injury risk</Eyebrow>
        <ul className="mt-2 space-y-1.5">
          {insights.injuryRisks.map((r) => (
            <li key={r.label} className="flex gap-2 text-sm text-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
              <span className="leading-snug">{r.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
