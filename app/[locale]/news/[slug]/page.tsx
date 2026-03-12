'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t('noNews')}</h1>
          <Link
            href="/news"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            ← {tCommon('backToNews')}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {news.title}
          </h1>
          <div className="text-gray-600 text-sm space-x-4">
            <span>{news.date}</span>
            <span>·</span>
            <span>{news.category === 'employee' && t('category.employee')}</span>
          </div>
          <nav className="mt-4 text-gray-600 text-sm">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {tCommon('home')}
            </Link>
            <span className="mx-2">/</span>
            <Link href="/news" className="hover:text-blue-600 transition-colors">
              {t('pageTitle')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{news.title}</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* Content Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="bg-white rounded-lg shadow-sm p-8">
            <div className="prose prose-lg max-w-none">
              {news.content.split('\n').map((paragraph, index) => (
                <p key={index} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </article>

          {/* Back Button */}
          <div className="mt-12 text-center">
            <Link
              href="/news"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              ← {tCommon('backToNews')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
