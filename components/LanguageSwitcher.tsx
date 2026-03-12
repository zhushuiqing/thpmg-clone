'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';

export default function LanguageSwitcher() {
  const t = useTranslations('Navigation');
  const locale = useLocale();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const switchLanguage = (newLocale: 'zh' | 'en') => {
    // Store locale preference
    localStorage.setItem('preferredLocale', newLocale);

    // Get current path without locale prefix
    const path = window.location.pathname;
    const newPath = path.replace(/^\/(zh|en)/, '');

    // Navigate to new locale
    router.push(`/${newLocale}${newPath || '/'}`);
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
        className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
        aria-label={locale === 'zh' ? 'Switch to English' : '切换到中文'}
        aria-expanded={isOpen}
      >
        <span>{locale === 'zh' ? '中文' : 'English'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
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
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
          <button
            onClick={() => switchLanguage('zh')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              locale === 'zh'
                ? 'text-blue-600 font-medium bg-blue-50'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            中文
          </button>
          <button
            onClick={() => switchLanguage('en')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              locale === 'en'
                ? 'text-blue-600 font-medium bg-blue-50'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            English
          </button>
        </div>
      )}
    </div>
  );
}
