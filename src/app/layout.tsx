import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import GlobalProvider from "@/components/organisms/GlobalProvider";
import { getMetadata } from "@/lib/metadata";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = getMetadata({
  title: "Nusa Dakwah | Platform Dakwah Digital",
  description:
    "Platform pembelajaran dan dakwah digital untuk memberdayakan umat melalui konten edukatif dan inspiratif.",
  url: "https://nusadakwah.creatify.id",
  image: "https://nusadakwah.creatify.id/images/logo.jpg",
  keywords: [
    "Nusa Dakwah",
    "Dakwah Digital",
    "Platform Pembelajaran",
    "Konten Edukatif",
    "Inspirasi Islami",
    "Modul Pembelajaran",
    "Manajemen Pengguna",
    "Aktivitas Sistem",
    "Teknologi untuk Dakwah",
    "Pemberdayaan Umat",
  ],
  siteName: "Nusa Dakwah | Platform Dakwah Digital",
  type: "website",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} antialiased`}>
        <GlobalProvider>{children}</GlobalProvider>
      </body>
    </html>
  );
}
