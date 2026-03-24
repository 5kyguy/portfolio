import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Experiences",
};

const IMG = {
  aether:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBqSmk6izeP__sXhLgwf4TjjidyooaCc9Wf1Sj5puQcSPX-rJeCpnjMPL2JrEDOliR-uavqlDIQ1QpZoTdsB3VsbYTtW5sW4B6Ar-zva4pzQ2TEByWgK76sl_0ZIvEFzGYpmNiBNVZ30gkaA4gTuWsQaL-Ei-djFdSAopE9zoVRwbRBiUJNd40w8vuHyoloR8io6T2PxmKIsMlcStYDYRrYKI3LAmkVmO15Oe3jWBA9lwEZ7Ijnv4VMpFlwriSmFgFTSjqpvYID8GA",
  labs:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAH06alD99oZYBr_ijKAq51Ae_3exdL8bV6DtjuTtmZmNVgR74UUKYbut_fQQNbbB-pv2ThTmF4KyCozeJ5V5ild0_HXijx0savCX-V2E5bkoM14Worek5tc-_X-ita10iTZGp-mLj0N7aWqk8XNeQZ9nczsusAYjT7WUdzsAY6nvkDd1MJMVhe0jnXcEAxEx9EW_9MIF21k8Oo_fg8mofSKTaFGXo6yMQ3K0S1UsZ2srhUqvrEGfVMK4JDzH9_Mb2vJ0Ei-3Wb078",
} as const;

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="min-h-screen px-6 pb-32 pt-40 md:px-24">
        <header className="mb-24">
          <span className="font-label mb-4 block text-[10px] uppercase tracking-[0.3em] text-on-surface-variant">
            Development History
          </span>
          <h1 className="font-headline editorial-title text-6xl font-light leading-none md:text-8xl">
            The timeline of <br />
            <span className="italic">distributed systems.</span>
          </h1>
        </header>

        <div className="relative grid grid-cols-1 gap-12 md:grid-cols-12">
          <div className="relative hidden md:col-span-1 md:block">
            <div className="sticky top-48 flex h-fit flex-col space-y-32">
              <span className="font-headline text-2xl italic text-primary">
                2024
              </span>
              <span className="font-headline text-2xl italic text-on-surface-variant/30">
                2022
              </span>
              <span className="font-headline text-2xl italic text-on-surface-variant/30">
                2020
              </span>
            </div>
          </div>
          <div className="relative hidden justify-center md:col-span-1 md:flex">
            <div className="timeline-line h-full opacity-20" />
          </div>
          <div className="space-y-32 md:col-span-10">
            <article className="group grid grid-cols-1 gap-8 lg:grid-cols-10">
              <div className="overflow-hidden lg:col-span-4">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    alt="Circuit boards"
                    src={IMG.aether}
                    fill
                    className="object-cover brightness-75 grayscale transition-all duration-700 group-hover:brightness-100 group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
              <div className="flex flex-col justify-center lg:col-span-6">
                <div className="mb-2 flex items-baseline space-x-4">
                  <span className="font-label text-xs uppercase tracking-widest text-primary">
                    Core Contributor
                  </span>
                </div>
                <h3 className="font-headline mb-6 text-4xl">Aether Protocol</h3>
                <p className="font-body mb-8 max-w-xl leading-relaxed text-on-surface-variant">
                  Contributing to the core consensus engine and peer-to-peer
                  networking layer for a next-generation Web3 protocol. Optimizing
                  throughput for zero-knowledge verification nodes.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Rust", "Libp2p", "Web3"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-high px-4 py-1 font-label text-[10px] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>

            <article className="group grid grid-cols-1 gap-8 lg:grid-cols-10">
              <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-6">
                <div className="mb-2 flex items-baseline space-x-4">
                  <span className="font-label text-xs uppercase tracking-widest text-primary">
                    Senior Developer
                  </span>
                </div>
                <h3 className="font-headline mb-6 text-4xl">OpenSource Labs</h3>
                <p className="font-body mb-8 max-w-xl leading-relaxed text-on-surface-variant">
                  Led the development of a FOSS-first observability suite.
                  Cultivated a community of 500+ contributors and integrated open
                  standards for cloud-native telemetry.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["Go", "Kubernetes", "FOSS"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-high px-4 py-1 font-label text-[10px] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="order-1 overflow-hidden lg:order-2 lg:col-span-4">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    alt="Glass reflections"
                    src={IMG.labs}
                    fill
                    className="object-cover brightness-75 grayscale transition-all duration-700 group-hover:brightness-100 group-hover:grayscale-0"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
              </div>
            </article>

            <article className="group grid grid-cols-1 gap-8 lg:grid-cols-10">
              <div className="overflow-hidden lg:col-span-4">
                <div className="flex aspect-[4/3] w-full items-center justify-center bg-surface-container p-12">
                  <p className="font-headline text-center text-xl italic leading-relaxed text-on-surface-variant/40">
                    &ldquo;True privacy is the ability to selectively reveal oneself
                    to the world.&rdquo;
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center lg:col-span-6">
                <div className="mb-2 flex items-baseline space-x-4">
                  <span className="font-label text-xs uppercase tracking-widest text-primary">
                    Full-stack Engineer
                  </span>
                </div>
                <h3 className="font-headline mb-6 text-4xl">Identity One</h3>
                <p className="font-body mb-8 max-w-xl leading-relaxed text-on-surface-variant">
                  Architected decentralized identity solutions using W3C standards.
                  Focused on self-sovereign identity (SSI) and encrypted verifiable
                  credentials for healthcare data.
                </p>
                <div className="flex flex-wrap gap-4">
                  {["TypeScript", "DID", "Cryptography"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-surface-container-high px-4 py-1 font-label text-[10px] uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
