import { useState } from "react";
import { Check, ChevronDown, Minus, Plus, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "./Eyebrow";
import { StreakBar } from "./StreakBar";
import { weeklyPlan, history as initialHistory, type DayPlan, type Exercise, type HistoryEntry, type SessionType } from "@/data/athlete";

const chipClass: Record<SessionType, string> = {
  "STRENGTH A": "bg-primary text-primary-foreground",
  "STRENGTH B": "bg-primary text-primary-foreground",
  "RUN A": "bg-foreground text-background",
  "RUN B": "bg-foreground text-background",
  HYBRID: "bg-foreground text-background",
  REST: "bg-muted text-muted-foreground",
};

interface LogEntry {
  exerciseId: string;
  sets: number;
  reps: number;
  weight: number;
  day: string;
}

export function TrainTab() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [history, setHistory] = useState<HistoryEntry[]>(initialHistory);
  const [recording, setRecording] = useState<{ day: DayPlan; ex: Exercise } | null>(null);

  const isCompleted = (day: string, exerciseId: string) =>
    logs.some((l) => l.day === day && l.exerciseId === exerciseId);

  const saveLog = (entry: LogEntry, exName: string, session: SessionType) => {
    setLogs((prev) => [...prev.filter((l) => !(l.day === entry.day && l.exerciseId === entry.exerciseId)), entry]);
    setHistory((prev) => [
      {
        date: "Today",
        session,
        exercisesCompleted: 1,
        totalVolume: entry.sets * entry.reps * entry.weight,
        logs: [{ name: exName, sets: entry.sets, reps: entry.reps, weight: entry.weight }],
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-5 p-5">
      <StreakBar />

      <section>
        <Eyebrow>This Week</Eyebrow>
        <h2
          className="mt-1 font-display text-xl uppercase tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Weekly Plan
        </h2>

        <Accordion type="multiple" className="mt-3 space-y-2">
          {weeklyPlan.map((day) => (
            <AccordionItem
              key={day.day}
              value={day.day}
              className="border border-border bg-card"
            >
              <AccordionTrigger className="px-4 py-3 hover:no-underline [&>svg]:hidden">
                <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 w-full">
                  <div className="text-left">
                    <div
                      className="font-display text-lg leading-none"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      {day.day}
                    </div>
                    <div className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                      {day.date}
                    </div>
                  </div>
                  <div className="min-w-0 text-left">
                    <span
                      className={cn(
                        "inline-block px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider",
                        chipClass[day.session],
                      )}
                    >
                      {day.session}
                    </span>
                    <div className="mt-1 truncate text-xs text-muted-foreground">{day.focus}</div>
                  </div>
                  <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition-transform" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-3">
                {day.exercises.length === 0 ? (
                  <p className="py-2 text-xs text-muted-foreground">No exercises — recover.</p>
                ) : (
                  <ul className="divide-y divide-border border-t border-border">
                    {day.exercises.map((ex) => {
                      const done = isCompleted(day.day, ex.id);
                      return (
                        <li
                          key={ex.id}
                          className={cn(
                            "flex items-center justify-between gap-3 py-2.5",
                            done && "opacity-50",
                          )}
                        >
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
                              "inline-flex h-8 w-8 items-center justify-center border transition-colors",
                              done
                                ? "border-border bg-muted text-foreground"
                                : "border-primary bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]",
                            )}
                            aria-label={done ? "Logged" : "Record"}
                          >
                            {done ? <Check className="h-4 w-4" /> : <Circle className="h-3 w-3 fill-current" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      <HistorySection history={history} />

      <RecordSheet
        open={!!recording}
        onClose={() => setRecording(null)}
        ctx={recording}
        onSave={(entry) => {
          if (!recording) return;
          saveLog({ ...entry, exerciseId: recording.ex.id, day: recording.day.day }, recording.ex.name, recording.day.session);
          setRecording(null);
        }}
      />
    </div>
  );
}

function HistorySection({ history }: { history: HistoryEntry[] }) {
  return (
    <section className="border border-border bg-card p-5">
      <Eyebrow>Log</Eyebrow>
      <h2
        className="mt-1 font-display text-xl uppercase tracking-tight"
        style={{ fontFamily: "var(--font-display)" }}
      >
        History
      </h2>
      <Accordion type="multiple" className="mt-3">
        {history.map((h, i) => (
          <AccordionItem key={`${h.date}-${i}`} value={`${h.date}-${i}`} className="border-border">
            <AccordionTrigger className="py-3 hover:no-underline">
              <div className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 text-left">
                <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  {h.date}
                </span>
                <span className="truncate text-sm font-bold uppercase tracking-wider">{h.session}</span>
                <span className="text-[11px] text-muted-foreground">
                  {h.exercisesCompleted} ex · {h.totalVolume} kg
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="divide-y divide-border border-t border-border">
                {h.logs.map((l, j) => (
                  <li key={j} className="flex items-center justify-between py-2 text-xs">
                    <span className="font-medium text-foreground">{l.name}</span>
                    <span className="text-muted-foreground">
                      {l.sets} × {l.reps} @ {l.weight}kg
                    </span>
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

function Stepper({ value, onChange, step = 1, min = 0 }: { value: number; onChange: (n: number) => void; step?: number; min?: number }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={() => onChange(Math.max(min, +(value - step).toFixed(2)))}
        className="grid h-9 w-9 place-items-center border border-border bg-card hover:bg-muted"
      >
        <Minus className="h-3.5 w-3.5" />
      </button>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-9 w-20 border border-border bg-card text-center text-base font-bold tabular-nums"
      />
      <button
        type="button"
        onClick={() => onChange(+(value + step).toFixed(2))}
        className="grid h-9 w-9 place-items-center border border-border bg-card hover:bg-muted"
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
  onSave: (entry: { sets: number; reps: number; weight: number }) => void;
}) {
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(8);
  const [weight, setWeight] = useState(20);

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent side="bottom" className="rounded-none border-t-2 border-primary">
        <SheetHeader className="text-left">
          <Eyebrow>{ctx?.day.day} · {ctx?.day.session}</Eyebrow>
          <SheetTitle
            className="font-display text-2xl uppercase tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {ctx?.ex.name ?? "Record"}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-5 py-5">
          <Field label="Sets">
            <Stepper value={sets} onChange={setSets} min={1} />
          </Field>
          <Field label="Reps">
            <Stepper value={reps} onChange={setReps} min={1} />
          </Field>
          <Field label="Weight (kg)">
            <Stepper value={weight} onChange={setWeight} step={2.5} />
          </Field>
        </div>

        <SheetFooter>
          <Button
            type="button"
            onClick={() => onSave({ sets, reps, weight })}
            className="w-full rounded-none bg-primary text-primary-foreground hover:bg-[var(--primary-hover)]"
          >
            Save Entry
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </div>
  );
}