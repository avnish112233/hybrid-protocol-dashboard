import { Sparkles, ShieldAlert } from "lucide-react";
import { Eyebrow } from "./Eyebrow";
import { StatusDot } from "@/lib/status";
import { insights } from "@/data/athlete";

export function InsightsCard() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
      <Eyebrow>Coaching</Eyebrow>
      <h2
        className="mt-1 text-lg tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        Suggestions &amp; Injury Risks
      </h2>

      <div className="mt-4 grid gap-5">
        <div>
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-muted-foreground" />
            <Eyebrow>Suggestions</Eyebrow>
          </div>
          <ul className="mt-2 space-y-1.5">
            {insights.suggestions.map((s) => (
              <li key={s} className="flex gap-2 text-sm text-foreground">
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
                <span className="leading-snug">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <ShieldAlert className="h-3.5 w-3.5 text-muted-foreground" />
            <Eyebrow>Injury Risks</Eyebrow>
          </div>
          <ul className="mt-2 space-y-1.5">
            {insights.injuryRisks.map((r) => (
              <li key={r.label} className="flex items-start gap-2 text-sm text-foreground">
                <StatusDot status={r.severity} className="mt-1.5" />
                <span className="leading-snug">{r.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}