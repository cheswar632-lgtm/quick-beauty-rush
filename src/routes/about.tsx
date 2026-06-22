import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Slump — Flash Beauty Deals" },
      {
        name: "description",
        content:
          "Slump is a flash-deal marketplace turning Pune salons' dead hours into your next great appointment.",
      },
    ],
  }),
  component: About,
});

function About() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-2xl px-5 py-10">
        <div className="text-xs font-semibold uppercase tracking-wider text-primary">
          Our Story
        </div>
        <h1 className="mt-1 text-4xl font-bold tracking-tight text-foreground">
          Beauty,{" "}
          <span className="text-primary">on flash sale.</span>
        </h1>

        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          Every salon in Pune has them — quiet Tuesday afternoons, empty chairs
          between appointments, that lull before the weekend rush. We call those
          slumps.
        </p>
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">
          Slump turns those quiet hours into a live marketplace. Premium salons
          across Koregaon Park, Baner, Viman Nagar and beyond drop two-hour
          flash deals at <span className="font-semibold text-foreground">35–50% off</span>.
          You see them in real time. You book in three taps. The chair gets
          filled, you get a steal — everyone wins.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-3">
          <Stat n="50+" label="Partner salons" />
          <Stat n="2hr" label="Deal window" />
          <Stat n="50%" label="Average savings" />
        </div>

        <h2 className="mt-12 text-xl font-bold text-foreground">How it works</h2>
        <ol className="mt-3 space-y-3">
          <Step
            n={1}
            title="Salons go live"
            text="When a salon has open slots, they post a flash deal active for the next two hours."
          />
          <Step
            n={2}
            title="You see it instantly"
            text="Browse a live feed of deals near you, filtered by hair, skin, nails or bridal."
          />
          <Step
            n={3}
            title="Book in three taps"
            text="Pick a slot, drop your details, walk in. No prepayment, no hassle."
          />
        </ol>

        <div className="mt-12 rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-6 text-primary-foreground">
          <div className="text-sm font-semibold uppercase tracking-wider opacity-90">
            Run a salon?
          </div>
          <h3 className="mt-1 text-2xl font-bold">Fill your slow hours.</h3>
          <p className="mt-1 text-sm opacity-90">
            List your first flash deal in under a minute. No setup fees.
          </p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block rounded-xl bg-background px-5 py-2.5 text-sm font-semibold text-primary"
          >
            Post a deal →
          </Link>
        </div>
      </main>
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 text-center">
      <div className="text-2xl font-bold text-primary">{n}</div>
      <div className="mt-1 text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Step({ n, title, text }: { n: number; title: string; text: string }) {
  return (
    <li className="flex gap-3 rounded-2xl border border-border bg-card p-4">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {n}
      </div>
      <div>
        <div className="font-semibold text-foreground">{title}</div>
        <div className="mt-0.5 text-sm text-muted-foreground">{text}</div>
      </div>
    </li>
  );
}
