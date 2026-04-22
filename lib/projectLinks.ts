import type { ProjectItem } from "@/lib/parser";

/** URL used for the project title link: **URL**, [Website], else first **Links** entry, else GitHub. */
export function projectPrimaryExternalHref(project: ProjectItem): string | undefined {
  const u = project.url?.trim();
  if (u) return u;
  const g = project.github?.trim();
  if (g) return g;
  return project.links[0]?.url;
}

export function projectSecondaryLinks(project: ProjectItem): { label: string; url: string }[] {
  const primary = projectPrimaryExternalHref(project);
  return project.links.filter((l) => {
    if (primary && l.url === primary) return false;
    if (/^website$/i.test(l.label.trim())) return false;
    return true;
  });
}
