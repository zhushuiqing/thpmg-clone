'use client';

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { SUPPORTED_LOCALES, localeNames, type Locale } from '@/lib/i18n/config';

export default function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (newLocale: Locale) => {
    // Store locale preference
    localStorage.setItem('preferredLocale', newLocale);

    // Get current path without locale prefix
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);

    // Remove locale segment if exists
    if (SUPPORTED_LOCALES.includes(segments[0] as Locale)) {
      segments.shift();
    }

    const newPath = segments.length > 0 ? `/${segments.join('/')}` : '/';

    // Navigate to new locale
    router.push(`/${newLocale}${newPath}`);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center space-x-2 px-4 py-2.5
          rounded-xl font-medium
          transition-all duration-200
          ${isOpen
            ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-200'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-blue-600'
          }
        `}
        aria-label="Switch language"
        aria-expanded={isOpen}
      >
        {/* 地球图标 */}
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{localeNames[locale]}</span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* 下拉菜单 */}
      {isOpen && (
        <div
          className={`
            absolute right-0 mt-2 w-40
            bg-white rounded-xl shadow-xl
            border border-gray-100
            py-1.5 z-50
            max-h-72 overflow-y-auto
            animate-in fade-in slide-in-from-top-2 duration-200
          `}
        >
          {SUPPORTED_LOCALES.map((lang) => {
            const isActive = locale === lang;
            return (
              <button
                key={lang}
                onClick={() => switchLanguage(lang)}
                className={`
                  w-full text-left px-4 py-2.5 text-sm
                  flex items-center justify-between
                  transition-all duration-150
                  ${isActive
                    ? 'bg-blue-50 text-blue-600 font-semibold'
                    : 'text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <span>{localeNames[lang]}</span>
                {isActive && (
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
