import { useEffect, useState } from "react";

export function Countdown({ endsAt, className }: { endsAt: number; className?: string }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, endsAt - now);
  const h = Math.floor(diff / 3_600_000);
  const m = Math.floor((diff % 3_600_000) / 60_000);
  const s = Math.floor((diff % 60_000) / 1000);
  const pad = (n: number) => String(n).padStart(2, "0");
  const expired = diff === 0;
  return (
    <span className={className}>
      {expired ? "Expired" : `${pad(h)}:${pad(m)}:${pad(s)}`}
    </span>
  );
}
