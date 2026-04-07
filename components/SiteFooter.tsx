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
import { getSiteData, type SocialLinks } from "@/lib/parser";

type FooterProps = {
  className?: string;
};

type LinkDef = {
  key: keyof SocialLinks;
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

const iconButtonClass =
  "flex size-9 shrink-0 items-center justify-center rounded-full border border-outline/25 bg-surface-container-low/60 text-on-background transition-all duration-300 hover:border-primary/50 hover:bg-surface-container-high hover:text-primary dark:bg-surface-container/60 dark:hover:bg-surface-container-high";

function buildLinks(social: SocialLinks) {
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

export function SiteFooter({ className = "" }: FooterProps) {
  const { socialLinks, name } = getSiteData();
  const links = buildLinks(socialLinks);

  return (
    <footer
      className={`w-full border-t border-outline-variant/20 bg-surface-container-low px-6 py-12 font-label text-on-background dark:bg-background md:px-12 ${className}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
        <nav
          className="-mx-2 flex flex-nowrap items-center justify-center gap-2 overflow-x-auto px-2 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:max-w-none md:flex-none md:flex-wrap md:justify-start md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
          aria-label="Contact and profiles"
        >
          {links.map(({ href, label, Icon }) => {
            const inner = <Icon className="size-[1.125rem]" aria-hidden />;
            if (href.startsWith("mailto:")) {
              return (
                <a
                  key={label}
                  href={href}
                  className={iconButtonClass}
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
                className={iconButtonClass}
                aria-label={label}
              >
                {inner}
              </Link>
            );
          })}
        </nav>

        <p className="cursor-default select-none text-center text-[10px] uppercase tracking-[0.2em] text-on-background opacity-20 transition-opacity md:text-right md:shrink-0 hover:opacity-60">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
