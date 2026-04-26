import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import profileIcon from "@/assets/profile.png";
import "./globals.css";

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
  title: {
    default: "Aakash Yadav | Portfolio",
    template: "%s | Aakash Yadav",
  },
  description: "Aakash Yadav's (SkyGuy) portfolio",
  icons: {
    icon: [{ url: profileIcon.src, type: "image/png" }],
    apple: [{ url: profileIcon.src }],
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
