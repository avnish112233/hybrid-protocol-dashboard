import { getBenchmarkStatus, statusColor } from "@/lib/status";
import { YouAreHereMarker } from "./YouAreHereMarker";

export interface Scale {
  min: number;
  max: number;
  optimalLow: number;
  optimalHigh: number;
  unit?: string;
}

export function NormativeScale({
  value,
  scale,
}: {
  value: number;
  scale: Scale;
}) {
  const { min, max, optimalLow, optimalHigh } = scale;
  const pct = (n: number) =>
    Math.max(0, Math.min(100, ((n - min) / (max - min)) * 100));
  const status = getBenchmarkStatus(value, optimalLow, optimalHigh, min, max);
  const span = max - min;
  const tol = span * 0.12;
  const nLow = pct(optimalLow - tol);
  const oLow = pct(optimalLow);
  const oHigh = pct(optimalHigh);
  const nHigh = pct(optimalHigh + tol);

  const bg = `linear-gradient(to right,
    var(--status-suboptimal) 0%,
    var(--status-suboptimal) ${nLow}%,
    var(--status-normal) ${nLow}%,
    var(--status-normal) ${oLow}%,
    var(--status-optimal) ${oLow}%,
    var(--status-optimal) ${oHigh}%,
    var(--status-normal) ${oHigh}%,
    var(--status-normal) ${nHigh}%,
    var(--status-suboptimal) ${nHigh}%,
    var(--status-suboptimal) 100%)`;

  const fmt = (n: number) =>
    Number.isInteger(n) ? `${n}` : n.toFixed(n < 10 ? 2 : 1);

  return (
    <div className="mt-2 w-full">
      <div className="relative h-1.5 w-full overflow-hidden rounded-full opacity-90" style={{ background: bg }} />
      <div className="relative h-7 mt-1">
        <YouAreHereMarker leftPct={pct(value)} color={statusColor[status]} />
      </div>
      <ZoneLabels breakpoints={[nLow, oLow, oHigh, nHigh]} />
      <div className="mt-1 flex justify-between text-[9px] font-medium uppercase tracking-wider text-muted-foreground tabular-nums">
        <span>{fmt(min)}{scale.unit ? ` ${scale.unit}` : ""}</span>
        <span>{fmt(max)}{scale.unit ? ` ${scale.unit}` : ""}</span>
      </div>
    </div>
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
    <div className="relative mt-1 h-3 w-full">
      {mids.map((m, i) => (
        <span
          key={i}
          className="absolute top-0 -translate-x-1/2 whitespace-nowrap text-[8px] font-semibold uppercase tracking-wider"
          style={{ left: `${m}%`, color: colors[i] }}
        >
          {labels[i]}
        </span>
      ))}
    </div>
  );
}