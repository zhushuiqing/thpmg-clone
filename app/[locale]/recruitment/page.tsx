'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import FadeIn from '@/components/FadeIn';

export default function RecruitmentPage() {
  const t = useTranslations('Recruitment');
  const tBenefits = useTranslations('Benefits');
  const tCommon = useTranslations('Common');
  const [selectedJob, setSelectedJob] = useState<number | null>(null);

  // 从翻译文件获取职位数据
  const positions = t.raw('positions') as Array<{
    id: number;
    title: string;
    department: string;
    location: string;
    responsibilities: string[];
    requirements: string[];
  }>;

  return (
    <div className="min-h-screen bg-section-white">
      {/* Hero Section - NIO Style Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/thpmg/recruitment-banner.jpg"
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
              <p className="text-xl opacity-90 font-light">{t('joinUsTitle')}</p>
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

      {/* Intro Section */}
      <section className="py-24 sm:py-32 section-gradient-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn direction="up" distance={40}>
            <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
              JOIN OUR TEAM
            </p>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
              {t('joinUsTitle')}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-gray-700 text-lg leading-relaxed font-light max-w-2xl mx-auto">
              {t('joinUsDescription')}
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Benefits - Modern Grid */}
      <section className="py-24 sm:py-32 section-bg-gray-light">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-12 sm:mb-20">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                WHY PMI
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('benefitsTitle')}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              { title: tBenefits('salary'), desc: tBenefits('salaryDesc'), icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )},
              { title: tBenefits('insurance'), desc: tBenefits('insuranceDesc'), icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )},
              { title: tBenefits('vacation'), desc: tBenefits('vacationDesc'), icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )},
              { title: tBenefits('training'), desc: tBenefits('trainingDesc'), icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              )},
              { title: tBenefits('culture'), desc: tBenefits('cultureDesc'), icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              )},
              { title: tBenefits('care'), desc: tBenefits('careDesc'), icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              )},
            ].map((benefit, index) => (
              <FadeIn key={index} direction="up" distance={30} delay={index * 100}>
                <div className="group bg-white p-6 sm:p-8 rounded-2xl shadow-premium hover:shadow-premium-lg transition-all duration-500 h-full border border-gray-200">
                  <div className="w-12 h-12 mb-4 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 tracking-tight">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed font-light">{benefit.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings - Modern Accordion */}
      <section className="py-24 sm:py-32 section-gradient-gray">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-12 sm:mb-20">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                CAREER OPPORTUNITIES
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('positionsTitle')}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
          </FadeIn>
          <div className="space-y-4">
            {positions.map((job, index) => (
              <FadeIn key={job.id} direction="up" distance={30} delay={index * 100}>
                <div className="group bg-white rounded-2xl overflow-hidden hover:shadow-premium-lg transition-all duration-300 border border-gray-200">
                  <button
                    onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 tracking-tight">{job.title}</h3>
                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {job.department}
                          </span>
                        </div>
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${
                          selectedJob === job.id ? 'rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>
                  {selectedJob === job.id && (
                    <div className="p-6 pt-0 bg-section-gray-light border-t border-gray-100">
                      <div className="mt-6 space-y-6">
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 tracking-tight">{t('responsibilities')}</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((item, idx) => (
                              <li key={idx} className="text-gray-700 flex items-start font-light">
                                <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-3 tracking-tight">{t('requirements')}</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((item, idx) => (
                              <li key={idx} className="text-gray-700 flex items-start font-light">
                                <svg className="w-5 h-5 text-primary mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="pt-4">
                          <a
                            href="mailto:hr@thpmg.com"
                            className="inline-block px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          >
                            {t('applyButton')}
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section - Gradient CTA */}
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
            <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-8"></div>
            <p className="text-gray-300 mb-8 sm:mb-12 text-base sm:text-lg leading-relaxed">
              {t('ctaSubtitle')}
            </p>
            <div className="bg-white/5 backdrop-blur-md p-6 sm:p-8 rounded-2xl inline-block border border-white/10">
              <div className="text-gray-300 mb-2 text-sm">{t('emailTitle')}</div>
              <a href="mailto:hr@thpmg.com" className="text-2xl sm:text-3xl font-bold text-white hover:underline transition-colors">
                hr@thpmg.com
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
