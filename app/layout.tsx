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
  title: {
    default: "SIZED - Curatorial Platform & Cultural Studio",
    template: "%s | SIZED"
  },
  description: "SIZED composes spaces as stories, where objects become characters and every encounter feels like a scene unfolding. Founded by Alexander May, SIZED is a curatorial platform and cultural studio dedicated to staging exhibitions and presenting collectible design.",
  keywords: ["curatorial platform", "cultural studio", "Alexander May", "exhibitions", "collectible design", "art curation", "contemporary art", "design gallery"],
  authors: [{ name: "Alexander May" }],
  creator: "Alexander May",
  publisher: "SIZED",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://sized.com'),
  openGraph: {
    title: "SIZED - Curatorial Platform & Cultural Studio",
    description: "SIZED composes spaces as stories, where objects become characters and every encounter feels like a scene unfolding.",
    url: 'https://sized.com',
    siteName: 'SIZED',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "SIZED - Curatorial Platform & Cultural Studio",
    description: "SIZED composes spaces as stories, where objects become characters and every encounter feels like a scene unfolding.",
    creator: '@alexandermay',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SIZED",
    "description": "SIZED composes spaces as stories, where objects become characters and every encounter feels like a scene unfolding.",
    "url": "https://sized.com",
    "founder": {
      "@type": "Person",
      "name": "Alexander May"
    },
    "sameAs": [
      "https://instagram.com/sized",
      "https://twitter.com/sized"
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
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
