import { getRequestConfig } from 'next-intl/server';

const locales = ['zh', 'en'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  
  if (!locale || !(locales as readonly string[]).includes(locale)) {
    locale = 'zh';
  }

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
