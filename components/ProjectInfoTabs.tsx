"use client";

import type { ProjectItem } from "@/lib/parser";
import { ProjectMoreInfoModal } from "@/components/ProjectMoreInfoModal";
import { ProjectTimelineModal } from "@/components/ProjectTimelineModal";
import { projectSecondaryLinks } from "@/lib/projectLinks";

type ProjectInfoTabsProps = {
  project: ProjectItem;
};

export function ProjectInfoTabs({ project }: ProjectInfoTabsProps) {
  const bottomLinks = projectSecondaryLinks(project);

  const hasTimeline = project.timeline.length > 0;
  const hasMore = project.screenshots.length > 0;
  const hasRow = bottomLinks.length > 0 || hasTimeline || hasMore;

  if (!hasRow) return null;

  const chipClass =
    "border border-outline-variant/30 px-3 py-1.5 font-label text-[10px] uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-background";

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-2">
        {bottomLinks.map((link) => (
          <a
            key={`${link.label}-${link.url}`}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={chipClass}
          >
            {link.label}
          </a>
        ))}
        {hasTimeline && (
          <ProjectTimelineModal
            timeline={project.timeline}
            projectName={project.name}
            buttonLabel="Timeline"
          />
        )}
        {hasMore && (
          <ProjectMoreInfoModal
            screenshots={project.screenshots}
            projectName={project.name}
            buttonLabel="More info"
          />
        )}
      </div>
    </div>
  );
}
