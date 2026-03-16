import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import LanguageSwitcher from '../../components/LanguageSwitcher';

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
  },
  writable: true,
});

// Mock useLocale from next-intl to return 'zh' by default
jest.mock('next-intl', () => {
  const original = jest.requireActual('next-intl');
  return {
    ...original,
    useLocale: () => 'zh',
    useTranslations: (ns) => {
      const translations = {
        Navigation: {
          home: 'Home',
          about: 'About',
          services: 'Services',
          news: 'News',
          contact: 'Contact',
          language: '中文',
          english: 'English',
        },
        Common: {
          readMore: 'Read More',
          successTitle: 'Success!',
          successMessage: 'Message sent',
          successButton: 'Send Another',
          loading: 'Loading...',
          required: 'Required',
          submit: 'Submit',
        },
        Contact: {
          name: 'Name',
          email: 'Email',
          phone: 'Phone',
          company: 'Company',
          message: 'Message',
          submit: 'Submit',
          loading: 'Loading...',
          submitError: 'Error',
        },
      };
      return (key) => translations[ns]?.[key] || key;
    },
  };
});

describe('LanguageSwitcher Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders language switcher with current language (zh)', () => {
    act(() => {
      render(<LanguageSwitcher />);
    });

    // With locale 'zh', should show Chinese text "中文"
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThan(0);
    // Check that one button contains 中文
    const hasChinese = buttons.some(btn => btn.textContent?.includes('中文'));
    expect(hasChinese).toBe(true);
  });

  test('has correct aria-label for Chinese locale', () => {
    act(() => {
      render(<LanguageSwitcher />);
    });

    const buttons = screen.getAllByRole('button');
    // The first button should have aria-label to switch language
    expect(buttons[0]).toHaveAttribute('aria-label', 'Switch to English');
  });
});
