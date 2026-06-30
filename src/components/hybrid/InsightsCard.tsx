import { AccentCallout } from "./AccentCallout";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";

export function InsightsCard() {
  const { data: profile } = useAthleteProfile();
  const dexa = profile?.vi?.dexa;

  const suggestions: string[] = dexa?.body_composition_zone
    ? [
        `Body composition zone: ${dexa.body_composition_zone}`,
        ...(dexa.zone_description ? [dexa.zone_description] : []),
        "Schedule VO₂ max and strength tests to unlock the full 2×2 profile",
      ]
    : [
        "Schedule VO₂ max and strength tests to unlock full profiling",
        "Maintain the current training plan and retest in 6 weeks",
        "Track your daily activity via your connected wearable",
      ];

  return (
    <section>
      <h2 className="mb-2 px-1 text-sm font-semibold text-foreground">
        Recommended Actions
      </h2>
      <AccentCallout tone="green">
        <ul className="space-y-2">
          {suggestions.map((s) => (
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