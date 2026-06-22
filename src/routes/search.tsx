import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { DealCard } from "@/components/DealCard";
import { useDeals } from "@/lib/store";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search Deals — Slump" }] }),
  component: SearchPage,
});

function SearchPage() {
  const deals = useDeals();
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return deals;
    return deals.filter(
      (d) =>
        d.salon.toLowerCase().includes(t) ||
        d.area.toLowerCase().includes(t) ||
        d.service.toLowerCase().includes(t) ||
        d.category.toLowerCase().includes(t),
    );
  }, [deals, q]);

  return (
    <div className="min-h-screen bg-background pb-20 sm:pb-8">
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-6 sm:px-5">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Search</h1>
        <div className="relative mt-3">
          <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Salon, area, or service…"
            className="block w-full rounded-xl border border-border bg-card py-3 pl-10 pr-4 text-[15px] text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="mt-5 space-y-3">
          {results.map((d) => (
            <DealCard key={d.id} deal={d} />
          ))}
          {results.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center text-[14px] text-muted-foreground">
              No deals match "{q}".
            </div>
          )}
        </div>
      </main>
      <BottomNav />
    </div>
  );
}
