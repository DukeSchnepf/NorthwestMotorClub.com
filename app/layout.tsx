import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/motion/SmoothScroll";
import SiteHeader from "@/components/site/SiteHeader";
import Footer from "@/components/site/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northwestmotorclub.com"),
  title: {
    default: "Northwest Motor Club",
    template: "%s · Northwest Motor Club",
  },
  description:
    "A Pacific Northwest car club. Cars, roads, rain. Meets and drives across the PNW.",
  openGraph: {
    title: "Northwest Motor Club",
    description: "A Pacific Northwest car club. Cars, roads, rain.",
    type: "website",
    images: ["/media/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0e0c",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable} h-full`}
    >
      <body className="min-h-full bg-base text-fg antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SmoothScroll>
          <SiteHeader />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
