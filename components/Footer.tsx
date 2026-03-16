'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function Footer() {
  const tFooter = useTranslations('Footer');
  const tNav = useTranslations('Navigation');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-16 sm:pt-20 pb-8 sm:pb-12 mt-20 sm:mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* Brand Column - Spans 2 columns on mobile */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <div className="mb-6">
              <Image
                src="/images/thpmg/logo.png"
                alt="THPMG Logo"
                width={120}
                height={48}
                className="w-[100px] sm:w-[120px] h-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4 max-w-xs">
              {tFooter('companyName')}
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              {tFooter('address')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase text-gray-300 mb-4 sm:mb-6">
              {tFooter('quickLinks')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {tNav('news')}
                </Link>
              </li>
              <li>
                <Link
                  href="/recruitment"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {tNav('recruitment')}
                </Link>
              </li>
            </ul>
          </div>

          {/* More Info */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase text-gray-300 mb-4 sm:mb-6">
              {tFooter('moreInfo')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/subsidiaries"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {tNav('subsidiaries')}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm tracking-wide uppercase text-gray-300 mb-4 sm:mb-6">
              {tFooter('contactUs')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:021-31754203"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  021-31754203
                </a>
              </li>
              <li>
                <a
                  href="mailto:hr@thpmg.com"
                  className="text-gray-400 hover:text-white transition-colors duration-200"
                >
                  hr@thpmg.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 sm:pt-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              <p>© {currentYear} P.M.I. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
              <a
                href="https://beian.miit.gov.cn/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                {tFooter('icp1')}
              </a>
              <span className="hidden md:inline text-gray-600">|</span>
              <a
                href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011802001131"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-200"
              >
                {tFooter('icp2')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
