'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const tFooter = useTranslations('Footer');
  const tNav = useTranslations('Navigation');

  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">P.M.I</h3>
            <p className="text-gray-400 text-sm">
              {tFooter('companyName')}
            </p>
            <p className="text-gray-400 text-sm mt-2">
              {tFooter('address')}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{tFooter('quickLinks')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  {tNav('home')}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  {tNav('about')}
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition-colors">
                  {tNav('news')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{tFooter('moreInfo')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <Link href="/recruitment" className="hover:text-white transition-colors">
                  {tNav('recruitment')}
                </Link>
              </li>
              <li>
                <Link href="/subsidiaries" className="hover:text-white transition-colors">
                  {tNav('subsidiaries')}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  {tNav('contact')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{tFooter('contactUs')}</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>
                <a href="tel:021-31754203" className="hover:text-white transition-colors">
                  021-31754203
                </a>
              </li>
              <li>
                <a href="mailto:hr@thpmg.com" className="hover:text-white transition-colors">
                  hr@thpmg.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>© 2015 - {new Date().getFullYear()} {tFooter('companyName')}</p>
          <p className="mt-2">
            <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              {tFooter('icp1')}
            </a>
            {' '}|{' '}
            <a href="https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33011802001131" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300">
              {tFooter('icp2')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
