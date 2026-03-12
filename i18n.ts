import { getRequestConfig } from 'next-intl/server';

export const locales = ['zh', 'en'] as const;

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !locales.includes(locale as any)) {
    locale = 'zh';
  }

  const messages = (await import(`./messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
