import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const t = useTranslations('Home');
  const tNav = useTranslations('Navigation');
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

  // Get products data
  const productsData = tSubs.raw('products') as Record<string, {
    name: string;
    english: string;
    description: string;
    category: string;
    image?: string;
    products: Array<{ name: string; description: string; image?: string }>;
  }>;

  const businessAreas = [
    { name: t('packaging'), count: 3, desc: t('businessDesc.packaging'), icon: '📦' },
    { name: t('materials'), count: 3, desc: t('businessDesc.materials'), icon: '🌾' },
    { name: t('ingredients'), count: 1, desc: t('businessDesc.ingredients'), icon: '🍜' },
    { name: t('logistics'), count: 1, desc: t('businessDesc.logistics'), icon: '🚚' },
  ];

  // Company list in display order
  const companyOrder = ['baxin', 'tingzheng', 'hesheng', 'prostar', 'tingzhi', 'starpro', 'weizhen', 'tingtong'];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - NIO Style Full Screen with Centered Content */}
      <section className="relative h-screen overflow-hidden">
        <Image
          src="/images/thpmg/banner1.jpg"
          alt={t('heroTitle')}
          fill
          className="object-cover"
          priority
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-900/30 to-blue-900/50"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4">
          <div className="max-w-[1440px] mx-auto w-full text-center">
            <FadeIn direction="up" distance={60} delay={200}>
              <div className="text-white">
                <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 mx-auto" style={{ letterSpacing: '-0.03em' }}>
                  {t('heroTitle')}
                </h1>
                <p className="text-base sm:text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90 mb-10">
                  {t('heroSubtitle')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Link
                    href={`/${tNav('locale')}/about`}
                    className="group inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-medium rounded-none hover:bg-blue-50 transition-all duration-300"
                  >
                    {t('ctaAbout')}
                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                  <Link
                    href={`/${tNav('locale')}/subsidiaries`}
                    className="group inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-medium border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300 rounded-none"
                  >
                    {t('ctaSubsidiaries')}
                  </Link>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Company Intro - NIO Style Left-Aligned Large Layout */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="max-w-4xl">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-blue-600 mb-4">
                ABOUT US
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-8 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('aboutTitle')}
              </h2>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 mt-16">
            <FadeIn direction="right" distance={40} delay={200}>
              <p className="text-lg sm:text-xl text-gray-600 leading-relaxed font-light">
                {t('aboutDescription')}
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <span className="text-2xl font-bold text-blue-600 mr-4">P</span>
                  <div>
                    <span className="font-semibold text-gray-900">Packaging</span>
                    <p className="text-gray-600 font-light">{t('pmiP')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl font-bold text-blue-600 mr-4">M</span>
                  <div>
                    <span className="font-semibold text-gray-900">Materials</span>
                    <p className="text-gray-600 font-light">{t('pmiM')}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-2xl font-bold text-blue-600 mr-4">I</span>
                  <div>
                    <span className="font-semibold text-gray-900">Ingredients</span>
                    <p className="text-gray-600 font-light">{t('pmiI')}</p>
                  </div>
                </div>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors group mt-8"
              >
                {t('learnMore')}
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </FadeIn>
            <FadeIn direction="left" distance={40} delay={300}>
              <div className="relative">
                <Image
                  src="/images/thpmg/history.png"
                  alt={t('history')}
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Scale Stats - Minimalist Full Width Dark Section */}
      <section className="py-24 sm:py-32 bg-gray-900 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-blue-400 mb-4">
                  OUR SCALE
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  {t('scaleTitle')}
                </h2>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 sm:gap-16">
                {[
                  { value: '7500+', label: t('scaleEmployees') },
                  { value: '14+4', label: t('scaleBases') },
                  { value: '8+', label: t('scaleCompanies') },
                  { value: '1992', label: t('scaleSince') },
                ].map((stat, index) => (
                  <FadeIn key={index} direction="up" distance={30} delay={index * 100}>
                    <div>
                      <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
                      <div className="text-sm text-gray-400 font-light">{stat.label}</div>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Business Areas - Clean Minimalist Grid */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-16 sm:mb-24">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-blue-600 mb-4">
                BUSINESS AREAS
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('businessTitle')}
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                {t('businessSubtitle')}
              </p>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {businessAreas.map((area, index) => (
              <FadeIn key={index} direction="up" distance={30} delay={index * 100}>
                <div className="group p-6 sm:p-8 border border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all duration-500 text-center">
                  <div className="text-4xl sm:text-5xl mb-6">{area.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{area.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-3">{area.count}<span className="text-lg font-normal text-gray-500">{t('companiesCount')}</span></div>
                  <p className="text-sm text-gray-600 font-light leading-relaxed">{area.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Company Products - Alternating Cards Layout */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-16 sm:mb-24">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-blue-600 mb-4">
                PRODUCTS & SERVICES
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                事业单位产品与服务
              </h2>
              <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                8 家事业单位提供多元化产品与服务
              </p>
            </div>
          </FadeIn>

          <div className="space-y-16 sm:space-y-24">
            {companyOrder.slice(0, 4).map((companyId, index) => {
              const company = productsData[companyId];
              if (!company) return null;
              const isEven = index % 2 === 0;

              return (
                <FadeIn key={companyId} direction="up" distance={40} delay={index * 100}>
                  <div className={`grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                    <div className={isEven ? 'md:order-1' : 'md:order-2'}>
                      <p className="text-xs font-medium tracking-[0.2em] uppercase text-blue-600 mb-3">
                        {company.category}
                      </p>
                      <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">{company.name}</h3>
                      <p className="text-gray-500 font-light mb-6">{company.english}</p>
                      <p className="text-gray-600 font-light leading-relaxed mb-8">{company.description}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {company.products.slice(0, 4).map((product, idx) => (
                          <div key={idx} className="group">
                            <div className="aspect-square bg-gray-100 mb-3 overflow-hidden">
                              {product.image ? (
                                <Image
                                  src={product.image}
                                  alt={product.name}
                                  width={200}
                                  height={200}
                                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className={isEven ? 'md:order-2' : 'md:order-1'}>
                      <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                        {company.products[0]?.image ? (
                          <Image
                            src={company.products[0].image}
                            alt={company.name}
                            width={600}
                            height={450}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                            <svg className="w-20 h-20 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* News - Minimalist Cards */}
      <section className="py-24 sm:py-32 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 sm:mb-24">
              <div>
                <p className="text-sm font-medium tracking-[0.2em] uppercase text-blue-600 mb-4">
                  NEWS & UPDATES
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  {t('newsTitle')}
                </h2>
              </div>
              <Link
                href="/news"
                className="group inline-flex items-center text-gray-900 font-medium hover:text-blue-600 transition-colors"
              >
                {t('viewAllNews')}
                <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {latestNews.map((news, index) => (
              <FadeIn key={news.id} direction="up" distance={30} delay={index * 100}>
                <Link
                  href={`/news/${news.id}`}
                  className="group block bg-white p-6 sm:p-8 hover:bg-gray-900 hover:text-white transition-all duration-500"
                >
                  <p className="text-sm text-gray-500 group-hover:text-gray-400 mb-3">{news.date}</p>
                  <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-white transition-colors">
                    {news.title}
                  </h3>
                  <p className="text-gray-600 font-light text-sm line-clamp-3 group-hover:text-gray-300 transition-colors">
                    {news.excerpt}
                  </p>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA - Full Width Minimalist */}
      <section className="py-24 sm:py-32 bg-blue-600 relative overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn direction="up" distance={40}>
            <div className="max-w-3xl">
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-blue-200 mb-4">
                GET IN TOUCH
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-8 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('contactTitle')}
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mb-12">
                <div>
                  <p className="text-blue-200 text-sm mb-1">{t('addressLabel')}</p>
                  <p className="text-white font-medium">{tContact('addressValue')}</p>
                </div>
                <div>
                  <p className="text-blue-200 text-sm mb-1">{t('phoneLabel')}</p>
                  <p className="text-white font-medium">{tContact('phoneValue')}</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-medium hover:bg-blue-50 transition-all duration-300"
                >
                  {t('contactButton')}
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/recruitment"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-medium border-2 border-white/50 hover:border-white hover:bg-white/10 transition-all duration-300"
                >
                  {t('recruitButton')}
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
