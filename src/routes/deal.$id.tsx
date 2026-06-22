import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Countdown } from "@/components/Countdown";
import { useDeal } from "@/lib/store";

export const Route = createFileRoute("/deal/$id")({
  component: DealDetail,
});

function DealDetail() {
  const { id } = Route.useParams();
  const deal = useDeal(id);
  const navigate = useNavigate();

  if (!deal) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="mx-auto max-w-2xl p-8 text-center">
          <p className="text-muted-foreground">Deal not found.</p>
          <Link to="/" className="mt-4 inline-block text-primary underline">
            Back to deals
          </Link>
        </div>
      </div>
    );
  }

  const discounted = Math.round(deal.originalPrice * (1 - deal.discountPct / 100));
  const savings = deal.originalPrice - discounted;

  return (
    <div className="min-h-screen bg-background pb-32">
      <Header />
      <main className="mx-auto max-w-2xl px-5">
        <Link
          to="/"
          className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          ← All deals
        </Link>

        <div className="mt-3 rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground">
          <div className="text-xs font-semibold uppercase tracking-wider opacity-90">
            Flash Deal · Ends in
          </div>
          <Countdown
            endsAt={deal.endsAt}
            className="mt-1 block font-mono text-3xl font-bold"
          />
        </div>

        <div className="mt-6">
          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-foreground">
            {deal.area}
          </span>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {deal.salon}
          </h1>
          <p className="mt-1 text-muted-foreground">{deal.service}</p>
          {deal.about && (
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {deal.about}
            </p>
          )}
        </div>

        <div className="mt-6 grid h-48 place-items-center overflow-hidden rounded-2xl border border-border bg-secondary text-sm text-muted-foreground">
          <div className="text-center">
            <div className="text-2xl">📍</div>
            <div className="mt-1 font-medium text-foreground">
              {deal.salon}
            </div>
            <div>{deal.area}, Pune</div>
          </div>
        </div>

        <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Services Menu
        </h2>
        <div className="mt-2 divide-y divide-border rounded-2xl border border-border bg-card">
          {(deal.services ?? [{ name: deal.service, price: deal.originalPrice }]).map(
            (s) => (
              <div key={s.name} className="flex items-center justify-between px-4 py-3">
                <span className="text-sm text-foreground">{s.name}</span>
                <span className="text-sm font-medium text-muted-foreground">
                  ₹{s.price}
                </span>
              </div>
            ),
          )}
        </div>

        <h2 className="mt-8 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Price Breakdown
        </h2>
        <div className="mt-2 rounded-2xl border border-border bg-card p-4">
          <Row label={deal.service} value={`₹${deal.originalPrice}`} />
          <Row
            label={`Slump discount (${deal.discountPct}%)`}
            value={`-₹${savings}`}
            accent
          />
          <div className="my-2 border-t border-border" />
          <div className="flex items-center justify-between">
            <span className="text-base font-semibold text-foreground">You pay</span>
            <span className="text-2xl font-bold text-foreground">₹{discounted}</span>
          </div>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <div className="min-w-0">
            <div className="text-[14px] text-muted-foreground">
              {deal.slotsLeft === 1 ? "Only 1 slot left!" : `${deal.slotsLeft} slots left`}
            </div>
            <div className="text-lg font-bold text-foreground">
              ₹{discounted}{" "}
              <span className="text-[14px] font-normal text-muted-foreground line-through">
                ₹{deal.originalPrice}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate({ to: "/book/$id", params: { id: deal.id } })}
            className="flex-1 max-w-[60%] rounded-2xl bg-primary px-6 py-4 text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition active:scale-[0.98] hover:opacity-90 sm:flex-initial sm:max-w-none"
          >
            Book Now →
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-1.5 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={accent ? "font-semibold text-primary" : "text-foreground"}
      >
        {value}
      </span>
    </div>
  );
}
