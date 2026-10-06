import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { PROFILE } from "@/lib/data";
import "./globals.css";

const sans = localFont({
  src: "../fonts/InterTight-Variable.woff2",
  variable: "--nf-sans",
  weight: "100 900",
  display: "swap",
});
const serif = localFont({
  src: [
    { path: "../fonts/InstrumentSerif-Regular.woff2", style: "normal", weight: "400" },
    { path: "../fonts/InstrumentSerif-Italic.woff2", style: "italic", weight: "400" },
  ],
  variable: "--nf-serif",
  display: "swap",
});
const mono = localFont({
  src: "../fonts/JetBrainsMono-Variable.woff2",
  variable: "--nf-mono",
  weight: "100 800",
  display: "swap",
});

const title = `${PROFILE.name} — ${PROFILE.role}`;
const description = PROFILE.resumeSummary;

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://kravali011-bot.github.io"),
  title,
  description,
  authors: [{ name: PROFILE.name }],
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    title,
    description,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: `${PROFILE.name}, ${PROFILE.role}` }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
};

export const viewport: Viewport = {
  themeColor: "#f4f2ee",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
