"use client";

import { useCallback, useSyncExternalStore } from "react";

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

function subscribeTheme(callback: () => void) {
  const el = document.documentElement;
  const obs = new MutationObserver(callback);
  obs.observe(el, { attributes: true, attributeFilter: ["class"] });
  return () => obs.disconnect();
}

function getThemeSnapshot(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerThemeSnapshot(): Theme {
  return "dark";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    applyThemeDom(next);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={toggle}
      title={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="inline-flex cursor-pointer items-center justify-center text-primary transition-all duration-300 hover:text-on-background active:scale-95"
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      aria-pressed={theme === "dark"}
    >
      <span className="material-symbols-outlined text-[1.25rem]">contrast</span>
    </button>
  );
}
