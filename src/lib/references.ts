import type { Status } from "./status";

export type Sex = "male" | "female";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface VO2Ref {
  minAge: number; maxAge: number; sex: Sex;
  p20: number; p40: number; p60: number; p80: number;
}

export interface FatPctRef {
  minAge: number; maxAge: number; sex: Sex;
  optimalLow: number; optimalHigh: number;
  normalLow: number;  normalHigh: number;
}

export interface AlmiRef {
  minAge: number; maxAge: number; sex: Sex;
  optimalLow: number; optimalHigh: number;
  normalLow: number;  normalHigh: number;
}

export interface QuadrantAnchors { p20: number; p40: number; p60: number; p80: number }

export interface QuadrantConfig {
  weights: {
    aerobic: number;
    strength: number;
    bodyComp: number;
    asymPenalty: number;
    eliteThreshold: number;
  };
  strengthAnchors: {
    imtpBW: QuadrantAnchors;
    cmj:    QuadrantAnchors;
    rsi:    QuadrantAnchors;
  };
  strengthWeights: {
    imtp: number;
    cmj:  number;
    rsi:  number;
  };
}

export interface ReferenceConfig {
  vo2Refs:     VO2Ref[];
  fatPctRefs:  FatPctRef[];
  almiRefs:    AlmiRef[];
  quadrant:    QuadrantConfig;
}

// ─── Hardcoded defaults (mirrors the Postgres seed row) ──────────────────────
// Used for: initial SSR render, fallback when DB is unreachable.

export const DEFAULT_REFERENCE_CONFIG: ReferenceConfig = {
  vo2Refs: [
    { minAge: 18, maxAge: 29, sex: "male",   p20: 38, p40: 44, p60: 50, p80: 58 },
    { minAge: 30, maxAge: 39, sex: "male",   p20: 36, p40: 42, p60: 48, p80: 55 },
    { minAge: 40, maxAge: 49, sex: "male",   p20: 33, p40: 38, p60: 44, p80: 52 },
    { minAge: 50, maxAge: 59, sex: "male",   p20: 29, p40: 34, p60: 40, p80: 47 },
    { minAge: 60, maxAge: 69, sex: "male",   p20: 25, p40: 30, p60: 35, p80: 42 },
    { minAge: 18, maxAge: 29, sex: "female", p20: 33, p40: 38, p60: 43, p80: 50 },
    { minAge: 30, maxAge: 39, sex: "female", p20: 30, p40: 35, p60: 40, p80: 46 },
    { minAge: 40, maxAge: 49, sex: "female", p20: 27, p40: 32, p60: 37, p80: 43 },
    { minAge: 50, maxAge: 59, sex: "female", p20: 24, p40: 28, p60: 33, p80: 39 },
    { minAge: 60, maxAge: 69, sex: "female", p20: 20, p40: 24, p60: 29, p80: 35 },
  ],
  fatPctRefs: [
    { minAge: 18, maxAge: 29, sex: "male",   optimalLow: 6,  optimalHigh: 13, normalLow: 4,  normalHigh: 18 },
    { minAge: 30, maxAge: 39, sex: "male",   optimalLow: 7,  optimalHigh: 14, normalLow: 5,  normalHigh: 19 },
    { minAge: 40, maxAge: 49, sex: "male",   optimalLow: 8,  optimalHigh: 15, normalLow: 6,  normalHigh: 20 },
    { minAge: 50, maxAge: 59, sex: "male",   optimalLow: 9,  optimalHigh: 17, normalLow: 7,  normalHigh: 22 },
    { minAge: 60, maxAge: 69, sex: "male",   optimalLow: 10, optimalHigh: 19, normalLow: 8,  normalHigh: 24 },
    { minAge: 18, maxAge: 29, sex: "female", optimalLow: 14, optimalHigh: 22, normalLow: 10, normalHigh: 28 },
    { minAge: 30, maxAge: 39, sex: "female", optimalLow: 15, optimalHigh: 23, normalLow: 11, normalHigh: 29 },
    { minAge: 40, maxAge: 49, sex: "female", optimalLow: 16, optimalHigh: 25, normalLow: 12, normalHigh: 30 },
    { minAge: 50, maxAge: 59, sex: "female", optimalLow: 18, optimalHigh: 27, normalLow: 14, normalHigh: 32 },
    { minAge: 60, maxAge: 69, sex: "female", optimalLow: 19, optimalHigh: 29, normalLow: 15, normalHigh: 34 },
  ],
  almiRefs: [
    { minAge: 18, maxAge: 29, sex: "male",   optimalLow: 8.7, optimalHigh: 10.8, normalLow: 7.5, normalHigh: 11.5 },
    { minAge: 30, maxAge: 39, sex: "male",   optimalLow: 8.5, optimalHigh: 10.5, normalLow: 7.3, normalHigh: 11.2 },
    { minAge: 40, maxAge: 49, sex: "male",   optimalLow: 8.3, optimalHigh: 10.3, normalLow: 7.0, normalHigh: 11.0 },
    { minAge: 50, maxAge: 59, sex: "male",   optimalLow: 8.0, optimalHigh: 10.0, normalLow: 6.8, normalHigh: 10.8 },
    { minAge: 60, maxAge: 69, sex: "male",   optimalLow: 7.5, optimalHigh: 9.5,  normalLow: 6.5, normalHigh: 10.5 },
    { minAge: 18, maxAge: 29, sex: "female", optimalLow: 6.0, optimalHigh: 7.8,  normalLow: 5.4, normalHigh: 8.5  },
    { minAge: 30, maxAge: 39, sex: "female", optimalLow: 5.9, optimalHigh: 7.7,  normalLow: 5.3, normalHigh: 8.3  },
    { minAge: 40, maxAge: 49, sex: "female", optimalLow: 5.7, optimalHigh: 7.5,  normalLow: 5.1, normalHigh: 8.1  },
    { minAge: 50, maxAge: 59, sex: "female", optimalLow: 5.5, optimalHigh: 7.3,  normalLow: 4.9, normalHigh: 7.9  },
    { minAge: 60, maxAge: 69, sex: "female", optimalLow: 5.2, optimalHigh: 7.0,  normalLow: 4.6, normalHigh: 7.6  },
  ],
  quadrant: {
    weights: { aerobic: 0.40, strength: 0.45, bodyComp: 0.15, asymPenalty: 0.04, eliteThreshold: 0.50 },
    strengthAnchors: {
      imtpBW: { p20: 1.55, p40: 1.85, p60: 2.20, p80: 2.60 },
      cmj:    { p20: 30,   p40: 38,   p60: 45,   p80: 54   },
      rsi:    { p20: 0.35, p40: 0.50, p60: 0.70, p80: 1.00 },
    },
    strengthWeights: { imtp: 0.45, cmj: 0.35, rsi: 0.20 },
  },
};

