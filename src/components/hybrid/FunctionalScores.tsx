import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FunctionalCategory } from "@/data/athlete";
import { StatusPill, statusColor, type Status } from "@/lib/status";
import { AsymmetrySlider, asymmetryStatus, parseAsymmetry } from "./AsymmetrySlider";
import { NormativeScale } from "./NormativeScale";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";
import type { VIStrength } from "@/services/athleteProfile";

function aggregateStatus(statuses: Status[]): Status {
  if (statuses.some((s) => s === "suboptimal")) return "suboptimal";
  if (statuses.some((s) => s === "normal")) return "normal";
  return "optimal";
}

function buildCategories(strength: VIStrength): FunctionalCategory[] {
  const cats: FunctionalCategory[] = [];

  const powerTests = [];
  if (strength.imtp_kg != null) {
    const bwRatio = strength.imtp_kg;
    powerTests.push({
      name: "Isometric Mid Thigh Pull",
      correlation: "Start Strength / Sled Push",
      value: `${strength.imtp_kg} kg`,
      status: (strength.imtp_kg >= 140 ? "optimal" : strength.imtp_kg >= 100 ? "normal" : "suboptimal") as Status,
      scale: { valueNumeric: strength.imtp_kg, min: 40, max: 220, optimalLow: 100, optimalHigh: 180, unit: "kg" },
    });
  }
  if (strength.cmj_watts_per_kg != null) {
    powerTests.push({
      name: "Counter Movement Jump",
      correlation: "Wall Ball & Burpee capacity",
      value: `${strength.cmj_watts_per_kg} W/kg`,
      status: (strength.cmj_watts_per_kg >= 42 ? "optimal" : strength.cmj_watts_per_kg >= 30 ? "normal" : "suboptimal") as Status,
      scale: { valueNumeric: strength.cmj_watts_per_kg, min: 15, max: 65, optimalLow: 35, optimalHigh: 52, unit: "W/kg" },
    });
  }
  if (strength.drop_jump_rsi != null) {
    powerTests.push({
      name: "Drop Jump RSI",
      correlation: "Running Economy / tendon stiffness",
      value: `RSI ${strength.drop_jump_rsi.toFixed(2)}`,
      status: (strength.drop_jump_rsi >= 0.7 ? "optimal" : strength.drop_jump_rsi >= 0.45 ? "normal" : "suboptimal") as Status,
      scale: { valueNumeric: strength.drop_jump_rsi, min: 0.2, max: 1.8, optimalLow: 0.7, optimalHigh: 1.2, unit: "RSI" },
    });
  }
  if (powerTests.length > 0) cats.push({ title: "Neuromuscular Power", tests: powerTests });

  const gripTests = [];
  if (strength.grip_left_kg != null && strength.grip_right_kg != null) {
    const l = strength.grip_left_kg;
    const r = strength.grip_right_kg;
    const diff = l > r ? ((l - r) / r) * 100 : ((r - l) / l) * 100;
    const side = l > r ? "L>R" : "R>L";
    gripTests.push({
      name: "Hand Grip Strength",
      correlation: "Farmer's Carry / grip endurance",
      value: `L ${l} / R ${r} kg · ${diff.toFixed(1)}% ${side}`,
      status: (diff > 15 ? "suboptimal" : diff > 8 ? "normal" : "optimal") as Status,
    });
  }
  if (gripTests.length > 0) cats.push({ title: "Grip Strength", tests: gripTests });

  return cats;
}

export function FunctionalScores() {
  const { data: profile } = useAthleteProfile();
  const strength = profile?.vi?.strength;

  if (!strength) {
    return (
      <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
        <h2
          className="text-base tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          Functional Scores
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          Strength and neuromuscular tests pending — schedule a test session with your coach.
        </p>
      </section>
    );
  }

  const categories = buildCategories(strength);

  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
      <h2
        className="text-base tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        Functional Scores
      </h2>

      <Accordion type="multiple" defaultValue={categories.map((c) => c.title)} className="mt-2">
        {categories.map((cat) => {
          const agg = aggregateStatus(cat.tests.map((t) => t.status));
          return (
            <AccordionItem key={cat.title} value={cat.title} className="border-border">
              <AccordionTrigger className="py-2.5 hover:no-underline">
                <div className="flex w-full items-center justify-between gap-3 pr-2">
                  <span className="text-[13px] font-medium text-foreground">{cat.title}</span>
                  <StatusPill status={agg} />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-2">
                <ul className="divide-y divide-border">
                  {cat.tests.map((t) => {
                    const asym = parseAsymmetry(t.value);
                    const effective: Status = asym !== null ? asymmetryStatus(asym) : t.status;
                    return (
                      <li key={t.name} className="py-2.5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-[13px] font-medium text-foreground">{t.name}</div>
                            <div className="mt-0.5 text-[11px] text-muted-foreground">{t.correlation}</div>
                          </div>
                          <div
                            className="shrink-0 text-right text-[13px] font-semibold tabular-nums"
                            style={{ color: statusColor[effective] }}
                          >
                            {t.value}
                          </div>
                        </div>
                        {asym !== null ? (
                          <AsymmetrySlider percent={asym} />
                        ) : t.scale ? (
                          <NormativeScale value={t.scale.valueNumeric} scale={t.scale} />
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </section>
  );
}
