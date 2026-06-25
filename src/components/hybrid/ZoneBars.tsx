const zoneColors = ["#94a3b8", "#60a5fa", "#34d399", "#f59e0b", "#ef4444"];
const zoneLabels = ["Z1 Recovery", "Z2 Aerobic", "Z3 Tempo", "Z4 Threshold", "Z5 VO2"];

export function ZoneBars({
  zones,
}: {
  zones: { z1: number; z2: number; z3: number; z4: number; z5: number };
}) {
  const arr = [zones.z1, zones.z2, zones.z3, zones.z4, zones.z5];
  const max = Math.max(...arr, 10);
  return (
    <div className="space-y-2">
      {arr.map((v, i) => (
        <div key={i} className="grid grid-cols-[64px_1fr_36px] items-center gap-2">
          <span className="text-[11px] font-medium text-foreground">{zoneLabels[i]}</span>
          <div className="relative h-3 overflow-hidden rounded-full bg-surface">
            <div
              className="h-full rounded-full"
              style={{ width: `${(v / max) * 100}%`, backgroundColor: zoneColors[i] }}
            />
          </div>
          <span className="text-right text-[11px] tabular-nums text-muted-foreground">{v}%</span>
        </div>
      ))}
    </div>
  );
}