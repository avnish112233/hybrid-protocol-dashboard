import { Eyebrow } from "./Eyebrow";
import { AccentCallout } from "./AccentCallout";
import { quadrantPosition, insights } from "@/data/athlete";

function Quadrant() {
  const { x, y } = quadrantPosition;
  const cx = x * 100;
  const cy = (1 - y) * 100;
  return (
    <div className="relative mx-auto h-[200px] w-full max-w-[260px] overflow-hidden rounded-2xl bg-surface">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
      <span className="absolute left-1/2 top-1.5 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Elite
      </span>
      <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Developing
      </span>
      <span className="absolute left-1.5 top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Strength
      </span>
      <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Aerobic
      </span>
      <div
        className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-foreground/15"
        style={{ left: `${cx}%`, top: `${cy}%` }}
      />
    </div>
  );
}

export function QuadrantChart() {
  return (
    <section className="rounded-2xl border border-border/60 bg-card p-4 border border-[var(--card-border)]">
      <h2 className="text-xs font-medium text-foreground">Athlete profile</h2>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        Your position on the HYROX map — overall capacity vs. strength/aerobic mix.
      </p>
      <div className="mt-4 rounded-xl border border-border/60 bg-card p-3">
        <Quadrant />
      </div>

      <AccentCallout tone="orange" className="mt-4">
        <div className="text-[13px] font-semibold text-foreground">
          What this means for you
        </div>
        <p className="mt-1 text-[13px] leading-relaxed text-foreground/85">
          You sit in the upper-aerobic half of the map. Your engine is ahead of your
          raw strength — translate that capacity into stronger sled and carry work.
        </p>
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