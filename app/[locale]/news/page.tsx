'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('employeeNews')}
          </p>
          <nav className="mt-4 text-gray-600 text-sm">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {tCommon('home')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('pageTitle')}</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* News Categories */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* News List */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredNews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">{t('noNews')}</p>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredNews.map((news) => (
                <Link
                  key={news.id}
                  href={`/news/${news.id}`}
                  className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <span className="text-sm text-blue-600 font-medium">
                          {news.category === 'employee' ? t('category.employee') : news.category}
                        </span>
                        <span className="text-sm text-gray-500">{news.date}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {news.title}
                      </h3>
                      <p className="text-gray-600 mt-2 line-clamp-2">
                        {news.excerpt}
                      </p>
                    </div>
                    <div className="flex items-center text-blue-600 font-medium group-hover:translate-x-2 transition-transform">
                      {t('readMore')}
                      <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
