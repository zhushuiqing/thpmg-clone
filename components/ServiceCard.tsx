'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  services?: string[];
  link?: string;
}

export default function ServiceCard({
  title,
  description,
  icon,
  services,
  link
}: ServiceCardProps) {
  const t = useTranslations('Common');

  return (
    <div className="bg-white rounded-2xl shadow-premium hover:shadow-premium-lg transition-all duration-500 overflow-hidden border border-gray-200">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center">
        <div className="text-6xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
          {title}
        </h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600 text-sm mb-4 font-light leading-relaxed">
          {description}
        </p>
        {services && (
          <div className="space-y-2">
            {services.map((service, i) => (
              <div key={i} className="flex items-center text-gray-700">
                <svg
                  className="w-4 h-4 text-primary mr-2 flex-shrink-0"
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
        )}
        {link && (
          <Link
            href={link}
            className="inline-flex items-center mt-4 text-primary hover:text-primary-hover font-medium transition-colors group"
          >
            {t('readMore')}
            <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  );
}