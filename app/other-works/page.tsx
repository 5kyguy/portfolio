import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Other Works",
};

const TALK_IMG = {
  foss: "https://lh3.googleusercontent.com/aida-public/AB6AXuDj7et3RBuTibSHwkbfEzPHFB8kEJs5HovCnHjp57DFSbxriPjHhgcfAdI39eZpTeKJ4eIoVnyGOtAlvyCk6CF6SnMgrYDJ2pe7wS0g66jcyG8nwEgoWTeu37l43x3fVdYLIFu5Yn7RouFasEPYsGewCianRL6TX919mik1Q40j39XnwmDH5Jy50rNVHpavF2tFByrTEAbM6QKfkhv4U9_o5ZZT64Jk9rAdNBuSesGxwEWPPxOE62kxVjTDJaB17FyrMIJNl7nHSok",
  eth: "https://lh3.googleusercontent.com/aida-public/AB6AXuBnYhlJKXtZHwQ4VySCfI3Kp9kwZmeAEB9u-YIs3mHkNzu2pBnvQqiMEW5b4g9frP3EcMHoK16wQRXbJITSY4cTEfNIkPMVOUmA9uMErCDqE5PTrnNKQnD-s7nFOs8EfkGusds1kIdFql0Z3NoOB-7QF69tV7E0C7cnF2J9DoJDRA0GcQBl8u3Vii0qXIe1bghbBiJ5bl-bEWQlTw65xq4B5xsxA3IPYgBrkXDd_EI-MNN89FnUbdCsUCfYkeLu6EL8XlWGWlaOjNg",
} as const;

