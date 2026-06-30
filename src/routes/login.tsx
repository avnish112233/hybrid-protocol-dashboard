import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Hybrid Protocol" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const valid = /^\d{10}$/.test(phone);

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
            Sign in<span>.</span>
          </h1>
          <p className="mt-2 text-[11px] uppercase tracking-[0.2em] opacity-75">
            Enter your mobile number to continue
          </p>
        </div>
      </header>

      <form
        className="space-y-5 px-6 pt-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (!valid) {
            setErr("Enter a valid 10-digit number");
            return;
          }
          navigate({ to: "/verify", search: { phone: `${code} ${phone}` } });
        }}
      >
        <label className="block">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Mobile number
          </span>
          <div className="mt-2 flex items-stretch gap-2">
            <select
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="rounded-xl border border-[var(--card-border)] bg-card px-3 text-sm font-medium tabular-nums"
            >
              <option value="+91">+91</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
              <option value="+971">+971</option>
              <option value="+65">+65</option>
            </select>
            <input
              type="tel"
              inputMode="numeric"
              autoFocus
              maxLength={10}
              value={phone}
              onChange={(e) => {
                setErr(null);
                setPhone(e.target.value.replace(/\D/g, ""));
              }}
              placeholder="98765 43210"
              className="flex-1 rounded-xl border border-[var(--card-border)] bg-card px-4 py-3 text-base tabular-nums outline-none focus:border-foreground/40"
            />
          </div>
          {err && <p className="mt-2 text-xs text-[color:var(--status-suboptimal)]">{err}</p>}
        </label>

        <button
          type="submit"
          disabled={!valid}
          className="w-full rounded-xl px-4 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] transition-opacity disabled:opacity-40"
          style={{ background: "var(--hyrox-black)", color: "var(--hyrox-yellow)" }}
        >
          Send OTP
        </button>

        <p className="text-center text-[11px] text-muted-foreground">
          By continuing you agree to Vital Insights' Terms & Privacy.
        </p>
      </form>
    </main>
  );
}