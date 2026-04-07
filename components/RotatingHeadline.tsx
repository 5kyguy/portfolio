"use client";

import { useEffect, useMemo, useState } from "react";

type RotatingHeadlineProps = {
  className?: string;
  words: string[];
};

export function RotatingHeadline({ className = "", words }: RotatingHeadlineProps) {
  const cleaned = useMemo(
    () =>
      words
        .map((w) => w.trim().replace(/^Code is\s+/i, "").replace(/\.$/, ""))
        .filter(Boolean),
    [words],
  );

  const variants = cleaned.length >= 3 ? cleaned.slice(0, 3) : ["Law", "Speech", "Freedom"];
  /** Enough ch width for longest word + period; italic needs a little extra. */
  const slotMinCh = Math.max(...variants.map((w) => w.length + 1), 4) + 0.75;
  const [index, setIndex] = useState(0);
  const [tilted, setTilted] = useState(false);

  useEffect(() => {
    if (variants.length < 2) return;
    let timeoutId: number | null = null;

    const id = window.setInterval(() => {
      setTilted(true);
      timeoutId = window.setTimeout(() => {
        setIndex((prev) => (prev + 1) % variants.length);
        setTilted(false);
      }, 260);
    }, 2200);

    return () => {
      window.clearInterval(id);
      if (timeoutId !== null) window.clearTimeout(timeoutId);
    };
  }, [variants.length]);

  return (
    <h1 className={`inline-flex items-end gap-x-[0.2em] whitespace-nowrap leading-none ${className}`}>
      <span className="shrink-0 leading-none">Code is</span>
      <span
        className="relative inline-flex h-[1em] overflow-visible px-[0.08em] align-baseline"
        style={{ minWidth: `${slotMinCh}ch` }}
      >
        <span
          className="absolute inset-0 inline-flex items-end justify-start italic text leading-none [-webkit-backface-visibility:hidden] [backface-visibility:hidden] transition-[transform,opacity] duration-300 ease-out [transform-origin:center]"
          style={{
            transform: tilted ? "rotateX(90deg)" : "rotateX(0deg)",
            opacity: tilted ? 0 : 1,
          }}
        >
          {variants[index]}.
        </span>
      </span>
    </h1>
  );
}
