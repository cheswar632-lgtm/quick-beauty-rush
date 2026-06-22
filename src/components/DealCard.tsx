import { Link } from "@tanstack/react-router";
import { Countdown } from "./Countdown";
import type { Deal } from "@/lib/store";

export function DealCard({ deal }: { deal: Deal }) {
  const discounted = Math.round(deal.originalPrice * (1 - deal.discountPct / 100));
  return (
    <Link
      to="/deal/$id"
      params={{ id: deal.id }}
      className="block rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {deal.category}
            </span>
            <span className="text-xs text-muted-foreground">{deal.area}</span>
          </div>
          <h3 className="mt-2 truncate text-base font-semibold text-foreground">
            {deal.salon}
          </h3>
          <p className="text-sm text-muted-foreground">{deal.service}</p>
        </div>
        <div className="shrink-0 rounded-xl bg-primary px-3 py-1.5 text-sm font-bold text-primary-foreground">
          -{deal.discountPct}%
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-xs text-muted-foreground line-through">
            ₹{deal.originalPrice}
          </div>
          <div className="text-2xl font-bold text-foreground">₹{discounted}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-sm font-semibold text-primary">
            <Countdown endsAt={deal.endsAt} />
          </div>
          <div className="mt-1 inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
            {deal.slotsLeft} {deal.slotsLeft === 1 ? "slot" : "slots"} left
          </div>
        </div>
      </div>
    </Link>
  );
}
