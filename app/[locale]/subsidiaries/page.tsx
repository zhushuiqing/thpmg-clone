import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

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
      {/* Hero Section - NIO Style Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/thpmg/about-banner.jpg"
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
              <p className="text-xl opacity-90 font-light">{t('pageSubtitle')}</p>
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

      {/* Overview - Modern Layout */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeIn direction="right" distance={40}>
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 tracking-tight">
                  {t('overviewTitle')}
                </h2>
                <div className="w-12 h-1 bg-blue-600 mb-6 rounded-full"></div>
                <p className="text-gray-700 leading-relaxed mb-8 font-light">
                  {t('overviewDescription')}
                </p>
                <ul className="space-y-4">
                  {[
                    { count: t('packagingCount'), label: t('subsidiaryNames.packaging') },
                    { count: t('materialsCount'), label: t('subsidiaryNames.materials') },
                    { count: t('ingredientsCount'), label: t('subsidiaryNames.ingredients') },
                    { count: t('logisticsCount'), label: t('subsidiaryNames.logistics') },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 font-bold mr-3 flex-shrink-0 text-lg">{item.count}</span>
                      <span className="text-gray-700">{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction="left" distance={40}>
              <div className="relative">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="/images/thpmg/subsidiaries.jpg"
                    alt={t('pageTitle')}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Subsidiaries by Category - Modern Cards */}
      {Object.entries(grouped).map(([category, items], categoryIndex) => (
        <section key={category} className="py-20 sm:py-32 bg-gray-50">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn direction="up" distance={30}>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 sm:mb-12 tracking-tight">
                {category}
              </h2>
            </FadeIn>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {items.map((sub, index) => (
                <FadeIn key={sub.id} direction="up" distance={30} delay={categoryIndex * 100 + index * 100}>
                  <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 h-full">
                    <div className="text-sm text-blue-600 font-medium mb-3 uppercase tracking-wide">
                      {sub.english}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">{sub.name}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed font-light">{sub.description}</p>
                    <a
                      href={sub.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group-hover:translate-x-1"
                    >
                      {t('visitWebsite')}
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Factory Map */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {t('factoryTitle')}
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('factorySubtitle')}
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" distance={40}>
            <div className="bg-gray-50 rounded-3xl p-4 sm:p-8 shadow-inner">
              <Image
                src="/images/thpmg/factory-map.png"
                alt={t('factoryTitle')}
                width={650}
                height={400}
                className="w-full h-auto"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn direction="up" distance={40}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 tracking-tight">
              {t('ctaTitle')}
            </h2>
            <p className="text-gray-300 mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
              {t('ctaSubtitle')}
            </p>
            <Link
              href="/about"
              className="inline-block px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {t('ctaButton')}
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
