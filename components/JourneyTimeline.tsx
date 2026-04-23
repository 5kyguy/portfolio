import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import imgLampros from "../assets/journey/lamprostech.png";
import imgSvnit from "../assets/journey/svnit.png";
import imgVl2g from "../assets/journey/vl2g.png";
import imgWictronix from "../assets/journey/wictronix.png";
import { MarkdownContent } from "@/components/MarkdownContent";
import { journeyProjectHref } from "@/lib/projectAnchor";
import type { JourneyItem, ProjectItem } from "@/lib/parser";

const IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/journey/lamprostech.png": imgLampros,
  "/assets/journey/svnit.png": imgSvnit,
  "/assets/journey/vl2g.png": imgVl2g,
  "/assets/journey/wictronix.png": imgWictronix,
};

function organizationWebsiteUrl(item: JourneyItem): string | undefined {
  if (item.orgUrl?.trim()) return item.orgUrl.trim();
  const fromLabel = item.links.find((l) => /^website$/i.test(l.label.trim()));
  if (fromLabel) return fromLabel.url;
  return item.links[0]?.url;
}

type JourneyTimelineProps = {
  journey: JourneyItem[];
  projects: ProjectItem[];
};

export function JourneyTimeline({ journey, projects }: JourneyTimelineProps) {
  return (
    <div className="relative space-y-32">
      {journey.map((item, idx) => {
        const img = item.image ? IMAGE_MAP[item.image] : undefined;
        const reverse = idx % 2 !== 0;
        const websiteUrl = organizationWebsiteUrl(item);
        const extraLinks = item.links.filter((l) => {
          if (websiteUrl && l.url === websiteUrl) return false;
          if (websiteUrl && /^website$/i.test(l.label.trim())) return false;
          return true;
        });

        return (
          <article
            key={`${item.period}-${item.organization}`}
            className="group grid grid-cols-1 items-center gap-8 lg:grid-cols-10"
          >
            <div
              className={`${img ? "overflow-hidden" : ""} ${reverse ? "order-1 lg:order-2 lg:col-span-4" : "lg:col-span-4"}`}
            >
              {img ? (
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    alt={item.organization}
                    src={img}
                    fill
                    className="image-rgb-hover object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface-container p-12">
                  <p className="font-headline text-center text-xl italic leading-relaxed text-on-surface-variant/40">
                    {item.period}
                  </p>
                </div>
              )}
            </div>
            <div
              className={`flex w-full flex-col justify-center lg:max-w-xl ${
                reverse ? "order-2 lg:order-1 lg:col-span-6 lg:ml-auto lg:text-right" : "lg:col-span-6 lg:mr-auto lg:text-left"
              }`}
            >
              <div
                className={`mb-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 ${
                  reverse ? "lg:justify-end" : ""
                }`}
              >
                <span className="font-label text-xs uppercase tracking-widest text-primary">{item.role}</span>
                {item.location && (
                  <span className="font-label text-[10px] uppercase tracking-wider text-on-surface-variant/50">
                    {item.location}
                  </span>
                )}
              </div>
              <h3 className={`font-headline mb-2 text-4xl ${reverse ? "lg:text-right" : ""}`}>
                {websiteUrl ? (
                  <Link
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-primary"
                  >
                    {item.organization}
                  </Link>
                ) : (
                  item.organization
                )}
              </h3>
              <p className={`font-label mb-6 text-xs text-on-surface-variant/60 ${reverse ? "lg:text-right" : ""}`}>
                {item.period}
              </p>
              {item.highlights.length > 0 && (
                <div
                  className={`font-body mb-6 space-y-3 text-sm leading-relaxed text-on-surface-variant ${
                    reverse ? "lg:text-right" : ""
                  }`}
                >
                  {item.highlights.map((h) => (
                    <MarkdownContent key={h} content={h} />
                  ))}
                </div>
              )}
              {item.notes && (
                <MarkdownContent
                  content={item.notes}
                  className={`font-body mb-6 text-sm italic leading-relaxed text-on-surface-variant/60 ${reverse ? "lg:text-right" : ""}`}
                />
              )}
              <div className={`flex flex-wrap gap-4 ${reverse ? "lg:justify-end" : ""}`}>
                {item.stack.map((tag) => (
                  <span
                    key={tag}
                    className="bg-surface-container-high px-4 py-1 font-label text-[10px] uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {item.projects.length > 0 && (
                <div className={`mt-6 ${reverse ? "lg:text-right" : ""}`}>
                  <span
                    className={`mb-2 block font-label text-[10px] uppercase tracking-widest text-outline ${
                      reverse ? "lg:inline-block" : ""
                    }`}
                  >
                    Projects
                  </span>
                  <div className={`flex flex-wrap gap-2 ${reverse ? "lg:justify-end" : ""}`}>
                    {item.projects.map((name) => (
                      <Link
                        key={name}
                        href={journeyProjectHref(name, projects)}
                        className="border border-outline-variant/25 bg-surface-container-low px-3 py-1.5 font-label text-[10px] uppercase tracking-wider text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-background"
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              {extraLinks.length > 0 && (
                <div className={`mt-4 flex flex-wrap gap-4 ${reverse ? "lg:justify-end" : ""}`}>
                  {extraLinks.map((link) => (
                    <Link
                      key={`${link.label}-${link.url}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-label text-xs text-primary underline underline-offset-4 transition-colors duration-300 hover:text-on-background"
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
  );
}
