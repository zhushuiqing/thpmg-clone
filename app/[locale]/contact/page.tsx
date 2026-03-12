import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import ContactForm from '@/components/ContactForm';

export const dynamic = 'force-dynamic';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('Contact');

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pageTitle')}
          </h1>
          <nav className="mt-4 text-gray-600 text-sm">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              {t('home')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{t('pageTitle')}</span>
          </nav>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('contactMethods')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {t('companyName')}
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-6xl mb-4">🏢</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {t('addressTitle')}
              </h3>
              <p className="text-gray-700 font-medium">
                {t('addressValue')}
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-6xl mb-4">📞</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {t('phoneTitle')}
              </h3>
              <a href={`tel:${t('phoneValue')}`} className="text-blue-600 hover:text-blue-700 font-medium">
                {t('phoneValue')}
              </a>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <div className="text-6xl mb-4">📧</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                {t('emailTitle')}
              </h3>
              <a href="mailto:hr@thpmg.com" className="text-blue-600 hover:text-blue-700 font-medium">
                hr@thpmg.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Business Info */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t('infoTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>
          <div className="bg-gray-50 p-8 rounded-lg">
            <dl className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <dt className="text-gray-600">{t('companyFullName')}</dt>
                <dd className="text-gray-900 font-medium">{t('companyFullNameValue')}</dd>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <dt className="text-gray-600">{t('foundedTime')}</dt>
                <dd className="text-gray-900 font-medium">2015 {t('year')}</dd>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <dt className="text-gray-600">{t('employees')}</dt>
                <dd className="text-gray-900 font-medium">{t('employeesValue')}</dd>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <dt className="text-gray-600">{t('bases')}</dt>
                <dd className="text-gray-900 font-medium">{t('basesValue')}</dd>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-200">
                <dt className="text-gray-600">{t('companies')}</dt>
                <dd className="text-gray-900 font-medium">{t('companiesValue')}</dd>
              </div>
              <div className="flex justify-between items-center py-3">
                <dt className="text-gray-600">{t('icp')}</dt>
                <dd className="text-gray-900 font-medium">{t('icpValue')}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('mapTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {t('addressValue')}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
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
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('formTitle')}
            </h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              {t('formSubtitle')}
            </p>
          </div>
          <ContactForm locale={locale} />
        </div>
      </section>
    </div>
  );
}
