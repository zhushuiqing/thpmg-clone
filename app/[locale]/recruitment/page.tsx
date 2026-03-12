'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

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
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('joinUsTitle')}
          </p>
          <nav className="mt-4 text-gray-600 text-sm">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {tCommon('home')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('pageTitle')}</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* Intro Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {t('joinUsTitle')}
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-8">
            {t('joinUsDescription')}
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('benefitsTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tBenefits('salary')}</h3>
              <p className="text-gray-600">{tBenefits('salaryDesc')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tBenefits('insurance')}</h3>
              <p className="text-gray-600">{tBenefits('insuranceDesc')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tBenefits('vacation')}</h3>
              <p className="text-gray-600">{tBenefits('vacationDesc')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tBenefits('training')}</h3>
              <p className="text-gray-600">{tBenefits('trainingDesc')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tBenefits('culture')}</h3>
              <p className="text-gray-600">{tBenefits('cultureDesc')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{tBenefits('care')}</h3>
              <p className="text-gray-600">{tBenefits('careDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('positionsTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="space-y-4">
            {positions.map((job) => (
              <div
                key={job.id}
                className="bg-gray-50 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  className="w-full p-6 text-left hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
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
                      className={`w-6 h-6 text-gray-500 transform transition-transform ${
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
                  <div className="p-6 pt-0 bg-white border-t border-gray-200">
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-900 mb-2">{t('responsibilities')}</h4>
                      <ul className="space-y-1">
                        {job.responsibilities.map((item, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-bold text-gray-900 mb-2">{t('requirements')}</h4>
                      <ul className="space-y-1">
                        {job.requirements.map((item, index) => (
                          <li key={index} className="text-gray-700 flex items-start">
                            <span className="text-blue-600 mr-2 mt-1">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-6">
                      <a
                        href="mailto:hr@thpmg.com"
                        className="inline-block px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        {t('applyButton')}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-blue-100 mb-8">
            {t('ctaSubtitle')}
          </p>
          <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg inline-block">
            <div className="text-white mb-2">{t('emailTitle')}</div>
            <a href="mailto:hr@thpmg.com" className="text-2xl font-bold text-white hover:underline">
              hr@thpmg.com
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
