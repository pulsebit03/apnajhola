import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ApnaJhola - Fresh Grocery Delivery in Renukoot",
  description: "Order fresh vegetables, fruits, and daily essentials in Renukoot, Sonebhadra. Get instant delivery to your doorstep with ApnaJhola.",
  keywords: ["grocery delivery", "Renukoot", "Sonebhadra", "vegetables", "fruits", "instant delivery", "ApnaJhola", "online grocery", "fresh produce"],
  openGraph: {
    title: "ApnaJhola - Fresh Grocery Delivery in Renukoot",
    description: "Order fresh vegetables, fruits, and daily essentials in Renukoot, Sonebhadra.",
    locale: "en_IN",
    type: "website",
  },
  icons: {
    icon: '/nobg-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
