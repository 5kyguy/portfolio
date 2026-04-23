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
};

type LinkDef = {
  key: keyof SocialLinksData;
  label: string;
  Icon: IconType;
  hrefPrefix?: string;
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
  "-mx-2 flex flex-nowrap items-center justify-center gap-2 overflow-x-auto px-2 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:max-w-none md:flex-none md:flex-wrap md:justify-start md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden";

const defaultLinkClassName =
  "flex size-9 shrink-0 items-center justify-center rounded-full border border-outline/25 bg-surface-container-low/60 text-on-background transition-all duration-300 hover:border-primary/50 hover:bg-surface-container-high hover:text-primary dark:bg-surface-container/60 dark:hover:bg-surface-container-high";

function buildLinks(social: SocialLinksData) {
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

    return [{ href, label, Icon }];
  });
}

export function SocialLinks({
  social,
  className = "",
  linkClassName = defaultLinkClassName,
  ariaLabel = "Contact and profiles",
}: SocialLinksProps) {
  const links = buildLinks(social);

  return (
    <nav className={`${defaultClassName} ${className}`.trim()} aria-label={ariaLabel}>
      {links.map(({ href, label, Icon }) => {
        const inner = <Icon className="size-[1.125rem]" aria-hidden />;
        if (href.startsWith("mailto:")) {
          return (
            <a
              key={label}
              href={href}
              className={linkClassName}
              aria-label={label}
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
            className={linkClassName}
            aria-label={label}
          >
            {inner}
          </Link>
        );
      })}
    </nav>
  );
}
