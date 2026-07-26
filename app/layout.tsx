import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import EnableWheelScroll from "./EnableWheelScroll";

const WaterfallBackground = dynamic(() => import("./WaterfallBackground"));

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tharun Blogs",
  description: "Step into a space where ideas take root and grow — thoughts on web development, programming, and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden min-h-dvh`}
      >
        <Navbar />
        <WaterfallBackground />
        <EnableWheelScroll />
        {children}
      </body>
    </html>
  );
}
