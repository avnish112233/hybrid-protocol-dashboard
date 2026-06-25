import { useState, useEffect } from "react";
import { Check, ChevronDown, Minus, Plus, Copy, X, ChevronRight, Watch } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./Eyebrow";
import { StreakBar } from "./StreakBar";
import { CelebrationBurst } from "./CelebrationBurst";
import { RunSessionCard } from "./RunSessionCard";
import { NotesCard } from "./NotesCard";
import {
  weeklyPlan,
  history as initialHistory,
  type DayPlan,
  type Exercise,
  type HistoryEntry,
  type SessionType,
} from "@/data/athlete";

const chipClass: Record<SessionType, string> = {
  "STRENGTH A": "bg-foreground text-background",
  "STRENGTH B": "bg-foreground text-background",
  "RUN A": "bg-surface text-foreground",
  "RUN B": "bg-surface text-foreground",
  HYBRID: "bg-surface text-foreground",
  REST: "bg-surface text-muted-foreground",
};

interface SetRow {
  reps: number;
  weight: number;
}

interface LogEntry {
  exerciseId: string;
  sets: SetRow[];
  day: string;
}

function parseFirstNumber(s: string, fallback: number): number {
  const m = s.match(/[\d.]+/);
  return m ? Number(m[0]) : fallback;
}

