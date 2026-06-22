import { useEffect, useState } from "react";

export function Countdown({
  endsAt,
  className,
  showDot = true,
}: {
  endsAt: number;
  className?: string;
  showDot?: boolean;
}) {
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
    <span className={"inline-flex items-center gap-1.5 " + (className ?? "")}>
      {showDot && !expired && (
        <span className="relative inline-flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      )}
      <span>{expired ? "Expired" : `${pad(h)}:${pad(m)}:${pad(s)}`}</span>
    </span>
  );
}
