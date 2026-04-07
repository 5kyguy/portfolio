import type { Metadata } from "next";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";
import imgP1 from "../../assets/projects/p1.jpg";
import imgP2 from "../../assets/projects/p2.jpg";
import imgP3 from "../../assets/projects/p3.jpg";
import imgP4 from "../../assets/projects/p4.jpg";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { ProjectTimelineModal } from "@/components/ProjectTimelineModal";
import { getSiteData } from "@/lib/parser";

export const metadata: Metadata = {
  title: "Projects",
};

const IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/projects/p1.jpg": imgP1,
  "/assets/projects/p2.jpg": imgP2,
  "/assets/projects/p3.jpg": imgP3,
  "/assets/projects/p4.jpg": imgP4,
};

const GRID_LAYOUTS = [
  {
    wrapper: "group cursor-pointer md:col-span-7",
    aspect: "aspect-[16/10]",
    sizes: "(max-width: 768px) 100vw, 58vw",
  },
  {
    wrapper: "group cursor-pointer md:col-span-4 md:col-start-9 md:mt-32",
    aspect: "aspect-[4/5]",
    sizes: "400px",
  },
  {
    wrapper: "group cursor-pointer md:col-span-5 md:mt-[-4rem]",
    aspect: "aspect-square",
    sizes: "(max-width: 768px) 100vw, 42vw",
  },
  {
    wrapper: "group cursor-pointer md:col-span-6 md:col-start-7",
    aspect: "aspect-[16/9]",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
] as const;

export default function ProjectsPage() {
  const { projects, socialLinks } = getSiteData();

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

        <section className="grid grid-cols-1 gap-y-24 md:grid-cols-12 md:gap-x-12">
          {featured.map((project, i) => {
            const layout = GRID_LAYOUTS[i % GRID_LAYOUTS.length];
            const img = project.image ? IMAGE_MAP[project.image] : undefined;
            const href = project.github ?? project.url ?? "#";

            return (
              <div key={project.name} className={layout.wrapper}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div
                    className={`relative mb-8 ${layout.aspect} overflow-hidden bg-surface-container-low`}
                  >
                    {img && (
                      <Image
                        alt={project.name}
                        src={img}
                        fill
                        className="object-cover opacity-80 grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                        sizes={layout.sizes}
                      />
                    )}
                  </div>
                </Link>
                <div className="flex flex-col space-y-2">
                  <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                    {project.stack.slice(0, 3).join(" · ")}
                  </span>
                  <h2 className="font-headline text-3xl font-light">
                    {project.name}
                  </h2>
                  <p className="font-body max-w-md text-sm leading-relaxed text-on-surface-variant">
                    {project.description}
                  </p>
                  {project.timeline.length > 0 && (
                    <ProjectTimelineModal
                      timeline={project.timeline}
                      projectName={project.name}
                    />
                  )}
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
                  className="border border-outline-variant/10 bg-surface-container-low p-8 transition-colors duration-500 hover:bg-surface-container-high"
                >
                  <h3 className="font-headline mb-3 text-2xl font-light">
                    {project.name}
                  </h3>
                  <p className="font-body mb-6 text-sm leading-relaxed text-on-surface-variant">
                    {project.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-3">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="bg-surface-container-high px-3 py-1 font-label text-[10px] uppercase tracking-tighter"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.githubLinks.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {project.githubLinks.map((githubLink, i) => (
                        <Link
                          key={githubLink}
                          href={githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-label text-xs text-primary underline underline-offset-4 transition-colors hover:text-on-background"
                        >
                          {i === 0 ? "GitHub" : `GitHub ${i + 1}`}
                        </Link>
                      ))}
                    </div>
                  )}
                  {project.timeline.length > 0 && (
                    <ProjectTimelineModal
                      timeline={project.timeline}
                      projectName={project.name}
                    />
                  )}
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
