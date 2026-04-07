import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { cookies } from "next/headers";
import { ThemeProvider } from "@/components/ThemeProvider";
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
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const stored = cookieStore.get("portfolio-theme")?.value;
  const themeClass = stored === "light" ? "light" : "dark";

  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${manrope.variable} ${themeClass}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
