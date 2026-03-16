import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';
import type { ReactNode } from 'react';

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

  // Icon mapping for service categories
  const iconMap: Record<string, ReactNode> = {
    consulting: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    support: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    development: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    analytics: (
      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  };

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
    <div className="min-h-screen bg-section-white">
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
      <section className="py-24 sm:py-32 section-gradient-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-12 sm:mb-20">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                OUR SERVICES
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('ourServices')}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('serviceDescription')}
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {serviceCategories.map((category, index) => (
              <FadeIn key={index} direction="up" distance={30} delay={index * 100}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-premium hover:shadow-premium-lg transition-all duration-500 h-full border border-gray-200">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 text-center group-hover:scale-105 transition-transform duration-500">
                    <div className="text-primary mb-4 flex justify-center">
                      {iconMap[category.icon] || iconMap.consulting}
                    </div>
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
                            className="w-4 h-4 text-primary mr-3 flex-shrink-0"
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
      <section className="py-24 sm:py-32 section-bg-gray-light">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-12 sm:mb-20">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                WHY CHOOSE US
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('advantagesTitle')}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('advantagesDescription')}
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-10 max-w-5xl mx-auto">
            {advantages.map((item, index) => (
              <FadeIn key={index} direction="up" distance={30} delay={index * 100}>
                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-premium hover:shadow-premium-lg transition-all duration-500 h-full border border-gray-200">
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
      <section className="py-24 sm:py-32 section-gradient-gray">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-12 sm:mb-20">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                HOW IT WORKS
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('processTitle')}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('processDescription')}
              </p>
            </div>
          </FadeIn>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-blue-200 hidden md:block"></div>

              {/* Steps */}
              {process.map((step, index) => (
                <FadeIn key={index} direction="left" distance={30} delay={index * 100}>
                  <div className="flex mb-10 last:mb-0">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-6 shadow-lg shadow-blue-200 relative z-10">
                      {step.step}
                    </div>
                    <div className="flex-1 bg-section-gray-light p-6 rounded-2xl shadow-premium border border-gray-200">
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
      <section className="py-24 sm:py-32 section-bg-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeIn direction="up" distance={40}>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              {t('ctaTitle')}
            </h2>
            <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full mb-8"></div>
            <p className="text-gray-300 mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
              {t('ctaDescription')}
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-white text-gray-900 font-bold rounded-full hover:bg-section-blue-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              {t('ctaButton')}
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
