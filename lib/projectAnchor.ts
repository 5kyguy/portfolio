/** Stable fragment for /projects#... anchors (matches project names in content). */
export function projectAnchorSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeName(s: string): string {
  return s.toLowerCase().replace(/\s+/g, " ").trim();
}

/** Resolve journey markdown project label to the same slug as the Projects page uses. */
export function journeyProjectHref(label: string, siteProjects: { name: string }[]): string {
  const match = siteProjects.find((p) => normalizeName(p.name) === normalizeName(label));
  const slug = projectAnchorSlug(match?.name ?? label);
  return `/projects#${slug}`;
}
