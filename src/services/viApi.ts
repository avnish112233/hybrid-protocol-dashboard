import { sessions as _sessions } from "@/data/sessions";
import type { DayPlan, HistoryEntry } from "@/data/athlete";
import type { SessionDetail } from "@/data/sessions";
import {
  weeklyPlan as _weeklyPlan,
  history as _history,
  streak as _streak,
} from "@/data/athlete";

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
