"use client";

import { useState } from "react";
import { MarkdownContent } from "@/components/MarkdownContent";
import type { TimelineItem } from "@/lib/parser";

const triggerChipClass =
  "border border-outline-variant/30 px-3 py-1.5 font-label text-[10px] uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-background";

type ProjectTimelineModalProps = {
  timeline: TimelineItem[];
  projectName: string;
  buttonLabel?: string;
};

export function ProjectTimelineModal({
  timeline,
  projectName,
  buttonLabel = "View timeline",
}: ProjectTimelineModalProps) {
  const [open, setOpen] = useState(false);

  if (timeline.length === 0) return null;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerChipClass}>
        {buttonLabel}
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
                  <MarkdownContent
                    content={item.text}
                    className="mt-1 text-sm leading-relaxed text-on-surface-variant"
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
