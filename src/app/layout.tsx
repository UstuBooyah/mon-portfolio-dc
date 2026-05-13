import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google"; // Polices modernes de Vercel
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nom Prénom | Directeur de Création",
  description: "Portfolio de direction de création",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}