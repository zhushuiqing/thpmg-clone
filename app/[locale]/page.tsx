import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const t = useTranslations('Home');
  const tNav = useTranslations('Navigation');
  const tCommon = useTranslations('Common');
  const tNews = useTranslations('News');
  const tSubs = useTranslations('Subsidiaries');
  const tContact = useTranslations('Contact');

  // Get news from translations
  const newsData = tNews.raw('data') as Array<{
    id: number;
    title: string;
    date: string;
    category: string;
    excerpt: string;
    content: string;
  }>;
  const latestNews = newsData.slice(0, 3);

  // Get subsidiaries from translations
  const subsidiariesData = tSubs.raw('subsidiaries') as Array<{
    id: number;
    name: string;
    english: string;
    description: string;
    category: string;
  }>;
  const subsidiaries = subsidiariesData.slice(0, 4);

  const businessAreas = [
    { name: t('packaging'), count: 3, desc: t('businessDesc.packaging'), icon: '📦' },
    { name: t('materials'), count: 3, desc: t('businessDesc.materials'), icon: '🌾' },
    { name: t('ingredients'), count: 1, desc: t('businessDesc.ingredients'), icon: '🍜' },
    { name: t('logistics'), count: 1, desc: t('businessDesc.logistics'), icon: '🚚' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner */}
      <section className="relative h-[50vh] sm:h-[600px] overflow-hidden">
        <Image
          src="/images/thpmg/banner1.jpg"
          alt={t('heroTitle')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-900/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 w-full max-w-4xl mx-auto">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
              {t('heroTitle')}
            </h1>
            <p className="text-base sm:text-xl md:text-2xl mb-2 font-light">
              {t('heroSubtitle')}
            </p>
            <p className="text-sm sm:text-lg max-w-2xl mx-auto opacity-90 line-clamp-2 sm:line-clamp-none">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
              <Link
                href={`/${tNav('locale')}/about`}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                {t('ctaAbout')}
              </Link>
              <Link
                href={`/${tNav('locale')}/subsidiaries`}
                className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors text-center"
              >
                {t('ctaSubsidiaries')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                {t('aboutTitle')}
              </h2>
              <div className="w-16 sm:w-24 h-1 bg-blue-600 mb-4 sm:mb-6"></div>
              <p className="text-gray-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                {t('aboutDescription')}
              </p>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-4 sm:mb-6">
                <h4 className="font-bold text-gray-900 mb-3 sm:mb-4 text-base sm:text-lg">{t('pmiTitle')}</h4>
                <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-700">
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2 flex-shrink-0">P</span>
                    <span>{t('pmiP')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2 flex-shrink-0">M</span>
                    <span>{t('pmiM')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="font-bold text-blue-600 mr-2 flex-shrink-0">I</span>
                    <span>{t('pmiI')}</span>
                  </li>
                </ul>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors text-sm sm:text-base"
              >
                {t('learnMore')} <span className="ml-1">{tCommon('arrowRight')}</span>
              </Link>
            </div>
            <div className="relative w-full">
              <Image
                src="/images/thpmg/history.png"
                alt={t('history')}
                width={600}
                height={350}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Scale Stats */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
              {t('scaleTitle')}
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-white mx-auto opacity-50"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            <div className="text-center text-white">
              <div className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2">7500+</div>
              <div className="text-xs sm:text-lg opacity-80">{t('scaleEmployees')}</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2">14+4</div>
              <div className="text-xs sm:text-lg opacity-80">{t('scaleBases')}</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2">8+</div>
              <div className="text-xs sm:text-lg opacity-80">{t('scaleCompanies')}</div>
            </div>
            <div className="text-center text-white">
              <div className="text-3xl sm:text-5xl font-bold mb-1 sm:mb-2">1992</div>
              <div className="text-xs sm:text-lg opacity-80">{t('scaleSince')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('businessTitle')}
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto px-4">
              {t('businessSubtitle')}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {businessAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-4 sm:p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-3xl sm:text-5xl mb-2 sm:mb-4">{area.icon}</div>
                <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{area.name}</h3>
                <div className="text-lg sm:text-2xl font-bold text-blue-600 mb-1 sm:mb-2">{area.count}{t('companiesCount')}</div>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidiaries Image */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('subsidiariesTitle')}
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="mb-6 sm:mb-8">
            <Image
              src="/images/thpmg/subsidiaries.jpg"
              alt={t('subsidiariesTitle')}
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg mx-auto"
            />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {subsidiaries.map((sub) => (
              <div
                key={sub.id}
                className="bg-gray-50 p-3 sm:p-6 rounded-lg text-center"
              >
                <div className="text-xs sm:text-sm text-blue-600 font-medium mb-1 sm:mb-2">{sub.category}</div>
                <h3 className="text-sm sm:text-lg font-bold text-gray-900 mb-1 sm:mb-2">{sub.name}</h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-1 sm:mb-2">{sub.english}</p>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-2">{sub.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/subsidiaries"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              {t('viewAll')}
            </Link>
          </div>
        </div>
      </section>

      {/* Factory Map */}
      <section className="py-12 sm:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('factoryTitle')}
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto px-4">
              {t('factorySubtitle')}
            </p>
          </div>
          <div className="bg-white p-4 sm:p-8 rounded-lg shadow-sm overflow-hidden">
            <Image
              src="/images/thpmg/factory-map.png"
              alt={t('factoryTitle')}
              width={600}
              height={400}
              className="w-full h-auto"
            />
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              {t('newsTitle')}
            </h2>
            <div className="w-16 sm:w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
            {latestNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="bg-gray-50 p-4 sm:p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 font-medium text-xs sm:text-sm mb-2">{news.date}</div>
                <h3 className="text-base sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">{news.excerpt}</p>
                <div className="mt-3 sm:mt-4 text-blue-600 font-medium text-xs sm:text-sm flex items-center">
                  {t('readMore')} <span className="ml-1">{tCommon('arrowRight')}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/news"
              className="inline-block px-6 sm:px-8 py-2.5 sm:py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              {t('viewAllNews')}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            {t('contactTitle')}
          </h2>
          <p className="text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base max-w-2xl mx-auto px-4">
            <span className="block sm:inline">{t('addressLabel')}：{tContact('addressValue')}</span>
            <span className="block sm:inline sm:ml-4">{t('phoneLabel')}：{tContact('phoneValue')}</span>
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
            <Link
              href="/contact"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-center text-sm sm:text-base"
            >
              {t('contactButton')}
            </Link>
            <Link
              href="/recruitment"
              className="inline-block px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors text-center text-sm sm:text-base"
            >
              {t('recruitButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-3 sm:mb-4">
            <span className="text-white font-bold text-lg sm:text-xl">P.M.I</span>
            <span className="ml-2 text-sm sm:text-base">{t('footerName')}</span>
          </div>
          <div className="text-xs sm:text-sm mb-3 sm:mb-4 px-2">
            {tContact('addressValue')}<br className="sm:hidden" />
            <span className="hidden sm:inline"> | </span>
            {tContact('phoneValue')}
          </div>
          <div className="text-xs sm:text-sm mb-3 sm:mb-4">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              {tContact('icpValue')}
            </a>
            <span className="mx-2 hidden sm:inline">|</span>
            <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011802001131" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              {tContact('policeIcpValue')}
            </a>
          </div>
          <div className="text-xs sm:text-sm">
            {tCommon('copyright')} © 2015 - {new Date().getFullYear()} P.M.I
          </div>
        </div>
      </footer>
    </div>
  );
}