export default function OtherWorksPage() {
  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="px-6 pb-20 pt-40 md:px-12 lg:px-24">
        <header className="mb-24">
          <h1 className="font-headline mb-8 text-6xl font-light tracking-tight md:text-8xl">
            Other Works
          </h1>
          <p className="font-body max-w-2xl text-lg leading-relaxed text-on-surface-variant">
            A curated selection of contributions beyond primary development. From
            public speaking at global conferences to intensive hackathon sprints
            and community spaces.
          </p>
        </header>

        <section className="mb-32">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              01 / Conferences
            </h2>
            <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
          </div>
          <div className="grid grid-cols-1 gap-16">
            {[
              {
                date: "NOVEMBER 2023",
                place: "ISTANBUL, TURKEY",
                title: "Devcon VI: Protocol Layer Privacy",
                body: "Presented research on zero-knowledge implementation at the protocol level for decentralized identity. Focused on balancing compliance with user anonymity.",
                cta: "View Talk",
              },
              {
                date: "FEBRUARY 2024",
                place: "BRUSSELS, BELGIUM",
                title: "FOSDEM: Decentralizing the Web",
                body: "Lightning talk on the evolution of peer-to-peer networking in the modern browser environment. Discussing Libp2p and the future of FOSS infrastructure.",
                cta: "Read Summary",
              },
              {
                date: "APRIL 2024",
                place: "SYDNEY, AUSTRALIA",
                title: "ETHGlobal Sydney: L2 Interoperability",
                body: "Technical workshop on cross-chain messaging patterns and the architecture of shared sequencers for Ethereum layer 2 solutions.",
                cta: "View Workshop",
              },
            ].map((row) => (
              <article
                key={row.title}
                className="group grid grid-cols-1 items-start gap-8 md:grid-cols-12"
              >
                <div className="md:col-span-3">
                  <p className="font-label text-sm text-on-surface-variant">
                    {row.date}
                  </p>
                  <p className="font-body mt-1 text-xs text-secondary">
                    {row.place}
                  </p>
                </div>
                <div className="md:col-span-6">
                  <h3 className="font-headline mb-4 text-3xl font-light transition-colors duration-500 group-hover:text-primary">
                    {row.title}
                  </h3>
                  <p className="font-body leading-relaxed text-on-surface-variant">
                    {row.body}
                  </p>
                </div>
                <div className="flex md:col-span-3 md:justify-end">
                  <button
                    type="button"
                    className="border border-outline-variant/30 px-6 py-3 font-label text-[10px] uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-on-primary"
                  >
                    {row.cta}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="-mx-6 mb-32 bg-surface-container-low px-6 py-24 md:-mx-12 md:px-12 lg:-mx-24 lg:px-24">
          <div className="mb-16 flex items-baseline justify-between">
            <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              02 / Hackathons
            </h2>
            <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
          </div>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            <div className="bg-surface p-12 transition-colors duration-500 hover:bg-surface-bright">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <span className="font-label mb-2 block text-[10px] uppercase tracking-widest text-secondary">
                    1st Place Winner
                  </span>
                  <h3 className="font-headline text-4xl font-light">
                    ETH Paris Hackathon
                  </h3>
                </div>
                <span className="material-symbols-outlined text-primary">
                  trophy
                </span>
              </div>
              <p className="font-body mb-8 leading-relaxed text-on-surface-variant">
                Built &ldquo;Relay-Guard&rdquo;, an automated circuit breaker for DeFi
                protocols that mitigates flash loan attacks in real-time. Won top
                honors among 400+ developers.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Solidity", "Foundry", "TypeScript"].map((t) => (
                  <span
                    key={t}
                    className="bg-surface-container-high px-3 py-1 font-label text-[10px] uppercase tracking-tighter"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-surface p-12 transition-colors duration-500 hover:bg-surface-bright">
              <div className="mb-8 flex items-start justify-between">
                <div>
                  <span className="font-label mb-2 block text-[10px] uppercase tracking-widest text-secondary">
                    Finalist
                  </span>
                  <h3 className="font-headline text-4xl font-light">
                    Web3 Infinite
                  </h3>
                </div>
                <span className="material-symbols-outlined text-primary">
                  deployed_code
                </span>
              </div>
              <p className="font-body mb-8 leading-relaxed text-on-surface-variant">
                Developed a gas-less onboarding flow using Account Abstraction and
                social recovery via passkeys. Built from scratch in 36 hours.
              </p>
              <div className="flex flex-wrap gap-4">
                {["Rust", "EVM", "Wasm"].map((t) => (
                  <span
                    key={t}
                    className="bg-surface-container-high px-3 py-1 font-label text-[10px] uppercase tracking-tighter"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mb-32">
          <div className="mb-12 flex items-baseline justify-between">
            <h2 className="font-label text-xs uppercase tracking-[0.2em] text-primary">
              03 / Talks &amp; Spaces
            </h2>
            <span className="mx-8 h-px flex-grow bg-outline-variant/20" />
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="group relative h-[400px] overflow-hidden bg-surface-container-high">
              <Image
                alt="FOSS talk"
                src={TALK_IMG.foss}
                fill
                className="object-cover opacity-30 transition-opacity duration-700 group-hover:opacity-10"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="font-label mb-4 text-[10px] uppercase tracking-widest text-primary">
                  Twitter Space Host
                </span>
                <h4 className="font-headline mb-4 text-3xl">The Future of FOSS</h4>
                <p className="font-body translate-y-4 text-xs text-on-surface-variant opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  A deep dive into sustainable funding models for open source
                  maintainers and the impact of corporate sponsorship on project
                  roadmaps.
                </p>
              </div>
            </div>
            <div className="group relative h-[400px] overflow-hidden bg-surface-container-high">
              <Image
                alt="Ethereum talk"
                src={TALK_IMG.eth}
                fill
                className="object-cover opacity-30 transition-opacity duration-700 group-hover:opacity-10"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 flex flex-col justify-end p-8">
                <span className="font-label mb-4 text-[10px] uppercase tracking-widest text-primary">
                  Podcast Guest
                </span>
                <h4 className="font-headline mb-4 text-3xl">Scaling Ethereum</h4>
                <p className="font-body translate-y-4 text-xs text-on-surface-variant opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Exploring the technical roadmap for danksharding, rollups, and
                  the final stages of the Ethereum vision for global throughput.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
