import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import Link from "next/link";
import imgConfEthmumbai from "../assets/conferences/ethmumbai2026.png";
import imgConfInterfaces from "../assets/conferences/interfaces2025.png";
import imgConfPragma from "../assets/conferences/pragmanewdelhi2025.png";
import imgHackConvergence from "../assets/hackathons/convergence2026.png";
import imgHackEigen from "../assets/hackathons/eigenlayermicrohacks2024.png";
import imgHackEthonline from "../assets/hackathons/ethonline2024.png";
import imgHackHackmoney from "../assets/hackathons/hackmoney2026.png";
import imgHackHackatron from "../assets/hackathons/hackatron72024.png";
import imgHackOpenhouse from "../assets/hackathons/openhouse2025.png";
import imgHackSuperhack from "../assets/hackathons/superhack2024.png";
import { ContactForm } from "@/components/ContactForm";
import { ExperienceEventsSection } from "@/components/ExperienceEventsSection";
import { JourneyTimeline } from "@/components/JourneyTimeline";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ProjectsWorkSection } from "@/components/ProjectsWorkSection";
import { SocialLinks } from "@/components/SocialLinks";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav, type SiteNavSection } from "@/components/SiteNav";
import { TypewriterName } from "@/components/TypewriterName";
import { getSiteData } from "@/lib/parser";

export const metadata: Metadata = {
  title: {
    absolute: "Aakash Yadav · SkyGuy",
  },
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
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "talks", label: "Talks" },
  { id: "contact", label: "Contact" },
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

const EVENT_IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/hackathons/convergence2026.png": imgHackConvergence,
  "/assets/conferences/ethmumbai2026.png": imgConfEthmumbai,
  "/assets/hackathons/hackmoney2026.png": imgHackHackmoney,
  "/assets/conferences/pragmanewdelhi2025.png": imgConfPragma,
  "/assets/hackathons/openhouse2025.png": imgHackOpenhouse,
  "/assets/hackathons/hackatron72024.png": imgHackHackatron,
  "/assets/hackathons/eigenlayermicrohacks2024.png": imgHackEigen,
  "/assets/hackathons/ethonline2024.png": imgHackEthonline,
  "/assets/hackathons/superhack2024.png": imgHackSuperhack,
  "/assets/conferences/interfaces2025.png": imgConfInterfaces,
};

const TALK_IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/talks/talentprotocol.png": imgTalkTalent,
  "/assets/talks/lamprosdaoseminars.png": imgTalkLampros,
  "/assets/talks/openhouse.png": imgTalkOpenhouse,
  "/assets/talks/fusakaxspaces.png": imgTalkFusaka,
  "/assets/talks/builderlabs.png": imgTalkBuilder,
};

type SectionHeaderProps = {
  index?: string;
  title: string;
  description?: string;
};

