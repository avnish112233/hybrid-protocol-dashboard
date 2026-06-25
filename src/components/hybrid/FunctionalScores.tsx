import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { functionalScores } from "@/data/athlete";
import { Eyebrow } from "./Eyebrow";
import { StatusPill, statusColor, type Status } from "@/lib/status";
import { AsymmetrySlider, asymmetryStatus, parseAsymmetry } from "./AsymmetrySlider";

function aggregateStatus(statuses: Status[]): Status {
  if (statuses.some((s) => s === "suboptimal")) return "suboptimal";
  if (statuses.some((s) => s === "normal")) return "normal";
  return "optimal";
}

export function FunctionalScores() {
  return (
    <section className="rounded-2xl bg-card p-5 border border-[var(--card-border)]">
      <Eyebrow>Lab Report</Eyebrow>
      <h2
        className="mt-1 text-xl tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        Functional Scores
      </h2>

      <Accordion type="multiple" defaultValue={["Neuromuscular Power"]} className="mt-3">
        {functionalScores.map((cat) => {
          const agg = aggregateStatus(cat.tests.map((t) => t.status));
          return (
            <AccordionItem key={cat.title} value={cat.title} className="border-border">
              <AccordionTrigger className="py-3 hover:no-underline">
                <div className="flex w-full items-center justify-between gap-3 pr-2">
                  <span className="text-sm font-medium text-foreground">{cat.title}</span>
                  <StatusPill status={agg} />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pb-3">
                <ul className="divide-y divide-border">
                  {cat.tests.map((t) => {
                    const asym = parseAsymmetry(t.value);
                    const effective: Status = asym !== null ? asymmetryStatus(asym) : t.status;
                    return (
                      <li key={t.name} className="py-3">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <div className="text-sm font-medium text-foreground">{t.name}</div>
                            <div className="mt-0.5 text-xs text-muted-foreground">{t.correlation}</div>
                          </div>
                          <div
                            className="shrink-0 text-right text-sm font-medium tabular-nums"
                            style={{ color: statusColor[effective] }}
                          >
                            {t.value}
                          </div>
                        </div>
                        {asym !== null && <AsymmetrySlider percent={asym} />}
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