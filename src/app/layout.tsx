import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StructuredData from "./structured-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Thant Hein Thwin - Full Stack Software Engineer",
  description:
    "Portfolio of Thant Hein Thwin, a Full Stack Software Engineer with expertise in React, Next.js, Node.js, and Golang",
  manifest: "/manifest.json",
  keywords: [
    "Thant Hein Thwin",
    "Full Stack Software Engineer",
    "React",
    "Next.js",
    "Node.js",
    "Golang",
    "Portfolio",
    "Software Development",
    "Web Development",
    "Frontend",
    "Backend",
  ],
  authors: [{ name: "Thant Hein Thwin" }],
  creator: "Thant Hein Thwin",
  publisher: "Thant Hein Thwin",
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
    url: "https://thantheinthwin.vercel.app",
    siteName: "Thant Hein Thwin Portfolio",
    title: "Thant Hein Thwin - Full Stack Software Engineer",
    description:
      "Portfolio of Thant Hein Thwin, a Full Stack Software Engineer with expertise in React, Next.js, Node.js, and Golang",
  },
  alternates: {
    canonical: "https://thantheinthwin.vercel.app",
  },
  category: "technology",
  classification: "Portfolio",
  other: {
    "theme-color": "#000000",
    "color-scheme": "dark",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased bg-background text-foreground`}
        suppressHydrationWarning
      >
        <StructuredData />
        {children}
        <Analytics />
        <SpeedInsights />
        <Toaster />
      </body>
    </html>
  );
}
