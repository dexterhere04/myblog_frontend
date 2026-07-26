import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import EnableWheelScroll from "./EnableWheelScroll";

const WaterfallBackground = dynamic(() => import("./WaterfallBackground"));

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lora = Lora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        className={`${playfair.variable} ${lora.variable} antialiased overflow-x-hidden min-h-dvh`}
      >
        <Navbar />
        <WaterfallBackground />
        <EnableWheelScroll />
        {children}
      </body>
    </html>
  );
}
