import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Polices modernes de Vercel
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
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
    <html lang="fr">
      <body className={`${geistSans.variable} antialiased font-sans`}
      suppressHydrationWarning>
        <SmoothScroll>
    {children}
  </SmoothScroll>
      </body>
    </html>
  );
}