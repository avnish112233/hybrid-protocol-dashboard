import { Target, Flame } from "lucide-react";
import { quadrantPosition, streak } from "@/data/athlete";

/**
 * Mini 2x2 quadrant with current dot + target ring at the elite center.
 * As `completedCount` grows, the current dot nudges toward the target
 * (purely presentational mock movement).
 */
export function TrainHeroCard({ completedCount = 0 }: { completedCount?: number }) {
  const target = { x: 0.5, y: 0.5 };
  // Each completion nudges 6% toward the target, cap at 70% of the way.
  const t = Math.min(0.7, completedCount * 0.06);
  const cur = {
    x: quadrantPosition.x + (target.x - quadrantPosition.x) * t,
    y: quadrantPosition.y + (target.y - quadrantPosition.y) * t,
  };
  const toPx = (p: { x: number; y: number }) => ({
    left: `${p.x * 100}%`,
    top: `${(1 - p.y) * 100}%`,
  });
  const curPos = toPx(cur);
  const tgtPos = toPx(target);

  return (
    <section className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-card">
      <div className="flex items-stretch gap-3 p-4">
        {/* Quadrant */}
        <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-xl bg-surface">
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-border" />
          <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-border" />
          <span className="absolute left-1/2 top-1 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
            Elite
          </span>
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
            Dev
          </span>
          <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
            Str
          </span>
          <span className="absolute right-1 top-1/2 -translate-y-1/2 text-[8px] font-semibold uppercase tracking-wider text-muted-foreground">
            Aer
          </span>

          {/* dashed line current -> target */}
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <line
              x1={`${cur.x * 100}%`}
              y1={`${(1 - cur.y) * 100}%`}
              x2={`${target.x * 100}%`}
              y2={`${(1 - target.y) * 100}%`}
              stroke="var(--hyrox-yellow)"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
          </svg>

          {/* target ring */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={tgtPos}
          >
            <div className="grid h-5 w-5 place-items-center">
              <Target className="h-5 w-5" style={{ color: "var(--hyrox-yellow)", strokeWidth: 2.5 }} />
            </div>
          </div>

          {/* current dot */}
          <div
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground ring-4 ring-foreground/15 transition-all duration-700"
            style={curPos}
          />
        </div>

        {/* Copy */}
        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Train
            </div>
            <h2
              className="mt-0.5 text-lg leading-tight tracking-tight text-foreground"
              style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
            >
              Move toward Elite
            </h2>
            <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
              Every completed session nudges you toward the centre.
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider"
              style={{ background: "var(--hyrox-black)", color: "var(--hyrox-yellow)" }}
            >
              <Flame className="h-3 w-3" />
              {streak.days + completedCount}d streak
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
              {completedCount} logged this week
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}