import { Link } from "@tanstack/react-router";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-black">
            S
          </span>
          <span className="text-lg font-bold tracking-tight text-foreground">
            Slump
          </span>
        </Link>
        <nav className="flex items-center gap-1 text-sm font-medium">
          <Link
            to="/dashboard"
            className="rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "rounded-lg px-3 py-1.5 bg-secondary text-foreground" }}
          >
            For Salons
          </Link>
          <Link
            to="/about"
            className="rounded-lg px-3 py-1.5 text-muted-foreground hover:bg-secondary hover:text-foreground"
            activeProps={{ className: "rounded-lg px-3 py-1.5 bg-secondary text-foreground" }}
          >
            About
          </Link>
        </nav>
      </div>
    </header>
  );
}
