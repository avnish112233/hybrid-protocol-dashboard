import { AccentCallout } from "./AccentCallout";
import { insights } from "@/data/athlete";

export function InsightsCard() {
  return (
    <section>
      <h2 className="mb-2 px-1 text-sm font-semibold text-foreground">
        Recommended Testing
      </h2>
      <AccentCallout tone="green">
        <ul className="space-y-2">
          {insights.suggestions.map((s) => (
            <li key={s} className="flex gap-2 text-[13px] leading-snug text-foreground">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-foreground/60" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 border-t border-foreground/10 pt-3 text-[12px] italic leading-relaxed text-muted-foreground">
          Champions don't guess — they measure. Train the gaps your numbers reveal.
        </p>
      </AccentCallout>
    </section>
  );
}