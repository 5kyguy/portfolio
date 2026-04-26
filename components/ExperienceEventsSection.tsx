"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { ExperienceEvent } from "@/lib/parser";

type ExperienceEventsSectionProps = {
  events: ExperienceEvent[];
  eventImageMap: Record<string, StaticImageData>;
};

function isNilDescription(d: string) {
  return d.trim().toLowerCase() === "nil";
}

export function ExperienceEventsSection({ events, eventImageMap }: ExperienceEventsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const featured = useMemo(() => events.filter((e) => e.featured), [events]);
  const hasFeatured = featured.length > 0;
  const hasMore = hasFeatured && events.length > featured.length;
  const visible = !hasFeatured || showAll ? events : featured;

  return (
    <div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((event) => {
          const img = event.image ? eventImageMap[event.image] : undefined;
          const kindLabel = event.kind === "conference" ? "Conference" : "Hackathon";

          return (
            <article
              key={`${event.kind}-${event.title}-${event.date}`}
              className="image-rgb-hover-group overflow-hidden border border-outline-variant/12 bg-surface-container-low"
            >
              {img ? (
                <div className="image-rgb-box relative aspect-[16/10] bg-surface-container">
                  <Image
                    alt={event.title}
                    src={img}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 30vw"
                  />
                </div>
              ) : null}
              <div className="p-5">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  <span className="font-label text-[10px] uppercase tracking-[0.22em] text-primary">
                    {event.date}
                  </span>
                  <span className="font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                    {kindLabel}
                  </span>
                </div>
                <h4 className="mt-2 font-headline text-2xl font-light tracking-tight">{event.title}</h4>
                {!isNilDescription(event.description) ? (
                  <p className="mt-3 text-sm leading-relaxed text-on-surface-variant">{event.description}</p>
                ) : null}
                {event.links.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {event.links.map((link) => (
                      <Link
                        key={`${event.title}-${link.label}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="border border-outline-variant/30 px-3 py-1.5 font-label text-[10px] uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-background"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {hasMore ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="border border-outline-variant/30 px-5 py-2 font-label text-[10px] uppercase tracking-[0.22em] text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-background"
          >
            {showAll ? "Show featured" : "View all"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
