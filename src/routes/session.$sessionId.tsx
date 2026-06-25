import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ChevronLeft, Heart, MapPin, Timer, Zap, Mountain } from "lucide-react";
import { sessions, type SessionDetail } from "@/data/sessions";
import { Eyebrow } from "@/components/hybrid/Eyebrow";
import { HrChart } from "@/components/hybrid/HrChart";
import { ZoneBars } from "@/components/hybrid/ZoneBars";
import { MuscleMap, MuscleLegend } from "@/components/hybrid/MuscleMap";

export const Route = createFileRoute("/session/$sessionId")({
  head: ({ params }) => ({
    meta: [
      { title: `Session ${params.sessionId} — Hybrid Protocol` },
      { name: "description", content: "Session detail with wearable data and training summary." },
    ],
  }),
  loader: ({ params }) => {
    const s = sessions[params.sessionId];
    if (!s) throw notFound();
    const session: SessionDetail = s;
    return { session };
  },
  component: SessionPage,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">
      Session not found.
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="grid min-h-screen place-items-center p-6 text-center text-sm text-muted-foreground">
        <div>
          <p>This session didn't load.</p>
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

function SessionPage() {
  const { session } = Route.useLoaderData();
  const r = session.runData;

  return (
    <main className="min-h-screen bg-background pb-16">
      <header
        className="relative px-5 pb-4 pt-5"
        style={{ background: "var(--gradient-header)" }}
      >
        <Link
          to="/profile"
          className="grid h-9 w-9 place-items-center rounded-full border border-[var(--card-border)] bg-card/80 text-foreground backdrop-blur"
          aria-label="Back"
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>
        <div className="mt-3 text-center">
          <h1
            className="text-xl tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
          >
            {session.title}
          </h1>
          <p className="mt-1 text-xs text-muted-foreground">
            {session.subtitle} · {session.date}
          </p>
        </div>
      </header>

      <div className="space-y-4 px-5 pt-3">
        {/* HR chart */}
        <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
          <div className="flex items-center justify-between">
            <Eyebrow>Heart Rate</Eyebrow>
            {r && (
              <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                Max {r.maxHr} bpm
              </span>
            )}
          </div>
          <div className="mt-2">
            <HrChart series={session.hrSeries} labels={session.hrLabels} />
          </div>
        </section>

        {/* Stats grid */}
        {r && (
          <section className="grid grid-cols-3 gap-2">
            <Stat icon={<MapPin className="h-3.5 w-3.5" />} label="Distance" value={`${r.distanceKm} km`} />
            <Stat icon={<Timer className="h-3.5 w-3.5" />} label="Time" value={`${r.durationMin}m`} />
            <Stat icon={<Heart className="h-3.5 w-3.5" />} label="Avg HR" value={`${r.avgHr}`} />
            <Stat icon={<Heart className="h-3.5 w-3.5" />} label="Max HR" value={`${r.maxHr}`} />
            <Stat icon={<Mountain className="h-3.5 w-3.5" />} label="Elev" value={`${r.elevationM}m`} />
            <Stat icon={<Zap className="h-3.5 w-3.5" />} label="kcal" value={`${r.calories}`} />
          </section>
        )}

        {/* Zones */}
        <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
          <Eyebrow>HR Zones</Eyebrow>
          <div className="mt-3">
            <ZoneBars zones={session.zones} />
          </div>
        </section>

        {/* Effort */}
        <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
          <Eyebrow>Effort</Eyebrow>
          <div className="mt-3 flex items-center gap-4">
            <RpeRing rpe={session.rpe} />
            <div>
              <div
                className="text-lg text-foreground"
                style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
              >
                {session.perceived}
              </div>
              <div className="text-xs text-muted-foreground">Perceived exertion · RPE {session.rpe}/10</div>
            </div>
          </div>
        </section>

        {/* Muscles */}
        <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
          <Eyebrow>Muscles worked</Eyebrow>
          <div className="mt-3">
            <MuscleMap muscles={session.muscles} />
            <MuscleLegend />
          </div>
        </section>

        {/* Training */}
        <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
          <Eyebrow>Training</Eyebrow>
          <ul className="mt-2 divide-y divide-border">
            {session.exerciseLogs.map((e) => (
              <li key={e.name} className="flex items-center justify-between py-2.5">
                <span className="text-sm font-medium text-foreground">{e.name}</span>
                <span className="text-xs text-muted-foreground">{e.detail}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Coach note */}
        {session.coachNote && (
          <section className="rounded-2xl border border-[var(--card-border)] bg-card p-4">
            <div className="flex items-center justify-between">
              <Eyebrow>Notes</Eyebrow>
              <span className="rounded-full bg-surface px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                Visible to coach
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground">{session.coachNote}</p>
          </section>
        )}
      </div>
    </main>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-[var(--card-border)] bg-card px-3 py-3">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-[10px] font-medium uppercase tracking-wider">{label}</span>
      </div>
      <div
        className="mt-1 text-lg tabular-nums text-foreground"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        {value}
      </div>
    </div>
  );
}

function RpeRing({ rpe }: { rpe: number }) {
  const size = 64;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - rpe / 10);
  const color =
    rpe >= 9 ? "var(--status-suboptimal)" : rpe >= 7 ? "var(--primary)" : "var(--status-optimal)";
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--surface)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div
        className="absolute inset-0 grid place-items-center text-base font-medium tabular-nums"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {rpe}
      </div>
    </div>
  );
}