// ─── Lookup helpers (all accept config arrays as param) ───────────────────────

function byAge<T extends { minAge: number; maxAge: number; sex: string }>(
  refs: T[],
  age: number,
  sex: Sex,
): T {
  return (
    refs.find((r) => r.sex === sex && age >= r.minAge && age <= r.maxAge) ??
    refs.filter((r) => r.sex === sex).at(-1)!
  );
}

export function getVO2Ref(age: number, sex: Sex, refs = DEFAULT_REFERENCE_CONFIG.vo2Refs): VO2Ref {
  return byAge(refs, age, sex);
}

export function getFatPctRef(age: number, sex: Sex, refs = DEFAULT_REFERENCE_CONFIG.fatPctRefs): FatPctRef {
  return byAge(refs, age, sex);
}

export function getAlmiRef(age: number, sex: Sex, refs = DEFAULT_REFERENCE_CONFIG.almiRefs): AlmiRef {
  return byAge(refs, age, sex);
}

// ─── Status helpers ───────────────────────────────────────────────────────────

export function vo2Status(value: number, age: number, sex: Sex, refs = DEFAULT_REFERENCE_CONFIG.vo2Refs): Status {
  const r = getVO2Ref(age, sex, refs);
  if (value >= r.p60) return "optimal";
  if (value >= r.p40) return "normal";
  return "suboptimal";
}

export function fatPctStatus(value: number, age: number, sex: Sex, refs = DEFAULT_REFERENCE_CONFIG.fatPctRefs): Status {
  const r = getFatPctRef(age, sex, refs);
  if (value >= r.optimalLow && value <= r.optimalHigh) return "optimal";
  if (value >= r.normalLow  && value <= r.normalHigh)  return "normal";
  return "suboptimal";
}

export function almiStatus(value: number, age: number, sex: Sex, refs = DEFAULT_REFERENCE_CONFIG.almiRefs): Status {
  const r = getAlmiRef(age, sex, refs);
  if (value >= r.optimalLow && value <= r.optimalHigh) return "optimal";
  if (value >= r.normalLow  && value <= r.normalHigh)  return "normal";
  return "suboptimal";
}

export function vo2Label(value: number, age: number, sex: Sex, refs = DEFAULT_REFERENCE_CONFIG.vo2Refs): string {
  const r = getVO2Ref(age, sex, refs);
  if (value >= r.p80) return "Elite";
  if (value >= r.p60) return "Excellent";
  if (value >= r.p40) return "Good";
  if (value >= r.p20) return "Developing";
  return "Below average";
}
