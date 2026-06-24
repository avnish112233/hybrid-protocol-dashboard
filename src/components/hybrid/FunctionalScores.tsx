import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Activity } from "lucide-react";
import { functionalScores, summary } from "@/data/athlete";
import { Eyebrow } from "./Eyebrow";

export function FunctionalScores() {
  return (
    <section className="border border-border bg-card p-5">
      <Eyebrow>Lab Report</Eyebrow>
      <h2
        className="mt-1 font-display text-xl uppercase tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        Functional Scores
      </h2>

      <Accordion type="multiple" defaultValue={["Neuromuscular Power"]} className="mt-3">
        {functionalScores.map((cat) => (
          <AccordionItem key={cat.title} value={cat.title} className="border-border">
            <AccordionTrigger className="py-3 text-sm font-bold uppercase tracking-wider hover:no-underline">
              {cat.title}
            </AccordionTrigger>
            <AccordionContent className="pb-3">
              <ul className="divide-y divide-border">
                {cat.tests.map((t) => (
                  <li key={t.name} className="flex items-start justify-between gap-3 py-2.5">
                    <div className="flex min-w-0 items-start gap-2">
                      <Activity className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-foreground">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.correlation}</div>
                      </div>
                    </div>
                    <div className="shrink-0 text-right text-sm font-bold text-primary">{t.value}</div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-4 grid gap-2 border-t border-border pt-4">
        <div className="border border-border p-3">
          <Eyebrow className="text-primary">Primary Strength</Eyebrow>
          <p className="mt-1 text-sm font-medium text-foreground">{summary.primaryStrength}</p>
        </div>
        <div className="border border-border p-3">
          <Eyebrow>Primary Limiter</Eyebrow>
          <p className="mt-1 text-sm font-medium text-foreground">{summary.primaryLimiter}</p>
        </div>
      </div>
    </section>
  );
}