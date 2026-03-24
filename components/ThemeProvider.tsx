"use client";

import { useLayoutEffect, type ReactNode } from "react";

const STORAGE_KEY = "portfolio-theme";

/** Keep localStorage aligned with the server-rendered <html> theme class. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  useLayoutEffect(() => {
    try {
      const domDark = document.documentElement.classList.contains("dark");
      localStorage.setItem(STORAGE_KEY, domDark ? "dark" : "light");
    } catch {
      /* ignore */
    }
  }, []);

  return children;
}
