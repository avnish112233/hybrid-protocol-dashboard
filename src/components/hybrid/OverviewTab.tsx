import { QuadrantChart } from "./QuadrantChart";
import { BenchmarkSlider } from "./BenchmarkSlider";
import { FunctionalScores } from "./FunctionalScores";
import { RetestCard } from "./RetestCard";
import { useReferenceConfig } from "@/hooks/useReferenceConfig";
import { useAthleteProfile } from "@/hooks/useAthleteProfile";
import { getVO2Ref, getFatPctRef, getAlmiRef } from "@/lib/references";

export function OverviewTab() {
  const config  = useReferenceConfig();
  const { data: profile } = useAthleteProfile();

  const vi   = profile?.vi;
  const age  = vi?.profile.age  ?? 40;
  const sex  = vi?.profile.sex  ?? "female";

  const fatRef  = getFatPctRef(age, sex, config.fatPctRefs);
  const almiRef = getAlmiRef(age, sex, config.almiRefs);
  const vo2Ref  = getVO2Ref(age, sex, config.vo2Refs);

  const fatPct  = vi?.dexa?.fat_pct  ?? null;
  const almi    = vi?.dexa?.almi     ?? null;
  const vo2max  = vi?.vo2max         ?? null;

  const sliders = [
    ...(fatPct != null ? [{
      eyebrow: "BODY COMPOSITION",
      label: "FAT %",
      value: fatPct,
      unit: "%",
      benchmarkLow:  fatRef.optimalLow,
      benchmarkHigh: fatRef.optimalHigh,
      min: Math.max(0, fatRef.normalLow - 2),
      max: fatRef.normalHigh + 5,
    }] : []),
    ...(almi != null ? [{
      eyebrow: "LEAN MASS",
      label: "ALMI",
      value: almi,
      unit: "kg/m²",
      benchmarkLow:  almiRef.optimalLow,
      benchmarkHigh: almiRef.optimalHigh,
      min: Math.max(4, almiRef.normalLow - 1),
      max: almiRef.normalHigh + 1,
    }] : []),
    ...(vo2max != null ? [{
      eyebrow: "AEROBIC CAPACITY",
      label: "VO2 MAX",
      value: vo2max,
      unit: "ml/min/kg",
      benchmarkLow:  vo2Ref.p60,
      benchmarkHigh: vo2Ref.p80,
      min: Math.max(20, vo2Ref.p20 - 5),
      max: vo2Ref.p80 + 15,
    }] : []),
  ];

  return (
    <div className="space-y-5 px-5 pb-8 pt-2">
      <QuadrantChart />
      {sliders.map((s) => (
        <BenchmarkSlider
          key={s.label}
          {...s}
          direction={s.label === "VO2 MAX" ? "sequential" : "symmetric"}
        />
      ))}
      {sliders.length === 0 && (
        <p className="text-center text-sm text-muted-foreground py-4">
          Diagnostic results pending — contact your coach to schedule a test session.
        </p>
      )}
      <FunctionalScores />
      <RetestCard />
    </div>
  );
}
