import { Eyebrow } from "./Eyebrow";
import { quadrantPosition } from "@/data/athlete";

export function QuadrantChart() {
  const { x, y } = quadrantPosition; // 0..1
  const cx = x * 100;
  const cy = (1 - y) * 100;
  return (
    <section className="border border-border bg-card p-5">
      <Eyebrow>Athlete Quadrant</Eyebrow>
      <h2
        className="mt-1 font-display text-xl uppercase tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Where You Stand.
      </h2>

      <div className="relative mt-4 aspect-square w-full border border-border">
        {/* quadrant tints */}
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="bg-foreground/[0.03]" />
          <div className="bg-primary/[0.04]" />
          <div className="bg-foreground/[0.02]" />
          <div className="bg-primary/[0.03]" />
        </div>
        {/* axes */}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />

        {/* corner labels */}
        <span className="absolute left-2 top-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Strength Athlete
        </span>
        <span className="absolute right-2 top-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Aerobic Athlete
        </span>
        <span className="absolute bottom-2 left-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Developing
        </span>
        <span className="absolute bottom-2 right-2 text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
          Aerobic Base
        </span>
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border border-border bg-card px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-foreground">
          Hybrid
        </span>

        {/* dot */}
        <div
          className="absolute"
          style={{ left: `${cx}%`, top: `${cy}%`, transform: "translate(-50%,-50%)" }}
        >
          <div className="relative">
            <div className="h-3 w-3 rounded-full bg-primary ring-4 ring-primary/20" />
            <div className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap border border-primary bg-card px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary">
              You are here
            </div>
          </div>
        </div>
      </div>

      {/* axis labels */}
      <div className="mt-2 flex justify-between text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        <span>Strength</span>
        <span>Aerobic</span>
      </div>
      <div className="mt-1 text-center text-[9px] font-semibold uppercase tracking-wider text-muted-foreground">
        Athleticism Level ↑
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Position recalculates as new test data comes in.
      </p>
    </section>
  );
}