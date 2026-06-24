import { Eyebrow } from "./Eyebrow";

interface Props {
  eyebrow: string;
  label: string;
  value: number;
  unit: string;
  benchmarkLow: number;
  benchmarkHigh: number;
  min: number;
  max: number;
}

export function BenchmarkSlider({ eyebrow, label, value, unit, benchmarkLow, benchmarkHigh, min, max }: Props) {
  const pct = (n: number) => ((n - min) / (max - min)) * 100;
  const status =
    value < benchmarkLow
      ? "Below HYROX athlete average"
      : value > benchmarkHigh
        ? "Above HYROX athlete average"
        : "Within optimal range";

  return (
    <section className="border border-border bg-card p-5">
      <Eyebrow>{eyebrow}</Eyebrow>
      <div className="mt-1 flex items-baseline justify-between">
        <span className="text-sm font-bold uppercase tracking-wider text-foreground">{label}</span>
        <span
          className="font-display text-3xl text-primary"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {value}
          <span className="ml-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {unit}
          </span>
        </span>
      </div>

      <div className="relative mt-5 h-2 w-full bg-muted">
        {/* benchmark band */}
        <div
          className="absolute top-0 h-full bg-primary/20"
          style={{
            left: `${pct(benchmarkLow)}%`,
            width: `${pct(benchmarkHigh) - pct(benchmarkLow)}%`,
          }}
        />
        {/* athlete marker */}
        <div
          className="absolute -top-1 h-4 w-0.5 bg-primary"
          style={{ left: `${pct(value)}%` }}
        />
        <div
          className="absolute -top-2 h-2 w-2 -translate-x-1/2 rotate-45 bg-primary"
          style={{ left: `${pct(value)}%` }}
        />
      </div>
      <div className="mt-1 flex justify-between text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
        <span>{min}</span>
        <span>
          HYROX band {benchmarkLow}–{benchmarkHigh}
        </span>
        <span>{max}</span>
      </div>
      <p className="mt-3 text-xs font-medium text-foreground">{status}</p>
    </section>
  );
}