function SectionHeader({ index, title, description }: SectionHeaderProps) {
  return (
    <header className="mb-12 grid gap-5 border-b border-outline-variant/15 pb-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:items-end">
      <div>
        {index ? (
          <span className="font-label text-[10px] uppercase tracking-[0.3em] text-primary">
            {index}
          </span>
        ) : null}
        <h2 className="mt-4 font-headline text-4xl font-light tracking-tight text-on-background md:text-5xl">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="font-body text-sm leading-relaxed text-on-surface-variant md:text-base lg:ml-auto lg:max-w-md">
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

  const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT?.trim();

  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav
        sections={NAV_SECTIONS}
        brandName={data.name}
        profileImage={profileImage}
      />

      <main className="px-6 pb-0 md:px-12 lg:px-24">
        <section
          id="hero"
          className="-mx-6 flex min-h-dvh items-center px-6 pb-14 pt-28 md:-mx-12 md:px-12 md:pt-24 lg:-mx-24 lg:px-24"
        >
          <div className="grid w-full gap-14 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:items-center">
            <div className="group image-rgb-hover-group flex justify-center md:justify-start">
              <div className="image-rgb-box relative aspect-[4/5] w-full max-w-[43.2rem] overflow-hidden bg-surface-container-low">
                <Image
                  alt={data.name}
                  src={profileImage}
                  fill
                  className="object-cover opacity-92 transition-opacity duration-700 group-hover:opacity-100"
                  sizes="(max-width: 768px) 100vw, 45vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/65 via-transparent to-transparent" />
              </div>
            </div>

            <div>
              <span className="block font-label text-[10px] uppercase tracking-[0.32em] text-primary">
                {data.tagline}
              </span>
              <div className="mt-6">
                <TypewriterName
                  className="font-headline text-5xl font-light tracking-tight text-on-surface-variant sm:text-6xl lg:text-7xl"
                  minWidthClassName="min-w-[11ch]"
                />
              </div>
              <div className="mt-5 w-full max-w-none space-y-6 md:max-w-3xl">
                {data.headline ? (
                  <p className="font-headline text-3xl font-light leading-[1.1] tracking-tight text-on-background sm:text-4xl lg:text-5xl">
                    {data.headline}
                  </p>
                ) : null}
                {data.subheadline ? (
                  <p className="text-lg leading-relaxed text-on-surface-variant">{data.subheadline}</p>
                ) : null}
                {data.bio ? (
                  <MarkdownContent
                    content={data.bio}
                    className="text-base leading-relaxed text-on-surface-variant"
                  />
                ) : null}
              </div>

              <SocialLinks social={data.socialLinks} className="mt-6 max-w-3xl" />

              {data.stats.length > 0 ? (
                <div className="mt-10 grid gap-5 border-t border-outline-variant/15 pt-6 sm:grid-cols-3">
                  {data.stats.map((stat) => (
                    <div key={stat.label}>
                      <p className="font-headline text-3xl font-light tracking-tight">
                        {stat.value}
                      </p>
                      <p className="mt-1 font-label text-[10px] uppercase tracking-[0.22em] text-outline">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section id="work" className="scroll-mt-32 py-24">
          <SectionHeader index="01" title="Selected Work" />
          <ProjectsWorkSection projects={data.projects} projectImageMap={PROJECT_IMAGE_MAP} />
        </section>

        <section id="experience" className="scroll-mt-32 py-24">
          <SectionHeader index="02" title="Experience" />
          <JourneyTimeline journey={data.journey} projects={data.projects} />
        </section>

        <section id="talks" className="scroll-mt-32 py-24">
          <SectionHeader index="03" title="Talks & Community" />

          <div className="grid gap-6 md:grid-cols-2">
            {data.talks.map((talk) => {
              const img = talk.image ? TALK_IMAGE_MAP[talk.image] : undefined;

              return (
                <article
                  key={talk.title}
                  className="image-rgb-hover-group grid gap-5 border border-outline-variant/12 bg-surface-container-low p-5 md:grid-cols-[minmax(14rem,46%)_minmax(0,1fr)] md:gap-6 md:p-6"
                >
                  <div className="min-w-0">
                    {img ? (
                      <div className="image-rgb-box relative aspect-[16/10] overflow-hidden bg-surface-container">
                        <Image
                          alt={talk.title}
                          src={img}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 46vw, 360px"
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-[16/10] items-center justify-center bg-surface-container">
                        <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                          {talk.date}
                        </span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-[0.22em] text-primary">
                      {talk.date}
                    </p>
                    <h3 className="mt-2 font-headline text-2xl font-light tracking-tight">{talk.title}</h3>
                    <MarkdownContent
                      content={talk.description}
                      className="mt-3 text-sm leading-relaxed text-on-surface-variant"
                    />
                    <div className="mt-4 flex flex-wrap gap-2">
                      {talk.links.map((link) => (
                        <Link
                          key={`${talk.title}-${link.label}-${link.url}`}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-outline-variant/30 px-3 py-1.5 font-label text-[10px] uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-background"
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

          {data.experienceEvents.length > 0 ? (
            <div className="mt-16">
              <SectionHeader title="Conferences & Hackathons" />
              <ExperienceEventsSection events={data.experienceEvents} eventImageMap={EVENT_IMAGE_MAP} />
            </div>
          ) : null}
        </section>

        <section
          id="contact"
          className="-mx-6 scroll-mt-32 bg-surface-container-low px-6 pb-10 pt-24 md:-mx-12 md:px-12 md:pb-12 lg:-mx-24 lg:px-24"
        >
          <SectionHeader index="04" title="Contact" />

          <div>
            {data.contactIntent ? (
              <p className="w-full max-w-none font-headline text-2xl font-light leading-snug tracking-tight text-on-background md:text-3xl">
                {data.contactIntent}
              </p>
            ) : null}

            <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-stretch lg:gap-14">
              <div className="flex h-full min-h-0 flex-col">
                <SocialLinks
                  social={data.socialLinks}
                  layout="contactGrid"
                  className="max-w-md min-h-0 flex-1 lg:h-full"
                  ariaLabel="Profiles and contact links"
                />
              </div>
              <ContactForm endpoint={contactEndpoint} className="lg:flex lg:h-full lg:min-h-0 lg:flex-col" />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
