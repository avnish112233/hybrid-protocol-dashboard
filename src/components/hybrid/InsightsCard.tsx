import { Eyebrow } from "./Eyebrow";
import { insights } from "@/data/athlete";

export function InsightsCard() {
  return (
    <section className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
      <Eyebrow>Coaching</Eyebrow>
      <h2
        className="mt-1 text-lg tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        Testing Suggestions
      </h2>

      <ul className="mt-4 space-y-1.5">
        {insights.suggestions.map((s) => (
          <li key={s} className="flex gap-2 text-sm text-foreground">
            <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-muted-foreground" />
            <span className="leading-snug">{s}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}