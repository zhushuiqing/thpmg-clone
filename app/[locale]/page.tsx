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
      <section className="relative h-[600px] overflow-hidden">
        <Image
          src="/images/thpmg/banner1.jpg"
          alt={t('heroTitle')}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-900/30"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl mb-2 font-light">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg max-w-3xl mx-auto opacity-90">
              {t('heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
              <Link
                href={`/${tNav('locale')}/about`}
                className="inline-block px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                {t('ctaAbout')}
              </Link>
              <Link
                href={`/${tNav('locale')}/subsidiaries`}
                className="inline-block px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
              >
                {t('ctaSubsidiaries')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('aboutTitle')}
              </h2>
              <div className="w-24 h-1 bg-blue-600 mb-6"></div>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {t('aboutDescription')}
              </p>
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h4 className="font-bold text-gray-900 mb-4">{t('pmiTitle')}</h4>
                <ul className="space-y-3 text-sm text-gray-700">
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
                className="inline-block text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {t('learnMore')} {tCommon('arrowRight')}
              </Link>
            </div>
            <div className="relative">
              <Image
                src="/images/thpmg/history.png"
                alt={t('history')}
                width={600}
                height={350}
                className="rounded-lg shadow-lg"
              />
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
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">7500+</div>
              <div className="text-lg opacity-80">{t('scaleEmployees')}</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">14+4</div>
              <div className="text-lg opacity-80">{t('scaleBases')}</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">8+</div>
              <div className="text-lg opacity-80">{t('scaleCompanies')}</div>
            </div>
            <div className="text-center text-white">
              <div className="text-5xl font-bold mb-2">1992</div>
              <div className="text-lg opacity-80">{t('scaleSince')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Areas */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('businessTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {t('businessSubtitle')}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {businessAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <div className="text-5xl mb-4">{area.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{area.name}</h3>
                <div className="text-2xl font-bold text-blue-600 mb-2">{area.count}{t('companiesCount')}</div>
                <p className="text-gray-600 text-sm">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subsidiaries Image */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('subsidiariesTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="mb-8">
            <Image
              src="/images/thpmg/subsidiaries.jpg"
              alt={t('subsidiariesTitle')}
              width={800}
              height={600}
              className="rounded-lg shadow-lg mx-auto"
            />
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {subsidiaries.map((sub) => (
              <div
                key={sub.id}
                className="bg-gray-50 p-6 rounded-lg text-center"
              >
                <div className="text-sm text-blue-600 font-medium mb-2">{sub.category}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{sub.name}</h3>
                <p className="text-gray-500 text-sm mb-2">{sub.english}</p>
                <p className="text-gray-600 text-sm line-clamp-2">{sub.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/subsidiaries"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('viewAll')}
            </Link>
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
              width={600}
              height={400}
              className="mx-auto"
            />
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('newsTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {latestNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="text-blue-600 font-medium text-sm mb-2">{news.date}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 text-sm line-clamp-3">{news.excerpt}</p>
                <div className="mt-4 text-blue-600 font-medium text-sm">
                  {t('readMore')} {tCommon('arrowRight')}
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/news"
              className="inline-block px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              {t('viewAllNews')}
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            {t('contactTitle')}
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('addressLabel')}：{tContact('addressValue')}<br />
            {t('phoneLabel')}：{tContact('phoneValue')}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('contactButton')}
            </Link>
            <Link
              href="/recruitment"
              className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
            >
              {t('recruitButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-4">
            <span className="text-white font-bold text-xl">P.M.I</span>
            <span className="ml-2">{t('footerName')}</span>
          </div>
          <div className="text-sm mb-4">
            {tContact('addressValue')} | {tContact('phoneValue')}
          </div>
          <div className="text-sm mb-4">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              {tContact('icpValue')}
            </a>
            {' '}|{' '}
            <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011802001131" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              {tContact('policeIcpValue')}
            </a>
          </div>
          <div className="text-sm">
            {tCommon('copyright')} © 2015 - {new Date().getFullYear()} P.M.I
          </div>
        </div>
      </footer>
    </div>
  );
}
