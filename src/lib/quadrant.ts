import { getVO2Ref, DEFAULT_REFERENCE_CONFIG, type Sex, type QuadrantConfig } from "./references";

// ─── Continuous percentile scorer ─────────────────────────────────────────────
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
  vo2max: number;
  imtpKg: number;
  bodyWeightKg: number;
  cmjWattsPerKg: number;
  dropJumpRsi: number;
  bodyFatPct: number;
  suboptimalAsymmetries: number;
}

export type QuadrantLabel =
  | "Hybrid Elite"
  | "Strength Elite"
  | "Aerobic Foundation"
  | "Strength Foundation";

export interface QuadrantResult {
  x: number;
  y: number;
  aerobicScore: number;
  strengthScore: number;
  label: QuadrantLabel;
  insight: string;
  aerobicLabel: string;
  strengthLabel: string;
}

// ─── Body comp score (not in the DB config — derived from fat% and age/sex) ──

function bodyCompScore(fatPct: number, age: number, sex: Sex): number {
  const optimalLow  = sex === "male" ? 6  + Math.max(0, (age - 30) * 0.08) : 14 + Math.max(0, (age - 30) * 0.10);
  const optimalHigh = sex === "male" ? 14 + Math.max(0, (age - 30) * 0.08) : 24 + Math.max(0, (age - 30) * 0.10);
  const worstHigh = optimalHigh + 10;

  if (fatPct < optimalLow)  return 0.75 - Math.max(0, optimalLow - fatPct) * 0.03;
  if (fatPct <= optimalHigh) {
    const mid = (optimalLow + optimalHigh) / 2;
    return 0.90 - (Math.abs(fatPct - mid) / (optimalHigh - optimalLow)) * 0.15;
  }
  return Math.max(0.10, 0.75 - ((fatPct - optimalHigh) / (worstHigh - optimalHigh)) * 0.65);
}

// ─── Main algorithm ───────────────────────────────────────────────────────────
// cfg defaults to the hardcoded values so callers without DB config still work.

export function computeQuadrant(
  input: QuadrantInput,
  cfg: QuadrantConfig = DEFAULT_REFERENCE_CONFIG.quadrant,
): QuadrantResult {
  const { age, sex, vo2max, imtpKg, bodyWeightKg, cmjWattsPerKg, dropJumpRsi, bodyFatPct, suboptimalAsymmetries } = input;
  const { weights, strengthAnchors: sa, strengthWeights: sw } = cfg;

  // Aerobic
  const vo2Ref = getVO2Ref(age, sex);
  const aerobicScore = score(vo2max, vo2Ref.p20, vo2Ref.p40, vo2Ref.p60, vo2Ref.p80);

  // Neuromuscular
  const imtpBW     = imtpKg / bodyWeightKg;
  const imtpScore  = score(imtpBW,         sa.imtpBW.p20, sa.imtpBW.p40, sa.imtpBW.p60, sa.imtpBW.p80);
  const cmjScore   = score(cmjWattsPerKg,  sa.cmj.p20,    sa.cmj.p40,    sa.cmj.p60,    sa.cmj.p80);
  const rsiScore   = score(dropJumpRsi,    sa.rsi.p20,    sa.rsi.p40,    sa.rsi.p60,    sa.rsi.p80);
  const strengthScore = imtpScore * sw.imtp + cmjScore * sw.cmj + rsiScore * sw.rsi;

  // Body comp
  const compScore = bodyCompScore(bodyFatPct, age, sex);

  // Y axis
  const y = Math.max(0.05, Math.min(0.95,
    aerobicScore  * weights.aerobic +
    strengthScore * weights.strength +
    compScore     * weights.bodyComp -
    suboptimalAsymmetries * weights.asymPenalty,
  ));

  // X axis
  const total = aerobicScore + strengthScore;
  const x = total > 0 ? Math.max(0.05, Math.min(0.95, aerobicScore / total)) : 0.5;

  // Label + insight
  const isElite   = y >= weights.eliteThreshold;
  const isAerobic = x >= 0.5;

  const aerobicLabel  = aerobicScore  >= 0.7 ? "Elite aerobic"    : aerobicScore  >= 0.5 ? "Strong aerobic"    : aerobicScore  >= 0.3 ? "Developing aerobic"  : "Low aerobic";
  const strengthLabel = strengthScore >= 0.7 ? "Elite strength"   : strengthScore >= 0.5 ? "Strong strength"   : strengthScore >= 0.3 ? "Developing strength" : "Low strength";

  type Cfg = { label: QuadrantLabel; insight: string };
  const map: Record<string, Cfg> = {
    "true-true":  { label: "Hybrid Elite",        insight: `Your aerobic engine (VO₂ ${vo2max.toFixed(1)}) leads your profile. Translate this capacity into stronger sled pushes and sandbag carries to compete at the top of your age group.` },
    "true-false": { label: "Strength Elite",       insight: `Raw power output is your edge — IMTP and CMJ put you ahead of most competitors. Build structured Z2 aerobic volume to sustain that output across all 8 HYROX stations.` },
    "false-true": { label: "Aerobic Foundation",   insight: `Good aerobic base, with room to grow overall capacity. Prioritise strength-speed work — sled intervals, loaded carries, plyometrics — to move up the capacity axis.` },
    "false-false":{ label: "Strength Foundation",  insight: `Building phase across both axes. Increase structured aerobic volume (Z2 + threshold) while developing functional strength to unlock higher output come race day.` },
  };
  const { label, insight } = map[`${isElite}-${isAerobic}`];

  return { x, y, aerobicScore, strengthScore, label, insight, aerobicLabel, strengthLabel };
}
