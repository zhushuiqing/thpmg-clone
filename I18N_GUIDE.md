# THPMG 多语言系统说明

## 概述

本网站采用 `next-intl` 实现国际化（i18n）多语言支持，目前支持三种语言：
- **中文 (zh)** - 默认语言
- **English (en)** - 英文
- **ไทย (th)** - 泰文

## 文件结构

```
├── messages/              # 翻译文件目录
│   ├── zh.json           # 中文翻译
│   ├── en.json           # 英文翻译
│   └── th.json           # 泰文翻译
├── i18n.ts               # i18n 配置
├── middleware.ts         # 中间件（处理语言路由）
└── app/[locale]/         # 多语言路由
```

## 翻译文件结构

翻译文件采用嵌套结构，按页面和功能模块组织：

```json
{
  "Navigation": { ... },      // 导航菜单
  "Home": { ... },            // 首页
  "About": { ... },           // 关于我们
  "News": { ... },            // 新闻中心
  "Recruitment": { ... },     // 招贤纳士
  "Subsidiaries": { ... },    // 下属企业
  "Contact": { ... },         // 联系我们
  "Common": { ... },          // 通用文本
  "Footer": { ... },          // 页脚
  "Benefits": { ... }         // 福利待遇
}
```

## 添加新语言

要添加新语言（例如日文 ja），只需以下步骤：

### 1. 创建翻译文件
创建 `messages/ja.json`，复制现有翻译文件结构并填入日文翻译。

### 2. 更新 i18n 配置
修改 `i18n.ts`：
```typescript
export const locales = ['zh', 'en', 'th', 'ja'] as const;
```

### 3. 更新中间件
修改 `middleware.ts`：
```typescript
const intlMiddleware = createMiddleware({
  locales: ['zh', 'en', 'th', 'ja'],
  defaultLocale: 'zh',
  localePrefix: 'always',
});
```

### 4. 更新语言切换器
修改 `components/LanguageSwitcher.tsx`：
```typescript
type LocaleType = 'zh' | 'en' | 'th' | 'ja';

const localeNames = {
  zh: '中文',
  en: 'English',
  th: 'ไทย',
  ja: '日本語'  // 新增
};
```

完成！新语言会自动应用到所有页面。

## 使用翻译

### 在服务器组件中
```typescript
import { useTranslations } from 'next-intl';

export default function MyPage() {
  const t = useTranslations('Home');

  return <h1>{t('heroTitle')}</h1>;
}
```

### 在客户端组件中
```typescript
'use client';
import { useTranslations } from 'next-intl';

export default function MyComponent() {
  const t = useTranslations('Navigation');

  return <Link>{t('home')}</Link>;
}
```

### 嵌套翻译
```typescript
// 访问嵌套对象
t('businessDesc.packaging')

// 访问分类对象
t('category.employee')
```

## 翻译键命名规范

- 使用驼峰命名法（camelCase）
- 按功能模块组织翻译
- 通用文本放在 `Common` 模块
- 页面特定文本放在对应模块（如 `Home`, `About`）

## 路由结构

访问不同语言的 URL 格式：
- 中文：`/zh/`, `/zh/about`, `/zh/contact`
- 英文：`/en/`, `/en/about`, `/en/contact`
- 泰文：`/th/`, `/th/about`, `/th/contact`

## 语言切换

网站右上角提供语言切换器，用户可以：
1. 点击当前语言名称
2. 从下拉菜单选择目标语言
3. 系统自动跳转到对应语言版本的当前页面

## 本地存储

用户的语言偏好会保存在 `localStorage` 中：
```typescript
localStorage.setItem('preferredLocale', 'en');
```

## 注意事项

1. **JSON 格式**：翻译文件必须为有效的 JSON 格式，特殊字符需要转义
2. **引号处理**：文本中的引号需要使用 `\"` 转义
3. **占位符**：如需动态内容，使用 `{variable}` 占位符
4. **构建验证**：每次修改翻译文件后运行 `npm run build` 验证

## 验证命令

```bash
# 开发模式
npm run dev

# 构建验证
npm run build
```

## 当前状态

✅ 中文 (zh) - 完整翻译
✅ 英文 (en) - 完整翻译
✅ 泰文 (th) - 完整翻译

所有页面和组件已完全支持多语言，包括：
- 首页
- 关于我们
- 新闻中心
- 招贤纳士
- 下属企业
- 联系我们
- 导航菜单
- 页脚
- 联系表单
