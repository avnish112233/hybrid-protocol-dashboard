export function HrChart({
  series,
  labels,
}: {
  series: number[];
  labels: string[];
}) {
  const w = 320;
  const h = 140;
  const pad = { l: 28, r: 8, t: 12, b: 22 };
  const min = Math.min(...series) - 5;
  const max = Math.max(...series) + 5;
  const stepX = (w - pad.l - pad.r) / (series.length - 1);
  const points = series.map((v, i) => {
    const x = pad.l + i * stepX;
    const y = pad.t + ((max - v) / (max - min)) * (h - pad.t - pad.b);
    return [x, y] as const;
  });
  const path = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const fillPath =
    path +
    ` L${pad.l + (series.length - 1) * stepX},${h - pad.b} L${pad.l},${h - pad.b} Z`;

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="h-[140px] w-full">
      <defs>
        <linearGradient id="hrFill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <text x={pad.l - 4} y={pad.t + 4} textAnchor="end" className="fill-muted-foreground" fontSize="9">
        {Math.round(max)}
      </text>
      <text x={pad.l - 4} y={h - pad.b} textAnchor="end" className="fill-muted-foreground" fontSize="9">
        {Math.round(min)}
      </text>
      <path d={fillPath} fill="url(#hrFill)" />
      <path d={path} fill="none" stroke="var(--primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {labels.map((l, i) => {
        const x = pad.l + (i / (labels.length - 1)) * (w - pad.l - pad.r);
        return (
          <text key={i} x={x} y={h - 6} textAnchor="middle" className="fill-muted-foreground" fontSize="9">
            {l}
          </text>
        );
      })}
    </svg>
  );
}