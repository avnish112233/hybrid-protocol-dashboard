export type SessionType = "STRENGTH A" | "STRENGTH B" | "RUN A" | "RUN B" | "HYBRID" | "REST";
import type { Status } from "@/lib/status";
import type { Scale } from "@/components/hybrid/NormativeScale";

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  load: string;
}

export interface DayPlan {
  day: string;
  date: string;
  session: SessionType;
  focus: string;
  exercises: Exercise[];
  sessionId?: string;
  runData?: RunData;
}

export interface SubTest {
  name: string;
  correlation: string;
  value: string;
  status: Status;
  scale?: Scale & { valueNumeric: number };
}

export interface FunctionalCategory {
  title: string;
  tests: SubTest[];
}

export interface HistoryEntry {
  date: string;
  session: SessionType;
  exercisesCompleted: number;
  totalVolume: number;
  logs: { name: string; sets: { reps: number; weight: number }[] }[];
  notes?: string;
  sessionId?: string;
  avgHr?: number;
}

export interface RunData {
  source: "Strava";
  distanceKm: number;
  durationMin: number;
  avgPaceLabel: string;
  avgHr: number;
  maxHr: number;
  elevationM: number;
  calories: number;
}

export const weeklyPlan: DayPlan[] = [
  {
    day: "MON",
    date: "24 Nov",
    session: "STRENGTH A",
    focus: "Lower body power + sled work",
    sessionId: "mon-strength-a",
    exercises: [
      { id: "m1", name: "Trap Bar Deadlift", sets: 4, reps: "5", load: "100 kg" },
      { id: "m2", name: "Sled Push 20m", sets: 5, reps: "1", load: "80 kg" },
      { id: "m3", name: "Walking Lunge", sets: 3, reps: "20", load: "2×20 kg" },
    ],
  },
  {
    day: "TUE",
    date: "25 Nov",
    session: "RUN A",
    focus: "Threshold intervals 6×800m",
    sessionId: "tue-run-a",
    runData: {
      source: "Strava",
      distanceKm: 8.4,
      durationMin: 42,
      avgPaceLabel: "5:00 /km",
      avgHr: 162,
      maxHr: 181,
      elevationM: 38,
      calories: 612,
    },
    exercises: [
      { id: "t1", name: "Easy warmup", sets: 1, reps: "10min", load: "—" },
      { id: "t2", name: "800m @ threshold", sets: 6, reps: "1", load: "—" },
      { id: "t3", name: "Cooldown jog", sets: 1, reps: "10min", load: "—" },
    ],
  },
  {
    day: "WED",
    date: "26 Nov",
    session: "HYBRID",
    focus: "SkiErg + wall ball couplet",
    sessionId: "wed-hybrid",
    exercises: [
      { id: "w1", name: "SkiErg 500m", sets: 5, reps: "1", load: "—" },
      { id: "w2", name: "Wall Ball", sets: 5, reps: "20", load: "9 kg" },
    ],
  },
  {
    day: "THU",
    date: "27 Nov",
    session: "STRENGTH B",
    focus: "Upper pull + grip endurance",
    sessionId: "thu-strength-b",
    exercises: [
      { id: "th1", name: "Weighted Pull-up", sets: 4, reps: "6", load: "+10 kg" },
      { id: "th2", name: "Farmer Carry 40m", sets: 4, reps: "1", load: "2×32 kg" },
      { id: "th3", name: "Row 500m", sets: 3, reps: "1", load: "—" },
    ],
  },
  {
    day: "FRI",
    date: "28 Nov",
    session: "RUN B",
    focus: "Long aerobic 60min Z2",
    sessionId: "fri-run-b",
    runData: {
      source: "Strava",
      distanceKm: 12.1,
      durationMin: 64,
      avgPaceLabel: "5:17 /km",
      avgHr: 148,
      maxHr: 165,
      elevationM: 72,
      calories: 890,
    },
    exercises: [{ id: "f1", name: "Z2 Run", sets: 1, reps: "60min", load: "—" }],
  },
  {
    day: "SAT",
    date: "29 Nov",
    session: "HYBRID",
    focus: "Race simulation — 4 stations",
    sessionId: "sat-hybrid",
    exercises: [
      { id: "s1", name: "Run 1km", sets: 4, reps: "1", load: "—" },
      { id: "s2", name: "Burpee Broad Jump", sets: 4, reps: "20", load: "—" },
    ],
  },
  { day: "SUN", date: "30 Nov", session: "REST", focus: "Mobility & recovery", exercises: [] },
];

export const history: HistoryEntry[] = [
  {
    date: "23 Nov",
    session: "STRENGTH B",
    exercisesCompleted: 3,
    totalVolume: 4280,
    avgHr: 142,
    logs: [
      { name: "Weighted Pull-up", sets: [
        { reps: 6, weight: 10 }, { reps: 6, weight: 12.5 }, { reps: 5, weight: 15 }, { reps: 4, weight: 15 },
      ]},
      { name: "Farmer Carry", sets: [
        { reps: 1, weight: 64 }, { reps: 1, weight: 64 }, { reps: 1, weight: 68 }, { reps: 1, weight: 68 },
      ]},
      { name: "Row 500m", sets: [
        { reps: 1, weight: 0 }, { reps: 1, weight: 0 }, { reps: 1, weight: 0 },
      ]},
    ],
  },
  {
    date: "22 Nov",
    session: "RUN A",
    exercisesCompleted: 3,
    totalVolume: 0,
    avgHr: 162,
    logs: [
      { name: "Warmup", sets: [{ reps: 1, weight: 0 }] },
      { name: "800m intervals", sets: Array.from({ length: 6 }, () => ({ reps: 1, weight: 0 })) },
      { name: "Cooldown", sets: [{ reps: 1, weight: 0 }] },
    ],
  },
  {
    date: "21 Nov",
    session: "STRENGTH A",
    exercisesCompleted: 3,
    totalVolume: 5120,
    avgHr: 138,
    logs: [
      { name: "Trap Bar Deadlift", sets: [
        { reps: 5, weight: 100 }, { reps: 5, weight: 110 }, { reps: 3, weight: 120 }, { reps: 3, weight: 120 },
      ]},
      { name: "Sled Push", sets: Array.from({ length: 5 }, () => ({ reps: 1, weight: 80 })) },
      { name: "Walking Lunge", sets: [
        { reps: 20, weight: 40 }, { reps: 20, weight: 40 }, { reps: 16, weight: 40 },
      ]},
    ],
  },
];

export const streak = { days: 12, nextMilestone: 14 };