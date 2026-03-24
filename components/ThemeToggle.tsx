"use client";

import { useCallback, useLayoutEffect, useState } from "react";
import { ThemeGlyph } from "@/components/icons/ThemeGlyph";

const STORAGE_KEY = "portfolio-theme";

type Theme = "dark" | "light";

function applyThemeDom(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove("dark", "light");
  root.classList.add(theme === "dark" ? "dark" : "light");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
    document.cookie = `portfolio-theme=${theme}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    /* ignore */
  }
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");

  useLayoutEffect(() => {
    const t = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(t);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      applyThemeDom(next);
      return next;
    });
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      title={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="inline-flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-outline-variant/40 bg-transparent p-0 text-primary transition-colors hover:bg-surface-container/60 hover:text-on-background focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none active:scale-95"
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      aria-pressed={theme === "dark"}
    >
      <ThemeGlyph mode={theme} className="size-6 shrink-0" />
    </button>
  );
}
