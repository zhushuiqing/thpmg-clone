import { getRequestConfig } from 'next-intl/server';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, type Locale } from '@/lib/i18n/config';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !SUPPORTED_LOCALES.includes(locale as Locale)) {
    locale = DEFAULT_LOCALE;
  }

  // 如果翻译文件不存在，回退到默认语言
  let messages;
  try {
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch {
    console.warn(`Translation file for locale "${locale}" not found, falling back to "${DEFAULT_LOCALE}"`);
    locale = DEFAULT_LOCALE;
    messages = (await import(`../messages/${DEFAULT_LOCALE}.json`)).default;
  }

  return {
    locale,
    messages
  };
});
