import { type Status } from "@/lib/status";
import { YouAreHereMarker } from "./YouAreHereMarker";
import { statusColor } from "@/lib/status";

export function asymmetryStatus(percent: number): Status {
  const abs = Math.abs(percent);
  if (abs < 10) return "optimal";
  if (abs < 18) return "normal";
  return "suboptimal";
}

const RANGE = 25; // ± percent shown

/**
 * Balance scale: center = perfectly symmetric (0%).
 * Negative percent = L>R (left dominant), positive = R>L (right dominant).
 */
export function AsymmetrySlider({ percent }: { percent: number }) {
  const clamped = Math.min(Math.max(percent, -RANGE), RANGE);
  // Map [-RANGE..RANGE] -> [0..100]
  const toPct = (n: number) => ((n + RANGE) / (RANGE * 2)) * 100;
  const status = asymmetryStatus(percent);

  // Bands: |x| < 10 optimal, 10-18 normal, >=18 suboptimal
  const optLow = toPct(-10);
  const optHigh = toPct(10);
  const normLow = toPct(-18);
  const normHigh = toPct(18);
  const bg = `linear-gradient(to right,
    var(--status-suboptimal) 0%,
    var(--status-suboptimal) ${normLow}%,
    var(--status-normal) ${normLow}%,
    var(--status-normal) ${optLow}%,
    var(--status-optimal) ${optLow}%,
    var(--status-optimal) ${optHigh}%,
    var(--status-normal) ${optHigh}%,
    var(--status-normal) ${normHigh}%,
    var(--status-suboptimal) ${normHigh}%,
    var(--status-suboptimal) 100%)`;

  return (
    <div className="mt-2 w-full">
      <div className="relative h-1.5 w-full overflow-hidden rounded-full opacity-90" style={{ background: bg }}>
        {/* center tick */}
        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-background/70" />
      </div>
      <div className="relative h-5">
        <YouAreHereMarker leftPct={toPct(clamped)} color={statusColor[status]} />
      </div>
      <div className="mt-0.5 flex justify-between text-[9px] font-medium uppercase tracking-wider text-muted-foreground tabular-nums">
        <span>L 25%+</span>
        <span>Balanced</span>
        <span>R 25%+</span>
      </div>
    </div>
  );
}

/**
 * Returns a SIGNED asymmetry percent: negative = L dominant, positive = R dominant.
 * Returns null when the value has no L/R directional context.
 */
export function parseAsymmetry(value: string): number | null {
  const directional = value.match(/(-?\d+(?:\.\d+)?)\s*%\s*([LR])\s*>\s*([LR])/i);
  if (directional) {
    const abs = Math.abs(Number(directional[1]));
    const dominant = directional[2].toUpperCase();
    return dominant === "L" ? -abs : abs;
  }
  return null;
}