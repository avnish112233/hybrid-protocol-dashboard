const BASE = 'https://open-wearables-platform-production.up.railway.app/api/v1'
const KEY = 'sk-7bfb062041b3ca4e8ab97fbe87dd198e'
const H = { 'X-Open-Wearables-API-Key': KEY, 'Content-Type': 'application/json' }

async function req<T>(method: string, path: string, body?: unknown): Promise<T | null> {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: H,
    body: body ? JSON.stringify(body) : undefined,
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Bond API ${res.status}: ${path}`)
  return res.json() as Promise<T>
}

export type TrainingSession = {
  day: string
  type: string
  title: string
  details: string
  completed: boolean
}

export type TrainingWeek = {
  weekNumber: number
  sessions: TrainingSession[]
}

export type TrainingPlan = {
  id: string
  athlete_id: string
  coach_id: string
  title: string | null
  status: string
  weeks: TrainingWeek[]
  created_at: string
}

export const bondApi = {
  getAthletePlan: (athleteId: string) =>
    req<TrainingPlan>('GET', `/bond/athletes/${athleteId}/plan`),

  toggleSession: (planId: string, weekNumber: number, sessionIndex: number) =>
    req('PATCH', `/bond/plans/${planId}/sessions/${weekNumber}/${sessionIndex}`, {}),
}
