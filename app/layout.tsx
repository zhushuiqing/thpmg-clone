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
  title: 'THPMG - Professional Services',
  description: 'Official website of THPMG - Professional project management consulting services',
  keywords: 'Project Management, Consulting Services, THPMG',
  authors: [{ name: 'THPMG Team' }],
  creator: 'THPMG Team',
  publisher: 'THPMG',
  openGraph: {
    title: 'THPMG - Professional Services',
    description: 'Official website of THPMG - Professional project management consulting services',
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com',
    siteName: 'THPMG',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'THPMG Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'THPMG - Professional Services',
    description: 'Official website of THPMG - Professional project management consulting services',
    site: '@thpmg',
    images: process.env.NEXT_PUBLIC_SITE_URL + '/og-image.jpg',
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
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
