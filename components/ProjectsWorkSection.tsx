"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useMemo, useState } from "react";
import type { ProjectItem } from "@/lib/parser";
import { ProjectInfoTabs } from "@/components/ProjectInfoTabs";

type ProjectsWorkSectionProps = {
  projects: ProjectItem[];
  projectImageMap: Record<string, StaticImageData>;
};

function sortByPriority(a: ProjectItem, b: ProjectItem) {
  return a.priority - b.priority;
}

export function ProjectsWorkSection({ projects, projectImageMap }: ProjectsWorkSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const featuredSorted = useMemo(
    () => projects.filter((p) => p.featured).sort(sortByPriority),
    [projects],
  );
  const allSorted = useMemo(() => [...projects].sort(sortByPriority), [projects]);

  const hasFeatured = featuredSorted.length > 0;
  const hasMore = hasFeatured && allSorted.length > featuredSorted.length;
  const visible = !hasFeatured || showAll ? allSorted : featuredSorted;

  return (
    <div>
      <div className="space-y-16">
        {visible.map((project) => {
          const img = project.image ? projectImageMap[project.image] : undefined;

          return (
            <article
              key={project.name}
              className="image-rgb-hover-group grid gap-8 border border-outline-variant/15 bg-surface-container-low p-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:p-8"
            >
              <div className="space-y-6">
                <div>
                  {project.stack.length > 0 ? (
                    <p className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">
                      {project.stack.join(" · ")}
                    </p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                    <h3 className="font-headline text-4xl font-light tracking-tight">{project.name}</h3>
                    <span className="font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                      {project.period}
                    </span>
                  </div>
                </div>

                <div className="space-y-5 text-sm leading-relaxed text-on-surface-variant md:text-base">
                  <div>
                    <p className="mb-2 font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                      What it is
                    </p>
                    <p>{project.description}</p>
                  </div>
                  {project.role ? (
                    <div>
                      <p className="mb-2 font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                        My role
                      </p>
                      <p>{project.role}</p>
                    </div>
                  ) : null}
                  {project.impactBullets.length > 0 ? (
                    <div>
                      <p className="mb-2 font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                        Technical scope
                      </p>
                      <ul className="space-y-2 pl-5">
                        {project.impactBullets.map((bullet) => (
                          <li key={bullet} className="list-disc">
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {project.outcome ? (
                    <div>
                      <p className="mb-2 font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                        Outcome
                      </p>
                      <p>{project.outcome}</p>
                    </div>
                  ) : null}
                </div>

                <ProjectInfoTabs project={project} />
              </div>

              <div>
                {img ? (
                  <div className="image-rgb-box relative aspect-[16/10] overflow-hidden bg-surface-container">
                    <Image
                      alt={project.name}
                      src={img}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 42vw"
                    />
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {hasMore ? (
        <div className="mt-12 flex justify-center">
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
