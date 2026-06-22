import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Eye } from "lucide-react";
import { Countdown } from "./Countdown";
import type { Deal } from "@/lib/store";

export function DealCard({ deal }: { deal: Deal }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30000);
    return () => clearInterval(t);
  }, []);

  const discounted = Math.round(deal.originalPrice * (1 - deal.discountPct / 100));
  const lastOne = deal.slotsLeft === 1;
  const endingSoon = deal.endsAt > now && deal.endsAt - now < 30 * 60 * 1000;
  const views = useMemo(() => 12 + Math.floor(Math.random() * 36), [deal.id]);

  return (
    <Link
      to="/deal/$id"
      params={{ id: deal.id }}
      className={
        "block w-full rounded-2xl bg-card p-5 shadow-sm transition active:scale-[0.99] hover:-translate-y-0.5 hover:shadow-lg " +
        (endingSoon
          ? "border-2 border-red-500"
          : "border border-border")
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[14px] font-semibold text-primary">
              {deal.category}
            </span>
            {endingSoon && (
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-[14px] font-semibold text-red-700">
                Ending soon!
              </span>
            )}
            <span className="text-[14px] text-muted-foreground">{deal.area}</span>
          </div>
          <h3 className="mt-2 truncate text-base font-semibold text-foreground">
            {deal.salon}
          </h3>
          <p className="text-[14px] text-muted-foreground">{deal.service}</p>
        </div>
        <div className="shrink-0 rounded-xl bg-primary px-3 py-1.5 text-[14px] font-bold text-primary-foreground">
          -{deal.discountPct}%
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[14px] text-muted-foreground line-through">
            ₹{deal.originalPrice}
          </div>
          <div className="text-2xl font-bold text-foreground">₹{discounted}</div>
        </div>
        <div className="text-right">
          <div className="font-mono text-[14px] font-semibold text-primary">
            <Countdown endsAt={deal.endsAt} />
          </div>
          <div
            className={
              "mt-1 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[14px] font-medium " +
              (lastOne
                ? "bg-red-100 text-red-700"
                : "bg-amber-50 text-amber-700")
            }
          >
            <span
              className={
                "h-1.5 w-1.5 animate-pulse rounded-full " +
                (lastOne ? "bg-red-500" : "bg-amber-500")
              }
            />
            {lastOne ? "Only 1 left!" : `${deal.slotsLeft} slots left`}
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-1.5 text-[14px] text-muted-foreground">
        <Eye size={14} />
        <span>{views} people viewed this today</span>
      </div>
    </Link>
  );
}
