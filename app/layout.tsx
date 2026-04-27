import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

export const metadata: Metadata = {
  title: "Noto Forms",
  description: "A clean block-based form builder MVP.",
};

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`} lang="en">
      <body>{children}</body>
    </html>
  );
}
