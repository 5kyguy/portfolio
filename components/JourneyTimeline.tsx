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
    <div className="space-y-8">
      {journey.map((item) => {
        const img = item.image ? IMAGE_MAP[item.image] : undefined;
        const websiteUrl = organizationWebsiteUrl(item);
        const extraLinks = item.links.filter((l) => {
          if (websiteUrl && l.url === websiteUrl) return false;
          if (websiteUrl && /^website$/i.test(l.label.trim())) return false;
          return true;
        });

        return (
          <article
            key={`${item.period}-${item.organization}`}
            className="image-rgb-hover-group grid gap-6 border border-outline-variant/15 bg-surface-container-low p-6 md:grid-cols-[minmax(8rem,18%)_minmax(0,1fr)] md:gap-8 md:p-8"
          >
            <div className="min-w-0">
              {img ? (
                <div className="image-rgb-box relative aspect-[16/10] overflow-hidden bg-surface-container">
                  <Image
                    alt={item.organization}
                    src={img}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 18vw, 216px"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/10] items-center justify-center bg-surface-container p-6">
                  <span className="font-label text-[10px] uppercase tracking-[0.24em] text-outline">
                    {item.period}
                  </span>
                </div>
              )}
            </div>

            <div>
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-[0.24em] text-primary">
                    {item.role}
                  </p>
                  <h3 className="mt-2 font-headline text-3xl font-light tracking-tight">
                    {websiteUrl ? (
                      <Link
                        href={websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors hover:text-primary"
                      >
                        {item.organization}
                      </Link>
                    ) : (
                      item.organization
                    )}
                  </h3>
                </div>
                <div className="text-left md:text-right">
                  <p className="font-label text-[10px] uppercase tracking-[0.24em] text-outline">
                    {item.period}
                  </p>
                  {item.location ? (
                    <p className="mt-2 text-sm text-on-surface-variant">
                      {item.location}
                    </p>
                  ) : null}
                </div>
              </div>

              {item.highlights.length > 0 ? (
                <div className="mt-5 space-y-3 text-sm leading-relaxed text-on-surface-variant">
                  {item.highlights.slice(0, 3).map((highlight) => (
                    <MarkdownContent key={highlight} content={highlight} />
                  ))}
                </div>
              ) : null}

              {item.stack.length > 0 ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.stack.map((tag) => (
                    <span
                      key={tag}
                      className="border border-outline-variant/20 px-3 py-1 font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}

              <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                {item.projects.length > 0 ? (
                  <div>
                    <p className="mb-2 font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                      Relevant work
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.projects.map((name) => (
                        <Link
                          key={name}
                          href={journeyProjectHref(name, projects)}
                          className="border border-outline-variant/25 bg-surface px-3 py-1.5 font-label text-[10px] uppercase tracking-[0.18em] text-on-surface-variant transition-colors hover:border-primary/40 hover:text-on-background"
                        >
                          {name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <span />
                )}

                {extraLinks.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {extraLinks.map((link) => (
                      <Link
                        key={`${link.label}-${link.url}`}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-label text-xs text-primary underline underline-offset-4 transition-colors hover:text-on-background"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
