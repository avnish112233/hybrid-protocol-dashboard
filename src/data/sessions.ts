import type { RunData } from "./athlete";

export type MuscleGroup =
  | "chest"
  | "shoulders"
  | "biceps"
  | "forearms"
  | "abs"
  | "quads"
  | "calves"
  | "glutes"
  | "hamstrings"
  | "lats"
  | "traps";

export type MuscleEffort = "low" | "med" | "high";

export interface SessionDetail {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  kind: "run" | "strength" | "hybrid";
  rpe: number; // 1-10
  perceived: "Easy" | "Moderate" | "Hard" | "Max";
  hrSeries: number[]; // sampled HR over time
  hrLabels: string[]; // x axis tick labels
  zones: { z1: number; z2: number; z3: number; z4: number; z5: number }; // percentages
  runData?: RunData;
  muscles: Partial<Record<MuscleGroup, MuscleEffort>>;
  exerciseLogs: { name: string; detail: string }[];
  coachNote?: string;
}

export const sessions: Record<string, SessionDetail> = {
  "tue-run-a": {
    id: "tue-run-a",
    title: "Run · Threshold 6×800m",
    subtitle: "Tuesday · Run A",
    date: "25 Nov",
    kind: "run",
    rpe: 8,
    perceived: "Hard",
    hrSeries: [110, 132, 150, 162, 175, 168, 178, 172, 180, 174, 181, 170, 158, 142, 128],
    hrLabels: ["0", "10m", "20m", "30m", "42m"],
    zones: { z1: 8, z2: 14, z3: 22, z4: 38, z5: 18 },
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
    muscles: {
      quads: "high",
      hamstrings: "high",
      calves: "high",
      glutes: "med",
      abs: "low",
    },
    exerciseLogs: [
      { name: "Easy warmup", detail: "10 min · Z1" },
      { name: "800m @ threshold", detail: "6 × 3:55 avg" },
      { name: "Cooldown jog", detail: "10 min · Z1" },
    ],
  },
  "fri-run-b": {
    id: "fri-run-b",
    title: "Run · Long Z2",
    subtitle: "Friday · Run B",
    date: "28 Nov",
    kind: "run",
    rpe: 5,
    perceived: "Moderate",
    hrSeries: [120, 138, 144, 146, 148, 150, 149, 151, 148, 152, 150, 153, 149, 146, 140],
    hrLabels: ["0", "15m", "30m", "45m", "64m"],
    zones: { z1: 10, z2: 62, z3: 22, z4: 5, z5: 1 },
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
    muscles: {
      quads: "med",
      hamstrings: "med",
      calves: "high",
      glutes: "med",
    },
    exerciseLogs: [{ name: "Z2 Run", detail: "60 min · steady" }],
  },
  "mon-strength-a": {
    id: "mon-strength-a",
    title: "Strength · Lower power + sled",
    subtitle: "Monday · Strength A",
    date: "24 Nov",
    kind: "strength",
    rpe: 7,
    perceived: "Hard",
    hrSeries: [88, 110, 138, 122, 142, 130, 150, 128, 148, 132, 152, 130, 145, 120, 100],
    hrLabels: ["0", "15m", "30m", "45m", "60m"],
    zones: { z1: 38, z2: 32, z3: 20, z4: 8, z5: 2 },
    muscles: {
      quads: "high",
      glutes: "high",
      hamstrings: "high",
      calves: "med",
      forearms: "med",
      traps: "med",
      abs: "low",
    },
    exerciseLogs: [
      { name: "Trap Bar Deadlift", detail: "4 × 5 @ 100 kg" },
      { name: "Sled Push 20m", detail: "5 × 1 @ 80 kg" },
      { name: "Walking Lunge", detail: "3 × 20 @ 2×20 kg" },
    ],
  },
  "thu-strength-b": {
    id: "thu-strength-b",
    title: "Strength · Upper pull + grip",
    subtitle: "Thursday · Strength B",
    date: "27 Nov",
    kind: "strength",
    rpe: 7,
    perceived: "Hard",
    hrSeries: [92, 118, 140, 122, 144, 128, 148, 130, 146, 130, 150, 128, 138, 118, 100],
    hrLabels: ["0", "15m", "30m", "45m", "60m"],
    zones: { z1: 42, z2: 30, z3: 20, z4: 6, z5: 2 },
    muscles: {
      lats: "high",
      biceps: "high",
      forearms: "high",
      traps: "med",
      shoulders: "med",
      abs: "low",
    },
    exerciseLogs: [
      { name: "Weighted Pull-up", detail: "4 × 6 @ +10 kg" },
      { name: "Farmer Carry 40m", detail: "4 × 1 @ 2×32 kg" },
      { name: "Row 500m", detail: "3 × 1" },
    ],
  },
  "wed-hybrid": {
    id: "wed-hybrid",
    title: "Hybrid · SkiErg + wall ball",
    subtitle: "Wednesday · Hybrid",
    date: "26 Nov",
    kind: "hybrid",
    rpe: 8,
    perceived: "Hard",
    hrSeries: [108, 138, 160, 152, 168, 158, 172, 162, 174, 164, 176, 160, 150, 138, 120],
    hrLabels: ["0", "10m", "20m", "30m", "45m"],
    zones: { z1: 8, z2: 20, z3: 32, z4: 30, z5: 10 },
    muscles: {
      lats: "high",
      shoulders: "high",
      quads: "high",
      abs: "med",
      chest: "med",
    },
    exerciseLogs: [
      { name: "SkiErg 500m", detail: "5 × 1" },
      { name: "Wall Ball", detail: "5 × 20 @ 9 kg" },
    ],
  },
  "sat-hybrid": {
    id: "sat-hybrid",
    title: "Hybrid · Race simulation",
    subtitle: "Saturday · Hybrid",
    date: "29 Nov",
    kind: "hybrid",
    rpe: 9,
    perceived: "Max",
    hrSeries: [120, 150, 168, 162, 178, 170, 182, 176, 184, 178, 186, 172, 160, 142, 124],
    hrLabels: ["0", "10m", "20m", "30m", "40m"],
    zones: { z1: 4, z2: 12, z3: 24, z4: 38, z5: 22 },
    muscles: {
      quads: "high",
      hamstrings: "high",
      calves: "high",
      glutes: "high",
      abs: "med",
      chest: "med",
    },
    exerciseLogs: [
      { name: "Run 1km", detail: "4 × 1" },
      { name: "Burpee Broad Jump", detail: "4 × 20" },
    ],
  },
};