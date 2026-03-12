import '@testing-library/jest-dom';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: (ns) => {
    const translations = {
      Navigation: {
        home: '首页',
        about: '关于我们',
        services: '服务项目',
        news: '新闻中心',
        contact: '联系我们',
        language: '中文',
        english: 'English',
      },
      Common: {
        backToHome: '回到首页',
        loading: '加载中...',
        required: '必填',
        readMore: '阅读更多',
      },
      Contact: {
        name: '姓名',
        email: '邮箱',
        phone: '电话',
        company: '公司名称',
        message: '留言内容',
        submit: '提交',
        loading: '加载中...',
        submitError: '提交失败，请稍后重试',
        successTitle: '提交成功！',
        successMessage: '感谢您的留言，我们的客服人员将尽快与您联系。',
        successButton: '发送另一条消息',
        required: '必填',
      },
      About: {
        pageTitle: '关于我们',
        companyTitle: '公司简介',
        coreValuesTitle: '核心价值观',
        strengthsTitle: '我们的优势',
        ctaTitle: '期待与您合作',
        ctaSubtitle: '我们期待与您的合作，共同创造更美好的未来。',
        ctaButton: '联系我们',
      },
      Services: {
        pageTitle: '服务项目',
        overviewTitle: '我们的服务',
        advantagesTitle: '服务优势',
        processTitle: '服务流程',
        ctaTitle: '开始您的项目',
        ctaSubtitle: '无论您的项目规模大小，我们都能提供专业的服务。',
        ctaButton: '获取免费咨询',
      },
      News: {
        pageTitle: '新闻中心',
        categories: {
          all: '全部',
          company: '公司动态',
          industry: '行业资讯',
          product: '产品更新',
        },
        subscribeTitle: '订阅我们的新闻',
        subscribeSubtitle: '及时了解我们的最新动态和行业资讯',
        subscribePlaceholder: '输入您的邮箱',
        subscribeButton: '订阅',
      },
      Home: {
        heroTitle: '专业服务，值得信赖',
        heroSubtitle: '我们致力于为客户提供最优质的专业服务',
        ctaServices: '了解我们的服务',
        ctaContact: '联系我们',
        aboutTitle: '关于我们',
        aboutSubtitle: '公司简介',
        servicesTitle: '我们的服务',
        servicesSubtitle: '我们提供全面的专业服务',
        newsTitle: '新闻中心',
        newsSubtitle: '了解我们的最新动态',
        contactCtaTitle: '联系我们',
        contactCtaSubtitle: '如果您有任何问题，欢迎随时与我们联系',
        contactCtaButton: '立即咨询',
      },
    };
    return (key) => translations[ns]?.[key] || key;
  },
  useLocale: () => 'zh',
  NextIntlClientProvider: ({ children }) => children,
}));

// Mock localStorage
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/zh/about',
    reload: jest.fn(),
    href: 'http://localhost:3000/zh/about',
  },
  writable: true,
});

// Mock fetch for API calls
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ success: true }),
      headers: {
        get: () => null,
      },
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

// Mock useRouter from next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    refresh: jest.fn(),
  }),
}));