import type { ReferenceConfig } from "@/lib/references";

const BASE = "https://open-wearables-platform-production.up.railway.app/api/v1";
const KEY  = "sk-7bfb062041b3ca4e8ab97fbe87dd198e";

export async function fetchReferenceConfig(): Promise<ReferenceConfig | null> {
  const res = await fetch(`${BASE}/bond/reference-config`, {
    headers: { "X-Open-Wearables-API-Key": KEY },
  });
  if (!res.ok) return null;
  const data = await res.json();
  // Empty object means the seed hasn't run yet — caller will use defaults
  if (!data || !data.vo2Refs) return null;
  return data as ReferenceConfig;
}
