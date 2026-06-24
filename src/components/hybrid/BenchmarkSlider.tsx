import { Eyebrow } from "./Eyebrow";
import { getBenchmarkStatus, statusColor, StatusPill } from "@/lib/status";

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

export function BenchmarkSlider({
  eyebrow,
  label,
  value,
  unit,
  benchmarkLow,
  benchmarkHigh,
  min,
  max,
}: Props) {
  const pct = (n: number) => Math.max(0, Math.min(100, ((n - min) / (max - min)) * 100));
  const status = getBenchmarkStatus(value, benchmarkLow, benchmarkHigh, min, max);
  const span = max - min;
  const tol = span * 0.1;
  const normalLowPct = pct(benchmarkLow - tol);
  const optimalLowPct = pct(benchmarkLow);
  const optimalHighPct = pct(benchmarkHigh);
  const normalHighPct = pct(benchmarkHigh + tol);

  const trackBg = `linear-gradient(to right,
    var(--status-suboptimal) 0%,
    var(--status-suboptimal) ${normalLowPct}%,
    var(--status-normal) ${normalLowPct}%,
    var(--status-normal) ${optimalLowPct}%,
    var(--status-optimal) ${optimalLowPct}%,
    var(--status-optimal) ${optimalHighPct}%,
    var(--status-normal) ${optimalHighPct}%,
    var(--status-normal) ${normalHighPct}%,
    var(--status-suboptimal) ${normalHighPct}%,
    var(--status-suboptimal) 100%)`;

  return (
    <section className="rounded-2xl bg-card p-5 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between gap-2">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <div className="mt-1 text-base font-medium text-foreground">{label}</div>
        </div>
        <StatusPill status={status} />
      </div>

      <div className="mt-4 flex items-baseline gap-1.5">
        <span
          className="text-4xl tabular-nums tracking-tight"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 300,
            color: statusColor[status],
          }}
        >
          {value}
        </span>
        <span className="text-sm font-medium text-muted-foreground">{unit}</span>
      </div>

      <div className="relative mt-5 h-2 w-full overflow-hidden rounded-full opacity-90" style={{ background: trackBg }} />
      <div
        className="relative -mt-[14px] h-[26px]"
        style={{ marginLeft: `calc(${pct(value)}% - 13px)`, width: 26 }}
      >
        <div className="grid h-full w-full place-items-center">
          <div className="h-[26px] w-[26px] rounded-full border-[3px] border-card bg-foreground shadow-md" />
        </div>
      </div>
      <div className="mt-3 flex justify-between text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        <span>{min}{unit === "%" ? "%" : ""}</span>
        <span>Optimal {benchmarkLow}–{benchmarkHigh}</span>
        <span>{max}{unit === "%" ? "%" : ""}</span>
      </div>
    </section>
  );
}