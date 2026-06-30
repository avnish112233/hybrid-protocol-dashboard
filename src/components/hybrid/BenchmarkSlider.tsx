import { getBenchmarkStatus, statusColor } from "@/lib/status";
import { YouAreHereMarker } from "./YouAreHereMarker";

interface Props {
  eyebrow: string;
  label: string;
  value: number;
  unit: string;
  benchmarkLow: number;
  benchmarkHigh: number;
  min: number;
  max: number;
  direction?: "symmetric" | "sequential";
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
  direction = "symmetric",
}: Props) {
  const pct = (n: number) => Math.max(0, Math.min(100, ((n - min) / (max - min)) * 100));
  const status = getBenchmarkStatus(value, benchmarkLow, benchmarkHigh, min, max);
  const span = max - min;
  const tol = span * 0.1;
  const normalLowPct = pct(benchmarkLow - tol);
  const optimalLowPct = pct(benchmarkLow);
  const optimalHighPct = pct(benchmarkHigh);
  const normalHighPct = pct(benchmarkHigh + tol);

  const symmetricBg = `linear-gradient(to right,
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

  // Sequential: suboptimal -> normal -> optimal, low to high. Boundaries derived from optimalLow/High.
  const seqNormalEnd = optimalLowPct;
  const seqOptimalStart = optimalLowPct;
  const sequentialBg = `linear-gradient(to right,
    var(--status-suboptimal) 0%,
    var(--status-suboptimal) ${normalLowPct}%,
    var(--status-normal) ${normalLowPct}%,
    var(--status-normal) ${seqNormalEnd}%,
    var(--status-optimal) ${seqOptimalStart}%,
    var(--status-optimal) 100%)`;

  const trackBg = direction === "sequential" ? sequentialBg : symmetricBg;

  const sColor = statusColor[status];
  return (
    <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3
            className="text-lg leading-tight tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            {eyebrow.charAt(0) + eyebrow.slice(1).toLowerCase()}
          </h3>
          <div className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </div>
        </div>
        <span
          className="shrink-0 rounded-full px-2.5 py-1 text-sm font-semibold tabular-nums"
          style={{
            color: sColor,
            background: `color-mix(in oklab, ${sColor} 14%, transparent)`,
          }}
        >
          {value}{unit === "%" ? "%" : ` ${unit}`}
        </span>
      </div>

      <div className="relative mt-3 h-1.5 w-full overflow-hidden rounded-full opacity-90" style={{ background: trackBg }} />
      <div className="relative h-7 mt-2">
        <YouAreHereMarker leftPct={pct(value)} color={sColor} />
      </div>
      {direction === "sequential" ? (
        <SequentialZoneLabels breakpoints={[normalLowPct, seqNormalEnd]} />
      ) : (
        <ZoneLabels
          breakpoints={[normalLowPct, optimalLowPct, optimalHighPct, normalHighPct]}
        />
      )}
      <div className="mt-1 flex justify-between text-[9px] font-medium uppercase tracking-wider text-muted-foreground tabular-nums">
        <span>{min}{unit === "%" ? "%" : ""}</span>
        <span>{max}{unit === "%" ? "%" : ""}</span>
      </div>
    </section>
  );
}

function ZoneLabels({ breakpoints }: { breakpoints: [number, number, number, number] }) {
  const [b1, b2, b3, b4] = breakpoints;
  const mids = [b1 / 2, (b1 + b2) / 2, (b2 + b3) / 2, (b3 + b4) / 2, (b4 + 100) / 2];
  const labels = ["Suboptimal", "Normal", "Optimal", "Normal", "Suboptimal"];
  const colors = [
    "var(--status-suboptimal)",
    "var(--status-normal)",
    "var(--status-optimal)",
    "var(--status-normal)",
    "var(--status-suboptimal)",
  ];
  return (
    <div className="relative mt-2 h-3 w-full">
      {mids.map((m, i) => (
        <span
          key={i}
          className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-tight"
          style={{ left: `${m}%`, color: colors[i] }}
        >
          {labels[i]}
        </span>
      ))}
    </div>
  );
}

function SequentialZoneLabels({ breakpoints }: { breakpoints: [number, number] }) {
  const [b1, b2] = breakpoints;
  const mids = [b1 / 2, (b1 + b2) / 2, (b2 + 100) / 2];
  const labels = ["Suboptimal", "Normal", "Optimal"];
  const colors = [
    "var(--status-suboptimal)",
    "var(--status-normal)",
    "var(--status-optimal)",
  ];
  return (
    <div className="relative mt-2 h-3 w-full">
      {mids.map((m, i) => (
        <span
          key={i}
          className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[7px] font-semibold uppercase tracking-tight"
          style={{ left: `${m}%`, color: colors[i] }}
        >
          {labels[i]}
        </span>
      ))}
    </div>
  );
}