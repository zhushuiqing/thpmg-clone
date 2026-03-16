import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export const dynamic = 'force-dynamic';

export default function ServicesPage() {
  const t = useTranslations('Services');

  // Get service data from translations
  const serviceCategories = t.raw('categories') as Array<{
    title: string;
    description: string;
    icon: string;
    services: string[];
  }>;

  const advantages = t.raw('advantages') as Array<{
    title: string;
    description: string;
  }>;

  const process = t.raw('process') as Array<{
    step: number;
    title: string;
    description: string;
  }>;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - NIO Style Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/thpmg/services-banner.jpg"
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
              <nav className="mt-4 text-gray-200 text-sm sm:text-base">
                <Link href="/" className="hover:text-white transition-colors">
                  {t('home')}
                </Link>
                <span className="mx-2">/</span>
                <span>{t('pageTitle')}</span>
              </nav>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Services Overview - Modern Grid */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('ourServices')}
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('serviceDescription')}
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {serviceCategories.map((category, index) => (
              <FadeIn key={index} direction="up" distance={30} delay={index * 100}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-full border border-gray-100">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-8 text-center group-hover:scale-105 transition-transform duration-500">
                    <div className="text-5xl sm:text-6xl mb-4">{category.icon}</div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                      {category.title}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                      {category.description}
                    </p>
                    <div className="space-y-3">
                      {category.services.map((service, i) => (
                        <div key={i} className="flex items-center text-gray-700">
                          <svg
                            className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages - Minimalist Cards */}
      <section className="py-20 sm:py-32 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('advantagesTitle')}
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('advantagesDescription')}
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 max-w-5xl mx-auto">
            {advantages.map((item, index) => (
              <FadeIn key={index} direction="up" distance={30} delay={index * 100}>
                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 h-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process - Timeline Style */}
      <section className="py-20 sm:py-32 bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={30}>
            <div className="text-center mb-12 sm:mb-20">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('processTitle')}
              </h2>
              <div className="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('processDescription')}
              </p>
            </div>
          </FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-blue-200 hidden md:block"></div>

              {/* Steps */}
              {process.map((step, index) => (
                <FadeIn key={index} direction="left" distance={30} delay={index * 100}>
                  <div className="flex mb-10 last:mb-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-6 shadow-lg shadow-blue-200 relative z-10">
                      {step.step}
                    </div>
                    <div className="flex-1 bg-gray-50 p-6 rounded-2xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 tracking-tight">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Gradient Background */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
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
            <p className="text-gray-300 mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
              {t('ctaDescription')}
            </p>
            <Link
              href="/contact"
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
