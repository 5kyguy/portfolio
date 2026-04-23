"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { ThemeToggle } from "@/components/ThemeToggle";

export type SiteNavSection = {
  id: string;
  label: string;
};

type SiteNavProps = {
  sections: readonly SiteNavSection[];
  brandName: string;
  profileImage: StaticImageData;
  heroId?: string;
};

export function SiteNav({
  sections,
  brandName,
  profileImage,
  heroId = "hero",
}: SiteNavProps) {
  const [showNav, setShowNav] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id ?? "");
  const sectionRatiosRef = useRef<Record<string, number>>({});

  useEffect(() => {
    const hero = document.getElementById(heroId);
    if (!hero) {
      const frame = window.requestAnimationFrame(() => {
        setShowNav(true);
      });
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNav(!(entry.isIntersecting && entry.intersectionRatio > 0.55));
      },
      {
        threshold: [0, 0.25, 0.55, 0.8, 1],
      },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [heroId]);

  useEffect(() => {
    const sectionEls = sections
      .map((section) => document.getElementById(section.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sectionEls.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          sectionRatiosRef.current[entry.target.id] = entry.isIntersecting
            ? entry.intersectionRatio
            : 0;
        }

        const nextActive = sections.reduce<{ id: string; ratio: number } | null>(
          (best, section) => {
            const ratio = sectionRatiosRef.current[section.id] ?? 0;
            if (ratio <= 0) return best;
            if (!best || ratio > best.ratio) {
              return { id: section.id, ratio };
            }
            return best;
          },
          null,
        );

        if (nextActive) {
          setActiveSectionId(nextActive.id);
        }
      },
      {
        rootMargin: "-18% 0px -52% 0px",
        threshold: [0.15, 0.3, 0.45, 0.6, 0.75],
      },
    );

    for (const section of sectionEls) {
      observer.observe(section);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="pointer-events-none fixed inset-x-0 top-0 z-50 px-6 py-6 md:px-12">
      <div className="flex items-start justify-between gap-6">
        <a
          href={`#${heroId}`}
          className={`pointer-events-auto flex min-w-0 items-center gap-3 rounded-full border border-outline/15 bg-background/75 px-3 py-2 shadow-sm backdrop-blur-xl transition-all duration-500 ${
            showNav
              ? "translate-y-0 opacity-100"
              : "-translate-y-4 opacity-0"
          }`}
          aria-label="Back to top"
        >
          <Image
            alt={brandName}
            src={profileImage}
            width={36}
            height={36}
            className="size-9 rounded-full object-cover"
          />
          <span className="truncate font-headline text-lg font-light tracking-tight text-on-background italic md:text-xl">
            {brandName}
          </span>
        </a>
        <div className="flex items-center gap-4">
          <div
            className={`pointer-events-auto hidden items-center gap-8 rounded-full border border-outline/15 bg-background/75 px-5 py-3 font-headline text-base font-light tracking-tight shadow-sm backdrop-blur-xl transition-all duration-500 md:flex ${
              showNav
                ? "translate-y-0 opacity-100"
                : "-translate-y-4 opacity-0"
            }`}
          >
            {sections.map(({ id, label }) => {
              const active = activeSectionId === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={active ? "true" : undefined}
                  className={
                    active
                      ? "border-b border-primary pb-1 text-on-background transition-all duration-300"
                      : "text-on-surface-variant transition-colors duration-300 hover:text-on-background"
                  }
                >
                  {label}
                </a>
              );
            })}
          </div>
          <div className="pointer-events-auto">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
