import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import imgConfEthmumbai from "../../assets/conferences/ethmumbai2026.png";
import imgConfInterfaces from "../../assets/conferences/interfaces2025.png";
import imgConfPragma from "../../assets/conferences/pragmanewdelhi2025.png";
import imgHackConvergence from "../../assets/hackathons/convergence2026.png";
import imgHackEigen from "../../assets/hackathons/eigenlayermicrohacks2024.png";
import imgHackEthglobal from "../../assets/hackathons/ethglobalnewdelhi2025.png";
import imgHackEthonline from "../../assets/hackathons/ethonline2024.png";
import imgHackHackmoney from "../../assets/hackathons/hackmoney2026.png";
import imgHackHackatron from "../../assets/hackathons/hackatron72024.png";
import imgHackOpenhouse from "../../assets/hackathons/openhouse2025.png";
import imgHackSuper from "../../assets/hackathons/superhack2024.png";
import imgTalkBuilder from "../../assets/talks/builderlabs.png";
import imgTalkFusaka from "../../assets/talks/fusakaxspaces.png";
import imgTalkLampros from "../../assets/talks/lamprosdaoseminars.png";
import imgTalkOpenhouse from "../../assets/talks/openhouse.png";
import imgTalkTalent from "../../assets/talks/talentprotocol.png";
import { MarkdownContent } from "@/components/MarkdownContent";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { getSiteData } from "@/lib/parser";

export const metadata: Metadata = {
  title: "Other Works",
};

const HACKATHON_IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/hackathons/eigenlayermicrohacks2024.png": imgHackEigen,
  "/assets/hackathons/superhack2024.png": imgHackSuper,
  "/assets/hackathons/ethonline2024.png": imgHackEthonline,
  "/assets/hackathons/hackatron72024.png": imgHackHackatron,
  "/assets/hackathons/openhouse2025.png": imgHackOpenhouse,
  "/assets/hackathons/ethglobalnewdelhi2025.png": imgHackEthglobal,
  "/assets/hackathons/hackmoney2026.png": imgHackHackmoney,
  "/assets/hackathons/convergence2026.png": imgHackConvergence,
};

const CONFERENCE_IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/conferences/interfaces2025.png": imgConfInterfaces,
  "/assets/conferences/pragmanewdelhi2025.png": imgConfPragma,
  "/assets/conferences/ethmumbai2026.png": imgConfEthmumbai,
};

const TALK_IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/talks/talentprotocol.png": imgTalkTalent,
  "/assets/talks/lamprosdaoseminars.png": imgTalkLampros,
  "/assets/talks/openhouse.png": imgTalkOpenhouse,
  "/assets/talks/fusakaxspaces.png": imgTalkFusaka,
  "/assets/talks/builderlabs.png": imgTalkBuilder,
};

const TALK_FALLBACK_IMAGES = [
  imgTalkTalent,
  imgTalkLampros,
  imgTalkOpenhouse,
  imgTalkFusaka,
  imgTalkBuilder,
];

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

        <section className="-mx-6 mb-32 bg-surface-container-low px-6 py-24 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24">
          <div className="mb-16 flex items-baseline justify-between">
            <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              01 / Hackathons
            </h2>
            <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
          </div>
          <div className="flex flex-col gap-16">
            {hackathons.map((h) => {
              const img = h.image ? HACKATHON_IMAGE_MAP[h.image] : undefined;
              return (
                <article
                  key={`${h.title}-${h.date}`}
                  className="group grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-5">
                    {img ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-high">
                        <Image
                          alt={h.title}
                          src={img}
                          fill
                          className="image-rgb-hover object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] w-full items-center justify-center border border-outline-variant/15 bg-surface p-8">
                        <span className="font-label text-[10px] uppercase tracking-widest text-outline">
                          {h.date}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-7">
                    <span className="font-label mb-2 block text-[10px] uppercase tracking-widest text-secondary">
                      {h.date}
                    </span>
                    <h3 className="font-headline mb-4 text-2xl font-light md:text-3xl">{h.title}</h3>
                    <MarkdownContent
                      content={h.description}
                      className="font-body mb-6 text-sm leading-relaxed text-on-surface-variant"
                    />
                    {h.links.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {h.links.map((link) => (
                          <Link
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="border border-outline-variant/30 px-4 py-2 font-label text-[10px] uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-on-primary"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-32">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              02 / Conferences
            </h2>
            <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
          </div>
          <div className="flex flex-col gap-20">
            {conferences.map((c) => {
              const img = c.image ? CONFERENCE_IMAGE_MAP[c.image] : undefined;
              return (
                <article
                  key={`${c.title}-${c.date}`}
                  className={`group grid grid-cols-1 gap-8 lg:items-center ${img ? "lg:grid-cols-12" : ""}`}
                >
                  {img ? (
                    <div className="lg:col-span-4">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-container-low">
                        <Image
                          alt={c.title}
                          src={img}
                          fill
                          className="image-rgb-hover object-cover"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                        />
                      </div>
                      <p className="font-label mt-4 text-sm text-on-surface-variant">{c.date}</p>
                    </div>
                  ) : null}
                  <div className={img ? "lg:col-span-8" : ""}>
                    {!img && (
                      <p className="font-label mb-3 text-sm text-on-surface-variant">{c.date}</p>
                    )}
                    <h3 className="font-headline mb-4 text-3xl font-light md:text-4xl">{c.title}</h3>
                    <MarkdownContent
                      content={c.description}
                      className="font-body mb-6 text-base leading-relaxed text-on-surface-variant"
                    />
                    {c.links.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {c.links.map((link) => (
                          <Link
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-label text-xs uppercase tracking-[0.2em] text-primary underline underline-offset-4 transition-colors hover:text-on-background"
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="mb-32">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              03 / Talks &amp; Contributions
            </h2>
            <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {talks.map((t, i) => {
              const bg =
                (t.image && TALK_IMAGE_MAP[t.image]) || TALK_FALLBACK_IMAGES[i % TALK_FALLBACK_IMAGES.length];
              return (
                <div
                  key={t.title}
                  className="group relative flex h-[400px] flex-col overflow-hidden bg-surface-container-high"
                >
                  <Image
                    alt={t.title}
                    src={bg}
                    fill
                    className="image-rgb-hover object-cover opacity-35 transition-opacity duration-700 group-hover:opacity-20"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="relative z-10 mt-auto flex flex-col justify-end p-8">
                    <span className="font-label mb-2 text-[10px] uppercase tracking-widest text-primary">
                      {t.date}
                    </span>
                    <h4 className="font-headline mb-2 text-3xl">{t.title}</h4>
                    <MarkdownContent
                      content={t.description}
                      className="font-body mb-4 text-sm text-on-surface-variant [&_a]:text-on-background"
                    />
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
