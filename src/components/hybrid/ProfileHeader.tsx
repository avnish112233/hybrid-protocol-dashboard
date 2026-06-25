import { ChevronLeft } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { retest } from "@/data/athlete";

export function ProfileHeader() {
  return (
    <header
      className="relative px-5 pb-6 pt-5"
      style={{ background: "var(--gradient-header)" }}
    >
      <Link
        to="/"
        className="grid h-9 w-9 place-items-center rounded-full bg-card/80 text-foreground shadow-[var(--shadow-soft)] backdrop-blur"
        aria-label="Back"
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>
      <div className="mt-3 text-center">
        <h1
          className="text-2xl leading-tight tracking-tight text-foreground"
          style={{ fontFamily: "var(--font-display)", fontWeight: 600 }}
        >
          Hybrid Protocol
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Last updated on · {retest.lastTested}
        </p>
      </div>
    </header>
  );
}