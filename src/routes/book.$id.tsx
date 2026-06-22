import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { dealStore, useDeal } from "@/lib/store";

export const Route = createFileRoute("/book/$id")({
  component: Book,
});

const SLOTS = ["In 30 min", "In 1 hour", "In 1.5 hours", "In 2 hours"];

function Book() {
  const { id } = Route.useParams();
  const deal = useDeal(id);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingId, setBookingId] = useState<string | null>(null);

  if (!deal) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-8 text-center">
          <Link to="/" className="text-primary underline">
            Back to deals
          </Link>
        </div>
      </div>
    );
  }

  const discounted = Math.round(deal.originalPrice * (1 - deal.discountPct / 100));

  const confirm = () => {
    const newId = dealStore.addBooking({ dealId: deal.id, name, phone, time });
    setBookingId(newId);
    setStep(3);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-5 py-6">
        <div className="mb-6 flex items-center gap-2">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={
                "h-1.5 flex-1 rounded-full " +
                (n <= step ? "bg-primary" : "bg-secondary")
              }
            />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Booking
          </div>
          <div className="mt-1 font-semibold text-foreground">{deal.salon}</div>
          <div className="text-sm text-muted-foreground">
            {deal.service} · {deal.area}
          </div>
          <div className="mt-2 text-lg font-bold text-primary">₹{discounted}</div>
        </div>

        {step === 1 && (
          <section className="mt-6">
            <h2 className="text-xl font-bold text-foreground">Pick a time slot</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              All slots available within the deal window.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {SLOTS.map((s) => (
                <button
                  key={s}
                  onClick={() => setTime(s)}
                  className={
                    "rounded-xl border px-4 py-4 text-sm font-medium transition " +
                    (time === s
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-border bg-card text-foreground hover:border-primary/40")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
            <button
              disabled={!time}
              onClick={() => setStep(2)}
              className="mt-6 w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:opacity-90 disabled:opacity-40"
            >
              Continue
            </button>
          </section>
        )}

        {step === 2 && (
          <section className="mt-6">
            <h2 className="text-xl font-bold text-foreground">Your details</h2>
            <div className="mt-4 space-y-3">
              <Field
                label="Full name"
                value={name}
                onChange={setName}
                placeholder="Aarav Kulkarni"
              />
              <Field
                label="Phone number"
                value={phone}
                onChange={setPhone}
                placeholder="+91 98XXX XXXXX"
                inputMode="tel"
              />
            </div>
            <div className="mt-6 flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="flex-1 rounded-xl border border-border bg-card py-3.5 font-semibold text-foreground"
              >
                Back
              </button>
              <button
                disabled={!name || phone.length < 6}
                onClick={confirm}
                className="flex-[2] rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:opacity-90 disabled:opacity-40"
              >
                Confirm Booking
              </button>
            </div>
          </section>
        )}

        {step === 3 && bookingId && (
          <section className="mt-8 text-center">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary/10 text-3xl">
              ✨
            </div>
            <h2 className="mt-4 text-2xl font-bold text-foreground">
              You're booked!
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              We've sent the details to {phone}.
            </p>
            <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-border bg-card p-5 text-left">
              <Detail label="Booking ID" value={bookingId} mono />
              <Detail label="Salon" value={deal.salon} />
              <Detail label="Service" value={deal.service} />
              <Detail label="Time" value={time} />
              <Detail label="Guest" value={name} />
              <div className="my-3 border-t border-border" />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Amount due at salon</span>
                <span className="text-lg font-bold text-foreground">₹{discounted}</span>
              </div>
            </div>
            <button
              onClick={() => navigate({ to: "/" })}
              className="mt-6 rounded-xl bg-primary px-8 py-3 font-semibold text-primary-foreground"
            >
              Back to deals
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  inputMode,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "text" | "tel";
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        inputMode={inputMode}
        className="mt-1 block w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function Detail({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={
          "text-sm font-semibold text-foreground " + (mono ? "font-mono" : "")
        }
      >
        {value}
      </span>
    </div>
  );
}
