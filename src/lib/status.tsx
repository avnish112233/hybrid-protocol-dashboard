import { cn } from "@/lib/utils";

export type Status = "optimal" | "normal" | "suboptimal";

export function getBenchmarkStatus(
  value: number,
  low: number,
  high: number,
  min: number,
  max: number,
): Status {
  if (value >= low && value <= high) return "optimal";
  const span = max - min;
  const tolerance = span * 0.1;
  if (value >= low - tolerance && value <= high + tolerance) return "normal";
  return "suboptimal";
}

export const statusLabel: Record<Status, string> = {
  optimal: "Optimal",
  normal: "Normal",
  suboptimal: "Suboptimal",
};

export const statusColor: Record<Status, string> = {
  optimal: "var(--status-optimal)",
  normal: "var(--status-normal)",
  suboptimal: "var(--status-suboptimal)",
};

export const statusTextClass: Record<Status, string> = {
  optimal: "text-[color:var(--status-optimal)]",
  normal: "text-[color:var(--status-normal)]",
  suboptimal: "text-[color:var(--status-suboptimal)]",
};

export const statusBgClass: Record<Status, string> = {
  optimal: "bg-[color:var(--status-optimal)]",
  normal: "bg-[color:var(--status-normal)]",
  suboptimal: "bg-[color:var(--status-suboptimal)]",
};

export function StatusDot({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn("inline-block h-2 w-2 rounded-full", statusBgClass[status], className)}
      aria-label={statusLabel[status]}
    />
  );
}

export function StatusPill({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
        className,
      )}
      style={{
        color: statusColor[status],
        backgroundColor: `color-mix(in oklab, ${statusColor[status]} 14%, transparent)`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ backgroundColor: statusColor[status] }}
      />
      {statusLabel[status]}
    </span>
  );
}