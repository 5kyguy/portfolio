import { readFileSync } from "fs";
import { join } from "path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type JourneyItem = {
  organization: string;
  orgUrl?: string;
  period: string;
  role: string;
  mentor?: string;
  mentorUrl?: string;
  location?: string;
  image?: string;
  stack: string[];
  highlights: string[];
  projects: string[];
  links: { label: string; url: string }[];
  notes?: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  period: string;
  highlights: string[];
  links: { label: string; url: string }[];
  github?: string;
  githubLinks: string[];
  url?: string;
  image?: string;
  stack: string[];
  timeline: TimelineItem[];
  screenshots: string[];
};

export type TimelineItem = {
  date: string;
  text: string;
};

export type ExperienceEvent = {
  kind: "hackathon" | "conference";
  title: string;
  date: string;
  description: string;
  image?: string;
  links: { label: string; url: string }[];
};

export type TalkItem = {
  title: string;
  date: string;
  description: string;
  image?: string;
  links: { label: string; url: string }[];
};

export type SocialLinks = {
  github?: string;
  x?: string;
  email?: string;
  linkedin?: string;
  telegram?: string;
  discord?: string;
  tronDaoForum?: string;
  ens?: string;
  farcaster?: string;
  reddit?: string;
};

export type SiteData = {
  name: string;
  profileImage?: string;
  summary: string;
  tagline: string;
  headline: string;
  headlines: string[];
  bio: string;
  stats: { value: string; label: string }[];
  journey: JourneyItem[];
  projects: ProjectItem[];
  experienceEvents: ExperienceEvent[];
  talks: TalkItem[];
  socialLinks: SocialLinks;
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function mdLinks(text: string): { label: string; url: string }[] {
  const out: { label: string; url: string }[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    out.push({ label: m[1], url: m[2] });
  }
  return out;
}

/** First value matching `- **Key**: ...` */
function meta(lines: string[], key: string): string | undefined {
  for (const l of lines) {
    const m = l.match(new RegExp(`^-\\s*\\*\\*${key}\\*\\*:\\s*(.+)$`));
    if (m) return m[1].trim();
  }
  return undefined;
}

/** All values matching `- **Key**: ...` */
function metaAll(lines: string[], key: string): string[] {
  const out: string[] = [];
  for (const l of lines) {
    const m = l.match(new RegExp(`^-\\s*\\*\\*${key}\\*\\*:\\s*(.+)$`));
    if (m) out.push(m[1].trim());
  }
  return out;
}

/** Free-text paragraphs that follow the last metadata bullet. */
function freeText(lines: string[]): string {
  let lastMeta = -1;
  for (let i = 0; i < lines.length; i++) {
    if (/^-\s*\*\*/.test(lines[i])) lastMeta = i;
  }
  return lines
    .slice(lastMeta + 1)
    .filter((l) => l.trim() !== "")
    .join("\n")
    .trim();
}

/** Split on `## ` headings -> Map<heading, body> */
function splitH2(raw: string): Map<string, string> {
  const map = new Map<string, string>();
  const re = /^## (.+)$/gm;
  let prev: { h: string; i: number } | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    if (prev) map.set(prev.h, raw.slice(prev.i, m.index).trim());
    prev = { h: m[1].trim(), i: m.index + m[0].length };
  }
  if (prev) map.set(prev.h, raw.slice(prev.i).trim());
  return map;
}

/** Split on `### ` headings -> array of {heading, body} */
function splitH3(raw: string): { heading: string; body: string }[] {
  return splitByHeading(raw, "###");
}

function splitByHeading(raw: string, mark: "###" | "####"): { heading: string; body: string }[] {
  const out: { heading: string; body: string }[] = [];
  const re = new RegExp(`^${mark} (.+)$`, "gm");
  let prev: { h: string; i: number } | null = null;
  let m: RegExpExecArray | null;
  while ((m = re.exec(raw)) !== null) {
    if (prev) out.push({ heading: prev.h, body: raw.slice(prev.i, m.index).trim() });
    prev = { h: m[1].trim(), i: m.index + m[0].length };
  }
  if (prev) out.push({ heading: prev.h, body: raw.slice(prev.i).trim() });
  return out;
}

