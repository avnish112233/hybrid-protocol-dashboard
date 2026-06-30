import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { z } from "zod";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { signIn } from "@/hooks/useAuth";

const search = z.object({ phone: z.string().optional() });

export const Route = createFileRoute("/verify")({
  validateSearch: search,
  head: () => ({ meta: [{ title: "Verify — Hybrid Protocol" }] }),
  component: VerifyPage,
});

function VerifyPage() {
  const navigate = useNavigate();
  const { phone } = Route.useSearch();
  const [otp, setOtp] = useState("");
  const valid = otp.length === 6;

  return (
    <main className="min-h-screen bg-background">
      <header
        className="relative overflow-hidden px-6 py-8"
        style={{ background: "var(--hyrox-black)", color: "var(--hyrox-yellow)" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.18]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, var(--hyrox-yellow) 0 14px, transparent 14px 32px)",
          }}
        />
        <div className="relative">
          <div className="text-[10px] font-semibold uppercase tracking-[0.32em]">Vital Insights</div>
          <h1
            className="mt-2 text-3xl uppercase leading-[0.95] tracking-[-0.02em]"
            style={{ fontFamily: "var(--font-display)", fontWeight: 800 }}
          >
            Verify<span>.</span>
          </h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] opacity-75">
            6-digit code sent to {phone ?? "your phone"}
          </p>
        </div>
      </header>

      <form
        className="space-y-6 px-6 pt-10"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) return;
          signIn(phone ?? "");
          navigate({ to: "/" });
        }}
      >
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <InputOTPSlot key={i} index={i} className="h-12 w-12 text-lg" />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          type="submit"
          disabled={!valid}
          className="w-full rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition-opacity disabled:opacity-40"
          style={{ background: "var(--hyrox-black)", color: "var(--hyrox-yellow)" }}
        >
          Verify & continue
        </button>

        <div className="flex items-center justify-between text-[11px] text-muted-foreground">
          <Link to="/login" className="underline">Change number</Link>
          <button type="button" className="underline" onClick={() => setOtp("")}>
            Resend code
          </button>
        </div>
      </form>
    </main>
  );
}