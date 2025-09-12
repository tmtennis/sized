import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "800"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SIZED - Curatorial Platform & Cultural Studio",
  description: "Founded by Alexander May, SIZED is a curatorial platform and cultural studio dedicated to staging exhibitions and presenting collectible design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
  <body className={`${inter.variable} font-sans antialiased bg-black text-white text-xs`}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
