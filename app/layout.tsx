import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import Navbar from "./Navbar";
import EnableWheelScroll from "./EnableWheelScroll";
import AudioProvider from "./AudioContext";
import WaterfallAudio from "./WaterfallAudio";

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
  description: "Practical writing on web development, programming, and modern technology.",
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
        <AudioProvider>
          <Navbar />
          <WaterfallAudio />
          <WaterfallBackground />
          <EnableWheelScroll />
          {children}
        </AudioProvider>
      </body>
    </html>
  );
}
