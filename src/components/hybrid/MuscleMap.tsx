import type { MuscleEffort, MuscleGroup } from "@/data/sessions";

const effortFill: Record<MuscleEffort, string> = {
  low: "color-mix(in oklab, var(--primary) 18%, var(--surface))",
  med: "color-mix(in oklab, var(--primary) 45%, var(--surface))",
  high: "var(--primary)",
};

function fill(m: Partial<Record<MuscleGroup, MuscleEffort>>, key: MuscleGroup) {
  const e = m[key];
  return e ? effortFill[e] : "var(--surface)";
}

export function MuscleMap({
  muscles,
}: {
  muscles: Partial<Record<MuscleGroup, MuscleEffort>>;
}) {
  return (
    <div className="flex items-center justify-around gap-4">
      <svg viewBox="0 0 140 220" className="h-[220px] w-auto">
        {/* Head */}
        <circle cx="70" cy="18" r="13" fill="var(--surface)" stroke="var(--card-border)" />
        {/* Neck */}
        <rect x="63" y="30" width="14" height="8" fill="var(--surface)" stroke="var(--card-border)" />
        {/* Traps */}
        <path d="M48 38 Q70 32 92 38 L88 48 Q70 44 52 48 Z" fill={fill(muscles, "traps")} stroke="var(--card-border)" />
        {/* Shoulders */}
        <ellipse cx="42" cy="50" rx="11" ry="9" fill={fill(muscles, "shoulders")} stroke="var(--card-border)" />
        <ellipse cx="98" cy="50" rx="11" ry="9" fill={fill(muscles, "shoulders")} stroke="var(--card-border)" />
        {/* Chest */}
        <path d="M50 48 Q70 58 90 48 L90 78 Q70 86 50 78 Z" fill={fill(muscles, "chest")} stroke="var(--card-border)" />
        {/* Biceps */}
        <ellipse cx="34" cy="74" rx="9" ry="16" fill={fill(muscles, "biceps")} stroke="var(--card-border)" />
        <ellipse cx="106" cy="74" rx="9" ry="16" fill={fill(muscles, "biceps")} stroke="var(--card-border)" />
        {/* Forearms */}
        <ellipse cx="30" cy="104" rx="8" ry="16" fill={fill(muscles, "forearms")} stroke="var(--card-border)" />
        <ellipse cx="110" cy="104" rx="8" ry="16" fill={fill(muscles, "forearms")} stroke="var(--card-border)" />
        {/* Abs */}
        <rect x="56" y="84" width="28" height="38" rx="6" fill={fill(muscles, "abs")} stroke="var(--card-border)" />
        {/* Quads */}
        <path d="M52 124 L66 124 L64 178 L52 176 Z" fill={fill(muscles, "quads")} stroke="var(--card-border)" />
        <path d="M74 124 L88 124 L88 176 L76 178 Z" fill={fill(muscles, "quads")} stroke="var(--card-border)" />
        {/* Calves */}
        <path d="M53 180 L64 180 L62 210 L54 210 Z" fill={fill(muscles, "calves")} stroke="var(--card-border)" />
        <path d="M76 180 L87 180 L86 210 L78 210 Z" fill={fill(muscles, "calves")} stroke="var(--card-border)" />
      </svg>

      <svg viewBox="0 0 140 220" className="h-[220px] w-auto">
        {/* Back view */}
        <circle cx="70" cy="18" r="13" fill="var(--surface)" stroke="var(--card-border)" />
        <rect x="63" y="30" width="14" height="8" fill="var(--surface)" stroke="var(--card-border)" />
        {/* Traps back */}
        <path d="M48 38 Q70 30 92 38 L86 60 Q70 54 54 60 Z" fill={fill(muscles, "traps")} stroke="var(--card-border)" />
        {/* Lats */}
        <path d="M48 60 Q40 78 50 100 L70 96 L90 100 Q100 78 92 60 Q70 70 48 60 Z" fill={fill(muscles, "lats")} stroke="var(--card-border)" />
        {/* Shoulders */}
        <ellipse cx="42" cy="50" rx="11" ry="9" fill={fill(muscles, "shoulders")} stroke="var(--card-border)" />
        <ellipse cx="98" cy="50" rx="11" ry="9" fill={fill(muscles, "shoulders")} stroke="var(--card-border)" />
        {/* Triceps */}
        <ellipse cx="32" cy="78" rx="8" ry="14" fill="var(--surface)" stroke="var(--card-border)" />
        <ellipse cx="108" cy="78" rx="8" ry="14" fill="var(--surface)" stroke="var(--card-border)" />
        {/* Glutes */}
        <path d="M52 110 Q70 122 88 110 L86 138 Q70 144 54 138 Z" fill={fill(muscles, "glutes")} stroke="var(--card-border)" />
        {/* Hamstrings */}
        <path d="M52 140 L66 140 L64 180 L54 178 Z" fill={fill(muscles, "hamstrings")} stroke="var(--card-border)" />
        <path d="M74 140 L88 140 L86 178 L76 180 Z" fill={fill(muscles, "hamstrings")} stroke="var(--card-border)" />
        {/* Calves back */}
        <path d="M53 182 L64 182 L62 212 L54 212 Z" fill={fill(muscles, "calves")} stroke="var(--card-border)" />
        <path d="M76 182 L87 182 L86 212 L78 212 Z" fill={fill(muscles, "calves")} stroke="var(--card-border)" />
      </svg>
    </div>
  );
}

export function MuscleLegend() {
  return (
    <div className="mt-3 flex items-center justify-center gap-3 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
      {(["low", "med", "high"] as MuscleEffort[]).map((e) => (
        <span key={e} className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-sm" style={{ backgroundColor: effortFill[e] }} />
          {e}
        </span>
      ))}
    </div>
  );
}