import { Flame } from "lucide-react";
import { streak } from "@/data/athlete";

export function StreakBar() {
  const pct = Math.min(100, (streak.days / streak.nextMilestone) * 100);
  return (
    <section className="border border-border bg-card p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Flame className="h-7 w-7 text-primary" />
          <div>
            <div
              className="font-display text-3xl leading-none text-foreground"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {streak.days}
            </div>
            <div className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
              Day Streak
            </div>
          </div>
        </div>
        <div className="text-right text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          Next: {streak.nextMilestone}d
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">
        Every logged day moves you closer to a Hybrid Athlete.
      </p>
      <div className="relative mt-3 h-1.5 w-full bg-muted">
        <div className="absolute inset-y-0 left-0 bg-primary" style={{ width: `${pct}%` }} />
      </div>
    </section>
  );
}