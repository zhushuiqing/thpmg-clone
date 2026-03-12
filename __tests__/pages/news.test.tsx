import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsPage from '../../app/[locale]/news/page';

describe('NewsPage', () => {
  test('renders hero section with title', () => {
    render(<NewsPage />);

    expect(screen.getByText('新闻中心')).toBeInTheDocument();
    expect(screen.getByText('了解我们的最新动态和行业资讯')).toBeInTheDocument();
  });

  test('renders category buttons', () => {
    render(<NewsPage />);

    // '全部' only appears once in category buttons
    expect(screen.getByText('全部')).toBeInTheDocument();
    // Other categories appear in both buttons and news cards
    expect(screen.getAllByText('公司动态').length).toBeGreaterThan(0);
    expect(screen.getAllByText('行业资讯').length).toBeGreaterThan(0);
    expect(screen.getAllByText('产品更新').length).toBeGreaterThan(0);
  });

  test('renders news articles', () => {
    render(<NewsPage />);

    expect(screen.getByText('公司荣获 2026 年度行业最佳服务商奖项')).toBeInTheDocument();
    expect(screen.getByText('全新产品系列正式发布')).toBeInTheDocument();
    expect(screen.getByText('战略合作达成')).toBeInTheDocument();
    expect(screen.getByText('2026 年行业发展趋势分析')).toBeInTheDocument();
  });

  test('renders news article details', () => {
    render(<NewsPage />);

    // Use getAllByText since author names appear multiple times
    expect(screen.getAllByText('THPMG 新闻团队').length).toBeGreaterThan(0);
    expect(screen.getAllByText('THPMG 产品团队').length).toBeGreaterThan(0);
    expect(screen.getAllByText('THPMG 研究院').length).toBeGreaterThan(0);
  });

  test('renders pagination', () => {
    render(<NewsPage />);

    expect(screen.getByText('上一页')).toBeInTheDocument();
    expect(screen.getByText('下一页')).toBeInTheDocument();
  });

  test('renders newsletter subscription section', () => {
    render(<NewsPage />);

    expect(screen.getByText('订阅我们的新闻')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('输入您的邮箱')).toBeInTheDocument();
    expect(screen.getByText('订阅')).toBeInTheDocument();
  });
});