import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Love you. | Digital Heart Experience",
  description:
    "A cinematic romantic hacker landing page with a glowing text-built heart, crafted for static export and GitHub Pages.",
  applicationName: "Love you.",
  keywords: [
    "digital art",
    "romantic landing page",
    "glowing heart",
    "next.js static export",
    "interactive canvas"
  ],
  authors: [{ name: "OpenAI Codex" }],
  creator: "OpenAI Codex",
  openGraph: {
    title: "Love you. | Digital Heart Experience",
    description:
      "A premium cinematic landing page with an interactive glowing heart formed by hundreds of 'I love you' particles.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Love you. | Digital Heart Experience",
    description:
      "A romantic dark-mode art experience built with Next.js, TypeScript and a custom canvas particle engine."
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
