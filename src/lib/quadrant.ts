import { getVO2Ref, type Sex } from "./references";

// ─── Continuous percentile scorer ─────────────────────────────────────────────
// Maps a raw value onto 0–1 using four population percentile anchors (p20/40/60/80).
// Values above p80 are linearly extrapolated to 1.0 at p80 * 1.3.
function score(value: number, p20: number, p40: number, p60: number, p80: number): number {
  const lerp = (v: number, lo: number, hi: number, oLo: number, oHi: number) =>
    oLo + ((v - lo) / (hi - lo)) * (oHi - oLo);

  if (value >= p80) return Math.min(1.0, lerp(value, p80, p80 * 1.3, 0.8, 1.0));
  if (value >= p60) return lerp(value, p60, p80, 0.6, 0.8);
  if (value >= p40) return lerp(value, p40, p60, 0.4, 0.6);
  if (value >= p20) return lerp(value, p20, p40, 0.2, 0.4);
  return Math.max(0, lerp(value, 0, p20, 0, 0.2));
}

// ─── Input / Output types ─────────────────────────────────────────────────────

export interface QuadrantInput {
  age: number;
  sex: Sex;
  // Aerobic
  vo2max: number;          // ml/min/kg
  // Neuromuscular power (absolute values matching existing data)
  imtpKg: number;          // Isometric Mid Thigh Pull, kg
  bodyWeightKg: number;
  cmjWattsPerKg: number;   // Counter Movement Jump, W/kg
  dropJumpRsi: number;     // Reactive Strength Index
  // Body composition
  bodyFatPct: number;
  // Asymmetry flags
  suboptimalAsymmetries: number;
}

export type QuadrantLabel =
  | "Hybrid Elite"
  | "Strength Elite"
  | "Aerobic Foundation"
  | "Strength Foundation";

export interface QuadrantResult {
  x: number;               // 0 = strength dominant → 1 = aerobic dominant
  y: number;               // 0 = developing → 1 = elite
  aerobicScore: number;
  strengthScore: number;
  label: QuadrantLabel;
  insight: string;
  aerobicLabel: string;
  strengthLabel: string;
}

// ─── Population reference anchors (HYROX athlete calibrated) ─────────────────
// These norms reflect the competitive age-group HYROX population, not general public.

// IMTP / body-weight ratio (body-weight normalized)
const IMTP_BW_ANCHORS = { p20: 1.55, p40: 1.85, p60: 2.20, p80: 2.60 } as const;

// CMJ peak power (W/kg)
const CMJ_ANCHORS = { p20: 30, p40: 38, p60: 45, p80: 54 } as const;

// Drop Jump RSI
const RSI_ANCHORS = { p20: 0.35, p40: 0.50, p60: 0.70, p80: 1.00 } as const;

// Body fat scoring — peak score around the lower-optimal range; penalises high fat%
function bodyCompScore(fatPct: number, age: number, sex: Sex): number {
  // Optimal floor rises slightly with age to reflect physiology
  const optimalLow = sex === "male" ? 6 + Math.max(0, (age - 30) * 0.08) : 14 + Math.max(0, (age - 30) * 0.10);
  const optimalHigh = sex === "male" ? 14 + Math.max(0, (age - 30) * 0.08) : 24 + Math.max(0, (age - 30) * 0.10);
  const worstHigh = optimalHigh + 10;

  if (fatPct < optimalLow) {
    // Underfat — slight reduction from peak
    return 0.75 - Math.max(0, (optimalLow - fatPct)) * 0.03;
  }
  if (fatPct <= optimalHigh) {
    // In optimal window — linear peak around midpoint
    const mid = (optimalLow + optimalHigh) / 2;
    return 0.90 - Math.abs(fatPct - mid) / (optimalHigh - optimalLow) * 0.15;
  }
  // Above optimal — linear decline
  return Math.max(0.10, 0.75 - ((fatPct - optimalHigh) / (worstHigh - optimalHigh)) * 0.65);
}

// ─── Main algorithm ───────────────────────────────────────────────────────────

