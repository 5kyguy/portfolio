import type { Metadata, Viewport } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import ogImage from "@/assets/preview.png";
import profileIcon from "@/assets/profile.png";
import "./globals.css";

const SITE = new URL("https://skyguy.dev");

const SITE_DESCRIPTION =
  "Backend engineer for blockchain infrastructure, automation services, and developer tooling. Go, Python, Solidity, and production systems.";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  colorScheme: "dark light",
};

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: SITE,
  title: {
    default: "Aakash Yadav | Portfolio",
    template: "%s | Aakash Yadav",
  },
  description: SITE_DESCRIPTION,
  applicationName: "SkyGuy · Portfolio",
  keywords: [
    "Aakash Yadav",
    "SkyGuy",
    "5kyguy",
    "portfolio",
    "backend engineer",
    "blockchain",
    "infrastructure",
    "Go",
    "Python",
    "Solidity",
    "open source",
    "Web3",
    "developer tooling",
  ],
  authors: [{ name: "Aakash Yadav", url: "https://skyguy.dev" }],
  creator: "Aakash Yadav",
  publisher: "Aakash Yadav",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  referrer: "strict-origin-when-cross-origin",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: { "en-US": "/" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE,
    siteName: "Aakash Yadav · SkyGuy",
    title: "Aakash Yadav · SkyGuy",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: ogImage.src,
        width: ogImage.width,
        height: ogImage.height,
        alt: "Aakash Yadav (SkyGuy) — portfolio preview",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@5kyguydev",
    creator: "@5kyguydev",
    title: "Aakash Yadav · SkyGuy",
    description: SITE_DESCRIPTION,
    images: {
      url: ogImage.src,
      width: ogImage.width,
      height: ogImage.height,
      alt: "Aakash Yadav (SkyGuy) — portfolio preview",
    },
  },
  appleWebApp: {
    capable: true,
    title: "SkyGuy",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [{ url: profileIcon.src, type: "image/png" }],
    apple: [{ url: profileIcon.src }],
  },
  other: {
    "msapplication-TileColor": "#0a0a0a",
    "twitter:domain": "skyguy.dev",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} dark`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
