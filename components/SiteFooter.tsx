import Link from "next/link";

type FooterProps = {
  className?: string;
};

export function SiteFooter({ className = "" }: FooterProps) {
  return (
    <footer
      className={`flex w-full flex-col items-center justify-between gap-4 border-t border-outline-variant/50 bg-transparent px-8 py-6 md:flex-row ${className}`}
    >
      <div className="font-body text-xs tracking-widest text-on-surface-variant uppercase">
        © Middle-earth Expeditions. All rights reserved.
      </div>
      <div className="flex items-center gap-8">
        <Link
          href="#"
          className="font-body scale-95 text-xs tracking-widest text-on-surface-variant uppercase transition-colors duration-200 hover:text-primary"
        >
          The Citadel
        </Link>
        <Link
          href="#"
          className="font-body scale-95 text-xs tracking-widest text-on-background uppercase transition-colors duration-200 hover:text-primary"
        >
          The Shire
        </Link>
        <Link
          href="#"
          className="font-body scale-95 text-xs tracking-widest text-on-surface-variant uppercase transition-colors duration-200 hover:text-primary"
        >
          Outer Rim
        </Link>
      </div>
    </footer>
  );
}
