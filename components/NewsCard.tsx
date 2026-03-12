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
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-6">
        <div className="text-blue-600 font-medium text-sm mb-2">
          {date}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {excerpt}
        </p>
        {link && (
          <Link
            href={link}
            className="inline-block text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
          >
            {t('readMore')} →
          </Link>
        )}
      </div>
    </div>
  );
}