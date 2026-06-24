import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProfileHeader } from "@/components/hybrid/ProfileHeader";
import { TabBar } from "@/components/hybrid/TabBar";
import { OverviewTab } from "@/components/hybrid/OverviewTab";
import { TrainTab } from "@/components/hybrid/TrainTab";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Athlete Profile — Hybrid Protocol" },
      { name: "description", content: "Your HYROX athlete profile, benchmarks and weekly training plan." },
      { property: "og:title", content: "Athlete Profile — Hybrid Protocol" },
      { property: "og:description", content: "Your HYROX athlete profile, benchmarks and weekly training plan." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [tab, setTab] = useState<"overview" | "train">("overview");
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