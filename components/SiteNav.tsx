"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TypewriterName } from "@/components/TypewriterName";

const links = [
  { href: "/journey", label: "My Journey" },
  { href: "/projects", label: "Projects" },
  { href: "/other-works", label: "Other Works" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-background/70 px-6 py-6 backdrop-blur-xl md:px-12">
      <Link
        href="/"
        className="font-headline text-2xl font-light tracking-tight text-on-background italic"
      >
        <TypewriterName />
      </Link>
      <div className="hidden items-center space-x-10 font-headline font-light tracking-tight md:flex md:space-x-12">
        {links.map(({ href, label }) => {
          const active =
            pathname === href || pathname.startsWith(`${href}/`);
          return (
            <Link
              key={href}
              href={href}
              className={
                active
                  ? "border-b border-primary pb-1 text-on-background transition-all duration-300"
                  : "text-on-surface-variant transition-colors duration-300 hover:text-on-background"
              }
            >
              {label}
            </Link>
          );
        })}
      </div>
      <div className="flex shrink-0 items-center">
        <ThemeToggle />
      </div>
    </nav>
  );
}
