import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Me",
};

const PORTRAIT =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBSDgpAnAB-LD1GWT_xZNRp4g2632hDdgLdVAYmKJEfCZhwBK7yIejq0uAJV0KepR3JzLnqMCWFWkXqlXSIXl4HwOGmETUk79dfsGa0wO2WriGso6f7m_NX_98U5DYAb1bfzWhYl21tE7hsKBOInoYnxYfSLz5Wih8f4SIwDCSqPE0OZ9Oq3PYH_JzZ2dgYf-srnAQeGlHr2CkvG9D_TfoB0l7cITjFC8SGT5ZM7qhCCSUAS4hPUxH9icpda9Ux9T0BfSwAIiGqod8";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="flex min-h-[calc(100vh-1px)] w-full flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-28 md:flex-row md:px-12 md:pt-24">
        <div className="flex h-full w-full items-center justify-center p-8 md:w-1/2">
          <div className="group relative aspect-[4/5] w-full max-w-lg overflow-hidden bg-surface-container-low">
            <Image
              alt="Portrait"
              src={PORTRAIT}
              fill
              className="object-cover opacity-80 grayscale transition-opacity duration-700 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          </div>
        </div>
        <div className="flex h-full w-full flex-col justify-center space-y-12 md:w-1/2 md:pl-16">
          <section className="max-w-xl space-y-6">
            <span className="font-label text-xs uppercase tracking-[0.3em] text-outline">
              Open Source &amp; Decentralization
            </span>
            <h1 className="font-headline text-6xl font-light leading-none tracking-tighter text-on-background md:text-8xl">
              Code is <br />
              <i className="font-headline">Speech.</i>
            </h1>
            <p className="font-body max-w-md text-lg font-light leading-relaxed text-on-surface-variant">
              A FOSS developer and Web3 engineer dedicated to digital sovereignty.
              Specializing in secure smart contract development and contributing
              to core open-source infrastructure for a decentralized future.
            </p>
          </section>
          <div className="flex flex-col space-y-8">
            <div className="flex flex-col space-y-4">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                Peer-to-Peer Networks
              </span>
              <ul className="flex flex-col space-y-3 font-label text-sm">
                <li>
                  <a
                    className="group flex items-center space-x-4 text-primary transition-colors duration-300"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-sm">
                      terminal
                    </span>
                    <span className="border-b border-primary">
                      GitHub / @foster-foss
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="group flex items-center space-x-4 text-on-surface-variant transition-colors duration-300 hover:text-primary"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-sm">
                      alternate_email
                    </span>
                    <span className="border-b border-outline-variant/30 transition-colors group-hover:border-primary">
                      Twitter / @sovereign_dev
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    className="group flex items-center space-x-4 text-on-surface-variant transition-colors duration-300 hover:text-primary"
                    href="#"
                  >
                    <span className="material-symbols-outlined text-sm">hub</span>
                    <span className="border-b border-outline-variant/30 transition-colors group-hover:border-primary">
                      Farcaster &amp; Lens / @protocol_zero
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="grid max-w-sm grid-cols-2 gap-8 border-t border-outline-variant/10 pt-8">
            <div>
              <div className="font-headline text-2xl italic">2.4k+</div>
              <div className="font-label text-[9px] uppercase tracking-widest text-outline">
                Open Source Contributions
              </div>
            </div>
            <div>
              <div className="font-headline text-2xl italic">42</div>
              <div className="font-label text-[9px] uppercase tracking-widest text-outline">
                Smart Contracts Deployed
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
