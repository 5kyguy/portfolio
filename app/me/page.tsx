import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Me",
};

export default function MePage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-body text-on-surface selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="flex flex-grow items-center justify-center px-6 pt-16 md:px-12">
        <div className="grid w-full max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-12 md:gap-24">
          <section className="space-y-8 md:col-span-8">
            <header>
              <h1 className="font-headline text-5xl leading-tight text-on-surface-variant italic md:text-7xl">
                The Lore
              </h1>
            </header>
            <div className="max-w-2xl space-y-6">
              <p className="font-headline text-xl leading-relaxed text-on-surface/80 md:text-2xl">
                A digital archivist exploring the intersections of minimalism,
                cartography, and timeless design. Currently documenting the quiet
                corners of the digital realm from a small study overlooking the
                hills.
              </p>
              <p className="font-body text-base leading-relaxed font-light text-on-surface-variant/70">
                My work is defined by the spaces between the notes. I believe that
                a portfolio shouldn&apos;t just show what you&apos;ve done, but how
                you perceive the world. From the structured geometry of the
                Citadel to the organic warmth of the Shire, I seek balance in
                every pixel and every line of prose.
              </p>
            </div>
            <div className="group relative aspect-[21/9] w-full overflow-hidden rounded-xl shadow-sm">
              <Image
                alt="A minimalist desk setup with a single warm lamp and a notebook"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBPgnHbOyjnmlqYXG_u9w4OwJeszIDUT1nN2RDZ3VaDavhL7foBNcvCcwVBqnf0mzVRiMpCmJSww-WGh7NLhhFF8JuDcuiKgOVtXmfbAshTQ4VyZCLMXxgZDhWeK3kAIL1wCya2ihVWCOo_3QppjuiF8jfS7YWnxzYowH8YEAefdlnaYI1sYexCQRoFUEKLs2vtGYV-xHe16BORZQH68d8oGF23h5EnKfGmptYMViDXe_Om96VIIJz1BBdEqiSzXrsRhpj-lqwH9Jw"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 896px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/40 to-transparent" />
            </div>
          </section>
          <aside className="flex h-full flex-col justify-center md:col-span-4">
            <div className="space-y-12">
              <div className="space-y-4">
                <span className="font-label text-[10px] tracking-[0.2em] text-outline uppercase">
                  Digital Presence
                </span>
                <ul className="space-y-6">
                  {[
                    [
                      "alternate_email",
                      "Correspondence",
                    ] as const,
                    ["terminal", "Repositories"] as const,
                    ["camera", "Photogrammetry"] as const,
                    ["history_edu", "Journal Entries"] as const,
                  ].map(([icon, label]) => (
                    <li key={label}>
                      <a
                        className="group flex items-center gap-4 text-on-surface transition-colors duration-300 hover:text-secondary"
                        href="#"
                      >
                        <span className="material-symbols-outlined text-outline transition-colors group-hover:text-secondary">
                          {icon}
                        </span>
                        <span className="font-headline text-2xl italic">
                          {label}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="border-t border-outline-variant/30 pt-8">
                <p className="font-label mb-2 text-[10px] tracking-[0.2em] text-outline uppercase">
                  Currently Located
                </p>
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm">
                    location_on
                  </span>
                  <span className="text-sm font-medium">
                    Borders of The Shire
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
