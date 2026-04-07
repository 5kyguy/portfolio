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
  links: { label: string; url: string }[];
  notes?: string;
};

export type ProjectItem = {
  name: string;
  description: string;
  github?: string;
  githubLinks: string[];
  url?: string;
  image?: string;
  stack: string[];
  timeline: TimelineItem[];
};

export type TimelineItem = {
  date: string;
  text: string;
  links: { label: string; url: string }[];
};

export type HackathonItem = {
  date: string;
  event: string;
  project: string;
  projectLink?: string;
  links: { label: string; url: string }[];
};

export type ConferenceItem = {
  date: string;
  event: string;
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
  hackathons: HackathonItem[];
  conferences: ConferenceItem[];
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

function stripMdLinks(text: string): string {
  return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1").trim();
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

function splitH4(raw: string): { heading: string; body: string }[] {
  return splitByHeading(raw, "####");
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
      links: linksRaw ? mdLinks(linksRaw) : [],
      notes: freeText(lines) || undefined,
    };
  });
}

function parseProjects(body: string): ProjectItem[] {
  return splitH3(body).map(({ heading, body: raw }) => {
    const timelineStart = raw.indexOf("#### Timeline");
    const summaryBlock = timelineStart >= 0 ? raw.slice(0, timelineStart).trim() : raw;
    const timelineBlock = timelineStart >= 0 ? raw.slice(timelineStart).trim() : "";

    const lines = summaryBlock.split("\n");
    const stackRaw = meta(lines, "Stack");
    const githubRaw = meta(lines, "GitHub");
    const githubLinks = (githubRaw ?? "")
      .split("|")
      .map((s) => s.trim())
      .filter(Boolean);

    const timeline: TimelineItem[] = timelineBlock
      .split("\n")
      .filter((line) => line.startsWith("- "))
      .map((line) => {
        const content = line.slice(2);
        const parts = content.split("|").map((p) => p.trim());
        const links = mdLinks(content);
        return {
          date: parts[0] ?? "",
          text: stripMdLinks(parts.slice(1).join(" | ")),
          links,
        };
      });

    return {
      name: heading,
      github: githubLinks[0],
      githubLinks,
      url: meta(lines, "URL"),
      image: meta(lines, "Image"),
      stack: stackRaw ? stackRaw.split(",").map((s) => s.trim()) : [],
      description: freeText(lines),
      timeline,
    };
  });
}

function parseHackathons(body: string): HackathonItem[] {
  return body
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .map((line) => {
      const parts = line.slice(2).split("|").map((p) => p.trim());
      const projectLinks = mdLinks(parts[2] ?? "");
      const links = [...mdLinks(line)];
      if (parts[3] && /^https?:\/\//.test(parts[3])) {
        links.push({ label: "Reference", url: parts[3] });
      }
      return {
        date: parts[0] ?? "",
        event: parts[1] ?? "",
        project: stripMdLinks(parts[2] ?? ""),
        projectLink: projectLinks[0]?.url,
        links,
      };
    });
}

function parseConferences(body: string): ConferenceItem[] {
  return body
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .map((line) => {
      const parts = line.slice(2).split("|").map((p) => p.trim());
      const links = mdLinks(line);
      return {
        date: parts[0] ?? "",
        event: stripMdLinks(parts[1] ?? ""),
        links,
      };
    });
}

function parseTalks(body: string): TalkItem[] {
  return splitH4(body).map(({ heading, body: raw }) => {
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
  const otherExperienceBody = sections.get("Other Experiences") ?? "";
  const hackathonBody = subsection(otherExperienceBody, "Hackathons");
  const conferenceBody = subsection(otherExperienceBody, "Conferences");
  const talksBody = subsection(otherExperienceBody, "Talks & Contributions");

  return {
    name: nameMatch?.[1].trim() ?? "",
    profileImage: profileImageMatch?.[1].trim(),
    summary: summaryMatch?.[1].trim() ?? "",
    ...about,
    journey: parseJourney(sections.get("Journey") ?? ""),
    projects: parseProjects(sections.get("Projects") ?? ""),
    hackathons: parseHackathons(hackathonBody),
    conferences: parseConferences(conferenceBody),
    talks: parseTalks(talksBody),
    socialLinks: parseSocialLinks(sections.get("Social Links") ?? ""),
  };
}

export function getSiteData(): SiteData {
  if (!cached) cached = parse();
  return cached;
}
