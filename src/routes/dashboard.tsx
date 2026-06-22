import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { dealStore, type Category } from "@/lib/store";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Salon Dashboard — Slump" }] }),
  component: Dashboard,
});

const CATEGORIES: Category[] = ["Hair", "Skin", "Nails", "Bridal"];

function Dashboard() {
  const navigate = useNavigate();
  const [salon, setSalon] = useState("");
  const [area, setArea] = useState("Koregaon Park");
  const [service, setService] = useState("");
  const [category, setCategory] = useState<Category>("Hair");
  const [original, setOriginal] = useState("1500");
  const [discount, setDiscount] = useState("40");
  const [slots, setSlots] = useState("3");
  const [duration, setDuration] = useState("120");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dealStore.addDeal({
      salon,
      area,
      service,
      category,
      originalPrice: Number(original),
      discountPct: Number(discount),
      slotsLeft: Number(slots),
      endsAt: Date.now() + Number(duration) * 60_000,
    });
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-5 py-8">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">
          For Salon Owners
        </div>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground">
          Post a Flash Deal
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Got an empty chair this afternoon? Drop a flash deal and fill it
          in minutes.
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          <Input label="Salon name" value={salon} onChange={setSalon} placeholder="Luxe Hair Studio" required />
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Area"
              value={area}
              onChange={setArea}
              options={["Koregaon Park", "Baner", "Viman Nagar", "Kothrud", "Aundh", "Kalyani Nagar"]}
            />
            <Select
              label="Service type"
              value={category}
              onChange={(v) => setCategory(v as Category)}
              options={CATEGORIES}
            />
          </div>
          <Input
            label="Service name"
            value={service}
            onChange={setService}
            placeholder="Hydra Facial"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <Input label="Original price (₹)" value={original} onChange={setOriginal} type="number" required />
            <Input label="Discount %" value={discount} onChange={setDiscount} type="number" required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Slots available" value={slots} onChange={setSlots} type="number" required />
            <Input label="Deal duration (min)" value={duration} onChange={setDuration} type="number" required />
          </div>

          <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-4 text-sm">
            <div className="text-muted-foreground">Customer pays</div>
            <div className="text-2xl font-bold text-primary">
              ₹
              {Math.round(
                Number(original || 0) * (1 - Number(discount || 0) / 100),
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-xl bg-primary py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/30 transition hover:opacity-90"
          >
            Go Live Now →
          </button>
        </form>
      </main>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <input
        value={value}
        type={type}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 block w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </label>
  );
}

function Select({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
