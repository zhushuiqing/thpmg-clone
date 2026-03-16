'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export default function NewsPage() {
  const t = useTranslations('News');
  const tCommon = useTranslations('Common');
  const [activeCategory, setActiveCategory] = useState('all');

  // Get news from translations
  const newsData = t.raw('data') as Array<{
    id: number;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    content: string;
  }>;

  const filteredNews = activeCategory === 'all'
    ? newsData
    : newsData.filter(news => news.category === activeCategory);

  const categories = [
    { id: 'all', name: t('allNews') },
    { id: 'employee', name: t('category.employee') },
  ];

  return (
    <div className="min-h-screen bg-section-white">
      {/* Hero Section - NIO Style Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/thpmg/news-banner.jpg"
          alt={t('pageTitle')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <FadeIn direction="up" distance={50}>
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('pageTitle')}
              </h1>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={200}>
              <p className="text-xl opacity-90 font-light">{t('employeeNews')}</p>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={400}>
              <nav className="mt-4 text-gray-200 text-sm sm:text-base">
                <Link href="/" className="hover:text-white transition-colors">
                  {tCommon('home')}
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-900">{t('pageTitle')}</span>
              </nav>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* News Categories - Modern Tabs */}
      <section className="py-8 sm:py-12 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-16 sm:top-20 z-40">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`
                  px-6 sm:px-8 py-2.5 sm:py-3 rounded-full font-medium text-sm sm:text-base
                  transition-all duration-300
                  ${
                    activeCategory === category.id
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News List - Modern Cards */}
      <section className="py-24 sm:py-32 section-bg-gray">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
            <FadeIn direction="up" distance={30}>
              <div className="text-center py-20">
                <div className="text-6xl mb-4">📰</div>
                <p className="text-gray-500 text-lg font-light">{t('noNews')}</p>
              </div>
            </FadeIn>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredNews.map((news, index) => (
                <FadeIn key={news.id} direction="up" distance={30} delay={index * 100}>
                  <Link
                    href={`/news/${news.id}`}
                    className="group block bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 h-full border border-gray-200"
                  >
                    <div className="aspect-[16/10] bg-gradient-to-br from-blue-50 to-indigo-100 relative overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-16 h-16 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm2 2h2v8H8V8zm4 0h2v8h-2V8zm4 0h2v8h-2V8z"/>
                        </svg>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-blue-100 text-primary text-xs font-medium rounded-full">
                          {news.category === 'employee' ? t('category.employee') : news.category}
                        </span>
                        <span className="text-sm text-gray-500">{news.date}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors tracking-tight">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 font-light">
                        {news.excerpt}
                      </p>
                      <div className="mt-4 flex items-center text-primary font-medium text-sm group-hover:translate-x-1 transition-transform">
                        {t('readMore')}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section - Gradient */}
      <section className="py-24 sm:py-32 section-bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn direction="up" distance={40}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              订阅更多资讯
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-300 mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
              获取 PMI 最新消息和活动通知
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-section-blue-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              立即订阅
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
