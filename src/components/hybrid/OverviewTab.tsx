import { QuadrantChart } from "./QuadrantChart";
import { BenchmarkSlider } from "./BenchmarkSlider";
import { FunctionalScores } from "./FunctionalScores";
import { InsightsCard } from "./InsightsCard";
import { RetestCard } from "./RetestCard";
import { benchmarks } from "@/data/athlete";

export function OverviewTab() {
  const bodyComp = benchmarks.find((b) => b.eyebrow === "BODY COMPOSITION") ?? benchmarks[0];
  return (
    <div className="space-y-4 px-5 pb-8 pt-2">
      <QuadrantChart />
      <BenchmarkSlider {...bodyComp} />
      <FunctionalScores />
      <InsightsCard />
      <RetestCard />
    </div>
  );
}