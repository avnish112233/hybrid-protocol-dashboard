import type { Status } from "./status";

export type Sex = "male" | "female";

// ─── VO2 Max ─────────────────────────────────────────────────────────────────
// p20 / p40 / p60 / p80 within the HYROX-competing athletic population
// Source: ACSM norms calibrated upward for trained athletes
export const VO2_REFS: Record<Sex, { minAge: number; maxAge: number; p20: number; p40: number; p60: number; p80: number }[]> = {
  male: [
    { minAge: 18, maxAge: 29, p20: 38, p40: 44, p60: 50, p80: 58 },
    { minAge: 30, maxAge: 39, p20: 36, p40: 42, p60: 48, p80: 55 },
    { minAge: 40, maxAge: 49, p20: 33, p40: 38, p60: 44, p80: 52 },
    { minAge: 50, maxAge: 59, p20: 29, p40: 34, p60: 40, p80: 47 },
    { minAge: 60, maxAge: 69, p20: 25, p40: 30, p60: 35, p80: 42 },
  ],
  female: [
    { minAge: 18, maxAge: 29, p20: 33, p40: 38, p60: 43, p80: 50 },
    { minAge: 30, maxAge: 39, p20: 30, p40: 35, p60: 40, p80: 46 },
    { minAge: 40, maxAge: 49, p20: 27, p40: 32, p60: 37, p80: 43 },
    { minAge: 50, maxAge: 59, p20: 24, p40: 28, p60: 33, p80: 39 },
    { minAge: 60, maxAge: 69, p20: 20, p40: 24, p60: 29, p80: 35 },
  ],
};

// ─── DEXA — Body Fat % ───────────────────────────────────────────────────────
// optimalLow/High = "athletic-performance" window for HYROX competitors
// normalLow/High  = acceptable outer bounds (below = underfat risk, above = overweight)
// Source: ISSN position stand + DXA reference databases
export const FAT_PCT_REFS: Record<Sex, { minAge: number; maxAge: number; optimalLow: number; optimalHigh: number; normalLow: number; normalHigh: number }[]> = {
  male: [
    { minAge: 18, maxAge: 29, optimalLow: 6,  optimalHigh: 13, normalLow: 4,  normalHigh: 18 },
    { minAge: 30, maxAge: 39, optimalLow: 7,  optimalHigh: 14, normalLow: 5,  normalHigh: 19 },
    { minAge: 40, maxAge: 49, optimalLow: 8,  optimalHigh: 15, normalLow: 6,  normalHigh: 20 },
    { minAge: 50, maxAge: 59, optimalLow: 9,  optimalHigh: 17, normalLow: 7,  normalHigh: 22 },
    { minAge: 60, maxAge: 69, optimalLow: 10, optimalHigh: 19, normalLow: 8,  normalHigh: 24 },
  ],
  female: [
    { minAge: 18, maxAge: 29, optimalLow: 14, optimalHigh: 22, normalLow: 10, normalHigh: 28 },
    { minAge: 30, maxAge: 39, optimalLow: 15, optimalHigh: 23, normalLow: 11, normalHigh: 29 },
    { minAge: 40, maxAge: 49, optimalLow: 16, optimalHigh: 25, normalLow: 12, normalHigh: 30 },
    { minAge: 50, maxAge: 59, optimalLow: 18, optimalHigh: 27, normalLow: 14, normalHigh: 32 },
    { minAge: 60, maxAge: 69, optimalLow: 19, optimalHigh: 29, normalLow: 15, normalHigh: 34 },
  ],
};

// ─── DEXA — ALMI (Appendicular Lean Mass Index kg/m²) ───────────────────────
// optimalLow = minimum for HYROX-competitive lean mass; optimalHigh = natural ceiling
// normalLow  = ESPEN sarcopenia threshold (below = low muscle mass)
// Source: ESPEN consensus + NHANES calibrated for strength-endurance athletes
export const ALMI_REFS: Record<Sex, { minAge: number; maxAge: number; optimalLow: number; optimalHigh: number; normalLow: number; normalHigh: number }[]> = {
  male: [
    { minAge: 18, maxAge: 29, optimalLow: 8.7, optimalHigh: 10.8, normalLow: 7.5, normalHigh: 11.5 },
    { minAge: 30, maxAge: 39, optimalLow: 8.5, optimalHigh: 10.5, normalLow: 7.3, normalHigh: 11.2 },
    { minAge: 40, maxAge: 49, optimalLow: 8.3, optimalHigh: 10.3, normalLow: 7.0, normalHigh: 11.0 },
    { minAge: 50, maxAge: 59, optimalLow: 8.0, optimalHigh: 10.0, normalLow: 6.8, normalHigh: 10.8 },
    { minAge: 60, maxAge: 69, optimalLow: 7.5, optimalHigh: 9.5,  normalLow: 6.5, normalHigh: 10.5 },
  ],
  female: [
    { minAge: 18, maxAge: 29, optimalLow: 6.0, optimalHigh: 7.8, normalLow: 5.4, normalHigh: 8.5 },
    { minAge: 30, maxAge: 39, optimalLow: 5.9, optimalHigh: 7.7, normalLow: 5.3, normalHigh: 8.3 },
    { minAge: 40, maxAge: 49, optimalLow: 5.7, optimalHigh: 7.5, normalLow: 5.1, normalHigh: 8.1 },
    { minAge: 50, maxAge: 59, optimalLow: 5.5, optimalHigh: 7.3, normalLow: 4.9, normalHigh: 7.9 },
    { minAge: 60, maxAge: 69, optimalLow: 5.2, optimalHigh: 7.0, normalLow: 4.6, normalHigh: 7.6 },
  ],
};

// ─── Lookup helpers ───────────────────────────────────────────────────────────

function byAge<T extends { minAge: number; maxAge: number }>(table: T[], age: number): T {
  return table.find((r) => age >= r.minAge && age <= r.maxAge) ?? table[table.length - 1];
}

export function getVO2Ref(age: number, sex: Sex) {
  return byAge(VO2_REFS[sex], age);
}

export function getFatPctRef(age: number, sex: Sex) {
  return byAge(FAT_PCT_REFS[sex], age);
}

export function getAlmiRef(age: number, sex: Sex) {
  return byAge(ALMI_REFS[sex], age);
}

// ─── Status helpers ───────────────────────────────────────────────────────────

export function vo2Status(value: number, age: number, sex: Sex): Status {
  const r = getVO2Ref(age, sex);
  if (value >= r.p60) return "optimal";
  if (value >= r.p40) return "normal";
  return "suboptimal";
}

export function fatPctStatus(value: number, age: number, sex: Sex): Status {
  const r = getFatPctRef(age, sex);
  if (value >= r.optimalLow && value <= r.optimalHigh) return "optimal";
  if (value >= r.normalLow && value <= r.normalHigh) return "normal";
  return "suboptimal";
}

export function almiStatus(value: number, age: number, sex: Sex): Status {
  const r = getAlmiRef(age, sex);
  if (value >= r.optimalLow && value <= r.optimalHigh) return "optimal";
  if (value >= r.normalLow && value <= r.normalHigh) return "normal";
  return "suboptimal";
}

// ─── VO2 label for display ────────────────────────────────────────────────────

export function vo2Label(value: number, age: number, sex: Sex): string {
  const r = getVO2Ref(age, sex);
  if (value >= r.p80) return "Elite";
  if (value >= r.p60) return "Excellent";
  if (value >= r.p40) return "Good";
  if (value >= r.p20) return "Developing";
  return "Below average";
}
