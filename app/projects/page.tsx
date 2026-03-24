import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";

export const metadata: Metadata = {
  title: "Projects",
};

const IMG = {
  p1: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4zs22bYrTyYSZtz6yJ9B4ZBSXwY32NOCNS7b1Sxe_QznPZWDcC9Q5MbD5dbtanKIbAv4TnX9bxQCDizPI8yIuu_JTTF0JBk9acQ0FBzMAKqXcPKFJFOBwQOPggI6OMKxhNSvp3N3OnF87bNar307bsDyvYiEKjoaMJHcVpBB1r2LnvZreBOLdctAJOf9Ge2UjzokHdV_kw3nURcKEK4dsNEUUWZAf4LZ6SpHD-jJUaY5pyLE9-Q94RzT4mSK-fOBNT-SplhmOKqQ",
  p2: "https://lh3.googleusercontent.com/aida-public/AB6AXuByFO81ccogVB551-mBP6aRsHpxn5-Oo3dq2EkJIvFjBD5VQaaL645l-L7itXCnASKw3Sr9WbiJjf5OwCC0RmlMnJ8_lvazMbe5svVLXP_8-Zgqe1KACtKONOz0vsh7laep76MynH90rP8o-HnP0RHHcGQOg60QduJdEMjt9mGyptAWlrwzSCUJZkXuvDUJB2nZfIpWll9lddV6tB-tBtjrZ14EDfYLZWAqcHQPjgf0KxWlNxfH_o3NZS9163rAKUQmhIUjXsGgWGc",
  p3: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6fFtVLyjMrrjggIztHzhDT44Kpu11-SVCj9Jfuh9k9LOIMGBTHVjSFh-Sb6_2nOJidAdevWpUx2CULzeDyXl5AfJaac8keFRY4wTkGjFaFfIKuiZDasXTz-7m-Dy27br0JRsk_wgEBdHHoXQAmzW36a2q1AN4LFsN5hFEV7PverE1BZVx9W4TyybxtjCXfsV6fAIHbBiIgB2-X01GGxaZpYsseb4FsgznIwmDweVOMCqm7aG0wVw36vzP07fjuyglGeVwuIxSncY",
  p4: "https://lh3.googleusercontent.com/aida-public/AB6AXuACePkFHW83IudctIho7GiX1PjPWQPwwy7VSBzWLjaRh7qEGYnpqMkVXNt9ycTfArbEwoV1HTkeGwcEg9lfZwEGFui8ywDqEHHEDprU2LbNOXmL8s4AnM2svJdefNKWvc3bKWJBUf_5lDkW-TG-rqHvMasZi0EFIHTeMqKpO0N4nuaQLzI4u68VSiP95IdSKu9AeKyq2g29ai5yLnNqbjmNTVVppWbdEoNcpi7lFR6RZDswPYmHIZer3HHQqIi0oeLTFxiKcFU4DgM",
} as const;

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-background font-body text-on-background selection:bg-primary selection:text-on-primary">
      <SiteNav />
      <main className="px-6 pb-24 pt-32 md:px-12 lg:px-24">
        <header className="mb-24 max-w-4xl">
          <h1 className="font-headline mb-8 text-6xl font-light tracking-tight md:text-8xl">
            Selected Works
          </h1>
          <p className="font-body max-w-xl text-lg leading-relaxed text-on-surface-variant">
            An archive of technical architectures, decentralized protocols, and
            open-source tooling developed over a decade of focused engineering.
          </p>
        </header>

        <section className="grid grid-cols-1 gap-y-24 md:grid-cols-12 md:gap-x-12">
          <div className="group cursor-pointer md:col-span-7">
            <div className="relative mb-8 aspect-[16/10] overflow-hidden bg-surface-container-low">
              <Image
                alt="DeFi dashboard visualization"
                src={IMG.p1}
                fill
                className="object-cover opacity-80 grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                FinTech • Web3 • 2024
              </span>
              <h2 className="font-headline text-3xl font-light">DeFi Dashboard</h2>
              <p className="font-body max-w-md text-sm leading-relaxed text-on-surface-variant">
                A privacy-preserving asset manager utilizing zero-knowledge proofs
                to anonymize transaction flows while maintaining auditability.
              </p>
            </div>
          </div>

          <div className="group cursor-pointer md:col-span-4 md:col-start-9 md:mt-32">
            <div className="relative mb-8 aspect-[4/5] overflow-hidden bg-surface-container-low">
              <Image
                alt="Terminal CLI interface"
                src={IMG.p2}
                fill
                className="object-cover opacity-80 grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                sizes="400px"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                Open Source • CLI • 2023
              </span>
              <h2 className="font-headline text-3xl font-light">FOSS Toolkit</h2>
              <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                A suite of high-performance open-source CLI tools designed to
                streamline deployment workflows for distributed systems.
              </p>
            </div>
          </div>

          <div className="group cursor-pointer md:col-span-5 md:mt-[-4rem]">
            <div className="relative mb-8 aspect-square overflow-hidden bg-surface-container-low">
              <Image
                alt="Cryptographic network abstract"
                src={IMG.p3}
                fill
                className="object-cover opacity-80 grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                Cryptography • Identity • 2023
              </span>
              <h2 className="font-headline text-3xl font-light">ZK-Identity</h2>
              <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                An implementation of Zero-knowledge proofs for Web3 identity
                verification, enabling secure user authentication without data
                disclosure.
              </p>
            </div>
          </div>

          <div className="group cursor-pointer md:col-span-6 md:col-start-7">
            <div className="relative mb-8 aspect-[16/9] overflow-hidden bg-surface-container-low">
              <Image
                alt="Server rack infrastructure"
                src={IMG.p4}
                fill
                className="object-cover opacity-80 grayscale transition-all duration-700 ease-in-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <span className="font-label text-[10px] uppercase tracking-[0.2em] text-outline">
                Infrastructure • Exhibition • 2022
              </span>
              <h2 className="font-headline text-3xl font-light">
                The Global Archive
              </h2>
              <p className="font-body text-sm leading-relaxed text-on-surface-variant">
                Interactive data visualization project mapping global server node
                health in real-time, commissioned for the Tech Biennale.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-48 flex flex-col items-center justify-center bg-surface-container-low py-32 text-center">
          <span className="font-label mb-6 text-xs uppercase tracking-[0.4em] text-outline">
            New Chapters
          </span>
          <h3 className="font-headline mb-12 text-5xl font-light italic md:text-6xl">
            Currently open for <br />
            strategic partnerships.
          </h3>
          <Link
            href="mailto:hello@example.com"
            className="bg-primary px-10 py-4 font-label text-xs uppercase tracking-widest text-on-primary transition-colors duration-500 hover:bg-primary-fixed-dim"
          >
            Inquire
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
