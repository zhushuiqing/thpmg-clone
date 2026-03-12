'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  ctaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export default function Hero({
  title,
  subtitle,
  ctaText,
  ctaLink,
  secondaryCtaText,
  secondaryCtaLink
}: HeroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const t = useTranslations('Common');

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="text-center">
          <h1
            className={`text-4xl md:text-6xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            {title}
          </h1>
          <p
            className={`text-xl text-gray-600 mb-10 max-w-2xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'
            }`}
          >
            {subtitle}
          </p>
          {(ctaText || secondaryCtaText) && (
            <div className="flex flex-col sm:flex-row justify-center gap-4 transition-all duration-1000 delay-300">
              {ctaText && ctaLink && (
                <Link
                  href={ctaLink}
                  className="inline-block px-8 py-4 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
                >
                  {ctaText}
                </Link>
              )}
              {secondaryCtaText && secondaryCtaLink && (
                <Link
                  href={secondaryCtaLink}
                  className="inline-block px-8 py-4 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100 transition-colors border-2 border-blue-600"
                >
                  {secondaryCtaText}
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-white rounded-t-[50%]"></div>
    </section>
  );
}