import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  Apple,
  ChevronLeft,
  ChevronRight,
  Droplet,
  Flame,
  Footprints,
  Heart,
  Moon,
  Watch,
  Waves,
} from "lucide-react";
import { Eyebrow } from "@/components/hybrid/Eyebrow";
import { useWhoopData } from "@/hooks/useWhoopData";

export const Route = createFileRoute("/wearables")({
  head: () => ({
    meta: [
      { title: "Connect Your Wearable — Hybrid Protocol" },
      { name: "description", content: "Sync sleep, HRV, heart rate, and runs from your wearable into Hybrid Protocol." },
    ],
  }),
  component: WearablesPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="grid min-h-screen place-items-center p-6 text-sm text-muted-foreground">
        <div className="text-center">
          <p>Couldn't load wearables.</p>
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="mt-3 rounded-full bg-foreground px-4 py-2 text-background"
          >
            Try again
          </button>
          <p className="mt-2 text-xs">{error.message}</p>
        </div>
      </div>
    );
  },
});

function WearablesPage() {
  const [toast, setToast] = useState<string | null>(null);
  const { data: whoop, isLoading: whoopLoading, error: whoopError } = useWhoopData();

  const watches = [
    { name: "Apple Watch", icon: Apple, connected: false },
    { name: "Garmin", icon: Watch, connected: false },
    { name: "Coros", icon: Watch, connected: false },
    { name: "Fitbit", icon: Watch, connected: false },
    { name: "Amazefit", icon: Watch, connected: false },
  ];

  const handleConnect = (name: string) => {
    setToast(`${name} — coming soon`);
    setTimeout(() => setToast(null), 1800);
  };

  const recoveryColor =
    whoop?.recoveryScore != null
      ? whoop.recoveryScore >= 67
        ? "var(--status-optimal)"
        : whoop.recoveryScore >= 34
          ? "var(--primary)"
          : "var(--status-suboptimal)"
      : "var(--muted-foreground)";

  return (
    <main className="min-h-screen bg-background pb-16">
      <header className="relative px-5 pb-2 pt-5">
        <Link
          to="/profile"
          className="grid h-9 w-9 place-items-center rounded-full border border-[var(--card-border)] bg-card text-foreground"
          aria-label="Back"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </header>

      {/* Hero */}
      <section className="relative grid place-items-center px-5 pb-4 pt-2">
        <div className="relative grid h-[220px] w-[220px] place-items-center">
          <DotPattern />
          <div className="absolute h-[160px] w-[160px] rounded-full" style={{ background: "var(--accent-orange-soft)" }} />
          <div className="absolute h-[110px] w-[110px] rounded-full" style={{ background: "color-mix(in oklab, var(--primary) 22%, transparent)" }} />
          <div className="relative grid h-[110px] w-[78px] place-items-center rounded-[18px] bg-foreground text-background shadow-lg">
            <Waves className="h-7 w-7 text-primary" />
          </div>
        </div>
      </section>

      <section className="px-5 text-center">
        <h1
          className="text-2xl tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          Connect Your Wearable
        </h1>
        <p className="mx-auto mt-2 max-w-[300px] text-sm leading-relaxed text-muted-foreground">
          Auto-sync sleep, HRV, heart rate and workouts to your Vital scores.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Chip icon={<Heart className="h-3.5 w-3.5 text-[color:var(--status-suboptimal)]" />}>Heart rate</Chip>
          <Chip icon={<Moon className="h-3.5 w-3.5 text-[color:var(--status-optimal)]" />}>Sleep</Chip>
          <Chip icon={<Droplet className="h-3.5 w-3.5 text-primary" />}>SpO2</Chip>
          <Chip icon={<Footprints className="h-3.5 w-3.5" />}>Steps</Chip>
          <Chip icon={<Flame className="h-3.5 w-3.5 text-primary" />}>Calories</Chip>
          <Chip icon={<Activity className="h-3.5 w-3.5 text-primary" />}>HRV</Chip>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Supported smartwatches include Apple Watch, Garmin, Coros, Fitbit and Amazefit.
        </p>
      </section>

      {/* Whoop live tile — shown when VITE_OW_USER_ID is set */}
      {(whoopLoading || whoop || whoopError) && (
        <section className="mt-6 px-5">
          <div className="flex items-center justify-between mb-2">
            <Eyebrow className="px-1">Whoop</Eyebrow>
            <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--status-optimal)_18%,transparent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--status-optimal)]">
              Connected
            </span>
          </div>

          <div className="rounded-2xl border border-[var(--card-border)] bg-card p-4 space-y-4">
            {whoopLoading && (
              <p className="text-sm text-muted-foreground">Loading live data…</p>
            )}

            {whoopError && (
              <p className="text-sm text-muted-foreground">
                Could not load Whoop data — {(whoopError as Error).message}
              </p>
            )}

            {whoop && (
              <>
                {/* Recovery + vitals */}
                <div className="grid grid-cols-3 gap-3">
                  <Metric
                    label="Recovery"
                    value={whoop.recoveryScore != null ? `${whoop.recoveryScore}%` : "—"}
                    valueColor={recoveryColor}
                  />
                  <Metric
                    label="HRV"
                    value={whoop.hrv != null ? `${Math.round(whoop.hrv)}` : "—"}
                    unit={whoop.hrv != null ? "ms" : undefined}
                  />
                  <Metric
                    label="Resting HR"
                    value={whoop.restingHR != null ? `${Math.round(whoop.restingHR)}` : "—"}
                    unit={whoop.restingHR != null ? "bpm" : undefined}
                  />
                </div>

                {/* 30-day context */}
                <div
                  className="flex flex-wrap items-center gap-x-3 gap-y-1 rounded-xl px-3 py-2 text-xs"
                  style={{ backgroundColor: "var(--surface)" }}
                >
                  <span className="text-muted-foreground">30d avg</span>
                  <span className="text-foreground">
                    Recovery <strong>{whoop.avgRecovery30d ?? "—"}%</strong>
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-foreground">
                    Sleep <strong>{whoop.avgSleepH ?? "—"}h</strong>
                  </span>
                  {whoop.spo2 != null && (
                    <>
                      <span className="text-muted-foreground">·</span>
                      <span className="text-foreground">
                        SpO₂ <strong>{whoop.spo2.toFixed(1)}%</strong>
                      </span>
                    </>
                  )}
                </div>

                {/* Last sleep */}
                {whoop.lastSleep && (
                  <div className="border-t pt-3" style={{ borderColor: "var(--card-border)" }}>
                    <Eyebrow className="mb-2">Last Sleep</Eyebrow>
                    <div className="grid grid-cols-4 gap-2">
                      <Metric label="Duration" value={`${whoop.lastSleep.durationH}h`} />
                      <Metric
                        label="Efficiency"
                        value={whoop.lastSleep.efficiency != null ? `${whoop.lastSleep.efficiency}%` : "—"}
                      />
                      <Metric
                        label="Deep"
                        value={whoop.lastSleep.deep != null ? `${whoop.lastSleep.deep}m` : "—"}
                      />
                      <Metric
                        label="REM"
                        value={whoop.lastSleep.rem != null ? `${whoop.lastSleep.rem}m` : "—"}
                      />
                    </div>
                  </div>
                )}

                {/* Recent workouts */}
                {whoop.recentWorkouts.length > 0 && (
                  <div className="border-t pt-3" style={{ borderColor: "var(--card-border)" }}>
                    <div className="flex items-center justify-between mb-2">
                      <Eyebrow>Recent Workouts</Eyebrow>
                      <span className="text-[10px] text-muted-foreground">
                        {whoop.totalWorkouts90d} in 90d
                      </span>
                    </div>
                    <ul className="divide-y" style={{ borderColor: "var(--card-border)" }}>
                      {whoop.recentWorkouts.map((w, i) => (
                        <li key={i} className="flex items-center justify-between py-2 text-xs">
                          <span className="flex items-center gap-2">
                            <WorkoutBadge type={w.type} />
                            <span className="text-muted-foreground">{w.date}</span>
                          </span>
                          <span className="tabular-nums text-foreground">
                            {w.durationMin}m
                            {w.avgHR != null && (
                              <span className="ml-2 text-muted-foreground">· {w.avgHR} bpm avg</span>
                            )}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      )}

      <section className="mt-6 px-5">
        <Eyebrow className="mb-2 px-1">Watches</Eyebrow>
        <div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-card">
          {watches.map((w, i) => (
            <button
              key={w.name}
              type="button"
              onClick={() => handleConnect(w.name)}
              className={`flex w-full items-center justify-between px-4 py-3.5 text-left ${
                i !== 0 ? "border-t border-[var(--card-border)]" : ""
              }`}
            >
              <span className="flex items-center gap-3">
                <w.icon className="h-4 w-4 text-foreground" />
                <span className="text-sm font-medium text-foreground">{w.name}</span>
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </section>

      <section className="mt-5 px-5">
        <Eyebrow className="mb-2 px-1">Apps</Eyebrow>
        <div className="overflow-hidden rounded-2xl border border-[var(--card-border)] bg-card">
          <div className="flex items-center justify-between px-4 py-3.5">
            <span className="flex items-center gap-3">
              <span className="grid h-7 w-7 place-items-center rounded-md bg-[var(--accent-orange-soft)]">
                <Activity className="h-4 w-4 text-primary" />
              </span>
              <span>
                <span className="block text-sm font-medium text-foreground">Strava</span>
                <span className="block text-[11px] text-muted-foreground">Runs auto-import into your weekly plan</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-[color-mix(in_oklab,var(--status-optimal)_18%,transparent)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[color:var(--status-optimal)]">
              Connected
            </span>
          </div>
        </div>
      </section>

      <section className="mt-5 px-5">
        <Eyebrow className="mb-2 px-1">Wearables</Eyebrow>
        <button
          type="button"
          onClick={() => handleConnect("Other wearable")}
          className="flex w-full items-center justify-between rounded-2xl border border-[var(--card-border)] bg-card px-4 py-3.5"
        >
          <span className="flex items-center gap-3">
            <Activity className="h-4 w-4 text-foreground" />
            <span className="text-sm font-medium text-foreground">Connect Wearable device</span>
          </span>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </section>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-xs text-background shadow-lg">
          {toast}
        </div>
      )}
    </main>
  );
}

function Metric({
  label,
  value,
  unit,
  valueColor,
}: {
  label: string;
  value: string;
  unit?: string;
  valueColor?: string;
}) {
  return (
    <div>
      <div className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div
        className="mt-0.5 text-lg tabular-nums text-foreground"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500, color: valueColor }}
      >
        {value}
        {unit && <span className="ml-0.5 text-xs text-muted-foreground">{unit}</span>}
      </div>
    </div>
  );
}

function WorkoutBadge({ type }: { type: string }) {
  const colors: Record<string, { bg: string; color: string }> = {
    running: { bg: "#F2F5FB", color: "#2A4A9B" },
    tennis: { bg: "#F5FBF2", color: "#2A7A3B" },
    strength: { bg: "#FBF2F2", color: "#9B2A2A" },
    cycling: { bg: "#FBF8F2", color: "#9B7A2A" },
    swimming: { bg: "#F2F8FB", color: "#2A7A9B" },
    generic: { bg: "#F5F5F5", color: "#555555" },
  };
  const cfg = colors[type] ?? colors.generic;
  return (
    <span
      className="inline-block rounded-full px-2 py-0.5 text-[10px] font-medium capitalize"
      style={cfg}
    >
      {type.replace("_", " ")}
    </span>
  );
}

function Chip({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--card-border)] bg-card px-3 py-1.5 text-xs font-medium text-foreground">
      {icon}
      {children}
    </span>
  );
}

function DotPattern() {
  const dots: React.ReactNode[] = [];
  for (let r = 0; r < 11; r++) {
    for (let c = 0; c < 11; c++) {
      const cx = c * 22 + 8;
      const cy = r * 22 + 8;
      const dx = cx - 110;
      const dy = cy - 110;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > 100) continue;
      const opacity = Math.max(0, 1 - dist / 100) * 0.5;
      dots.push(<circle key={`${r}-${c}`} cx={cx} cy={cy} r="1.6" fill="var(--primary)" opacity={opacity} />);
    }
  }
  return (
    <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full">
      {dots}
    </svg>
  );
}
