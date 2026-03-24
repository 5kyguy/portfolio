import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Other Works",
};

export default function OtherWorksPage() {
  return (
    <div className="min-h-screen bg-background font-body text-on-surface selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="mx-auto min-h-screen max-w-5xl px-8 pt-32 pb-24">
        <header className="mb-20">
          <span className="font-label mb-4 block text-xs tracking-[0.3em] text-outline uppercase">
            The Holocron
          </span>
          <h1 className="font-headline mb-6 text-6xl font-light tracking-tight text-on-surface italic md:text-7xl">
            Curated Records
          </h1>
          <p className="font-body max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            A non-exhaustive repository of speaking engagements, competitive
            engineering, and global summits attended throughout the journey.
          </p>
        </header>
        <div className="grid grid-cols-1 gap-16">
          <section aria-labelledby="cat-conferences">
            <div className="mb-8 flex items-baseline justify-between border-b border-outline-variant pb-4">
              <h2
                className="font-headline text-3xl font-medium text-on-surface"
                id="cat-conferences"
              >
                Conferences
              </h2>
              <span className="font-label text-sm text-outline">03 entries</span>
            </div>
            <div className="space-y-6">
              {[
                {
                  title: "Web Summit Lisbon",
                  sub: "Global Technology Summit & Future of UI/UX",
                  time: "Nov 2023",
                  place: "Lisbon, Portugal",
                },
                {
                  title: "Config by Figma",
                  sub: "Annual Design Conference & Systems Lab",
                  time: "Jun 2023",
                  place: "San Francisco, CA",
                },
                {
                  title: "Awwwards Conference",
                  sub: "Digital Design Excellence & Web Standards",
                  time: "Feb 2023",
                  place: "Amsterdam, NL",
                },
              ].map((row) => (
                <article
                  key={row.title}
                  className="group flex flex-col justify-between py-4 transition-transform duration-300 hover:translate-x-2 md:flex-row md:items-center"
                >
                  <div className="flex-1">
                    <h3 className="font-headline text-xl font-semibold text-on-surface transition-colors group-hover:text-tertiary">
                      {row.title}
                    </h3>
                    <p className="font-body text-on-surface-variant">{row.sub}</p>
                  </div>
                  <div className="mt-2 text-right md:mt-0">
                    <time className="font-label text-sm font-medium text-outline">
                      {row.time}
                    </time>
                    <span className="block text-xs text-on-tertiary-fixed-variant">
                      {row.place}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section aria-labelledby="cat-hackathons">
            <div className="mb-8 flex items-baseline justify-between border-b border-outline-variant pb-4">
              <h2
                className="font-headline text-3xl font-medium text-on-surface"
                id="cat-hackathons"
              >
                Hackathons
              </h2>
              <span className="font-label text-sm text-outline">02 entries</span>
            </div>
            <div className="space-y-6">
              <article className="group flex flex-col justify-between rounded-xl bg-surface-container-low px-4 py-6 transition-colors duration-300 hover:bg-surface-container md:flex-row md:items-center">
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-3">
                    <h3 className="font-headline text-xl font-semibold text-on-surface">
                      EthGlobal London
                    </h3>
                    <span className="rounded-full bg-secondary-container px-2 py-0.5 text-[10px] font-bold tracking-wider text-on-secondary-container uppercase">
                      Winner
                    </span>
                  </div>
                  <p className="font-body text-on-surface-variant">
                    Decentralized Storage Solutions & Zero Knowledge Proofs
                  </p>
                </div>
                <div className="mt-4 text-right md:mt-0">
                  <time className="font-label text-sm font-medium text-outline">
                    Mar 2024
                  </time>
                  <div className="mt-1 flex justify-end">
                    <span className="material-symbols-outlined text-lg text-tertiary">
                      military_tech
                    </span>
                  </div>
                </div>
              </article>
              <article className="group flex flex-col justify-between rounded-xl px-4 py-6 transition-colors duration-300 hover:bg-surface-container-low md:flex-row md:items-center">
                <div className="flex-1">
                  <h3 className="font-headline text-xl font-semibold text-on-surface">
                    NASA Space Apps
                  </h3>
                  <p className="font-body text-on-surface-variant">
                    Visualizing Lunar Telemetry Data for Citizen Science
                  </p>
                </div>
                <div className="mt-4 text-right md:mt-0">
                  <time className="font-label text-sm font-medium text-outline">
                    Oct 2022
                  </time>
                  <span className="block text-xs text-on-tertiary-fixed-variant">
                    Remote
                  </span>
                </div>
              </article>
            </div>
          </section>
          <section aria-labelledby="cat-talks">
            <div className="mb-8 flex items-baseline justify-between border-b border-outline-variant pb-4">
              <h2
                className="font-headline text-3xl font-medium text-on-surface"
                id="cat-talks"
              >
                Talks & Workshops
              </h2>
              <span className="font-label text-sm text-outline">03 entries</span>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="group relative rounded-2xl border border-outline-variant p-6 transition-colors hover:border-tertiary">
                <span className="material-symbols-outlined absolute top-6 right-6 text-outline transition-colors group-hover:text-tertiary">
                  podcasts
                </span>
                <h3 className="font-headline mb-2 pr-10 text-2xl font-semibold">
                  Minimalism in Scale
                </h3>
                <p className="font-body mb-6 text-sm leading-relaxed text-on-surface-variant">
                  Keynote on maintaining design integrity across enterprise-level
                  design systems.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                  </div>
                  <span className="font-label text-xs font-bold tracking-widest text-on-surface-variant uppercase">
                    MIT Media Lab
                  </span>
                </div>
              </div>
              <div className="group relative rounded-2xl border border-outline-variant p-6 transition-colors hover:border-tertiary">
                <span className="material-symbols-outlined absolute top-6 right-6 text-outline transition-colors group-hover:text-tertiary">
                  school
                </span>
                <h3 className="font-headline mb-2 pr-10 text-2xl font-semibold">
                  Future of Handoff
                </h3>
                <p className="font-body mb-6 text-sm leading-relaxed text-on-surface-variant">
                  Workshop teaching developers how to interpret complex motion
                  specs from Figma.
                </p>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container-highest">
                    <span className="material-symbols-outlined text-sm">
                      location_on
                    </span>
                  </div>
                  <span className="font-label text-xs font-bold tracking-widest text-on-surface-variant uppercase">
                    Creative Mornings
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <SiteFooter className="scale-95 duration-200" />
    </div>
  );
}
