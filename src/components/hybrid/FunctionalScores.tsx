import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { functionalScores } from "@/data/athlete";
import { StatusPill, statusColor, type Status } from "@/lib/status";
import { AsymmetrySlider, asymmetryStatus, parseAsymmetry } from "./AsymmetrySlider";
import { NormativeScale } from "./NormativeScale";

function aggregateStatus(statuses: Status[]): Status {
  if (statuses.some((s) => s === "suboptimal")) return "suboptimal";
  if (statuses.some((s) => s === "normal")) return "normal";
  return "optimal";
}

export function FunctionalScores() {
  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
      <h2
        className="text-base tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
      >
        Functional Scores
      </h2>

      <Accordion type="multiple" defaultValue={["Neuromuscular Power"]} className="mt-2">
        {functionalScores.map((cat) => {
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