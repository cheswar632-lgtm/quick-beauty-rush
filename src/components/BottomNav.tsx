import { Link } from "@tanstack/react-router";
import { Home, Search, Plus } from "lucide-react";

export function BottomNav() {
  const tabs = [
    { to: "/", label: "Home", Icon: Home },
    { to: "/search", label: "Search", Icon: Search },
    { to: "/dashboard", label: "Post Deal", Icon: Plus },
  ] as const;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur sm:hidden">
      <ul className="mx-auto flex max-w-2xl items-stretch justify-around">
        {tabs.map(({ to, label, Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              className="flex flex-col items-center gap-0.5 px-3 py-2.5 text-[14px] font-medium text-muted-foreground"
              activeProps={{ className: "flex flex-col items-center gap-0.5 px-3 py-2.5 text-[14px] font-semibold text-primary" }}
              activeOptions={{ exact: true }}
            >
              <Icon size={22} />
              <span>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
