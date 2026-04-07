import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { JourneyTimeline } from "../../components/JourneyTimeline";
import { getSiteData } from "@/lib/parser";

export const metadata: Metadata = {
  title: "My Journey",
};

export default function JourneyPage() {
  const { journey } = getSiteData();

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
            <span className="italic">building things.</span>
          </h1>
        </header>

        <JourneyTimeline journey={journey} />
      </main>
      <SiteFooter />
    </div>
  );
}
