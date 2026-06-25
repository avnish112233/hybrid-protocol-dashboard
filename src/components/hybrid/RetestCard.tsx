import { CalendarClock, TrendingDown, TrendingUp } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { retest } from "@/data/athlete";

export function RetestCard() {
  return (
    <section className="rounded-2xl bg-card p-5 border border-[var(--card-border)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Eyebrow>Know your new baseline</Eyebrow>
          <h2
            className="mt-1 text-lg tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            Retest Reminder
          </h2>
        </div>
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-surface">
          <CalendarClock className="h-4 w-4 text-foreground" />
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
        As you keep training, your numbers shift. Because you are putting in the effort,
        get retested to know your new baseline.
      </p>

      <ul className="mt-4 space-y-1.5 text-sm">
        <li className="flex items-center gap-2 text-foreground">
          <TrendingDown className="h-3.5 w-3.5 text-muted-foreground" />
          Fat percentage will reduce
        </li>
        <li className="flex items-center gap-2 text-foreground">
          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
          VO₂ max will increase
        </li>
        <li className="flex items-center gap-2 text-foreground">
          <TrendingUp className="h-3.5 w-3.5 text-muted-foreground" />
          Muscle mass will increase
        </li>
      </ul>

      <div className="mt-4 grid grid-cols-2 gap-3 rounded-2xl bg-surface px-4 py-3">
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Last tested
          </div>
          <div
            className="mt-0.5 text-sm tabular-nums text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {retest.lastTested}
          </div>
        </div>
        <div>
          <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
            Next retest
          </div>
          <div
            className="mt-0.5 text-sm tabular-nums text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {retest.nextRetest}
          </div>
        </div>
      </div>
    </section>
  );
}