import type { Metadata } from "next";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { getSiteData } from "@/lib/parser";
import { RotatingHeadline } from "@/components/RotatingHeadline";

export const metadata: Metadata = {
  title: "Me",
};

import PORTRAIT from "../assets/portrait.png";

const PROFILE_IMAGE_MAP: Record<string, StaticImageData> = {
  "/assets/portrait.png": PORTRAIT,
};

export default function HomePage() {
  const data = getSiteData();
  const profileImage = data.profileImage ? PROFILE_IMAGE_MAP[data.profileImage] ?? PORTRAIT : PORTRAIT;

  return (
    <div className="flex h-dvh max-h-dvh flex-col overflow-hidden bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="flex min-h-0 w-full flex-1 flex-col items-stretch justify-center overflow-hidden px-6 pb-4 pt-24 md:flex-row md:items-stretch md:px-12 md:pb-5 md:pt-20">
        <div className="flex w-full flex-none max-h-[42dvh] min-h-0 items-center justify-center p-4 md:max-h-none md:flex-1 md:w-1/2 md:p-6">
          <div className="group relative aspect-[4/5] h-auto max-h-full w-full max-w-lg overflow-hidden bg-surface-container-low">
            <Image
              alt="Portrait"
              src={profileImage}
              fill
              className="object-cover opacity-80 grayscale transition-opacity duration-700 group-hover:opacity-100"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          </div>
        </div>
        <div className="flex min-h-0 w-full flex-1 flex-col justify-center space-y-6 overflow-hidden md:w-1/2 md:space-y-8 md:pl-12 lg:pl-16">
          <section className="max-w-xl">
            <span className="mb-4 block font-label text-xs uppercase tracking-[0.3em] text-outline md:mb-5">
              {data.tagline}
            </span>
            <RotatingHeadline
              className="font-headline text-5xl font-light leading-none tracking-tighter text-on-background sm:text-6xl md:text-7xl lg:text-8xl"
              words={data.headlines}
            />
            <p className="mt-4 font-body max-w-md text-lg font-light leading-relaxed text-on-surface-variant md:mt-5">
              {data.bio.split("\n")[0]}
            </p>
          </section>
          {data.stats.length > 0 && (
            <div className="grid max-w-sm grid-cols-2 gap-6 border-t border-outline-variant/10 pt-4 md:gap-8 md:pt-6">
              {data.stats.map((stat) => (
                <div key={stat.label}>
                  <div className="font-headline text-2xl italic">{stat.value}</div>
                  <div className="font-label text-[9px] uppercase tracking-widest text-outline">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter className="shrink-0 !py-4 md:!py-6" />
    </div>
  );
}
