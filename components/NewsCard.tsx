'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface NewsCardProps {
  title: string;
  date: string;
  excerpt: string;
  link?: string;
}

export default function NewsCard({
  title,
  date,
  excerpt,
  link
}: NewsCardProps) {
  const t = useTranslations('Common');

  return (
    <div className="bg-white rounded-2xl shadow-premium hover:shadow-premium-lg transition-all duration-500 overflow-hidden border border-gray-200">
      <div className="p-6">
        <div className="text-primary font-medium text-sm mb-2">
          {date}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 tracking-tight">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 font-light leading-relaxed">
          {excerpt}
        </p>
        {link && (
          <Link
            href={link}
            className="inline-flex items-center text-primary hover:text-primary-hover font-medium text-sm transition-colors group"
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