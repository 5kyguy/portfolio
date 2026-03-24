import type { Metadata } from "next";
import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body text-on-surface selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center p-8 pb-28 pt-16">
        <div className="mb-12 w-full text-center md:text-left">
          <h1 className="font-headline mb-4 text-5xl tracking-tight text-on-surface md:text-6xl">
            Selected Projects
          </h1>
          <p className="font-body max-w-xl text-lg leading-relaxed text-on-surface-variant">
            An archival collection of digital architecture and interaction studies
            designed between 2022 and 2024.
          </p>
        </div>
        <div className="grid h-full w-full grid-cols-1 gap-6 md:grid-cols-12">
          <div className="group relative aspect-[16/9] overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-low md:col-span-8 md:aspect-auto md:h-[400px]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent" />
            <Image
              alt="Project Corellia visualization"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBKD-fTPUjB6M4tMQ56RuGgpy4p_HWBgP1X9tk0QexmwefN93tVBFYYxKENUhMeF08NPAFlJuIkreGM_zJvDtnHI-culMdim8eF2V6z1tBtfQwnwpYVRqA3bYFP0uqnt9-kfL8PioFsgFcWt4cISQE6rL9Fl2MzRBXTxbu8S3F-sBLXQ2RipKxCqHNLGEPpQMn92qK4izWD376swsPD8AwU_kmKN-iTI5GyV1fcpYNxq1PehDkeFp4gw2VgOE2kTu84QuxU3ChTI4"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute bottom-0 left-0 z-20 flex w-full items-end justify-between p-8">
              <div className="space-y-2">
                <span className="font-label rounded bg-black/30 px-2 py-1 text-xs tracking-widest text-secondary-fixed uppercase backdrop-blur-sm">
                  System Design
                </span>
                <h2 className="font-headline text-3xl text-white">
                  Project Corellia
                </h2>
                <p className="font-body max-w-md text-sm text-on-background/90">
                  Orchestrating hyperspace logistics through intuitive data mapping.
                </p>
              </div>
              <span
                className="material-symbols-outlined text-3xl text-white"
                style={{ fontVariationSettings: '"FILL" 1' }}
              >
                star
              </span>
            </div>
          </div>
          <div className="group relative h-[400px] overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-high md:col-span-4">
            <div className="flex h-full flex-col justify-between p-8">
              <div>
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-tertiary-container">
                  <span className="material-symbols-outlined text-2xl text-on-tertiary-container">
                    architecture
                  </span>
                </div>
                <h2 className="font-headline mb-2 text-2xl text-on-surface">
                  The Citadel Redesign
                </h2>
                <p className="font-body text-sm text-on-surface-variant">
                  A minimalist overhaul for the ancient administration&apos;s
                  portal.
                </p>
              </div>
              <div className="relative mt-4 h-48 overflow-hidden rounded-lg border border-outline-variant/20">
                <Image
                  alt="The Citadel architecture"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQG_zfoTulcXea-qYJoj0e1S1pfzpxmCC1ry7tr_xceSP4jAJZKaZn3qanrZAbPu6G2lF7bSXXeym0DLEnE12w2sUz-n1FJxLxu4siYJY40YHsdFmdXnMkgw7sJPGhJYgQnNn__4w0e8mRQHaI_yHxBPsNNtjZQpL9zBYm0i-FiiQwCvdntCggRmjzlPIIYnz7ifHNAiLGRnPC44t45KrolBCIlMBCT9XZBnBBYGfGaXUTLxqGkyrXQwDmKv7Yc_jWn_OTAIztYTI"
                  fill
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                  sizes="400px"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center gap-6 rounded-xl border border-outline-variant/30 bg-surface-container p-8 md:col-span-6 md:flex-row">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-xl text-primary">
                  database
                </span>
                <span className="font-label text-[10px] tracking-widest text-outline uppercase">
                  Back-end Integration
                </span>
              </div>
              <h2 className="font-headline text-2xl text-on-surface">
                Minas Tirith API
              </h2>
              <p className="font-body text-sm text-on-surface-variant">
                Real-time beacon signaling system with 99.9% uptime across seven
                tiers.
              </p>
              <button
                type="button"
                className="group/btn font-label flex items-center gap-1 text-xs font-bold text-tertiary hover:underline"
              >
                View Documentation
                <span className="material-symbols-outlined text-sm transition-transform group-hover/btn:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>
            <div className="aspect-square w-full overflow-hidden rounded-full border-4 border-surface-container md:w-1/3">
              <Image
                alt="Mountain landscape"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgwKTnZDEt5Tqyot-AV4IurEDIF5qjR-kRyviBt-__0iSEQqyoe9WDJXP1-OCQHXSEXK_nQ74NuTCcBRfS1P3-J8zgmTI1GfDOJeri7EUKBJ-waZ9WN-CpALTxj6Rq0CERKOfallBjdisaVGrzl93JQMJEbi0Ig4uf0Dr8W41MUoWsXAOBUxG6y7ECeHsWoSE7LWOB4O_FRIaSeFaNMfXZQ3UZWZqdsV6nLzsrJ1hTE792s07adnbw43Rm9lcDpwGeevoIcocGNLY"
                width={320}
                height={320}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest p-8 md:col-span-6">
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <h2 className="font-headline text-2xl text-on-surface">
                  Outer Rim Nav
                </h2>
                <p className="font-body text-sm italic text-on-surface-variant">
                  Exploration beyond the known sectors.
                </p>
              </div>
              <span className="material-symbols-outlined rounded-full bg-secondary-container p-2 text-on-secondary-container">
                explore
              </span>
            </div>
            <div className="mt-12 flex gap-2">
              <div className="h-1 w-1/4 overflow-hidden rounded-full bg-primary-container">
                <div className="h-full w-2/3 bg-primary" />
              </div>
              <div className="h-1 w-1/4 rounded-full bg-primary-container" />
              <div className="h-1 w-1/4 rounded-full bg-primary-container" />
              <div className="h-1 w-1/4 rounded-full bg-primary-container" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-label text-[10px] tracking-tighter text-outline uppercase">
                Case Study Progress
              </span>
              <span className="font-label text-xs font-bold text-on-surface">
                01 / 04
              </span>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
