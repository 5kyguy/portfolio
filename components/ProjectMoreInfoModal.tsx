"use client";

import { useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import imgTriggerx from "@/assets/projects/triggerx.png";
import imgFlowforge from "@/assets/projects/flowforge.png";
import imgPptgen from "@/assets/projects/pptgen.png";
import imgDqcare from "@/assets/projects/dqcare.png";
import imgR2d2 from "@/assets/projects/r2d2.png";

type ProjectMoreInfoModalProps = {
  screenshots: string[];
  projectName: string;
  buttonLabel?: string;
};

const triggerChipClass =
  "border border-outline-variant/30 px-3 py-1.5 font-label text-[10px] uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-background";

const SCREENSHOT_MAP: Record<string, StaticImageData> = {
  "/assets/projects/triggerx.png": imgTriggerx,
  "/assets/projects/flowforge.png": imgFlowforge,
  "/assets/projects/pptgen.png": imgPptgen,
  "/assets/projects/dqcare.png": imgDqcare,
  "/assets/projects/r2d2.png": imgR2d2,
};

export function ProjectMoreInfoModal({ screenshots, projectName, buttonLabel = "More info" }: ProjectMoreInfoModalProps) {
  const [open, setOpen] = useState(false);

  if (screenshots.length === 0) return null;

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={triggerChipClass}>
        {buttonLabel}
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm">
          <div className="max-h-[85vh] w-full max-w-3xl overflow-y-auto border border-outline-variant/25 bg-surface p-6 md:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 className="font-headline text-3xl font-light">{projectName}</h3>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant transition-colors hover:text-on-background"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {screenshots.map((src, i) => {
                const img = SCREENSHOT_MAP[src];
                if (!img) return null;
                return (
                  <div
                    key={i}
                    className="group relative aspect-video overflow-hidden bg-surface-container-low"
                  >
                    <Image
                      alt={`${projectName} screenshot ${i + 1}`}
                      src={img}
                      fill
                      className="image-rgb-hover object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
