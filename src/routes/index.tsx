import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProfileHeader } from "@/components/hybrid/ProfileHeader";
import { TabBar } from "@/components/hybrid/TabBar";
import { OverviewTab } from "@/components/hybrid/OverviewTab";
import { TrainTab } from "@/components/hybrid/TrainTab";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hybrid Protocol — Vital Insights" },
      { name: "description", content: "HYROX-focused athlete dashboard by Vital Insights." },
      { property: "og:title", content: "Hybrid Protocol — Vital Insights" },
      { property: "og:description", content: "HYROX-focused athlete dashboard by Vital Insights." },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [tab, setTab] = useState<"overview" | "train">("train");
  return (
    <main className="min-h-screen bg-background">
      <ProfileHeader />
      <TabBar value={tab} onChange={setTab} />
      <div className="animate-in fade-in duration-200">
        {tab === "overview" ? <OverviewTab /> : <TrainTab />}
      </div>
    </main>
  );
}