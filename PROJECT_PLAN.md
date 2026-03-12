# thpmg.com.cn 网站克隆项目

## 项目概述

这是一个完全参照 https://www.thpmg.com.cn/ 的网站克隆项目，使用多智能体协作开发。

## 技术栈

- **框架**: Next.js 14 (App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **字体**: Geist Sans / Geist Mono

## 项目结构

```
thpmg-clone/
├── app/                          # App Router
│   ├── layout.tsx                # 根布局
│   ├── page.tsx                  # 首页
│   ├── globals.css               # 全局样式
│   ├── favicon.ico               # 网站图标
│   ├── about/                    # 关于页面
│   │   └── page.tsx
│   ├── services/                 # 服务页面
│   │   └── page.tsx
│   ├── news/                     # 新闻页面
│   │   ├── page.tsx
│   │   └── [slug]/               # 新闻详情
│   │       └── page.tsx
│   └── contact/                  # 联系页面
│       └── page.tsx
├── components/                   # 共享组件
│   ├── Navigation.tsx            # 导航栏
│   ├── Footer.tsx                # 页脚
│   ├── Hero.tsx                  # 英雄区
│   ├── Feature.tsx               # 功能模块
│   └── ...
├── lib/                          # 工具库
│   └── theme.ts                  # 主题配置
├── public/                       # 静态资源
├── package.json
├── next.config.ts
└── tsconfig.json
```

## 实施计划

### 阶段 1: 项目初始化 ✅
- [x] 使用 create-next-app 创建项目
- [x] 配置 TypeScript 和 Tailwind CSS

### 阶段 2: 基础架构
- [ ] 配置 App Router 结构
- [ ] 实现全局样式和主题
- [ ] 创建导航组件

### 阶段 3: 页面开发
- [ ] 首页实现
- [ ] 关于页面
- [ ] 服务/产品页面
- [ ] 新闻页面
- [ ] 联系页面

### 阶段 4: 高级功能
- [ ] 国际化支持 (中文/英文)
- [ ] SEO 优化
- [ ] 性能优化

### 阶段 5: 测试
- [ ] 单元测试
- [ ] 集成测试
- [ ] 端到端测试

### 阶段 6: 安全和部署
- [ ] 安全审查
- [ ] 部署配置

## 多智能体团队

- **frontend-agent**: 前端页面和组件实现
- **backend-agent**: API 路由和表单处理
- **testing-agent**: 测试编写和执行
- **security-agent**: 安全审查和加固
- **performance-agent**: 性能优化

## 开发指南

### 添加新页面

在 `app/` 目录下创建新文件夹和 `page.tsx`:

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return (
    <div>
      <h1>关于我们</h1>
    </div>
  );
}
```

### 创建组件

在 `components/` 目录下创建可复用组件:

```tsx
// components/Navigation.tsx
export default function Navigation() {
  return (
    <nav className="...">
      {/* 导航内容 */}
    </nav>
  );
}
```

### 使用 Tailwind CSS

项目已配置 Tailwind CSS，可以直接在 className 中使用:

```tsx
<div className="flex items-center justify-center p-4 bg-blue-500 text-white">
  Hello World
</div>
```

## 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

## 构建生产版本

```bash
npm run build
```

## 运行测试

```bash
npm test
```

## 参考资源

- Next.js 官方文档: https://nextjs.org/docs
- Tailwind CSS 文档: https://tailwindcss.com/docs
- TypeScript 文档: https://www.typescriptlang.org/docs
