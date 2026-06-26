// VI backend API client.
// All data currently returns mock values — swap each function body for a fetch() call
// when the real VI backend endpoints are ready. Data shapes must stay identical.

import {
  athlete as _athlete,
  benchmarks as _benchmarks,
  functionalScores as _functionalScores,
  weeklyPlan as _weeklyPlan,
  history as _history,
  insights as _insights,
  retest as _retest,
  streak as _streak,
  quadrantPosition as _quadrantPosition,
} from "@/data/athlete";
import { sessions as _sessions } from "@/data/sessions";
import type { DayPlan, HistoryEntry } from "@/data/athlete";
import type { SessionDetail } from "@/data/sessions";

export async function getAthleteProfile() {
  return _athlete;
}

export async function getAthleteBenchmarks() {
  return _benchmarks;
}

export async function getQuadrantPosition() {
  return _quadrantPosition;
}

export async function getFunctionalScores() {
  return _functionalScores;
}

export async function getInsights() {
  return _insights;
}

export async function getRetest() {
  return _retest;
}

export async function getStreak() {
  return _streak;
}

export async function getWeeklyPlan(): Promise<DayPlan[]> {
  return _weeklyPlan;
}

export async function getHistory(): Promise<HistoryEntry[]> {
  return _history;
}

export async function getSessionDetail(sessionId: string): Promise<SessionDetail | null> {
  return _sessions[sessionId] ?? null;
}
