export type SessionType = "STRENGTH A" | "STRENGTH B" | "RUN A" | "RUN B" | "HYBRID" | "REST";
import type { Status } from "@/lib/status";

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
}

export interface RunData {
  source: "Strava";
  distanceKm: number;
  durationMin: number;
  avgPaceLabel: string; // e.g. "5:12 /km"
  avgHr: number;
  maxHr: number;
  elevationM: number;
  calories: number;
}

export const athlete = {
  name: "HARINAG S P",
  height: "163cm",
  weight: "66kg",
  age: 42,
  dob: "27/11/1983",
};

export const quadrantPosition = { x: 0.58, y: 0.68 };

export const insights = {
  suggestions: [
    "Add a dedicated grip endurance block twice weekly",
    "Increase Z2 aerobic volume by 20% over 4 weeks",
    "Programme sled-push intervals to leverage start strength",
  ],
  injuryRisks: [
    { label: "Grip endurance asymmetry (22% L>R)", severity: "suboptimal" as Status },
    { label: "Knee extension shock absorption load", severity: "normal" as Status },
    { label: "Overhead press balance (6.5% R>L)", severity: "normal" as Status },
  ],
};

export const benchmarks = [
  {
    eyebrow: "BODY COMPOSITION",
    label: "FAT %",
    value: 14.2,
    unit: "%",
    benchmarkLow: 8,
    benchmarkHigh: 15,
    min: 5,
    max: 25,
  },
  {
    eyebrow: "LEAN MASS",
    label: "ALMI",
    value: 7.6,
    unit: "kg/m²",
    benchmarkLow: 7.5,
    benchmarkHigh: 9.5,
    min: 5,
    max: 11,
  },
  {
    eyebrow: "AEROBIC CAPACITY",
    label: "VO2 MAX",
    value: 46.11,
    unit: "ml/min/kg",
    benchmarkLow: 45,
    benchmarkHigh: 55,
    min: 30,
    max: 65,
  },
];

export const functionalScores: FunctionalCategory[] = [
  {
    title: "Neuromuscular Power",
    tests: [
      { name: "Isometric Mid Thigh Pull", correlation: "Start Strength / Sled Push", value: "161 kg", status: "optimal" },
      { name: "Counter Movement Jump", correlation: "Wall Ball & Burpee capacity", value: "46 W/kg", status: "optimal" },
      { name: "Drop Jump", correlation: "Running Economy / tendon stiffness", value: "RSI 0.62", status: "normal" },
    ],
  },
  {
    title: "Hybrid Strength",
    tests: [
      { name: "Single Leg Jump", correlation: "Sandbag Lunges", value: "L 40.4 / R 39 kg · 3.7% L>R", status: "normal" },
      { name: "Isometric Lat Pull", correlation: "SkiErg Efficiency", value: "L 28 / R 27.6 kg · 1.4% L>R", status: "optimal" },
    ],
  },
  {
    title: "Isometric Power",
    tests: [
      { name: "Hand Grip Squeeze Endurance", correlation: "Farmer's Carry", value: "L 43.3 / R 39.4 kg · −22.9/−22%", status: "suboptimal" },
      { name: "Isometric Knee Extension", correlation: "Sandbag Lunges / shock absorption", value: "L 46.7 / R 47.5 kg", status: "optimal" },
      { name: "Overhead Isometric Press", correlation: "Wall Ball Efficiency", value: "L 20.4 / R 19.1 kg · 6.5% R>L", status: "normal" },
    ],
  },
];

export const retest = {
  lastTested: "12 Sep 2025",
  nextRetest: "12 Mar 2026",
};

export const weeklyPlan: DayPlan[] = [
  {
    day: "MON",
    date: "24 Nov",
    session: "STRENGTH A",
    focus: "Lower body power + sled work",
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
    exercises: [{ id: "f1", name: "Z2 Run", sets: 1, reps: "60min", load: "—" }],
  },
  {
    day: "SAT",
    date: "29 Nov",
    session: "HYBRID",
    focus: "Race simulation — 4 stations",
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