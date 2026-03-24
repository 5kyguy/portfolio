"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "Homepage" },
  { href: "/me", label: "Me" },
  { href: "/experiences", label: "Experiences" },
  { href: "/projects", label: "Projects" },
  { href: "/other-works", label: "Other Works" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-outline-variant/40 bg-background/70 backdrop-blur-xl transition-opacity duration-150">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-8">
        <Link
          href="/"
          className="font-headline text-2xl font-light tracking-tight text-on-background italic"
        >
          The Archives
        </Link>
        <div className="hidden items-center gap-8 md:flex md:gap-12">
          {links.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                className={
                  active
                    ? "font-headline border-b border-primary pb-1 font-normal tracking-tight text-on-background transition-all duration-300"
                    : "font-headline font-light tracking-tight text-on-surface-variant transition-colors duration-300 hover:text-on-background"
                }
              >
                {label}
              </Link>
            );
          })}
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
