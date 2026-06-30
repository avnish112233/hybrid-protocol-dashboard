import { cn } from "@/lib/utils";

/**
 * Slim vertical bar with a small "You are here" label.
 * `leftPct` is the position along the parent track (0-100).
 * Position the parent with `relative` and place this directly under the track.
 */
export function YouAreHereMarker({
  leftPct,
  color = "var(--foreground)",
  label = "You are here",
  className,
}: {
  leftPct: number;
  color?: string;
  label?: string;
  className?: string;
}) {
  const clamped = Math.min(100, Math.max(0, leftPct));
  return (
    <div
      className={cn("pointer-events-none absolute top-0 -translate-x-1/2", className)}
      style={{ left: `${clamped}%` }}
    >
      <div className="flex flex-col items-center">
        <span
          className="whitespace-nowrap rounded-sm px-1.5 py-0.5 text-[8px] font-semibold uppercase tracking-wider text-background"
          style={{ backgroundColor: color }}
        >
          {label}
        </span>
        <span
          className="mt-0.5 block h-3 w-[2px] rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  );
}