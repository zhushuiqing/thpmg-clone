import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  const t = useTranslations('About');
  const tHome = useTranslations('Home');
  const tCommon = useTranslations('Common');

  // Get history data from translations
  const historyData = t.raw('historyData') as Array<{
    year: string;
    event: string;
  }>;

  const strategyItems = [
    { key: 'steady', label: t('steady') },
    { key: 'technology', label: t('technology') },
    { key: 'quality', label: t('quality') },
    { key: 'cost', label: t('cost') },
  ];

  const valuesItems = [
    { key: 'integrity', label: t('integrity') },
    { key: 'pragmatic', label: t('pragmatic') },
    { key: 'innovation', label: t('innovation') },
    { key: 'progress', label: t('progress') },
  ];

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
                {tHome('heroTitle')}
              </h1>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={200}>
              <nav className="mt-4 text-gray-200 text-sm sm:text-base">
                <Link href="/" className="hover:text-white transition-colors">
                  {tCommon('home')}
                </Link>
                <span className="mx-2">/</span>
                <span>{t('pageTitle')}</span>
              </nav>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Company Profile - Minimalist Design */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('companyTitle')}
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            </div>
          </FadeIn>
          <div className="max-w-4xl mx-auto">
            <FadeIn direction="up" distance={30}>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 sm:p-10 rounded-2xl mb-6 sm:mb-10">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                  {t('companyDescription')}
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={100}>
              <div className="bg-white border border-gray-200 p-6 sm:p-10 rounded-2xl mb-6 sm:mb-10 shadow-sm">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center tracking-tight">{t('pmiTitle')}</h3>
                <ul className="space-y-4 sm:space-y-6">
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">P</span>
                    <div>
                      <span className="font-semibold text-gray-900 text-base sm:text-lg">Packaging</span>
                      <p className="text-gray-600 text-sm sm:text-base mt-1 font-light">{tHome('pmiP')}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">M</span>
                    <div>
                      <span className="font-semibold text-gray-900 text-base sm:text-lg">Materials</span>
                      <p className="text-gray-600 text-sm sm:text-base mt-1 font-light">{tHome('pmiM')}</p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 text-xl sm:text-2xl mr-3 sm:mr-4 flex-shrink-0">I</span>
                    <div>
                      <span className="font-semibold text-gray-900 text-base sm:text-lg">Ingredients</span>
                      <p className="text-gray-600 text-sm sm:text-base mt-1 font-light">{tHome('pmiI')}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={200}>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-6 sm:p-10 rounded-2xl">
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed font-light">
                  {t('pmiDescription')}
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Strategy & Values - Modern Grid */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('strategyTitle')}
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 max-w-5xl mx-auto">
            <FadeIn direction="right" distance={30}>
              <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center tracking-tight">{t('strategy')}</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {strategyItems.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 sm:p-6 rounded-xl text-center hover:shadow-md transition-shadow duration-300">
                      <div className="text-base sm:text-2xl font-bold text-blue-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left" distance={30}>
              <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm h-full">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8 text-center tracking-tight">{t('values')}</h3>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {valuesItems.map((item, index) => (
                    <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 rounded-xl text-center hover:shadow-md transition-shadow duration-300">
                      <div className="text-base sm:text-2xl font-bold text-green-600">{item.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* History Timeline - Modern Vertical */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('historyTitle')}
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
            </div>
          </FadeIn>
          <FadeIn direction="up" distance={40}>
            <div className="mb-12 sm:mb-16">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/thpmg/history.png"
                  alt={t('historyTitle')}
                  width={800}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </FadeIn>
          {/* Desktop Timeline */}
          <div className="hidden md:block max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-blue-600 to-blue-200"></div>
              <div className="space-y-8">
                {historyData.map((item, index) => (
                  <FadeIn key={index} direction={index % 2 === 0 ? 'right' : 'left'} distance={30}>
                    <div className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                      <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                          <div className="text-xl sm:text-2xl font-bold text-blue-600">{item.year}{t('year')}</div>
                          <div className="text-gray-700 mt-2 font-light">{item.event}</div>
                        </div>
                      </div>
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full border-4 border-white shadow-lg"></div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </div>
          {/* Mobile Timeline */}
          <div className="md:hidden space-y-4 px-4">
            {historyData.map((item, index) => (
              <FadeIn key={index} direction="up" distance={30} delay={index * 50}>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <div className="flex-grow bg-blue-50 p-5 rounded-2xl shadow-sm">
                    <div className="text-lg font-bold text-blue-600">{item.year}{t('year')}</div>
                    <div className="text-gray-700 mt-1 text-sm font-light">{item.event}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Scale Stats - Dark Gradient */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn direction="up" distance={30}>
            <div className="text-center mb-12 sm:mb-16">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('scaleTitle')}
              </h2>
              <div className="w-12 h-1 bg-blue-500 mx-auto rounded-full"></div>
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10">
            {[
              { value: '7500+', label: t('scaleEmployees'), detail: t('asOfDate') },
              { value: '14+4', label: t('scaleBases'), detail: t('scaleBasesDetail') },
              { value: '8+', label: t('scaleCompanies'), detail: t('scaleCompaniesDetail') },
            ].map((stat, index) => (
              <FadeIn key={index} direction="up" distance={30} delay={index * 100}>
                <div className="text-center text-white">
                  <div className="text-4xl sm:text-6xl font-bold mb-3 sm:mb-4 tracking-tight">{stat.value}</div>
                  <div className="text-sm sm:text-lg opacity-80 font-light">{stat.label}</div>
                  <div className="text-xs sm:text-sm opacity-50 mt-1">{stat.detail}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Map */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
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
                height={500}
                className="w-full h-auto rounded-2xl"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section - Gradient */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn direction="up" distance={40}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
              {t('ctaTitle')}
            </h2>
            <p className="text-blue-100 mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
              {t('ctaSubtitle')}
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-white text-blue-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              {t('ctaButton')}
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
