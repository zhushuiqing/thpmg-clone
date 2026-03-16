import Link from 'next/link';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';
import FadeIn from '@/components/FadeIn';

export const dynamic = 'force-dynamic';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Contact');

  return (
    <div className="min-h-screen bg-section-white">
      {/* Hero Section - NIO Style Banner */}
      <section className="relative h-[50vh] sm:h-[60vh] overflow-hidden">
        <Image
          src="/images/thpmg/contact-banner.jpg"
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

      {/* Contact Info - Modern Cards */}
      <section className="py-24 sm:py-32 section-gradient-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-12 sm:mb-20">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                CONTACT US
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                {t('contactMethods')}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('companyName')}
              </p>
            </div>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <FadeIn direction="up" distance={30} delay={0}>
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-premium hover:shadow-premium-lg transition-all duration-500 text-center h-full border border-gray-200">
                <div className="text-5xl sm:text-6xl mb-6">🏢</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
                  {t('addressTitle')}
                </h3>
                <p className="text-gray-700 font-medium leading-relaxed">
                  {t('addressValue')}
                </p>
              </div>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={100}>
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-premium hover:shadow-premium-lg transition-all duration-500 text-center h-full border border-gray-200">
                <div className="text-5xl sm:text-6xl mb-6">📞</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
                  {t('phoneTitle')}
                </h3>
                <a href={`tel:${t('phoneValue')}`} className="text-primary hover:text-primary-dark font-medium transition-colors">
                  {t('phoneValue')}
                </a>
              </div>
            </FadeIn>
            <FadeIn direction="up" distance={30} delay={200}>
              <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-premium hover:shadow-premium-lg transition-all duration-500 text-center h-full border border-gray-200">
                <div className="text-5xl sm:text-6xl mb-6">📧</div>
                <h3 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
                  {t('emailTitle')}
                </h3>
                <a href="mailto:hr@thpmg.com" className="text-primary hover:text-primary-dark font-medium transition-colors">
                  hr@thpmg.com
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Business Info - Clean Table */}
      <section className="py-24 sm:py-32 section-bg-gray-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                COMPANY INFORMATION
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                {t('infoTitle')}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full"></div>
            </div>
          </FadeIn>
          <FadeIn direction="up" distance={40}>
            <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-premium border border-gray-200">
              <dl className="space-y-4">
                {[
                  { label: t('companyFullName'), value: t('companyFullNameValue') },
                  { label: t('foundedTime'), value: `2015 ${t('year')}` },
                  { label: t('employees'), value: t('employeesValue') },
                  { label: t('bases'), value: t('basesValue') },
                  { label: t('companies'), value: t('companiesValue') },
                  { label: t('icp'), value: t('icpValue') },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex flex-col sm:flex-row sm:justify-between items-start sm:items-center py-4 ${
                      index < 5 ? 'border-b border-gray-200' : ''
                    }`}
                  >
                    <dt className="text-gray-600 font-medium mb-2 sm:mb-0">{item.label}</dt>
                    <dd className="text-gray-900 font-semibold">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 sm:py-32 section-bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                OUR LOCATION
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {t('mapTitle')}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('addressValue')}
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" distance={40}>
            <div className="bg-white rounded-2xl shadow-premium border border-gray-200 overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3145.6848742050007!2d116.42963091531395!3d39.98373997944611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35f370b0e8c5e1ab%3A0x1234567890abcdef!2zMznCsDU5JzAxLjQiTiAxMTbCsDI1JzQ3LjQiRQ!5e0!3m2!1szh-CN!2scn!4v1234567890"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-24 sm:py-32 section-gradient-gray">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeIn direction="up" distance={40}>
            <div className="text-center mb-12 sm:mb-16">
              <p className="text-sm font-medium tracking-[0.25em] uppercase text-primary mb-4">
                SEND MESSAGE
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
                {t('formTitle')}
              </h2>
              <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6"></div>
              <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto font-light">
                {t('formSubtitle')}
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="up" distance={40}>
            <ContactForm locale={locale} />
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
