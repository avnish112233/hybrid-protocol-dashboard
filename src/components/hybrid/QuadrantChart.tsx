import { Eyebrow } from "./Eyebrow";
import { quadrantPosition } from "@/data/athlete";

function Quadrant() {
  const { x, y } = quadrantPosition;
  const cx = x * 100;
  const cy = (1 - y) * 100;
  return (
    <div className="relative mx-auto h-[180px] w-[180px] overflow-hidden rounded-2xl bg-surface">
      <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
      <span className="absolute left-2 top-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Strength
      </span>
      <span className="absolute right-2 top-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Aerobic
      </span>
      <span className="absolute bottom-2 left-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Power
      </span>
      <span className="absolute bottom-2 right-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Endurance
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
    <section className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
      <Eyebrow>Athlete Profile</Eyebrow>
      <h2
        className="mt-1 text-lg tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        Hybrid · Aerobic-leaning
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        This map plots you across two HYROX axes — Strength on the left, Aerobic capacity
        on the right. Your dot shows where your current profile sits between a pure-strength,
        pure-aerobic, or balanced hybrid athlete.
      </p>
      <div className="mt-4">
        <Quadrant />
      </div>
    </section>
  );
}