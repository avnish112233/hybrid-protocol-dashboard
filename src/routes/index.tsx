import { createFileRoute } from "@tanstack/react-router";
import { BannerScreen } from "@/components/hybrid/BannerScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hybrid Protocol — Vital Insights" },
      { name: "description", content: "HYROX-focused athlete dashboard by Vital Insights. Built for a Champion." },
      { property: "og:title", content: "Hybrid Protocol — Vital Insights" },
      { property: "og:description", content: "HYROX-focused athlete dashboard by Vital Insights." },
    ],
  }),
  component: BannerScreen,
});
