import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function BannerScreen() {
  return (
    <Link
      to="/profile"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden text-foreground"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #F7F7F9 55%, #F2F2F7 100%)",
      }}
    >
      <header className="relative z-10 flex items-center gap-2 px-6 pt-14">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
          Vital Insights
        </span>
      </header>

      <div className="relative z-10 px-6">
        <h1
          className="text-[64px] leading-[0.95] tracking-[-0.04em] text-foreground sm:text-[80px]"
          style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
        >
          Hybrid<br />
          <span style={{ fontWeight: 500 }}>Protocol<span className="text-primary">.</span></span>
        </h1>
        <p className="mt-5 max-w-xs text-base font-normal text-muted-foreground">
          Your HYROX performance profile, recalculated as you train.
        </p>
      </div>

      <footer className="relative z-10 px-6 pb-12">
        <div className="flex items-center justify-between rounded-full bg-foreground/[0.04] px-5 py-4 backdrop-blur">
          <span className="text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            Tap to enter
          </span>
          <span className="grid h-9 w-9 place-items-center rounded-full bg-foreground text-background">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </footer>
    </Link>
  );
}