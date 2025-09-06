import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TV Stats",
  description: "View tv show ratings at a glance",
};

const Header = () => {
  return (
    <header className="min-h-24 w-full px-12 items-center flex">
      <Link className="font-bold flex items-center gap-2 select-none" href="/">
        <Clapperboard />
        TV Stats
      </Link>
    </header>
  );
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full w-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full`}
      >
        <div className="flex h-full w-full flex-col">
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
