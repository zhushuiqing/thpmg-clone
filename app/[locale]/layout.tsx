import { NextIntlClientProvider, useMessages } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: 'P.M.I 总管理处 | PMI Head Office',
    template: '%s | P.M.I'
  },
  description: 'P.M.I.总管理处下辖 8 家事业单位，在国内 14 个省市、泰国 4 个城市开设有生产基地，拥有员工近 7,500 人',
  keywords: ['P.M.I', 'Packaging', 'Materials', 'Ingredients', 'Logistics', '顶正', '秉信', '包装', '淀粉', '芝麻油'],
  authors: [{ name: 'P.M.I Team' }],
  creator: 'P.M.I Head Office',
  publisher: 'P.M.I',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icon.png',
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main className="pt-16">
            {children}
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
