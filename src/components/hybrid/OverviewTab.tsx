import { QuadrantChart } from "./QuadrantChart";
import { BenchmarkSlider } from "./BenchmarkSlider";
import { FunctionalScores } from "./FunctionalScores";
import { RetestCard } from "./RetestCard";
import { benchmarks } from "@/data/athlete";

export function OverviewTab() {
  return (
    <div className="space-y-4 px-5 pb-8 pt-2">
      <QuadrantChart />
      {benchmarks.map((b) => (
        <BenchmarkSlider key={b.label} {...b} />
      ))}
      <FunctionalScores />
      <RetestCard />
    </div>
  );
}