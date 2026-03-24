import type { Metadata } from "next";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Experiences",
};

const BG_TEXTURE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCqMFwYIo5wFU1Ay5o6bINbKeFIwTOIpBmmH9Ma8xRiVQHj1FHnKltTOIUTqH01kXoohSHNYEnBGM_RmtAWYoCHX7OuL6hpnieeKSK0rKtskYyiCJw34tDVsiN38CElaDasCatMqb6cUSejhpLLZK90wEyg4FB2g03VY0z49NFWbKkXx7vOwI0pCbwwtJPsjz1Itsgn27TqVlRhCBeu4EQuZfb8Q3H1okSwb7Y-hnz7xPkPhPuBl8rRA5Ja3cf71li-EN_7hjpeeqs";

export default function ExperiencesPage() {
  return (
    <div className="relative bg-background font-body text-on-surface">
      <SiteNav />
      <main className="scroll-container pt-24 pb-32">
        <div className="mx-auto max-w-3xl px-6">
          <header className="mb-20 text-center">
            <h1 className="font-headline mb-4 text-5xl text-on-surface md:text-6xl">
              Chronicles of Duty
            </h1>
            <p className="font-label text-sm tracking-[0.3em] text-outline uppercase">
              A Tactical Log of Professional Engagements
            </p>
            <div className="mt-8 flex justify-center">
              <div className="h-px w-24 bg-outline-variant" />
            </div>
          </header>
          <div className="relative">
            <div className="timeline-line absolute top-0 bottom-0 left-0 transform md:left-1/2 md:-translate-x-1/2" />
            <div className="relative space-y-24">
              <div className="relative flex flex-col items-start md:flex-row md:items-center">
                <div className="hidden w-1/2 pr-12 text-right md:block">
                  <span className="font-label text-sm tracking-widest text-outline-variant uppercase">
                    Third Age 3018 — 3019
                  </span>
                </div>
                <div className="absolute top-0 left-[-4px] h-2 w-2 rounded-full bg-secondary ring-4 ring-surface md:left-1/2 md:-translate-x-1/2" />
                <div className="w-full pl-8 md:w-1/2 md:pl-12">
                  <span className="font-label mb-2 block text-xs tracking-widest text-outline-variant uppercase md:hidden">
                    Third Age 3018 — 3019
                  </span>
                  <h3 className="font-headline mb-1 text-2xl text-on-surface italic">
                    Captain of the Fellowship
                  </h3>
                  <p className="font-label mb-3 text-xs tracking-wider text-secondary uppercase">
                    The White Council • Gondor
                  </p>
                  <p className="max-w-md text-sm leading-relaxed text-on-surface-variant">
                    Led a diverse tactical unit through high-risk territories.
                    Strategic oversight of logistics, stealth operations, and
                    diplomatic negotiation between disparate factions.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col items-start md:flex-row-reverse md:items-center">
                <div className="hidden w-1/2 pl-12 text-left md:block">
                  <span className="font-label text-sm tracking-widest text-outline-variant uppercase">
                    Third Age 3001 — 3017
                  </span>
                </div>
                <div className="absolute top-0 left-[-4px] h-2 w-2 rounded-full bg-primary ring-4 ring-surface md:left-1/2 md:-translate-x-1/2" />
                <div className="w-full pl-8 md:w-1/2 md:pr-12 md:pl-0 md:text-right">
                  <span className="font-label mb-2 block text-xs tracking-widest text-outline-variant uppercase md:hidden">
                    Third Age 3001 — 3017
                  </span>
                  <h3 className="font-headline mb-1 text-2xl text-on-surface italic">
                    Chief Ranger
                  </h3>
                  <p className="font-label mb-3 text-xs tracking-wider text-secondary uppercase">
                    The Dunedain • Northern Realms
                  </p>
                  <p className="max-w-md text-sm leading-relaxed text-on-surface-variant md:ml-auto">
                    Conducted long-range reconnaissance and border security.
                    Specialized in survivalist techniques, threat assessment, and
                    intelligence gathering across wilderness sectors.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col items-start md:flex-row md:items-center">
                <div className="hidden w-1/2 pr-12 text-right md:block">
                  <span className="font-label text-sm tracking-widest text-outline-variant uppercase">
                    Second Age 2941
                  </span>
                </div>
                <div className="absolute top-0 left-[-4px] h-2 w-2 rounded-full bg-primary ring-4 ring-surface md:left-1/2 md:-translate-x-1/2" />
                <div className="w-full pl-8 md:w-1/2 md:pl-12">
                  <span className="font-label mb-2 block text-xs tracking-widest text-outline-variant uppercase md:hidden">
                    Second Age 2941
                  </span>
                  <h3 className="font-headline mb-1 text-2xl text-on-surface italic">
                    Vanguard Scout
                  </h3>
                  <p className="font-label mb-3 text-xs tracking-wider text-secondary uppercase">
                    The Iron Hills Garrison
                  </p>
                  <p className="max-w-md text-sm leading-relaxed text-on-surface-variant">
                    Deployed for rapid response during the Battle of Five Armies.
                    Provided critical terrain analysis and coordinated
                    communications between infantry divisions.
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col items-start md:flex-row-reverse md:items-center">
                <div className="hidden w-1/2 pl-12 text-left md:block">
                  <span className="font-label text-sm tracking-widest text-outline-variant uppercase">
                    Legacy Records
                  </span>
                </div>
                <div className="absolute top-0 left-[-4px] h-2 w-2 rounded-full bg-primary ring-4 ring-surface md:left-1/2 md:-translate-x-1/2" />
                <div className="w-full pl-8 md:w-1/2 md:pr-12 md:pl-0 md:text-right">
                  <span className="font-label mb-2 block text-xs tracking-widest text-outline-variant uppercase md:hidden">
                    Legacy Records
                  </span>
                  <h3 className="font-headline mb-1 text-2xl text-on-surface italic">
                    Archival Scribe
                  </h3>
                  <p className="font-label mb-3 text-xs tracking-wider text-secondary uppercase">
                    Library of Minas Tirith
                  </p>
                  <p className="max-w-md text-sm leading-relaxed text-on-surface-variant md:ml-auto">
                    Managed ancient manuscript restoration and genealogy
                    verification. Developed a comprehensive indexing system for
                    historical scrolls and cartographic assets.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <footer className="mt-32 flex w-full flex-col items-center justify-between gap-4 border-t border-outline-variant/50 px-8 py-6 md:flex-row">
            <div className="hidden">The Archives</div>
            <div className="font-body text-xs tracking-widest text-on-surface-variant uppercase">
              © Middle-earth Expeditions. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a
                className="font-body scale-95 text-xs tracking-widest text-on-surface-variant uppercase transition-colors duration-200 hover:text-primary"
                href="#"
              >
                The Citadel
              </a>
              <a
                className="font-body scale-95 text-xs tracking-widest text-on-surface-variant uppercase transition-colors duration-200 hover:text-primary"
                href="#"
              >
                The Shire
              </a>
              <a
                className="font-body scale-95 text-xs tracking-widest text-on-surface-variant uppercase transition-colors duration-200 hover:text-primary"
                href="#"
              >
                Outer Rim
              </a>
            </div>
          </footer>
        </div>
      </main>
      <div
        className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.03]"
        style={{ backgroundImage: `url("${BG_TEXTURE}")` }}
        aria-hidden
      />
    </div>
  );
}
