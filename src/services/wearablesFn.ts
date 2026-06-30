// Server function — runs on the server only, never in the browser bundle.
// Keeps OW_API_KEY and OW_API_URL out of client-side code.
// Set in Vercel env vars: OW_API_URL, OW_API_KEY, and VITE_OW_USER_ID (per-athlete).

import { createServerFn } from "@tanstack/react-start";

function baseUrl() {
  return process.env.OW_API_URL ?? "http://localhost:8000/api/v1";
}

function apiKey() {
  return process.env.OW_API_KEY ?? "sk-7bfb062041b3ca4e8ab97fbe87dd198e";
}

function dateRange(days: number) {
  const end = new Date();
  const start = new Date(end.getTime() - days * 86400 * 1000);
  return { startDate: start.toISOString(), endDate: end.toISOString() };
}

async function owGet(path: string, params: Record<string, string> = {}) {
  const url = new URL(`${baseUrl()}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), {
    headers: { "X-Open-Wearables-API-Key": apiKey() },
  });
  if (!res.ok) throw new Error(`OW ${res.status}: ${path}`);
  return res.json() as Promise<{ data?: unknown[] }>;
}

type OWRecovery = {
  date: string;
  recovery_score: number;
  resting_heart_rate_bpm: number;
  avg_hrv_sdnn_ms: number;
  avg_spo2_percent: number;
};

type OWSleep = {
  start_time: string;
  is_nap: boolean;
  sleep_duration_seconds: number;
  efficiency_percent: number;
  stages: { deep_minutes: number; rem_minutes: number; light_minutes: number; awake_minutes: number };
};

type OWWorkout = {
  start_time: string;
  type: string;
  duration_seconds: number;
  calories_kcal: number;
  avg_heart_rate_bpm: number;
};

type OWTimeseries = { type: string; value: number; timestamp: string };

export const getOAuthUrl = createServerFn()
  .inputValidator((input: { provider: string; userId: string; returnUrl: string }) => input)
  .handler(async ({ data }: { data: { provider: string; userId: string; returnUrl: string } }) => {
    const url = new URL(`${baseUrl()}/oauth/${data.provider}/authorize`);
    url.searchParams.set("user_id", data.userId);
    url.searchParams.set("redirect_uri", data.returnUrl);
    const res = await fetch(url.toString(), {
      headers: { "X-Open-Wearables-API-Key": apiKey() },
    });
    if (!res.ok) throw new Error(`OW oauth ${res.status}: ${data.provider}`);
    const json = (await res.json()) as { authorization_url: string };
    return json.authorization_url;
  });

export const fetchWhoopSummary = createServerFn()
  .inputValidator((userId: string) => userId)
  .handler(async ({ data: userId }: { data: string }) => {
    const range = dateRange(90);

    const [workoutsRes, sleepRes, recoveryRes, timeseriesRes] = await Promise.all([
      owGet(`/users/${userId}/events/workouts`, {
        start_date: range.startDate,
        end_date: range.endDate,
        limit: "100",
      }),
      owGet(`/users/${userId}/events/sleep`, {
        start_date: range.startDate,
        end_date: range.endDate,
        limit: "100",
      }),
      owGet(`/users/${userId}/summaries/recovery`, {
        start_date: range.startDate,
        end_date: range.endDate,
        limit: "100",
      }),
      owGet(`/users/${userId}/timeseries`, {
        start_time: range.startDate,
        end_time: range.endDate,
        limit: "100",
      }),
    ]);

    const workouts = ((workoutsRes.data ?? []) as OWWorkout[]).sort(
      (a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime(),
    );
    const sleepRecords = ((sleepRes.data ?? []) as OWSleep[])
      .filter((s) => !s.is_nap)
      .sort((a, b) => new Date(b.start_time).getTime() - new Date(a.start_time).getTime());
    const recoveryRecords = ((recoveryRes.data ?? []) as OWRecovery[]).sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    const timeseries = (timeseriesRes.data ?? []) as OWTimeseries[];

    const latestByType: Record<string, OWTimeseries> = {};
    timeseries.forEach((r) => {
      if (!latestByType[r.type] || new Date(r.timestamp) > new Date(latestByType[r.type].timestamp)) {
        latestByType[r.type] = r;
      }
    });

    const latest = recoveryRecords[0];
    const lastSleep = sleepRecords[0];
    const lastWorkout = workouts[0] ?? null;

    const recent30 = recoveryRecords.slice(0, 30);
    const avgRecovery30d = recent30.length
      ? Math.round(recent30.reduce((s, r) => s + (r.recovery_score ?? 0), 0) / recent30.length)
      : null;

    const recentSleep30 = sleepRecords.slice(0, 30);
    const avgSleepH = recentSleep30.length
      ? (
          recentSleep30.reduce((s, r) => s + (r.sleep_duration_seconds ?? 0), 0) /
          recentSleep30.length /
          3600
        ).toFixed(1)
      : null;

    return {
      recoveryScore: latest?.recovery_score ?? null,
      avgRecovery30d,
      hrv: latestByType["heart_rate_variability_rmssd"]?.value ?? null,
      restingHR: latestByType["resting_heart_rate"]?.value ?? null,
      spo2: latestByType["oxygen_saturation"]?.value ?? null,
      lastSleep: lastSleep
        ? {
            date: lastSleep.start_time.slice(0, 10),
            durationH: (lastSleep.sleep_duration_seconds / 3600).toFixed(1),
            efficiency: lastSleep.efficiency_percent
              ? Math.round(lastSleep.efficiency_percent)
              : null,
            deep: lastSleep.stages?.deep_minutes ?? null,
            rem: lastSleep.stages?.rem_minutes ?? null,
          }
        : null,
      avgSleepH,
      lastWorkout: lastWorkout
        ? {
            date: (lastWorkout.start_time as string).slice(0, 10),
            type: lastWorkout.type as string,
            durationMin: Math.round((lastWorkout.duration_seconds ?? 0) / 60),
            calories: lastWorkout.calories_kcal
              ? Math.round(lastWorkout.calories_kcal)
              : null,
            avgHR: lastWorkout.avg_heart_rate_bpm ?? null,
          }
        : null,
      recentWorkouts: workouts.slice(0, 5).map((w) => ({
        date: w.start_time.slice(0, 10),
        type: w.type,
        durationMin: Math.round((w.duration_seconds ?? 0) / 60),
        calories: w.calories_kcal ? Math.round(w.calories_kcal) : null,
        avgHR: w.avg_heart_rate_bpm ?? null,
      })),
      totalWorkouts90d: workouts.length,
    };
  });
