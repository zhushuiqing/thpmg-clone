import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutPage from '../../app/[locale]/about/page';

describe('AboutPage', () => {
  test('renders hero section with title', () => {
    render(<AboutPage />);

    // Use getAllByText since '关于我们' appears in both navigation and page title
    expect(screen.getAllByText('关于我们').length).toBeGreaterThan(0);
    expect(screen.getByText('首页')).toBeInTheDocument();
  });

  test('renders company profile section', () => {
    render(<AboutPage />);

    expect(screen.getByText('公司简介')).toBeInTheDocument();
    expect(screen.getByText(/THPMG是一家专业的服务型企业/)).toBeInTheDocument();
  });

  test('renders core values section', () => {
    render(<AboutPage />);

    expect(screen.getByText('核心价值观')).toBeInTheDocument();
    expect(screen.getByText('专业')).toBeInTheDocument();
    expect(screen.getByText('诚信')).toBeInTheDocument();
    expect(screen.getByText('创新')).toBeInTheDocument();
    expect(screen.getByText('共赢')).toBeInTheDocument();
  });

  test('renders strengths section', () => {
    render(<AboutPage />);

    expect(screen.getByText('我们的优势')).toBeInTheDocument();
    expect(screen.getByText('专业的团队')).toBeInTheDocument();
    expect(screen.getByText('丰富的经验')).toBeInTheDocument();
    expect(screen.getByText('优质的服务')).toBeInTheDocument();
    expect(screen.getByText('持续创新')).toBeInTheDocument();
  });

  test('renders statistics', () => {
    render(<AboutPage />);

    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('50+')).toBeInTheDocument();
  });

  test('renders contact CTA section', () => {
    render(<AboutPage />);

    expect(screen.getByText('期待与您合作')).toBeInTheDocument();
    expect(screen.getByText('联系我们')).toBeInTheDocument();
  });
});