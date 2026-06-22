import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { DealCard } from "@/components/DealCard";
import { Footer } from "@/components/Footer";
import { useDeals, type Category } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Slump — Flash Beauty Deals in Pune" },
      {
        name: "description",
        content:
          "Live flash deals from Pune's top salons. 35–50% off when there's a slump in their bookings. Book instantly.",
      },
      { property: "og:title", content: "Slump — Flash Beauty Deals in Pune" },
      {
        property: "og:description",
        content: "Live 2-hour flash deals from Pune's top salons. Up to 50% off.",
      },
    ],
  }),
  component: Home,
});

const FILTERS = ["All", "Hair", "Skin", "Nails", "Bridal"] as const;
type Filter = (typeof FILTERS)[number];

function Home() {
  const deals = useDeals();
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () =>
      filter === "All"
        ? deals
        : deals.filter((d) => d.category === (filter as Category)),
    [deals, filter],
  );

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-8">
      <Header />
      <main className="mx-auto max-w-2xl px-5 pb-16">
        <div className="mt-4 rounded-2xl bg-primary px-5 py-4 text-primary-foreground shadow-lg shadow-primary/20">
          <div className="text-[14px] font-semibold uppercase tracking-wider opacity-90">
            LIVE DEALS IN PUNE
          </div>
          <div className="mt-1 text-base font-medium">
            Save up to 50% at luxury salons today only
          </div>
        </div>

        <section className="pt-8 pb-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Live in Pune
          </div>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
            Last-minute beauty,
            <br />
            <span className="text-primary">half the price.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Premium salons drop flash deals when they're slow. Grab them before
            the timer runs out.
          </p>
        </section>

        <div className="sticky top-[57px] z-30 -mx-5 mb-4 bg-background/90 px-5 py-2 backdrop-blur">
          <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={
                  "shrink-0 rounded-full border px-4 py-1.5 text-sm font-medium transition " +
                  (filter === f
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40")
                }
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {filtered.map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
          {filtered.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
              No live deals in this category right now. Check back soon.
            </div>
          )}
        </div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
