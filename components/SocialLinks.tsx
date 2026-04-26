import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FaLinkedin,
  HiOutlineEnvelope,
  SiDiscord,
  SiGithub,
  SiTelegram,
  SiX,
} from "@/components/icons";
import type { SocialLinks as SocialLinksData } from "@/lib/parser";

type SocialLinksProps = {
  social: SocialLinksData;
  className?: string;
  linkClassName?: string;
  ariaLabel?: string;
  /** `contactGrid`: single column (e.g. 6 links → 6 rows). Default: responsive 2 then 3 columns on xl. */
  layout?: "default" | "contactGrid";
};

type LinkDef = {
  key: keyof SocialLinksData;
  label: string;
  Icon: IconType;
  hrefPrefix?: string;
};

type BuiltLink = {
  href: string;
  label: string;
  username: string;
  Icon: IconType;
};

const LINK_CONFIG: LinkDef[] = [
  { key: "github", label: "GitHub", Icon: SiGithub },
  { key: "x", label: "X", Icon: SiX },
  { key: "email", label: "Email", Icon: HiOutlineEnvelope, hrefPrefix: "mailto:" },
  { key: "telegram", label: "Telegram", Icon: SiTelegram },
  { key: "discord", label: "Discord", Icon: SiDiscord },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin },
];

const defaultClassName =
  "grid gap-3 sm:grid-cols-2 xl:grid-cols-3";

const defaultLinkClassName =
  "group/social flex min-h-14 items-center gap-3 border border-outline-variant/20 bg-surface-container-low px-4 py-3 text-on-background transition-colors hover:border-primary/50 hover:bg-surface-container-high";

/** Taller cells in contact column; `flex-1` splits row height evenly with the form. */
const contactGridLinkClassName =
  "group/social flex min-h-0 flex-1 basis-0 items-center gap-3 border border-outline-variant/20 bg-surface-container-low px-4 py-2 text-on-background transition-colors hover:border-primary/50 hover:bg-surface-container-high";

function usernameForLink(key: keyof SocialLinksData, raw: string) {
  if (key === "email" || key === "discord") return raw;
  if (raw.startsWith("@")) return raw;

  try {
    const url = new URL(raw);
    const parts = url.pathname.split("/").filter(Boolean);
    const handle = parts.at(-1);
    return handle ? `@${handle.replace(/^@/, "")}` : raw;
  } catch {
    return raw;
  }
}

function buildLinks(social: SocialLinksData): BuiltLink[] {
  return LINK_CONFIG.flatMap(({ key, label, Icon, hrefPrefix }) => {
    const rawValue = social[key];
    const raw = rawValue?.trim();
    if (!raw || !raw.trim()) return [];

    let normalized = raw;
    if (key === "discord" && raw.startsWith("@")) {
      normalized = `https://discord.com/users/${raw.slice(1)}`;
    } else if (key === "telegram" && raw.startsWith("@")) {
      normalized = `https://t.me/${raw.slice(1)}`;
    }

    const href = (hrefPrefix ?? "") + normalized;
    if (!href.startsWith("http") && !href.startsWith("mailto:")) {
      return [];
    }

    return [{ href, label, username: usernameForLink(key, raw), Icon }];
  });
}

export function SocialLinks({
  social,
  className = "",
  linkClassName = defaultLinkClassName,
  ariaLabel = "Contact and profiles",
  layout = "default",
}: SocialLinksProps) {
  const links = buildLinks(social);
  const gridClassName =
    layout === "contactGrid"
      ? "flex min-h-0 flex-1 flex-col gap-3 lg:h-full"
      : defaultClassName;
  const resolvedLinkClassName =
    layout === "contactGrid" ? contactGridLinkClassName : linkClassName;

  return (
    <nav className={`${gridClassName} ${className}`.trim()} aria-label={ariaLabel}>
      {links.map(({ href, label, username, Icon }) => {
        const inner = (
          <>
            <span className="flex size-9 shrink-0 items-center justify-center border border-outline-variant/20 bg-background/70 text-on-background transition-colors group-hover/social:border-primary/40 group-hover/social:text-primary">
              <Icon className="size-[1.125rem]" aria-hidden />
            </span>
            <span className="min-w-0">
              <span className="block font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                {label}
              </span>
              <span className="mt-0.5 block truncate text-sm text-on-surface-variant transition-colors group-hover/social:text-on-background">
                {username}
              </span>
            </span>
          </>
        );
        if (href.startsWith("mailto:")) {
          return (
            <a
              key={label}
              href={href}
              className={resolvedLinkClassName}
              aria-label={`${label}: ${username}`}
            >
              {inner}
            </a>
          );
        }

        return (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={resolvedLinkClassName}
            aria-label={`${label}: ${username}`}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
