import { QuadrantChart } from "./QuadrantChart";
import { BenchmarkSlider } from "./BenchmarkSlider";
import { FunctionalScores } from "./FunctionalScores";
import { RetestCard } from "./RetestCard";
import { benchmarks } from "@/data/athlete";

export function OverviewTab() {
  const bodyComp = benchmarks.find((b) => b.eyebrow === "BODY COMPOSITION") ?? benchmarks[0];
  const vo2 = benchmarks.find((b) => b.eyebrow === "AEROBIC CAPACITY");
  return (
    <div className="space-y-4 px-5 pb-8 pt-2">
      <QuadrantChart />
      <BenchmarkSlider {...bodyComp} />
      {vo2 ? <BenchmarkSlider {...vo2} /> : null}
      <FunctionalScores />
      <RetestCard />
    </div>
  );
}