export function computeQuadrant(input: QuadrantInput): QuadrantResult {
  const { age, sex, vo2max, imtpKg, bodyWeightKg, cmjWattsPerKg, dropJumpRsi, bodyFatPct, suboptimalAsymmetries } = input;

  // ── Aerobic axis ────────────────────────────────────────────────────────────
  const vo2Ref = getVO2Ref(age, sex);
  const aerobicScore = score(vo2max, vo2Ref.p20, vo2Ref.p40, vo2Ref.p60, vo2Ref.p80);

  // ── Strength / neuromuscular axis ────────────────────────────────────────────
  const imtpBW = imtpKg / bodyWeightKg;
  const imtpScore  = score(imtpBW, IMTP_BW_ANCHORS.p20, IMTP_BW_ANCHORS.p40, IMTP_BW_ANCHORS.p60, IMTP_BW_ANCHORS.p80);
  const cmjScore   = score(cmjWattsPerKg, CMJ_ANCHORS.p20, CMJ_ANCHORS.p40, CMJ_ANCHORS.p60, CMJ_ANCHORS.p80);
  const rsiScore   = score(dropJumpRsi, RSI_ANCHORS.p20, RSI_ANCHORS.p40, RSI_ANCHORS.p60, RSI_ANCHORS.p80);

  // IMTP (max force) weighted most; CMJ (explosive power) next; RSI (reactive / tendon)
  const strengthScore = imtpScore * 0.45 + cmjScore * 0.35 + rsiScore * 0.20;

  // ── Body composition ─────────────────────────────────────────────────────────
  const compScore = bodyCompScore(bodyFatPct, age, sex);

  // ── Asymmetry penalty ────────────────────────────────────────────────────────
  const asymPenalty = suboptimalAsymmetries * 0.04;

  // ── Y axis — overall capacity ─────────────────────────────────────────────────
  const y = Math.max(0.05, Math.min(0.95,
    aerobicScore * 0.40 +
    strengthScore * 0.45 +
    compScore     * 0.15 -
    asymPenalty,
  ));

  // ── X axis — aerobic vs. strength dominance ───────────────────────────────────
  const total = aerobicScore + strengthScore;
  const x = total > 0
    ? Math.max(0.05, Math.min(0.95, aerobicScore / total))
    : 0.5;

  // ── Quadrant label + insight ──────────────────────────────────────────────────
  const isElite   = y >= 0.5;
  const isAerobic = x >= 0.5;

  const aerobicLabel  = aerobicScore >= 0.7 ? "Elite aerobic" : aerobicScore >= 0.5 ? "Strong aerobic" : aerobicScore >= 0.3 ? "Developing aerobic" : "Low aerobic";
  const strengthLabel = strengthScore >= 0.7 ? "Elite strength" : strengthScore >= 0.5 ? "Strong strength" : strengthScore >= 0.3 ? "Developing strength" : "Low strength";

  type Config = { label: QuadrantLabel; insight: string };
  const configs: Record<string, Config> = {
    "true-true": {
      label: "Hybrid Elite",
      insight: `Your aerobic engine (VO₂ ${vo2max.toFixed(1)}) leads your profile. Translate this capacity into stronger sled pushes and sandbag carries to compete at the top of your age group.`,
    },
    "true-false": {
      label: "Strength Elite",
      insight: `Raw power output is your edge — IMTP and CMJ put you ahead of most competitors. Build structured Z2 aerobic volume to sustain that output across all 8 HYROX stations.`,
    },
    "false-true": {
      label: "Aerobic Foundation",
      insight: `Good aerobic base, with room to grow overall capacity. Prioritise strength-speed work — sled intervals, loaded carries, plyometrics — to move up the capacity axis.`,
    },
    "false-false": {
      label: "Strength Foundation",
      insight: `Building phase across both axes. Increase structured aerobic volume (Z2 + threshold) while developing functional strength to unlock higher output come race day.`,
    },
  };

  const { label, insight } = configs[`${isElite}-${isAerobic}`];

  return { x, y, aerobicScore, strengthScore, label, insight, aerobicLabel, strengthLabel };
}
