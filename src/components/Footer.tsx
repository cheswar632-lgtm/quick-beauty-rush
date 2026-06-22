import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 py-6 text-[14px] text-muted-foreground">
        <Link to="/about" className="hover:text-foreground">
          About
        </Link>
        <span className="hidden sm:inline text-border">|</span>
        <Link to="/about" className="hover:text-foreground">
          How it works
        </Link>
        <span className="hidden sm:inline text-border">|</span>
        <Link to="/dashboard" className="hover:text-foreground">
          For Salons
        </Link>
        <span className="hidden sm:inline text-border">|</span>
        <a href="mailto:hello@slump.in" className="hover:text-foreground">
          Contact
        </a>
      </div>
    </footer>
  );
}
