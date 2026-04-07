"use client";

import { useState } from "react";
import Link from "next/link";
import type { TimelineItem } from "@/lib/parser";

type ProjectTimelineModalProps = {
  timeline: TimelineItem[];
  projectName: string;
};

export function ProjectTimelineModal({ timeline, projectName }: ProjectTimelineModalProps) {
  const [open, setOpen] = useState(false);

  if (timeline.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="font-label mt-3 text-xs uppercase tracking-[0.2em] text-primary underline underline-offset-4 transition-colors hover:text-on-background"
      >
        View timeline
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto border border-outline-variant/25 bg-surface p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 className="font-headline text-3xl font-light">
                {projectName} Timeline
              </h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-on-background"
              >
                Close
              </button>
            </div>

            <div className="space-y-4">
              {timeline.map((item, i) => (
                <article
                  key={`${item.date}-${i}`}
                  className="border-l border-outline-variant/25 pl-4"
                >
                  <p className="font-label text-[10px] uppercase tracking-[0.2em] text-primary">
                    {item.date}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                    {item.text}
                  </p>
                  {item.links.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-3">
                      {item.links.map((link) => (
                        <Link
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-label text-xs text-primary underline underline-offset-4 transition-colors hover:text-on-background"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
