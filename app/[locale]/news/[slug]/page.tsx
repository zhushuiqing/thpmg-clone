'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export default function NewsDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations('News');
  const tCommon = useTranslations('Common');

  // Get news from translations
  const newsData = t.raw('data') as Array<{
    id: number;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    content: string;
  }>;

  const news = newsData.find(n => n.id.toString() === slug);

  if (!news) {
    return (
      <div className="min-h-screen bg-section-white flex items-center justify-center">
        <div className="text-center">
          <FadeIn direction="up" distance={30}>
            <div className="text-6xl mb-6">📰</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4 tracking-tight">{t('noNews')}</h1>
            <Link
              href="/news"
              className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300"
            >
              ← {tCommon('backToNews')}
            </Link>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-section-white">
      {/* Hero Section - NIO Style Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/thpmg/news-banner.jpg"
          alt={news.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <FadeIn direction="up" distance={50}>
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  {news.category === 'employee' ? t('category.employee') : news.category}
                </span>
                <span className="text-sm opacity-80">{news.date}</span>
              </div>
            </FadeIn>
            <FadeIn direction="up" distance={40} delay={100}>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                {news.title}
              </h1>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={200}>
              <nav className="mt-4 text-gray-200 text-sm sm:text-base">
                <Link href="/" className="hover:text-white transition-colors">
                  {tCommon('home')}
                </Link>
                <span className="mx-2">/</span>
                <Link href="/news" className="hover:text-white transition-colors">
                  {t('pageTitle')}
                </Link>
                <span className="mx-2">/</span>
                <span className="opacity-60">{news.title.slice(0, 20)}...</span>
              </nav>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Content Section - Minimalist Article */}
      <section className="py-24 sm:py-32 section-bg-gray-light">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <article className="bg-white rounded-3xl shadow-premium p-6 sm:p-10 lg:p-12 border border-gray-200">
              <div className="prose prose-lg max-w-none">
                {news.content.split('\n').map((paragraph, index) => (
                  paragraph.trim() && (
                    <p
                      key={index}
                      className="text-gray-700 leading-relaxed mb-6 font-light text-base sm:text-lg"
                      style={{ lineHeight: '1.8' }}
                    >
                      {paragraph}
                    </p>
                  )
                ))}
              </div>
            </article>
          </FadeIn>

          {/* Back Button */}
          <FadeIn direction="up" distance={30} delay={200}>
            <div className="mt-12 text-center">
              <Link
                href="/news"
                className="inline-block px-10 py-4 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                ← {tCommon('backToNews')}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
