const BASE = import.meta.env.VITE_OW_BASE_URL ?? "https://open-wearables-platform-production.up.railway.app/api/v1";
const KEY  = import.meta.env.VITE_OW_API_KEY as string;
const H    = { "X-Open-Wearables-API-Key": KEY };

export interface VIProfile {
  name: string | null;
  age: number | null;
  sex: "male" | "female" | null;
  dob: string | null;
  height_cm: number | null;
  weight_kg: number | null;
  last_tested: string | null;
}

export interface VIDexa {
  date: string | null;
  fat_pct: number | null;
  almi: number | null;
  ffmi: number | null;
  lean_mass_g: number | null;
  fat_mass_g: number | null;
  bmc_g: number | null;
  visceral_fat_score: number | null;
  arm_asymmetry_pct: number | null;
  leg_asymmetry_pct: number | null;
  arm_left_lean_g: number;
  arm_right_lean_g: number;
  leg_left_lean_g: number;
  leg_right_lean_g: number;
  body_composition_zone: string | null;
  zone_description: string | null;
  fracture_risk: number | null;
  t_score: string | null;
  z_score: string | null;
  ag_ratio: number | null;
  pdf_url: string | null;
  fat_description: string | null;
  fracture_description: string | null;
}

export interface VIStrength {
  imtp_kg: number | null;
  cmj_watts_per_kg: number | null;
  drop_jump_rsi: number | null;
  grip_left_kg: number | null;
  grip_right_kg: number | null;
}

export interface VIData {
  profile: VIProfile;
  dexa: VIDexa | null;
  vo2max: number | null;
  strength: VIStrength | null;
}

export interface AthleteProfile {
  id: string;
  name: string;
  phone: string | null;
  sukra_order_id: string | null;
  access_granted: boolean;
  vi: VIData | null;
}

export async function fetchAthleteProfile(athleteId: string): Promise<AthleteProfile> {
  const res = await fetch(`${BASE}/bond/athletes/${athleteId}/vi-profile`, { headers: H });
  if (!res.ok) throw new Error(`athlete profile ${res.status}`);
  return res.json();
}
