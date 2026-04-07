"use client";

import { useEffect, useMemo, useState } from "react";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import imgAether from "../assets/journey/aether.jpg";
import imgLabs from "../assets/journey/labs.jpg";
import type { JourneyItem } from "@/lib/parser";

const IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/journey/aether.jpg": imgAether,
  "/assets/journey/labs.jpg": imgLabs,
};

function yearFrom(period: string): number {
  const match = period.match(/\b(20\d{2})\b/);
  return match ? parseInt(match[1], 10) : 0;
}

type JourneyTimelineProps = {
  journey: JourneyItem[];
};

export function JourneyTimeline({ journey }: JourneyTimelineProps) {
  const currentYear = new Date().getFullYear();
  const timelineYears = useMemo(() => {
    const uniqueYears = Array.from(new Set(journey.map((item) => yearFrom(item.period)).filter(Boolean))).sort(
      (a, b) => b - a,
    );
    if (!uniqueYears.includes(currentYear)) {
      uniqueYears.unshift(currentYear);
    }
    return uniqueYears;
  }, [currentYear, journey]);
  const [activeYear, setActiveYear] = useState(currentYear);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-journey-year]"));
    if (sections.length === 0) return;

    let ticking = false;

    const updateActiveYear = () => {
      const probeY = window.innerHeight * 0.38;
      let nextYear = currentYear;
      let bestDistance = Number.POSITIVE_INFINITY;

      for (const section of sections) {
        const year = Number(section.dataset.journeyYear);
        if (!year) continue;
        const rect = section.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - probeY);

        if (distance < bestDistance) {
          bestDistance = distance;
          nextYear = year;
        }
      }

      const firstSectionRect = sections[0].getBoundingClientRect();
      if (firstSectionRect.top > probeY) {
        nextYear = currentYear;
      }

      setActiveYear((prev) => (prev === nextYear ? prev : nextYear));
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateActiveYear);
    };

    onScrollOrResize();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [currentYear, journey.length]);

  return (
    <div className="relative grid grid-cols-1 gap-12 md:grid-cols-12">
      <div className="relative hidden md:col-span-1 md:block">
        <div className="sticky top-48 flex h-fit flex-col space-y-32">
          {timelineYears.map((year) => (
            <span
              key={year}
              className={
                year === activeYear
                  ? "font-headline text-2xl italic text-primary transition-colors duration-300"
                  : "font-headline text-2xl italic text-on-surface-variant/30 transition-colors duration-300"
              }
            >
              {year}
            </span>
          ))}
        </div>
      </div>
      <div className="relative hidden justify-center md:col-span-1 md:flex">
        <div className="timeline-line h-full opacity-20" />
      </div>
      <div className="space-y-32 md:col-span-10">
        {journey.map((item, idx) => {
          const img = item.image ? IMAGE_MAP[item.image] : undefined;
          const reverse = idx % 2 !== 0;
          const itemYear = yearFrom(item.period);

          return (
            <article
              key={`${item.period}-${item.organization}`}
              data-journey-year={itemYear || undefined}
              className="group grid grid-cols-1 gap-8 lg:grid-cols-10"
            >
              <div
                className={`${img ? "overflow-hidden" : ""} ${reverse ? "order-1 lg:order-2 lg:col-span-4" : "lg:col-span-4"}`}
              >
                {img ? (
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      alt={item.organization}
                      src={img}
                      fill
                      className="object-cover brightness-75 grayscale transition-all duration-700 group-hover:brightness-100 group-hover:grayscale-0"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface-container p-12">
                    <p className="font-headline text-center text-xl italic leading-relaxed text-on-surface-variant/40">
                      {item.period}
                    </p>
                  </div>
                )}
              </div>
              <div
                className={`flex flex-col justify-center ${reverse ? "order-2 lg:order-1 lg:col-span-6" : "lg:col-span-6"}`}
              >
                <div className="mb-2 flex items-baseline space-x-4">
                  <span className="font-label text-xs uppercase tracking-widest text-primary">{item.role}</span>
                  {item.location && (
                    <span className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant/50">
                      {item.location}
                    </span>
                  )}
                </div>
                <h3 className="font-headline mb-2 text-4xl">
                  {item.orgUrl ? (
                    <Link
                      href={item.orgUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="transition-colors duration-300 hover:text-primary"
                    >
                      {item.organization}
                    </Link>
                  ) : (
                    item.organization
                  )}
                </h3>
                <p className="font-label mb-6 text-xs text-on-surface-variant/60">{item.period}</p>
                {item.highlights.length > 0 && (
                  <ul className="font-body mb-6 max-w-xl list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-on-surface-variant">
                    {item.highlights.map((h) => (
                      <li key={h}>{h}</li>
                    ))}
                  </ul>
                )}
                {item.notes && (
                  <p className="font-body mb-6 max-w-xl text-sm italic leading-relaxed text-on-surface-variant/60">
                    {item.notes}
                  </p>
                )}
                <div className="flex flex-wrap gap-4">
                  {item.stack.map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-high px-4 py-1 font-label text-[10px] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {item.links.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {item.links.map((link) => (
                      <Link
                        key={link.url}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-label text-xs text-primary underline underline-offset-4 transition-colors duration-300 hover:text-on-background"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
