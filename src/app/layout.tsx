import ScrollToTop from "@/components/ScrollToTop";
import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sastre Jean-Pierre | Directeur de Création",
  description: "Portfolio de Jp Sastre, Directeur de Création spécialisé en Digital, Motion Design, Projection Mapping et Installations Immersives.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="cursor-none">
      <body className={`${geistSans.variable} bg-black text-white antialiased font-sans selection:bg-white selection:text-black`} suppressHydrationWarning>
        <CustomCursor />
        <SmoothScroll>
          <ScrollToTop />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}