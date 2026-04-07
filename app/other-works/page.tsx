import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import imgTalkEth from "../../assets/others/talk-ethereum.jpg";
import imgTalkFoss from "../../assets/others/talk-foss.jpg";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { getSiteData } from "@/lib/parser";

export const metadata: Metadata = {
  title: "Other Works",
};

const TALK_IMAGES = [imgTalkFoss, imgTalkEth];
const TALK_IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/talks/talk-foss.jpg": imgTalkFoss,
  "/assets/talks/talk-ethereum.jpg": imgTalkEth,
  "/assets/others/talk-foss.jpg": imgTalkFoss,
  "/assets/others/talk-ethereum.jpg": imgTalkEth,
};

export default function OtherWorksPage() {
  const { conferences, hackathons, talks } = getSiteData();

  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="px-6 pb-20 pt-40 md:px-12 lg:px-24">
        <header className="mb-24">
          <h1 className="font-headline mb-8 text-6xl font-light tracking-tight md:text-8xl">
            Other Works
          </h1>
          <p className="font-body max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            Contributions beyond primary development &mdash; from hackathon
            sprints and conference attendance to public talks and community
            spaces.
          </p>
        </header>

        {/* ── Hackathons ─────────────────────────────────────────────── */}
        <section className="-mx-6 mb-32 bg-surface-container-low px-6 py-24 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24">
          <div className="mb-16 flex items-baseline justify-between">
            <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              01 / Hackathons
            </h2>
            <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {hackathons.map((h) => (
              <div
                key={`${h.date}-${h.event}`}
                className="flex items-start justify-between bg-surface p-8 transition-colors duration-500 hover:bg-surface-bright"
              >
                <div className="flex-1">
                  <span className="font-label mb-2 block text-[10px] uppercase tracking-widest text-secondary">
                    {h.date}
                  </span>
                  <h3 className="font-headline mb-1 text-xl font-light">
                    {h.event}
                  </h3>
                  <p className="font-body text-sm text-on-surface-variant">
                    {h.project}
                  </p>
                </div>
                <div className="ml-4 flex shrink-0 flex-col items-end gap-2">
                  {h.projectLink && (
                    <Link
                      href={h.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-outline-variant/30 px-4 py-2 font-label text-[10px] uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-on-primary"
                    >
                      Project
                    </Link>
                  )}
                  {h.links[0] && (
                    <Link
                      href={h.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label text-[10px] uppercase tracking-widest text-primary underline underline-offset-4 transition-colors hover:text-on-background"
                    >
                      Reference
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Conferences ────────────────────────────────────────────── */}
        <section className="mb-32">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              02 / Conferences
            </h2>
            <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
          </div>
          <div className="grid grid-cols-1 gap-16">
            {conferences.map((c) => (
              <article
                key={`${c.date}-${c.event}`}
                className="group grid grid-cols-1 items-start gap-8 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="font-label text-sm text-on-surface-variant">
                    {c.date}
                  </p>
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-headline text-3xl font-light transition-colors duration-500 group-hover:text-primary">
                    {c.event}
                  </h3>
                  {c.links[0] && (
                    <Link
                      href={c.links[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label mt-2 inline-block text-xs uppercase tracking-[0.2em] text-primary underline underline-offset-4 transition-colors hover:text-on-background"
                    >
                      Event
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Talks & Contributions ──────────────────────────────────── */}
        <section className="mb-32">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              03 / Talks &amp; Contributions
            </h2>
            <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {talks.map((t, i) => {
              const bg = (t.image && TALK_IMAGE_MAP[t.image]) || TALK_IMAGES[i % TALK_IMAGES.length];
              return (
                <div
                  key={t.title}
                  className="group relative h-[400px] overflow-hidden bg-surface-container-high"
                >
                  <Image
                    alt={t.title}
                    src={bg}
                    fill
                    className="object-cover opacity-30 transition-opacity duration-700 group-hover:opacity-10"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end p-8">
                    <span className="font-label mb-2 text-[10px] uppercase tracking-widest text-primary">
                      {t.date}
                    </span>
                    <h4 className="font-headline mb-2 text-3xl">{t.title}</h4>
                    <p className="font-body mb-4 text-sm text-on-surface-variant">
                      {t.description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      {t.links.map((link) => (
                        <Link
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-label text-xs text-primary underline underline-offset-4 transition-colors duration-300 hover:text-on-background"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
