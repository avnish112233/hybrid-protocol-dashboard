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
      <div className="relative h-5">
        <YouAreHereMarker leftPct={pct(value)} color={statusColor[status]} />
      </div>
      <div className="mt-0.5 flex justify-between text-[9px] font-medium uppercase tracking-wider text-muted-foreground tabular-nums">
        <span>{fmt(min)}{scale.unit ? ` ${scale.unit}` : ""}</span>
        <span>Optimal {fmt(optimalLow)}–{fmt(optimalHigh)}</span>
        <span>{fmt(max)}{scale.unit ? ` ${scale.unit}` : ""}</span>
      </div>
    </div>
  );
}