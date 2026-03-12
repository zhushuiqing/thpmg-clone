# 多语言配置指南

## 新增语言步骤

新增语言只需 **3 步**，无需修改任何组件代码：

### 步骤 1：在配置文件中添加语言

编辑 `lib/i18n/config.ts`：

```typescript
// 1. 在 SUPPORTED_LOCALES 数组中添加新语言代码
export const SUPPORTED_LOCALES = ['zh-Hans', 'zh-Hant', 'en', 'th', 'vi', 'id', 'ja', 'ko'] as const;

// 2. 在 localeNames 中添加语言名称
export const localeNames: Record<Locale, string> = {
  'zh-Hans': '简体中文',
  'zh-Hant': '繁體中文',
  en: 'English',
  th: 'ไทย',
  vi: 'Tiếng Việt',
  id: 'Bahasa Indonesia',
  ja: '日本語',  // 新增
  ko: '한국어'   // 新增
};
```

### 步骤 2：创建翻译文件

在 `messages/` 目录下创建新语言文件，如 `messages/ko.json`：

```bash
cp messages/zh-Hans.json messages/ko.json
# 然后翻译 ko.json 中的所有键值
```

### 步骤 3：完成！

无需修改其他任何文件！系统会自动：
- 在语言切换器中显示新语言
- 为新语言生成路由
- 加载翻译内容

---

## 当前支持的语言

| 代码 | 名称 | 文件 |
|------|------|------|
| zh-Hans | 简体中文 | messages/zh-Hans.json |
| zh-Hant | 繁體中文 | messages/zh-Hant.json |
| en | English | messages/en.json |
| th | ไทย | messages/th.json |
| vi | Tiếng Việt | messages/vi.json |
| id | Bahasa Indonesia | messages/id.json |
| ja | 日本語 | messages/ja.json |

---

## 常用语言代码参考

| 语言 | 代码 | 名称 |
|------|------|------|
| 简体中文 | zh-Hans | 简体中文 |
| 繁體中文 | zh-Hant | 繁體中文 |
| 日语 | ja | 日本語 |
| 韩语 | ko | 한국어 |
| 泰语 | th | ไทย |
| 越南语 | vi | Tiếng Việt |
| 印尼语 | id | Bahasa Indonesia |
| 马来语 | ms | Bahasa Melayu |
| 菲律宾语 | fil | Filipino |
| 缅甸语 | my | ဗမာစကား |
| 高棉语 | km | ភាសាខ្មែរ |
| 老挝语 | lo | ພາສາລາວ |

---

## 翻译文件结构

每个翻译文件包含以下模块：

```json
{
  "Navigation": { },    // 导航栏
  "Home": { },          // 首页
  "About": { },         // 关于我们
  "News": { },          // 新闻中心
  "Recruitment": { },   // 招贤纳士
  "Subsidiaries": { },  // 下属企业
  "Contact": { },       // 联系我们
  "Common": { },        // 通用文本
  "Footer": { },        // 页脚
  "Benefits": { },      // 福利待遇
  "Services": { }       // 服务项目
}
```

---

## 可选：通过环境变量控制启用的语言

在 `.env.local` 中设置：

```bash
# 只启用部分语言
NEXT_PUBLIC_ENABLED_LOCALES=zh-Hans,zh-Hant,en,th

# 启用所有语言
NEXT_PUBLIC_ENABLED_LOCALES=zh-Hans,zh-Hant,en,th,vi,id,ja
```

---

## 示例：添加韩语

**步骤 1**：编辑 `lib/i18n/config.ts`
```typescript
export const SUPPORTED_LOCALES = ['zh-Hans', 'zh-Hant', 'en', 'th', 'vi', 'id', 'ja', 'ko'] as const;
export const localeNames: Record<Locale, string> = {
  // ...
  ko: '한국어'
};
```

**步骤 2**：创建 `messages/ko.json`
```bash
cp messages/zh-Hans.json messages/ko.json
# 编辑 ko.json，翻译所有内容
```

**步骤 3**：完成！访问 `/ko` 即可看到韩语版本。

---

## 注意事项

1. **翻译文件必须包含所有键**：复制 `zh-Hans.json` 作为模板，确保所有键都存在
2. **locale 字段必须匹配**：`Navigation.locale` 的值必须与文件名一致
3. **语言代码使用小写**：如 `zh-Hans`、`zh-Hant`、`en`、`th`，不是 `ZH`、`ZHTW`
4. **测试新语言**：创建后访问 `http://localhost:3000/[语言代码]` 测试
