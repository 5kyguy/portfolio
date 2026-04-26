import { getSiteData } from "@/lib/parser";

type FooterProps = {
  className?: string;
};

export function SiteFooter({ className = "" }: FooterProps) {
  const { name } = getSiteData();

  return (
    <footer
      className={`w-full border-t border-outline-variant/20 bg-surface-container-low px-6 py-8 font-label text-on-background dark:bg-background md:px-12 ${className}`}
    >
      <div className="mx-auto max-w-7xl">
        <p className="cursor-default select-none text-center text-[10px] uppercase tracking-[0.2em] text-on-background opacity-35 transition-opacity hover:opacity-70">
          &copy; {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
