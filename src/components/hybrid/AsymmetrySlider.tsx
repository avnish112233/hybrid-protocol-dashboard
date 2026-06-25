import { type Status } from "@/lib/status";

export function asymmetryStatus(percent: number): Status {
  if (percent < 10) return "optimal";
  if (percent < 18) return "normal";
  return "suboptimal";
}

const MAX = 25;

export function AsymmetrySlider({ percent }: { percent: number }) {
  const clamped = Math.min(Math.max(percent, 0), MAX);
  const pct = (n: number) => (n / MAX) * 100;
  const trackBg = `linear-gradient(to right,
    var(--status-optimal) 0%,
    var(--status-optimal) ${pct(10)}%,
    var(--status-normal) ${pct(10)}%,
    var(--status-normal) ${pct(18)}%,
    var(--status-suboptimal) ${pct(18)}%,
    var(--status-suboptimal) 100%)`;

  return (
    <div className="mt-2 w-full">
      <div className="relative h-1.5 w-full overflow-hidden rounded-full opacity-90" style={{ background: trackBg }} />
      <div
        className="relative -mt-[10px] h-[18px]"
        style={{ marginLeft: `calc(${pct(clamped)}% - 9px)`, width: 18 }}
      >
        <div className="h-[18px] w-[18px] rounded-full border-[3px] border-card bg-foreground shadow-md" />
      </div>
      <div className="mt-1 flex justify-between text-[9px] font-medium uppercase tracking-wider text-muted-foreground tabular-nums">
        <span>0%</span>
        <span>10</span>
        <span>18</span>
        <span>25%+</span>
      </div>
    </div>
  );
}

export function parseAsymmetry(value: string): number | null {
  // Look for patterns like "3.7% L>R", "6.5% R>L", "−22.9/−22%", "22%"
  // Prefer a percentage that appears with a directional token (L>R / R>L) or a leading minus sign in L/R split
  const directional = value.match(/(-?\d+(?:\.\d+)?)\s*%\s*[LR]\s*>\s*[LR]/i);
  if (directional) return Math.abs(Number(directional[1]));
  // L X / R Y form with a trailing % delta — pick the largest absolute percent in the string
  const all = [...value.matchAll(/(-?\d+(?:\.\d+)?)\s*%/g)].map((m) => Math.abs(Number(m[1])));
  if (all.length === 0) return null;
  // If there's only one % and it has no L/R context, it's probably body-fat or similar — skip.
  // We require either a directional token (handled above) or an L .../ R ... pattern.
  if (/\bL\b.*\bR\b/i.test(value) || value.includes("/")) {
    return Math.max(...all);
  }
  return null;
}