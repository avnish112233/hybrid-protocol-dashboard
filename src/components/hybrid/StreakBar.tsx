import { streak } from "@/data/athlete";

export function StreakBar() {
  const pct = Math.min(1, streak.days / streak.nextMilestone);
  const size = 64;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct);

  return (
    <section className="flex items-center gap-4 rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--surface)"
            strokeWidth={stroke}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset={offset}
          />
        </svg>
        <div
          className="absolute inset-0 grid place-items-center text-base font-medium tabular-nums"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {streak.days}
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-base font-medium text-foreground">Day streak</div>
        <div className="mt-0.5 text-xs text-muted-foreground">
          {streak.nextMilestone - streak.days} days to next milestone · {streak.nextMilestone}d
        </div>
      </div>
    </section>
  );
}