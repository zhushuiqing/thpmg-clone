// Mock for next-intl
const useTranslations = (namespace) => {
  return (key) => {
    // Handle keys with namespace like 'Navigation.home'
    if (key && key.includes('.')) {
      const parts = key.split('.');
      const ns = parts[0];
      const k = parts.slice(1).join('.');

      if (ns === 'Navigation') {
        const translations = {
          'home': '首页',
          'about': '关于我们',
          'services': '服务项目',
          'news': '新闻中心',
          'contact': '联系我们',
          'language': '中文',
          'english': 'English'
        };
        return translations[k] || key;
      }
      if (ns === 'Common') {
        const translations = {
          'readMore': '阅读更多',
          'successTitle': '提交成功！',
          'successMessage': '感谢您的留言',
          'successButton': '发送另一条消息',
          'loading': '加载中...',
          'required': '必填',
          'submit': '提交',
          'backToHome': '回到首页',
          'backToNews': '返回新闻中心',
          'invalidEmail': '请输入有效的邮箱地址',
          'submitFailed': '提交失败，请稍后重试',
        };
        return translations[k] || key;
      }
      if (ns === 'Contact') {
        const translations = {
          'name': '姓名',
          'email': '邮箱',
          'phone': '电话',
          'company': '公司名称',
          'message': '留言内容',
          'submit': '提交留言',
          'loading': '提交中...',
          'submitError': '提交失败，请重试',
          'successTitle': '提交成功！',
          'successMessage': '感谢您的留言',
          'successButton': '发送另一条消息',
          'required': '必填',
        };
        return translations[k] || key;
      }
      if (ns === 'Home') {
        const translations = {
          'heroTitle': '专业服务，值得信赖',
          'heroSubtitle': '我们致力于为客户提供最优质的专业服务',
          'ctaServices': '了解我们的服务',
          'ctaContact': '联系我们',
          'aboutTitle': '关于我们',
          'aboutSubtitle': '公司简介',
          'servicesTitle': '我们的服务',
          'servicesSubtitle': '我们提供全面的专业服务',
          'newsTitle': '新闻中心',
          'newsSubtitle': '了解我们的最新动态和行业资讯',
          'contactCtaTitle': '联系我们',
          'contactCtaSubtitle': '如果您有任何问题或需求',
          'contactCtaButton': '立即咨询',
        };
        return translations[k] || key;
      }
      if (ns === 'About') {
        const translations = {
          'pageTitle': '关于我们',
          'companyTitle': '公司简介',
          'coreValuesTitle': '核心价值观',
          'strengthsTitle': '我们的优势',
          'ctaTitle': '期待与您合作',
          'ctaSubtitle': '我们期待与您的合作',
          'ctaButton': '联系我们',
        };
        return translations[k] || key;
      }
      if (ns === 'Services') {
        const translations = {
          'pageTitle': '服务项目',
          'overviewTitle': '我们的服务',
          'advantagesTitle': '服务优势',
          'processTitle': '服务流程',
          'ctaTitle': '开始您的项目',
          'ctaSubtitle': '无论您的项目规模大小',
          'ctaButton': '获取免费咨询',
        };
        return translations[k] || key;
      }
      if (ns === 'News') {
        const translations = {
          'pageTitle': '新闻中心',
          'subscribeTitle': '订阅我们的新闻',
          'subscribeSubtitle': '及时了解我们的最新动态',
          'subscribePlaceholder': '输入您的邮箱',
          'subscribeButton': '订阅',
        };
        return translations[k] || key;
      }
    }

    // Handle plain keys without namespace (for components using useTranslations('Common'))
    if (namespace === 'Navigation') {
      const translations = {
        'home': '首页',
        'about': '关于我们',
        'services': '服务项目',
        'news': '新闻中心',
        'contact': '联系我们',
        'language': '中文',
        'english': 'English'
      };
      return translations[key] || key;
    }
    if (namespace === 'Common') {
      const translations = {
        'readMore': '阅读更多',
        'successTitle': '提交成功！',
        'successMessage': '感谢您的留言',
        'successButton': '发送另一条消息',
        'loading': '加载中...',
        'required': '必填',
        'submit': '提交',
        'backToHome': '回到首页',
        'backToNews': '返回新闻中心',
        'invalidEmail': '请输入有效的邮箱地址',
        'submitFailed': '提交失败，请稍后重试',
      };
      return translations[key] || key;
    }
    if (namespace === 'Contact') {
      const translations = {
        'name': '姓名',
        'email': '邮箱',
        'phone': '电话',
        'company': '公司名称',
        'message': '留言内容',
        'submit': '提交留言',
        'loading': '加载中...',
        'submitError': '提交失败，请重试',
        'successTitle': '提交成功！',
        'successMessage': '感谢您的留言，我们的客服人员将尽快与您联系。',
        'successButton': '发送另一条消息',
        'required': '必填',
      };
      return translations[key] || key;
    }
    return key;
  };
};

const useLocale = () => 'zh';
const useChangeLocale = () => jest.fn();

export { useTranslations, useLocale, useChangeLocale };
