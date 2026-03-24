import Image from "next/image";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden px-6 pt-16">
        <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-surface-container-high to-transparent blur-3xl" />
        </div>
        <div className="z-10 max-w-4xl space-y-12 text-center">
          <div className="flex flex-col items-center space-y-8">
            <div className="flex items-center justify-center text-primary opacity-40">
              <div className="h-px w-12 bg-outline-variant" />
              <span className="material-symbols-outlined mx-4 text-3xl">
                explore
              </span>
              <div className="h-px w-12 bg-outline-variant" />
            </div>
            <h1 className="font-headline text-5xl leading-[1.1] tracking-tight text-on-surface md:text-7xl lg:text-8xl">
              Greetings, Traveler. <br />
              <span className="font-light italic">I am a</span>{" "}
              <span className="text-secondary">Curator</span> <br />
              <span className="font-light italic">based in</span>{" "}
              <span className="text-on-surface-variant">Oxford</span>.
            </h1>
            <p className="font-body mx-auto max-w-xl text-lg leading-relaxed font-light tracking-wide text-on-surface-variant">
              Documenting the intersection of timeless craftsmanship and digital
              architecture through a lens of quiet minimalism.
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 pt-8">
            <a
              className="font-label rounded-lg bg-primary px-8 py-3 font-medium tracking-wide text-on-primary transition-all hover:shadow-lg active:scale-95"
              href="#"
            >
              View Journal
            </a>
            <a
              className="font-label rounded-lg border border-outline px-8 py-3 font-medium tracking-wide text-on-surface transition-all hover:bg-surface-container active:scale-95"
              href="#"
            >
              Say Hello
            </a>
          </div>
        </div>
        <div className="absolute right-6 bottom-28 hidden h-72 w-56 rotate-3 rounded-xl border border-outline-variant/20 bg-surface-container-lowest/50 p-3 shadow-sm backdrop-blur-sm transition-transform duration-500 hover:rotate-0 sm:right-10 sm:bottom-32 lg:right-12 lg:bottom-36 lg:block lg:h-80 lg:w-64 lg:p-4">
          <div className="relative flex h-full w-full flex-col justify-end overflow-hidden rounded-lg bg-surface-container-highest p-4">
            <Image
              alt=""
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDdtuX3T5ImMRtOyGNA4RjthljjmsydTs8VpDi8qWyZakyBW-BuIy0RwaXCxxs2V9d3_cROiv1w4N5yhUD1Ij94Lxfc1HV6QUbS0OH1jT5nu7GQl2E4IhwiELEDHrnZeoavVYGOu5uoAkitIu3KzHrF1ahJ7IWT9XSUdPUJjdZ3k0ctGqRsFX8eFEccLt4V8dFLovYqYeMlAq187G2RRfSHItrvY8ppy1fRjPJ_ix7t04KksvDM1HTDRQWXJjP3O4fMxvhX-zFWBI4"
              fill
              className="object-cover opacity-60"
              sizes="256px"
            />
            <div className="relative z-10">
              <p className="font-headline text-sm italic text-on-surface">
                &ldquo;Simplicity is the ultimate sophistication.&rdquo;
              </p>
              <p className="font-label mt-1 text-[10px] tracking-tighter uppercase opacity-60">
                — L. Da Vinci
              </p>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter className="fixed bottom-0 left-0 w-full" />
    </div>
  );
}
