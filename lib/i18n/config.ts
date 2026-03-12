/**
 * 多语言配置
 *
 * 新增语言步骤：
 * 1. 在此文件的 SUPPORTED_LOCALES 数组中添加新语言
 * 2. 在 localeNames 中添加语言名称
 * 3. 在 messages/ 目录下创建对应的翻译文件 (如 ja.json)
 *
 * 示例：添加日语
 * 1. 在 SUPPORTED_LOCALES 中添加 'ja'
 * 2. 在 localeNames 中添加 ja: '日本語'
 * 3. 创建 messages/ja.json 文件
 */

// 所有支持的语言列表
export const SUPPORTED_LOCALES = ['zh-Hans', 'zh-Hant', 'en', 'th', 'vi', 'id', 'ja'] as const;

// 语言名称映射（用于语言切换器显示）
export const localeNames: Record<Locale, string> = {
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
  en: 'English',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
  ja: '日本語'
};

// 默认语言
export const DEFAULT_LOCALE: Locale = 'zh-Hans';

// 从环境变量读取启用的语言（可选功能，允许通过环境变量控制启用的语言）
export const getEnabledLocales = (): readonly Locale[] => {
  const envLocales = process.env.NEXT_PUBLIC_ENABLED_LOCALES;
  if (envLocales) {
    const locales = envLocales.split(',').map(l => l.trim());
    return locales.filter(l => SUPPORTED_LOCALES.includes(l as Locale)) as Locale[];
  }
  return SUPPORTED_LOCALES;
};

// 类型定义
export type Locale = (typeof SUPPORTED_LOCALES)[number];

// 检查语言是否有效
export function isValidLocale(locale: string): locale is Locale {
  return SUPPORTED_LOCALES.includes(locale as Locale);
}

// 获取语言名称
export function getLocaleName(locale: Locale): string {
  return localeNames[locale] || locale;
}