export function TrainTab() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [recording, setRecording] = useState<{ day: DayPlan; ex: Exercise } | null>(null);
  const [burst, setBurst] = useState<{ key: string; n: number } | null>(null);
  const [dayBurst, setDayBurst] = useState<{ day: string; n: number } | null>(null);
  const [celebratedDays, setCelebratedDays] = useState<Set<string>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});

  const isCompleted = (day: string, exerciseId: string) =>
    logs.some((l) => l.day === day && l.exerciseId === exerciseId);

  const isDayComplete = (dayKey: string, exercises: Exercise[]) =>
    exercises.length > 0 && exercises.every((ex) => isCompleted(dayKey, ex.id));

  const saveLog = (sets: SetRow[], exName: string, session: SessionType, day: string, exerciseId: string) => {
    const entry: LogEntry = { exerciseId, sets, day };
    const nextLogs = [
      ...logs.filter((l) => !(l.day === entry.day && l.exerciseId === entry.exerciseId)),
      entry,
    ];
    setLogs(nextLogs);
    const volume = sets.reduce((acc, s) => acc + s.reps * s.weight, 0);
    setHistory((prev) => [
      {
        date: "Today",
        session,
        exercisesCompleted: 1,
        totalVolume: volume,
        logs: [{ name: exName, sets }],
      },
      ...prev,
    ]);
    setBurst({ key: `${day}-${exerciseId}`, n: Date.now() });
    const dayPlan = weeklyPlan.find((d) => d.day === day);
    if (dayPlan && dayPlan.exercises.length > 0) {
      const allDone = dayPlan.exercises.every((ex) =>
        nextLogs.some((l) => l.day === day && l.exerciseId === ex.id),
      );
      if (allDone && !celebratedDays.has(day)) {
        setCelebratedDays((prev) => new Set(prev).add(day));
        setDayBurst({ day, n: Date.now() });
      }
    }
  };

  return (
    <div className="space-y-5 p-5">
      <StreakBar />

      <section>
        <Eyebrow>This Week</Eyebrow>
        <h2
          className="mt-1 text-xl tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
        >
          Weekly Plan
        </h2>

        <Accordion type="multiple" className="mt-3 space-y-2">
          {weeklyPlan.map((day) => {
            const dayDone = isDayComplete(day.day, day.exercises);
            return (
            <AccordionItem
              key={day.day}
              value={day.day}
              className={cn(
                "relative overflow-visible rounded-2xl bg-card border border-[var(--card-border)] transition-colors",
                dayDone && "bg-[color-mix(in_oklab,var(--status-optimal)_12%,var(--card))]",
                dayBurst?.day === day.day && "animate-day-complete",
              )}
            >
              {dayBurst?.day === day.day && (
                <span className="pointer-events-none absolute left-1/2 top-6">
                  <CelebrationBurst trigger={dayBurst.n} count={18} />
                </span>
              )}
              <AccordionTrigger className="px-4 py-3 hover:no-underline [&>svg]:hidden">
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 w-full">
                  <div className="text-left">
                    <div
                      className="text-base leading-none text-foreground"
                      style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
                    >
                      {day.day}
                    </div>
                    <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {day.date}
                    </div>
                  </div>
                  <div className="min-w-0 text-left">
                    <span
                      className={cn(
                        "inline-block rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                        chipClass[day.session],
                      )}
                    >
                      {day.session}
                    </span>
                    <div className="mt-1 truncate text-xs text-muted-foreground">{day.focus}</div>
                  </div>
                  {dayDone ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--status-optimal)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white">
                      <Check className="h-3 w-3" /> Done
                    </span>
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform" />
                  )}
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                {day.exercises.length === 0 ? (
                  <p className="py-2 text-xs text-muted-foreground">No exercises — recover.</p>
                ) : (
                  <ul className="divide-y divide-border border-t border-border">
                    {day.exercises.map((ex) => {
                      const done = isCompleted(day.day, ex.id);
                      const exKey = `${day.day}-${ex.id}`;
                      return (
                        <li
                          key={ex.id}
                          className={cn(
                            "relative flex items-center justify-between gap-3 py-2.5",
                            done && "opacity-50",
                          )}
                        >
                          {burst?.key === exKey && (
                            <span className="pointer-events-none absolute right-10 top-1/2 -translate-y-1/2">
                              <CelebrationBurst trigger={burst.n} />
                            </span>
                          )}
                          <div className="min-w-0">
                            <div className={cn("text-sm font-bold text-foreground", done && "line-through")}>
                              {ex.name}
                            </div>
                            <div className="text-[11px] uppercase tracking-wider text-muted-foreground">
                              {ex.sets} × {ex.reps} · {ex.load}
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => setRecording({ day, ex })}
                            className={cn(
                              "inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors",
                              done
                                ? "bg-surface text-foreground"
                                : "bg-foreground text-background hover:opacity-90",
                            )}
                            aria-label={done ? "Logged" : "Record"}
                          >
                            {done ? <Check className="h-3.5 w-3.5" /> : null}
                            {done ? "Logged" : "Log"}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
            );
          })}
        </Accordion>
      </section>

      <HistorySection history={history} />

      <RecordSheet
        open={!!recording}
        onClose={() => setRecording(null)}
        ctx={recording}
        onSave={(sets) => {
          if (!recording) return;
          saveLog(sets, recording.ex.name, recording.day.session, recording.day.day, recording.ex.id);
          setRecording(null);
        }}
      />
    </div>
  );
}

function HistorySection({ history }: { history: HistoryEntry[] }) {
  return (
    <section className="rounded-2xl bg-card p-5 border border-[var(--card-border)]">
      <Eyebrow>Log</Eyebrow>
      <h2
        className="mt-1 text-xl tracking-tight text-foreground"
        style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
      >
        History
      </h2>
      <Accordion type="multiple" className="mt-3">
        {history.map((h, i) => (
          <AccordionItem key={`${h.date}-${i}`} value={`${h.date}-${i}`} className="border-border">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 text-left">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  {h.date}
                </span>
                <span className="truncate text-sm font-medium text-foreground">{h.session}</span>
                <span className="text-[11px] text-muted-foreground">
                  {h.exercisesCompleted} ex · {h.totalVolume.toLocaleString()} kg
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="divide-y divide-border border-t border-border">
                {h.logs.map((l, j) => (
                  <li key={j} className="py-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-foreground">{l.name}</span>
                      <span className="text-muted-foreground">{l.sets.length} sets</span>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {l.sets.map((s, k) => (
                        <span
                          key={k}
                          className="inline-flex items-center gap-1 rounded-full bg-surface px-2 py-0.5 text-[10px] font-medium tabular-nums text-foreground"
                        >
                          <span className="text-muted-foreground">{k + 1}</span>
                          {s.reps}×{s.weight}
                          {s.weight ? "kg" : ""}
                        </span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

function Stepper({
  value,
  onChange,
  step = 1,
  min = 0,
}: {
  value: number;
  onChange: (n: number) => void;
  step?: number;
  min?: number;
}) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-surface p-1">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, +(value - step).toFixed(2)))}
        className="grid h-8 w-8 place-items-center rounded-full bg-card text-foreground shadow-sm hover:opacity-90"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-8 w-14 bg-transparent text-center text-sm font-medium tabular-nums focus:outline-none"
      />
      <button
        type="button"
        onClick={() => onChange(+(value + step).toFixed(2))}
        className="grid h-8 w-8 place-items-center rounded-full bg-card text-foreground shadow-sm hover:opacity-90"
      >
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function RecordSheet({
  open,
  onClose,
  ctx,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  ctx: { day: DayPlan; ex: Exercise } | null;
  onSave: (sets: SetRow[]) => void;
}) {
  const [rows, setRows] = useState<SetRow[]>([]);

  useEffect(() => {
    if (!ctx) return;
    const reps = parseFirstNumber(ctx.ex.reps, 8);
    const weight = parseFirstNumber(ctx.ex.load, 0);
    const count = Math.max(1, ctx.ex.sets);
    setRows(Array.from({ length: count }, () => ({ reps, weight })));
  }, [ctx]);

  const updateRow = (i: number, patch: Partial<SetRow>) =>
    setRows((prev) => prev.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  const addRow = () => {
    const last = rows[rows.length - 1] ?? { reps: 8, weight: 0 };
    setRows((prev) => [...prev, { ...last }]);
  };
  const copyPrevious = (i: number) => {
    const prev = rows[i - 1];
    if (prev) updateRow(i, { ...prev });
  };
  const removeRow = (i: number) =>
    setRows((prev) => (prev.length > 1 ? prev.filter((_, idx) => idx !== i) : prev));

  const totalVolume = rows.reduce((acc, r) => acc + r.reps * r.weight, 0);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent
        side="bottom"
        className="rounded-t-3xl border-0 shadow-[var(--shadow-sheet)]"
      >
        <SheetHeader className="text-left">
          <Eyebrow>
            {ctx?.day.day} · {ctx?.day.session}
          </Eyebrow>
          <SheetTitle
            className="text-2xl tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {ctx?.ex.name ?? "Record"}
          </SheetTitle>
          <p className="text-xs text-muted-foreground">
            Vary reps or weight per set — each row is logged independently.
          </p>
        </SheetHeader>

        <div className="max-h-[55vh] space-y-2 overflow-y-auto py-4">
          {rows.map((row, i) => (
            <div
              key={i}
              className="grid grid-cols-[auto_1fr_1fr_auto] items-center gap-2 rounded-2xl bg-surface px-3 py-2"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full bg-card text-[11px] font-medium text-muted-foreground">
                {i + 1}
              </span>
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                  Reps
                </span>
                <Stepper value={row.reps} onChange={(v) => updateRow(i, { reps: v })} min={0} />
              </div>
              <div className="flex flex-col items-start gap-0.5">
                <span className="text-[9px] font-medium uppercase tracking-wider text-muted-foreground">
                  Weight kg
                </span>
                <Stepper
                  value={row.weight}
                  onChange={(v) => updateRow(i, { weight: v })}
                  step={2.5}
                />
              </div>
              <div className="flex flex-col gap-1">
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => copyPrevious(i)}
                    className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-card hover:text-foreground"
                    aria-label="Copy previous set"
                  >
                    <Copy className="h-3 w-3" />
                  </button>
                )}
                {rows.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeRow(i)}
                    className="grid h-7 w-7 place-items-center rounded-full text-muted-foreground hover:bg-card hover:text-foreground"
                    aria-label="Remove set"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addRow}
            className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-border bg-card py-2.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            <Plus className="h-3.5 w-3.5" />
            Add set
          </button>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-3 text-xs">
          <span className="text-muted-foreground">Total volume</span>
          <span
            className="tabular-nums text-foreground"
            style={{ fontFamily: "var(--font-display)", fontWeight: 500 }}
          >
            {totalVolume.toLocaleString()} kg
          </span>
        </div>

        <SheetFooter className="mt-3">
          <Button
            type="button"
            onClick={() => onSave(rows)}
            className="h-12 w-full rounded-full bg-foreground text-base font-medium text-background hover:opacity-90"
          >
            Save {rows.length} set{rows.length === 1 ? "" : "s"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}