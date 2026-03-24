import Link from "next/link";

type FooterProps = {
  className?: string;
};

export function SiteFooter({ className = "" }: FooterProps) {
  return (
    <footer
      className={`flex w-full flex-col items-center justify-center gap-6 border-t border-outline-variant/20 bg-surface-container-low px-8 py-20 font-label text-[10px] uppercase tracking-[0.2em] text-on-background dark:bg-background ${className}`}
    >
      <div className="flex flex-wrap justify-center gap-x-12 gap-y-2">
        <Link
          href="https://github.com"
          className="opacity-40 transition-opacity duration-500 hover:text-primary hover:opacity-100"
        >
          GitHub
        </Link>
        <Link
          href="#"
          className="opacity-40 transition-opacity duration-500 hover:text-primary hover:opacity-100"
        >
          Matrix
        </Link>
        <Link
          href="#"
          className="opacity-40 transition-opacity duration-500 hover:text-primary hover:opacity-100"
        >
          Warpcast
        </Link>
      </div>
      <p className="cursor-default select-none opacity-20 transition-opacity hover:opacity-60">
        © 1138 The Archives. All rights reserved.
      </p>
    </footer>
  );
}
