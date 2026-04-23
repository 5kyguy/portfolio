import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import imgConfEthmumbai from "../assets/conferences/ethmumbai2026.png";
import imgConfInterfaces from "../assets/conferences/interfaces2025.png";
import imgConfPragma from "../assets/conferences/pragmanewdelhi2025.png";
import imgHackConvergence from "../assets/hackathons/convergence2026.png";
import imgHackEigen from "../assets/hackathons/eigenlayermicrohacks2024.png";
import imgHackEthglobal from "../assets/hackathons/ethglobalnewdelhi2025.png";
import imgHackEthonline from "../assets/hackathons/ethonline2024.png";
import imgHackHackmoney from "../assets/hackathons/hackmoney2026.png";
import imgHackHackatron from "../assets/hackathons/hackatron72024.png";
import imgHackOpenhouse from "../assets/hackathons/openhouse2025.png";
import imgHackSuper from "../assets/hackathons/superhack2024.png";
import { MarkdownContent } from "@/components/MarkdownContent";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { ProjectInfoTabs } from "@/components/ProjectInfoTabs";
import { ProjectTitleBlock } from "@/components/ProjectTitleBlock";
import { SocialLinks } from "@/components/SocialLinks";
import { SiteFooter } from "@/components/SiteFooter";
import {
  SiteNav,
  type SiteNavSection,
} from "@/components/SiteNav";
import { TypewriterName } from "@/components/TypewriterName";
import { getSiteData } from "@/lib/parser";
import { projectAnchorSlug } from "@/lib/projectAnchor";

export const metadata: Metadata = {
  title: "Portfolio",
};

import PORTRAIT from "../assets/portrait.png";
import imgP1 from "../assets/projects/triggerx.png";
import imgP2 from "../assets/projects/flowforge.png";
import imgP3 from "../assets/projects/pptgen.png";
import imgP4 from "../assets/projects/dqcare.png";
import imgP5 from "../assets/projects/r2d2.png";
import imgTalkBuilder from "../assets/talks/builderlabs.png";
import imgTalkFusaka from "../assets/talks/fusakaxspaces.png";
import imgTalkLampros from "../assets/talks/lamprosdaoseminars.png";
import imgTalkOpenhouse from "../assets/talks/openhouse.png";
import imgTalkTalent from "../assets/talks/talentprotocol.png";

const NAV_SECTIONS: SiteNavSection[] = [
  { id: "projects", label: "Projects" },
  { id: "talks", label: "Talks & Contributions" },
  { id: "events", label: "Conferences & Hackathons" },
  { id: "journey", label: "Journey" },
];

const PROFILE_IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/portrait.png": PORTRAIT,
};

const PROJECT_IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/projects/triggerx.png": imgP1,
  "/assets/projects/flowforge.png": imgP2,
  "/assets/projects/pptgen.png": imgP3,
  "/assets/projects/dqcare.png": imgP4,
  "/assets/projects/r2d2.png": imgP5,
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

const EXPERIENCE_IMAGE_MAP: Record<string, StaticImageData> = {
  ...HACKATHON_IMAGE_MAP,
  ...CONFERENCE_IMAGE_MAP,
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

type FeaturedProjectLayout = {
  isTextLeft: boolean;
};

const FEATURED_LAYOUTS: FeaturedProjectLayout[] = [
  { isTextLeft: true },
  { isTextLeft: false },
  { isTextLeft: true },
  { isTextLeft: false },
];

type SectionHeaderProps = {
  index: string;
  title: string;
  description?: string;
};

function SectionHeader({
  index,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <header className="mb-16 grid gap-6 border-b border-outline-variant/15 pb-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,28rem)] lg:items-end">
      <div>
        <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">
          {index}
        </span>
        <h2 className="mt-4 font-headline text-4xl font-light tracking-tight text-on-background md:text-6xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="font-body text-base leading-relaxed text-on-surface-variant lg:ml-auto lg:max-w-md">
          {description}
        </p>
      ) : null}
    </header>
  );
}