function subsection(body: string, heading: string): string {
  const re = /^### (.+)$/gm;
  let start = -1;
  let end = body.length;
  let m: RegExpExecArray | null;
  while ((m = re.exec(body)) !== null) {
    if (m[1].trim() === heading) {
      start = m.index + m[0].length;
      break;
    }
  }
  if (start === -1) return "";
  re.lastIndex = start;
  m = re.exec(body);
  if (m) end = m.index;
  return body.slice(start, end).trim();
}

// ---------------------------------------------------------------------------
// Section parsers
// ---------------------------------------------------------------------------

function parseAbout(body: string) {
  const lines = body.split("\n");
  const headlines = metaAll(lines, "Headline").map((h) => h.replace(/\.$/, "").trim());
  return {
    tagline: meta(lines, "Tagline") ?? "",
    headline: headlines[0] ?? "",
    headlines,
    stats: metaAll(lines, "Stat").map((s) => {
      const [value, ...rest] = s.split("|");
      return { value: value.trim(), label: rest.join("|").trim() };
    }),
    bio: freeText(lines),
  };
}

function parseJourney(body: string): JourneyItem[] {
  return splitH3(body).map(({ heading, body: raw }) => {
    const lines = raw.split("\n");

    const [orgPart, ...urlParts] = heading.split("|");
    const orgUrl = urlParts.join("|").trim() || undefined;

    let mentor: string | undefined;
    let mentorUrl: string | undefined;
    const mentorRaw = meta(lines, "Mentor");
    if (mentorRaw) {
      const [name, ...mUrl] = mentorRaw.split("|");
      mentor = name.trim();
      mentorUrl = mUrl.join("|").trim() || undefined;
    }

    const stackRaw = meta(lines, "Stack");
    const linksRaw = meta(lines, "Links");
    const projectNames = metaAll(lines, "Projects").flatMap((row) =>
      row
        .split("|")
        .map((s) => s.trim())
        .filter(Boolean),
    );

    return {
      organization: orgPart.trim(),
      orgUrl,
      period: meta(lines, "Period") ?? "",
      role: meta(lines, "Role") ?? "",
      mentor,
      mentorUrl,
      location: meta(lines, "Location"),
      image: meta(lines, "Image"),
      stack: stackRaw ? stackRaw.split(",").map((s) => s.trim()) : [],
      highlights: metaAll(lines, "Highlights"),
      projects: projectNames,
      links: linksRaw ? mdLinks(linksRaw) : [],
      notes: freeText(lines) || undefined,
    };
  });
}

function parseProjects(body: string): ProjectItem[] {
  return splitH3(body).map(({ heading, body: raw }) => {
    const timelineIdx = raw.indexOf("#### Timeline");
    const screenshotsIdx = raw.indexOf("#### Screenshots");

    const summaryEnd = Math.min(
      timelineIdx >= 0 ? timelineIdx : raw.length,
      screenshotsIdx >= 0 ? screenshotsIdx : raw.length,
    );
    const summaryBlock = raw.slice(0, summaryEnd).trim();

    const timelineBlock =
      timelineIdx >= 0
        ? raw.slice(
            timelineIdx + "#### Timeline".length,
            screenshotsIdx >= 0 && screenshotsIdx > timelineIdx ? screenshotsIdx : raw.length,
          )
        : "";

    const screenshotsBlock =
      screenshotsIdx >= 0
        ? raw.slice(
            screenshotsIdx + "#### Screenshots".length,
            timelineIdx >= 0 && timelineIdx > screenshotsIdx ? timelineIdx : raw.length,
          )
        : "";

    const lines = summaryBlock.split("\n");
    const stackRaw = meta(lines, "Stack");
    const linksRaw = meta(lines, "Links");
    const parsedLinks = linksRaw ? mdLinks(linksRaw) : [];
    const githubRaw = meta(lines, "GitHub");
    const githubFromMeta = (githubRaw ?? "")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);
    const githubFromLinks = parsedLinks.filter((l) => /github/i.test(l.label)).map((l) => l.url);
    const githubLinks = [...new Set([...githubFromMeta, ...githubFromLinks])];
    const websiteFromLinks = parsedLinks.find((l) => /^website$/i.test(l.label.trim()));
    const primaryUrl =
      meta(lines, "URL")?.trim() || websiteFromLinks?.url || parsedLinks[0]?.url;

    const timeline: TimelineItem[] = timelineBlock
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => {
        const content = line.slice(2);
        const parts = content.split("|").map((p) => p.trim());
        return {
          date: parts[0] ?? "",
          text: parts.slice(1).join(" | ").trim(),
        };
      });

    const screenshots: string[] = screenshotsBlock
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => {
        const content = line.slice(2).trim();
        const urlMatch = content.match(/\(([^)]+)\)/);
        return urlMatch ? urlMatch[1] : content;
      });

    return {
      name: heading,
      description: meta(lines, "Description") ?? freeText(lines) ?? "",
      period: meta(lines, "Period") ?? "",
      highlights: metaAll(lines, "Highlights"),
      links: parsedLinks,
      github: githubLinks[0],
      githubLinks,
      url: primaryUrl,
      image: meta(lines, "Image"),
      stack: stackRaw ? stackRaw.split(",").map((s) => s.trim()) : [],
      timeline,
      screenshots,
    };
  });
}

