import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function SubsidiariesPage() {
  const t = useTranslations('Subsidiaries');
  const tCommon = useTranslations('Common');

  // 从翻译文件获取子公司数据
  const subsidiariesData = t.raw('subsidiaries') as Array<{
    id: number;
    name: string;
    english: string;
    description: string;
    category: string;
    website: string;
  }>;

  // Group subsidiaries by category
  const grouped = subsidiariesData.reduce((acc, sub) => {
    if (!acc[sub.category]) {
      acc[sub.category] = [];
    }
    acc[sub.category].push(sub);
    return acc;
  }, {} as Record<string, typeof subsidiariesData>);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner */}
      <section className="relative h-[400px] overflow-hidden">
        <Image
          src="/images/thpmg/about-banner.jpg"
          alt={t('pageTitle')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-900/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {t('pageTitle')}
            </h1>
            <p className="text-xl opacity-90">
              {t('pageSubtitle')}
            </p>
            <nav className="mt-4 text-gray-200 text-sm">
              <Link href="/" className="hover:text-white transition-colors">
                {tCommon('home')}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-gray-900">{t('pageTitle')}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                {t('overviewTitle')}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                {t('overviewDescription')}
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2 flex-shrink-0">{t('packagingCount')}：</span>
                  <span className="text-gray-700">{t('subsidiaryNames.packaging')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2 flex-shrink-0">{t('materialsCount')}：</span>
                  <span className="text-gray-700">{t('subsidiaryNames.materials')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2 flex-shrink-0">{t('ingredientsCount')}：</span>
                  <span className="text-gray-700">{t('subsidiaryNames.ingredients')}</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 font-bold mr-2 flex-shrink-0">{t('logisticsCount')}：</span>
                  <span className="text-gray-700">{t('subsidiaryNames.logistics')}</span>
                </li>
              </ul>
            </div>
            <div className="relative">
              <Image
                src="/images/thpmg/subsidiaries.jpg"
                alt={t('pageTitle')}
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Subsidiaries by Category */}
      {Object.entries(grouped).map(([category, items]) => (
        <section key={category} className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              {category}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="text-sm text-blue-600 font-medium mb-2">
                    {sub.english}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{sub.name}</h3>
                  <p className="text-gray-600 mb-4">{sub.description}</p>
                  <a
                    href={sub.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    {t('visitWebsite')}
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Factory Map Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('factoryTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {t('factorySubtitle')}
            </p>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <Image
              src="/images/thpmg/factory-map.png"
              alt={t('factoryTitle')}
              width={650}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-blue-100 mb-8">
            {t('ctaSubtitle')}
          </p>
          <Link
            href="/about"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
