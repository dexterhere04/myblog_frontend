import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import WaterfallBackground from "./OceanBackground";
import EnableWheelScroll from "./EnableWheelScroll";
import Navbar from "./Navbar";

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
  description: "Ride the wave of knowledge with insightful articles about web development, programming, and cutting-edge technology.",
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
        <WaterfallBackground />
        <EnableWheelScroll />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
