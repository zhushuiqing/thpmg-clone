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
    // Trigger animation on mount
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Animated background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`
            absolute -top-1/2 -right-1/4 w-[800px] h-[800px]
            bg-gradient-to-br from-blue-100/40 to-transparent
            rounded-full blur-3xl
            transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        />
        <div
          className={`
            absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px]
            bg-gradient-to-tr from-indigo-100/40 to-transparent
            rounded-full blur-3xl
            transition-all duration-1000 ease-out delay-300
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
          `}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title with staggered animation */}
        <h1
          className={`
            text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold
            tracking-tight text-gray-900 mb-6
            transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1)
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
          style={{ letterSpacing: '-0.03em' }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className={`
            text-lg sm:text-xl md:text-2xl
            text-gray-600 mb-4 max-w-3xl mx-auto
            font-light leading-relaxed
            transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) delay-200
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
          `}
        >
          {subtitle}
        </p>

        {/* Optional decorative line */}
        <div
          className={`
            w-16 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600
            mx-auto mb-8 rounded-full
            transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) delay-300
            ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
          `}
        />

        {/* CTA Buttons */}
        {(ctaText || secondaryCtaText) && (
          <div
            className={`
              flex flex-col sm:flex-row justify-center gap-4
              transition-all duration-1000 cubic-bezier(0.16, 1, 0.3, 1) delay-400
              ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
            `}
          >
            {ctaText && ctaLink && (
              <Link
                href={ctaLink}
                className="
                  group inline-flex items-center justify-center
                  px-8 py-4
                  bg-gray-900 text-white
                  font-medium text-[15px] tracking-[-0.01em]
                  rounded-full
                  transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)
                  hover:bg-gray-800 hover:shadow-lg hover:shadow-gray-900/20
                  hover:-translate-y-0.5
                  active:translate-y-0 active:shadow-none
                "
              >
                {ctaText}
                <svg
                  className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
            {secondaryCtaText && secondaryCtaLink && (
              <Link
                href={secondaryCtaLink}
                className="
                  group inline-flex items-center justify-center
                  px-8 py-4
                  bg-white text-gray-900
                  font-medium text-[15px] tracking-[-0.01em]
                  rounded-full
                  border-2 border-gray-200
                  transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)
                  hover:border-gray-900 hover:shadow-lg
                  hover:-translate-y-0.5
                  active:translate-y-0
                "
              >
                {secondaryCtaText}
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Scroll indicator - NIO style */}
      <div
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2
          transition-all duration-1000 delay-700
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        `}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400 tracking-widest uppercase">Scroll</span>
          <div className="w-5 h-8 rounded-full border-2 border-gray-300 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-gray-400 rounded-full animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
}
