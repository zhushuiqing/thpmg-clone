'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenus = () => {
    setIsMenuOpen(false);
  };

  // Check if current path matches
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
    <nav
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
        ${isScrolled
          ? 'glass shadow-lg'
          : 'bg-transparent'
        }
      `}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity duration-300"
            >
              <Image
                src="/images/thpmg/logo.png"
                alt="THPMG Logo"
                width={120}
                height={48}
                className="w-[100px] sm:w-[120px] h-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Minimalist style */}
          <div className="hidden lg:flex items-center space-x-8" role="menubar">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  className={`
                    relative text-sm font-medium tracking-[-0.01em]
                    transition-all duration-300
                    ${active
                      ? 'text-primary'
                      : 'text-gray-700 hover:text-gray-900'
                    }
                    group
                  `}
                  aria-current={active ? 'page' : undefined}
                >
                  <span className="relative z-10">{item.label}</span>
                  {/* Animated underline - NIO style minimal */}
                  <span
                    className={`
                      absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full
                      transform transition-all duration-300 cubic-bezier(0.16, 1, 0.3, 1)
                      ${active ? 'w-full' : 'w-0 group-hover:w-full'}
                    `}
                  />
                </Link>
              );
            })}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden lg:block">
            <LanguageSwitcher variant="default" />
          </div>

          {/* Mobile right side */}
          <div className="lg:hidden flex items-center space-x-2">
            {/* Mobile Language Switcher */}
            <div className="hidden sm:block">
              <LanguageSwitcher variant="compact" />
            </div>
            <button
              onClick={toggleMenu}
              className={`
                inline-flex items-center justify-center p-2
                rounded-full transition-all duration-300
                ${isMenuOpen
                  ? 'bg-primary text-white rotate-90'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary
              `}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  className="h-5 w-5"
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
                  className="h-5 w-5"
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

      {/* Mobile Navigation - Full Screen Overlay with blur */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40
          bg-black/40 backdrop-blur-sm
          transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}
        onClick={closeMenus}
      />
      <div
        className={`
          lg:hidden fixed top-0 right-0 z-50 w-full sm:w-96 h-full
          bg-white shadow-2xl
          transform transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          {/* Header with Logo */}
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">菜单</span>
            <Image
              src="/images/thpmg/logo.png"
              alt="THPMG Logo"
              width={80}
              height={32}
              className="w-[80px] h-auto"
            />
            <button
              onClick={closeMenus}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="关闭菜单"
            >
              <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Items - Large tap targets */}
          <div className="flex-1 overflow-y-auto px-6 py-8">
            {navItems.map((item, index) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenus}
                  className={`
                    block py-5 text-lg font-medium
                    transition-all duration-300
                    ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'}
                  `}
                  style={{ transitionDelay: `${100 + index * 50}ms` }}
                >
                  <div
                    className={`
                      flex items-center justify-between px-4 py-3 rounded-xl
                      transition-all duration-300
                      ${active
                        ? 'bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg shadow-blue-200'
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                  >
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

          {/* Footer with Language */}
          <div className="px-6 py-6 border-t border-gray-100 bg-gray-50">
            <div className="text-xs font-medium text-gray-500 mb-4">选择语言 / Language</div>
            <LanguageSwitcher variant="mobile" />
          </div>
        </div>
      </div>
    </nav>
  );
}
