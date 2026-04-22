import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import imgP1 from "../../assets/projects/triggerx.png";
import imgP2 from "../../assets/projects/flowforge.png";
import imgP3 from "../../assets/projects/pptgen.png";
import imgP4 from "../../assets/projects/dqcare.png";
import imgP5 from "../../assets/projects/r2d2.png";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ProjectInfoTabs } from "@/components/ProjectInfoTabs";
import { ProjectTitleBlock } from "@/components/ProjectTitleBlock";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { getSiteData } from "@/lib/parser";
import { projectAnchorSlug } from "@/lib/projectAnchor";

export const metadata: Metadata = {
  title: "Projects",
};

const IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/projects/triggerx.png": imgP1,
  "/assets/projects/flowforge.png": imgP2,
  "/assets/projects/pptgen.png": imgP3,
  "/assets/projects/dqcare.png": imgP4,
  "/assets/projects/r2d2.png": imgP5,
};

type FeaturedProjectLayout = {
  isTextLeft: boolean;
};

const FEATURED_LAYOUTS: FeaturedProjectLayout[] = [
  { isTextLeft: true },
  { isTextLeft: false },
  { isTextLeft: true },
  { isTextLeft: false },
];

export default function ProjectsPage() {
  const { projects } = getSiteData();

  const featured = projects.filter((p) => p.image);
  const rest = projects.filter((p) => !p.image);

  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="px-6 pb-24 pt-32 md:px-12 lg:px-24">
        <header className="mb-24 max-w-4xl">
          <h1 className="font-headline mb-8 text-6xl font-light tracking-tight md:text-8xl">
            Selected Works
          </h1>
          <p className="font-body max-w-xl text-lg leading-relaxed text-on-surface-variant">
            Technical architectures, decentralized protocols, and open-source
            tooling built across Web3 and beyond.
          </p>
        </header>

        <section className="flex flex-col gap-24">
          {featured.map((project, i) => {
            const { isTextLeft } = FEATURED_LAYOUTS[i % FEATURED_LAYOUTS.length];
            const img = project.image ? IMAGE_MAP[project.image] : undefined;

            return (
              <div
                key={project.name}
                id={projectAnchorSlug(project.name)}
                className={`group scroll-mt-28 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center ${
                  isTextLeft ? "md:[&>*:first-child]:order-1 md:[&>*:last-child]:order-2" : "md:[&>*:first-child]:order-2 md:[&>*:last-child]:order-1"
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-low">
                  {img && (
                    <Image
                      alt={project.name}
                      src={img}
                      fill
                      className="image-rgb-hover object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.02]"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className="flex flex-col space-y-4">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    {project.stack.slice(0, 3).join(" · ")}
                  </span>
                  <ProjectTitleBlock project={project} level={2} />
                  <MarkdownContent
                    content={project.description}
                    className="font-body max-w-md text-sm leading-relaxed text-on-surface-variant"
                  />
                  {project.highlights.length > 0 && (
                    <ul className="font-body max-w-md list-disc space-y-3 pl-5 text-sm leading-relaxed text-on-surface-variant">
                      {project.highlights.map((h) => (
                        <li key={h} className="list-item">
                          <MarkdownContent content={h} />
                        </li>
                      ))}
                    </ul>
                  )}
                  <ProjectInfoTabs project={project} />
                </div>
              </div>
            );
          })}
        </section>

        {rest.length > 0 && (
          <section className="mt-32">
            <div className="mb-12 flex items-baseline justify-between">
              <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
                Other Projects
              </h2>
              <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {rest.map((project) => (
                <div
                  key={project.name}
                  id={projectAnchorSlug(project.name)}
                  className="scroll-mt-28 border border-outline-variant/10 bg-surface-container-low p-8 transition-colors duration-500 hover:bg-surface-container-high"
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
                    <ul className="font-body mb-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-on-surface-variant">
                      {project.highlights.map((h) => (
                        <li key={h} className="list-item">
                          <MarkdownContent content={h} />
                        </li>
                      ))}
                    </ul>
                  )}
                  <ProjectInfoTabs project={project} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
