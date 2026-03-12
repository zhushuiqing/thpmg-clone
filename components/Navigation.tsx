'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
  };

  // 检查当前路径是否匹配
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);
  };

  const navItems = [
    { href: '/', label: t('Navigation.home') },
    { href: '/about', label: t('Navigation.about') },
    { href: '/news', label: t('Navigation.news') },
    { href: '/recruitment', label: t('Navigation.recruitment') },
    { href: '/subsidiaries', label: t('Navigation.subsidiaries') },
    { href: '/contact', label: t('Navigation.contact') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image
                src="/images/thpmg/logo.png"
                alt="THPMG Logo"
                width={100}
                height={40}
                className="w-[100px] sm:w-[120px] h-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    relative px-3 py-2 text-sm font-medium transition-all duration-200
                    ${active
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                    }
                    group
                  `}
                >
                  {item.label}
                  {/* 底部选中指示器 */}
                  <span
                    className={`
                      absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600
                      transform transition-all duration-200
                      ${active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:block">
            <LanguageSwitcher />
          </div>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Language Switcher - Compact */}
            <div className="sm:block hidden">
              <LanguageSwitcher variant="compact" />
            </div>
            <button
              onClick={toggleMenu}
              className={`
                inline-flex items-center justify-center p-2 rounded-xl
                transition-all duration-200
                ${isMenuOpen
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500
              `}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Full Screen Overlay */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm
          transition-opacity duration-300
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={closeMenus}
      />
      <div
        className={`
          lg:hidden fixed top-16 right-0 z-40 w-full sm:w-80
          bg-white shadow-2xl
          transform transition-transform duration-300 ease-out
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="max-h-[calc(100vh-4rem)] overflow-y-auto">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-500">菜单</span>
              <button
                onClick={closeMenus}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="关闭菜单"
              >
                <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className={`
                    block px-4 py-4 rounded-xl text-base font-medium
                    transition-all duration-200
                    ${active
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200'
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {active && (
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Mobile Language Switcher in Menu */}
          <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
            <div className="text-xs font-medium text-gray-500 mb-3 px-2">选择语言 / Language</div>
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      </div>
    </nav>
  );
}