export default function HomePage() {
  const data = getSiteData();
  const profileImage = data.profileImage
    ? PROFILE_IMAGE_MAP[data.profileImage] ?? PORTRAIT
    : PORTRAIT;
  const featuredProjects = data.projects.filter((project) => project.image);
  const restProjects = data.projects.filter((project) => !project.image);

  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav
        sections={NAV_SECTIONS}
        brandName={data.name}
        profileImage={profileImage}
      />
      <main className="px-6 pb-24 md:px-12 lg:px-24">
        <section
          id="hero"
          className="-mx-6 flex min-h-dvh items-center px-6 pb-10 pt-28 md:-mx-12 md:px-12 md:pt-24 lg:-mx-24 lg:px-24"
        >
          <div className="grid w-full gap-10 md:grid-cols-2 md:items-center md:gap-12">
            <div className="group order-2 flex w-full items-center justify-center md:order-1">
              <div className="relative aspect-[4/5] w-full max-w-xl overflow-hidden bg-surface-container-low">
                <Image
                  alt={data.name}
                  src={profileImage}
                  fill
                  className="image-rgb-hover object-cover opacity-90 transition-opacity duration-700 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
              </div>
            </div>
            <div className="order-1 flex flex-col justify-center md:order-2 md:pl-8 lg:pl-12">
              <section className="max-w-2xl">
                <span className="mb-4 block font-label text-xs uppercase tracking-[0.3em] text-outline md:mb-5">
                  {data.tagline}
                </span>
                <h1 className="font-headline text-5xl font-light leading-none tracking-tighter text-on-background sm:text-6xl md:text-7xl lg:text-8xl">
                  <TypewriterName
                    className="font-headline text-5xl font-light leading-none tracking-tighter text-on-background sm:text-6xl md:text-7xl lg:text-8xl"
                    minWidthClassName="min-w-[12ch]"
                  />
                </h1>
                <MarkdownContent
                  content={data.bio}
                  className="mt-5 max-w-xl font-body text-lg font-light leading-relaxed text-on-surface-variant"
                />
                <SocialLinks
                  social={data.socialLinks}
                  className="mt-6 mx-0 justify-start overflow-visible px-0 pb-0"
                />
              </section>
              {data.stats.length > 0 && (
                <div className="mt-8 grid max-w-lg grid-cols-2 gap-6 border-t border-outline-variant/10 pt-5 md:gap-8">
                  {data.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="font-headline text-2xl italic">
                        {stat.value}
                      </div>
                      <div className="font-label text-[9px] uppercase tracking-widest text-outline">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="projects" className="scroll-mt-32 py-28">
          <SectionHeader
            index="01"
            title="Projects"
            description="Technical architectures, decentralized protocols, and open-source tooling built across Web3 and beyond."
          />
          <div className="flex flex-col gap-24">
            {featuredProjects.map((project, i) => {
              const { isTextLeft } =
                FEATURED_LAYOUTS[i % FEATURED_LAYOUTS.length];
              const img = project.image
                ? PROJECT_IMAGE_MAP[project.image]
                : undefined;

              return (
                <article
                  key={project.name}
                  id={projectAnchorSlug(project.name)}
                  className={`group scroll-mt-32 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center md:gap-10 ${
                    isTextLeft
                      ? "md:[&>*:first-child]:order-1 md:[&>*:last-child]:order-2"
                      : "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
                  }`}
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-low">
                    {img ? (
                      <Image
                        alt={project.name}
                        src={img}
                        fill
                        className="image-rgb-hover object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : null}
                  </div>
                  <div
                    className={`flex w-full flex-col space-y-4 md:max-w-md ${
                      isTextLeft
                        ? "md:mr-auto md:text-left"
                        : "md:ml-auto md:text-right"
                    }`}
                  >
                    <span
                      className={`font-label text-[10px] uppercase tracking-[0.2em] text-outline ${
                        isTextLeft ? "" : "md:self-end"
                      }`}
                    >
                      {project.stack.slice(0, 3).join(" · ")}
                    </span>
                    <ProjectTitleBlock
                      project={project}
                      level={2}
                      align={isTextLeft ? "start" : "end"}
                    />
                    <MarkdownContent
                      content={project.description}
                      className="font-body text-sm leading-relaxed text-on-surface-variant"
                    />
                    {project.highlights.length > 0 && (
                      <div className="font-body space-y-3 text-sm leading-relaxed text-on-surface-variant">
                        {project.highlights.map((highlight) => (
                          <MarkdownContent
                            key={highlight}
                            content={highlight}
                          />
                        ))}
                      </div>
                    )}
                    <ProjectInfoTabs
                      project={project}
                      align={isTextLeft ? "start" : "end"}
                    />
                  </div>
                </article>
              );
            })}
          </div>

          {restProjects.length > 0 && (
            <div className="mt-28">
              <div className="mb-10 flex items-baseline justify-between">
                <h3 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
                  Other Projects
                </h3>
                <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                {restProjects.map((project) => (
                  <article
                    key={project.name}
                    id={projectAnchorSlug(project.name)}
                    className="scroll-mt-32 border border-outline-variant/10 bg-surface-container-low p-8 transition-colors duration-500 hover:bg-surface-container-high"
                  >
                    <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                      {project.stack.slice(0, 3).join(" · ")}
                    </span>
                    <div className="mb-4">
                      <ProjectTitleBlock project={project} level={3} />
                    </div>
                    <MarkdownContent
                      content={project.description}
                      className="font-body mb-4 text-sm leading-relaxed text-on-surface-variant"
                    />
                    {project.highlights.length > 0 && (
                      <div className="font-body mb-6 space-y-3 text-sm leading-relaxed text-on-surface-variant">
                        {project.highlights.map((highlight) => (
                          <MarkdownContent
                            key={highlight}
                            content={highlight}
                          />
                        ))}
                      </div>
                    )}
                    <ProjectInfoTabs project={project} />
                  </article>
                ))}
              </div>
            </div>
          )}
        </section>

        <section id="talks" className="scroll-mt-32 py-28">
          <SectionHeader
            index="02"
            title="Talks & Contributions"
            description="Public talks, community sessions, and moments where the work reached people beyond the codebase."
          />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {data.talks.map((talk, i) => {
              const backgroundImage =
                (talk.image && TALK_IMAGE_MAP[talk.image]) ||
                TALK_FALLBACK_IMAGES[i % TALK_FALLBACK_IMAGES.length];

              return (
                <article
                  key={talk.title}
                  className="group relative flex h-[400px] flex-col overflow-hidden bg-surface-container-high"
                >
                  <Image
                    alt={talk.title}
                    src={backgroundImage}
                    fill
                    className="image-rgb-hover object-cover opacity-35 transition-opacity duration-700 group-hover:opacity-20"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="relative z-10 mt-auto flex flex-col justify-end p-8">
                    <span className="mb-2 font-label text-[10px] uppercase tracking-widest text-primary">
                      {talk.date}
                    </span>
                    <h3 className="mb-2 font-headline text-3xl font-light">
                      {talk.title}
                    </h3>
                    <MarkdownContent
                      content={talk.description}
                      className="font-body mb-4 text-sm text-on-surface-variant [&_a]:text-on-background"
                    />
                    <div className="flex flex-wrap gap-3">
                      {talk.links.map((link) => (
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
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="events"
          className="-mx-6 scroll-mt-32 bg-surface-container-low px-6 py-28 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24"
        >
          <SectionHeader
            index="03"
            title="Conferences & Hackathons"
            description="A chronological event trail across build sprints and conference rooms, from shipping prototypes under pressure to learning from the people around them."
          />
          <div className="flex flex-col gap-16">
            {data.experienceEvents.map((event) => {
              const img = event.image
                ? EXPERIENCE_IMAGE_MAP[event.image]
                : undefined;
              const typeLabel =
                event.kind === "conference" ? "Conference" : "Hackathon";

              return (
                <article
                  key={`${event.kind}-${event.title}-${event.date}`}
                  className="group grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center"
                >
                  <div className="md:col-span-5">
                    {img ? (
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-high">
                        <Image
                          alt={event.title}
                          src={img}
                          fill
                          className="image-rgb-hover object-cover"
                          sizes="(max-width: 768px) 100vw, 40vw"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] w-full items-center justify-center border border-outline-variant/15 bg-surface p-8">
                        <span className="font-label text-[10px] uppercase tracking-widest text-outline">
                          {event.date}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="md:col-span-7">
                    <div className="mb-2 flex flex-wrap items-center gap-x-4 gap-y-1">
                      <span className="font-label text-[10px] uppercase tracking-widest text-secondary">
                        {event.date}
                      </span>
                      <span className="font-label text-[10px] uppercase tracking-widest text-outline">
                        {typeLabel}
                      </span>
                    </div>
                    <h3 className="mb-4 font-headline text-2xl font-light md:text-3xl">
                      {event.title}
                    </h3>
                    <MarkdownContent
                      content={event.description}
                      className="font-body mb-6 text-sm leading-relaxed text-on-surface-variant"
                    />
                    {event.links.length > 0 && (
                      <div className="flex flex-wrap gap-3">
                        {event.links.map((link) => (
                          <Link
                            key={`${link.label}-${link.url}`}
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

        <section id="journey" className="scroll-mt-32 py-28">
          <SectionHeader
            index="04"
            title="Journey"
            description="The timeline of the teams, labs, and projects that shaped how I build, ship, and learn."
          />
          <JourneyTimeline journey={data.journey} projects={data.projects} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
