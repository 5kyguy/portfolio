"use client";

import { useCallback, useSyncExternalStore } from "react";
import { HiMoon, HiOutlineSun } from "react-icons/hi2";

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

  const label =
    theme === "dark" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggle}
      title={label}
      aria-label={label}
      aria-pressed={theme === "dark"}
      className="group relative inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-outline/25 bg-surface-container-low/80 text-on-background shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-surface-container-high hover:text-primary active:scale-95 dark:border-outline/20 dark:bg-surface-container/90 dark:hover:bg-surface-container-high"
    >
      <span className="relative size-[1.125rem]">
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
            theme === "dark"
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-75 opacity-0"
          }`}
          aria-hidden
        >
          <HiOutlineSun className="size-full" />
        </span>
        <span
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${
            theme === "light"
              ? "scale-100 opacity-100"
              : "pointer-events-none scale-75 opacity-0"
          }`}
          aria-hidden
        >
          <HiMoon className="size-full" />
        </span>
      </span>
    </button>
  );
}