function parseExperienceEvents(body: string): ExperienceEvent[] {
  return splitH3(body).map(({ heading, body: raw }) => {
    const lines = raw.split("\n");
    const paren = heading.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
    const title = paren ? paren[1].trim() : heading.trim();
    const date = meta(lines, "Date") ?? (paren ? paren[2].trim() : "");
    const image = meta(lines, "Image");
    const linksRaw = meta(lines, "Links");
    const links = linksRaw ? mdLinks(linksRaw) : [];
    const typeRaw = (meta(lines, "Type") ?? "").trim().toLowerCase();
    const kind: ExperienceEvent["kind"] =
      typeRaw === "conference" || image?.includes("/assets/conferences/")
        ? "conference"
        : "hackathon";

    return {
      kind,
      title,
      date,
      description: meta(lines, "Description") ?? freeText(lines) ?? "",
      image,
      links,
    };
  });
}

function parseTalks(body: string): TalkItem[] {
  return splitH3(body).map(({ heading, body: raw }) => {
    const lines = raw.split("\n");
    const linksRaw = meta(lines, "Links");
    return {
      title: heading,
      date: meta(lines, "Date") ?? "",
      description: meta(lines, "Description") ?? "",
      image: meta(lines, "Image"),
      links: linksRaw ? mdLinks(linksRaw) : [],
    };
  });
}

function parseSocialLinks(body: string): SocialLinks {
  const out: SocialLinks = {};
  for (const line of body.split("\n")) {
    const m = line.match(/^-\s*(.+?):\s*(.+)$/);
    if (!m) continue;
    const key = m[1].trim().toLowerCase().replace(/\s+/g, "");
    const val = m[2].trim();
    switch (key) {
      case "github":       out.github = val; break;
      case "x":
      case "twitter":      out.x = val; break;
      case "email":        out.email = val; break;
      case "linkedin":     out.linkedin = val; break;
      case "telegram":     out.telegram = val; break;
      case "discord":      out.discord = val; break;
      case "trondaoforum": out.tronDaoForum = val; break;
      case "ens":          out.ens = val; break;
      case "farcaster":    out.farcaster = val; break;
      case "reddit":       out.reddit = val; break;
    }
  }
  return out;
}

// ---------------------------------------------------------------------------
// Entrypoint — lazy singleton cached at module scope
// ---------------------------------------------------------------------------

let cached: SiteData | null = null;

function parse(): SiteData {
  const raw = readFileSync(
    join(process.cwd(), "content", "skyguy.md"),
    "utf-8",
  );

  const nameMatch = raw.match(/^# (.+)$/m);
  const profileImageMatch = raw.match(/^Profile picture:\s*(.+)$/m);
  const summaryMatch = raw.match(/^> (.+)$/m);
  const sections = splitH2(raw);
  const about = parseAbout(sections.get("About") ?? "");
  const experienceEvents = parseExperienceEvents(
    sections.get("Conferences & Hackathons") ?? "",
  );
  const talksBody =
    sections.get("Talks, Press & Community") ??
    sections.get("Talks & Contributions") ??
    subsection(sections.get("Other Experiences") ?? "", "Talks & Contributions");

  return {
    name: nameMatch?.[1].trim() ?? "",
    profileImage: profileImageMatch?.[1].trim(),
    summary: summaryMatch?.[1].trim() ?? "",
    ...about,
    journey: parseJourney(sections.get("Journey") ?? ""),
    projects: parseProjects(sections.get("Projects") ?? ""),
    experienceEvents,
    talks: parseTalks(talksBody),
    socialLinks: parseSocialLinks(sections.get("Social Links") ?? ""),
  };
}

export function getSiteData(): SiteData {
  if (!cached) cached = parse();
  return cached;
}
