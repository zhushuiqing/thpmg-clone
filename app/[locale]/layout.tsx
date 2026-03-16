import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Geist, Geist_Mono } from "next/font/google";
import StructuredData from '@/components/StructuredData';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

type MetadataProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: MetadataProps) {
  const { locale } = await params;
  const baseUrl = locale === 'zh-Hans' ? 'https://www.thpmg.com' : `https://www.thpmg.com/${locale}`;

  return {
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
    alternates: {
      canonical: baseUrl,
      languages: {
        'zh-Hans': 'https://www.thpmg.com/zh-Hans',
        'zh-Hant': 'https://www.thpmg.com/zh-Hant',
        'en': 'https://www.thpmg.com/en',
        'ja': 'https://www.thpmg.com/ja',
        'th': 'https://www.thpmg.com/th',
        'vi': 'https://www.thpmg.com/vi',
        'id': 'https://www.thpmg.com/id',
      },
    },
    openGraph: {
      type: 'website',
      locale,
      url: baseUrl,
      title: 'P.M.I 总管理处 | PMI Head Office',
      description: 'P.M.I.总管理处下辖 8 家事业单位，在国内 14 个省市、泰国 4 个城市开设有生产基地，拥有员工近 7,500 人',
      siteName: 'P.M.I',
      images: [
        {
          url: 'https://www.thpmg.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'P.M.I Head Office',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'P.M.I 总管理处 | PMI Head Office',
      description: 'P.M.I.总管理处下辖 8 家事业单位，在国内 14 个省市、泰国 4 个城市开设有生产基地，拥有员工近 7,500 人',
      creator: '@pmi_headoffice',
    },
  };
}

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
    <html lang={locale} className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg"
        >
          Skip to main content
        </a>
        <NextIntlClientProvider messages={messages}>
          <Navigation />
          <main id="main-content" className="pt-16">
            {children}
            <StructuredData
              type="Organization"
              data={{
                name: 'P.M.I 总管理处',
                alternateName: 'PMI Head Office',
                url: 'https://www.thpmg.com',
                logo: 'https://www.thpmg.com/images/thpmg/logo.png',
                description: 'P.M.I.总管理处下辖 8 家事业单位，在国内 14 个省市、泰国 4 个城市开设有生产基地',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'CN',
                },
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+86-21-31754203',
                  contactType: 'customer service',
                },
              }}
            />
          </main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
