'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('Navigation');

  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">THPMG</h3>
            <p className="text-gray-400 text-sm">
              专业服务，值得信赖
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('about')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {t('about')}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition-colors">
                  {t('services')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('news')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  {t('news')}
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  行业资讯
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t('contact')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {t('contact')}
                </Link>
              </li>
              <li>
                <a href="mailto:info@thpmg.com" className="hover:text-white transition-colors">
                  info@thpmg.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 THPMG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
