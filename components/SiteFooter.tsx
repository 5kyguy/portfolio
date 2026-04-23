import { SocialLinks } from "@/components/SocialLinks";
import { getSiteData } from "@/lib/parser";

type FooterProps = {
  className?: string;
};

export function SiteFooter({ className = "" }: FooterProps) {
  const { socialLinks, name } = getSiteData();

  return (
    <footer
      className={`w-full border-t border-outline-variant/20 bg-surface-container-low px-6 py-12 font-label text-on-background dark:bg-background md:px-12 ${className}`}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-8 md:flex-row md:items-center md:justify-between md:gap-6">
        <SocialLinks social={socialLinks} />

        <p className="cursor-default select-none text-center text-[10px] uppercase tracking-[0.2em] text-on-background opacity-20 transition-opacity md:text-right md:shrink-0 hover:opacity-60">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
