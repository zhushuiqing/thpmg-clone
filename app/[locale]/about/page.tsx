import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export const dynamic = 'force-dynamic';

export default function AboutPage() {
  const t = useTranslations('About');
  const tHome = useTranslations('Home');
  const tCommon = useTranslations('Common');
  const tContact = useTranslations('Contact');

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
            <FadeIn>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                {tHome('heroTitle')}
              </h1>
            </FadeIn>
            <nav className="mt-4 text-gray-200 text-sm">
              <Link href="/" className="hover:text-white transition-colors">
                {tCommon('home')}
              </Link>
              <span className="mx-2">/</span>
              <span>{t('pageTitle')}</span>
            </nav>
          </div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('companyTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 rounded-lg shadow-sm mb-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {t('companyDescription')}
              </p>
            </div>
            <div className="bg-white border-2 border-blue-600 p-8 rounded-lg mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('pmiTitle')}</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="font-bold text-blue-600 text-xl mr-3 flex-shrink-0">P</span>
                  <div>
                    <span className="font-semibold text-gray-900">Packaging</span>
                    <p className="text-gray-700 mt-1">{tHome('pmiP')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-blue-600 text-xl mr-3 flex-shrink-0">M</span>
                  <div>
                    <span className="font-semibold text-gray-900">Materials</span>
                    <p className="text-gray-700 mt-1">{tHome('pmiM')}</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="font-bold text-blue-600 text-xl mr-3 flex-shrink-0">I</span>
                  <div>
                    <span className="font-semibold text-gray-900">Ingredients</span>
                    <p className="text-gray-700 mt-1">{tHome('pmiI')}</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-700 text-lg leading-relaxed">
                {t('pmiDescription')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Strategy & Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('strategyTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('strategy')}</h3>
              <div className="grid grid-cols-2 gap-4">
                {strategyItems.map((item, index) => (
                  <div key={index} className="bg-blue-50 p-6 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t('values')}</h3>
              <div className="grid grid-cols-2 gap-4">
                {valuesItems.map((item, index) => (
                  <div key={index} className="bg-green-50 p-6 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-600">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('historyTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="mb-12">
            <Image
              src="/images/thpmg/history.png"
              alt={t('historyTitle')}
              width={800}
              height={400}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-600"></div>
              <div className="space-y-8">
                {historyData.map((item, index) => (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                    <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                      <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                        <div className="text-2xl font-bold text-blue-600">{item.year}{t('year')}</div>
                        <div className="text-gray-700 mt-2">{item.event}</div>
                      </div>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scale Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('scaleTitle')}
            </h2>
            <div className="w-24 h-1 bg-white mx-auto opacity-50"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-4">7500+</div>
              <div className="text-xl opacity-80">{t('scaleEmployees')}</div>
              <div className="text-sm opacity-60 mt-1">{t('asOfDate')}</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-4">14+4</div>
              <div className="text-xl opacity-80">{t('scaleBases')}</div>
              <div className="text-sm opacity-60 mt-1">{t('scaleBasesDetail')}</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-4">8+</div>
              <div className="text-xl opacity-80">{t('scaleCompanies')}</div>
              <div className="text-sm opacity-60 mt-1">{t('scaleCompaniesDetail')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Subsidiaries */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('subsidiariesTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="mb-12">
            <Image
              src="/images/thpmg/subsidiaries.jpg"
              alt={t('subsidiariesTitle')}
              width={800}
              height={500}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Subsidiaries content removed - now handled in /subsidiaries page */}
          </div>
        </div>
      </section>

      {/* Factory Map */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('factoryTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {t('factorySubtitle')}
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-sm">
            <Image
              src="/images/thpmg/factory-map.png"
              alt={t('factoryTitle')}
              width={650}
              height={500}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            {t('contactTitle')}
          </h2>
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-gray-500 text-sm mb-2">{t('address')}</div>
                <div className="text-gray-900 font-medium">{tContact('addressValue')}</div>
              </div>
              <div>
                <div className="text-gray-500 text-sm mb-2">{t('phone')}</div>
                <div className="text-gray-900 font-medium">{tContact('phoneValue')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('ctaSubtitle')}
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {t('ctaButton')}
          </Link>
        </div>
      </section>
    </div>
  );
}
