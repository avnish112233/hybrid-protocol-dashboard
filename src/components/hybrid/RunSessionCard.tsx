import { Link } from "@tanstack/react-router";
import { Activity, ChevronRight, Heart, MapPin, Timer, Zap } from "lucide-react";
import type { RunData } from "@/data/athlete";

export function RunSessionCard({
  data,
  sessionId,
}: {
  data: RunData;
  sessionId: string;
}) {
  return (
    <Link
      to="/session/$sessionId"
      params={{ sessionId }}
      className="block rounded-2xl border border-[var(--card-border)] bg-card p-4 transition-colors hover:bg-surface"
    >
      <div className="flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[var(--accent-orange-soft)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-foreground">
          <Activity className="h-3 w-3 text-primary" />
          Synced · {data.source}
        </div>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
      </div>

      <div className="mt-3 flex items-baseline gap-1.5">
        <span
          className="text-3xl tabular-nums tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)", fontWeight: 400 }}
        >
          {data.distanceKm.toFixed(1)}
        </span>
        <span className="text-xs font-medium text-muted-foreground">km</span>
        <span className="ml-2 text-xs text-muted-foreground">· {data.avgPaceLabel}</span>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2 text-[11px]">
        <Stat icon={<Timer className="h-3 w-3" />} label="Time" value={`${data.durationMin}m`} />
        <Stat icon={<Heart className="h-3 w-3" />} label="Avg HR" value={`${data.avgHr} bpm`} />
        <Stat icon={<Zap className="h-3 w-3" />} label="kcal" value={`${data.calories}`} />
      </div>
    </Link>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-lg bg-surface px-2 py-1.5">
      <div className="flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-[9px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div className="mt-0.5 text-sm font-medium tabular-nums text-foreground">{value}</div>
    </div>
  );
}