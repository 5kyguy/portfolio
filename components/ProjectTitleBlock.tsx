import type { ProjectItem } from "@/lib/parser";
import { projectPrimaryExternalHref } from "@/lib/projectLinks";

type ProjectTitleBlockProps = {
  project: ProjectItem;
  level: 2 | 3;
};

export function ProjectTitleBlock({ project, level }: ProjectTitleBlockProps) {
  const href = projectPrimaryExternalHref(project);
  const titleClass =
    level === 2
      ? "font-headline text-3xl font-light"
      : "font-headline text-2xl font-light";

  const HeadingTag = level === 2 ? "h2" : "h3";

  return (
    <HeadingTag className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${titleClass} transition-colors hover:text-primary`}
        >
          {project.name}
        </a>
      ) : (
        <span className={titleClass}>{project.name}</span>
      )}
      {project.period ? (
        <span className="font-label text-[11px] font-normal normal-case tracking-normal text-on-surface-variant/80 md:text-xs">
          {project.period}
        </span>
      ) : null}
    </HeadingTag>
  );
}
