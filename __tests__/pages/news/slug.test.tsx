import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsDetailPage from '../../../app/[locale]/news/[slug]/page';

describe('NewsDetailPage', () => {
  test('renders news article for valid slug', () => {
    render(<NewsDetailPage params={{ slug: '1' }} />);

    expect(screen.getByText('公司荣获2026年度行业最佳服务商奖项')).toBeInTheDocument();
    expect(screen.getByText('2026-03-01')).toBeInTheDocument();
    expect(screen.getByText('THPMG新闻团队')).toBeInTheDocument();
  });

  test('renders news article content', () => {
    render(<NewsDetailPage params={{ slug: '1' }} />);

    expect(screen.getByText(/近日，我公司凭借卓越的服务质量/)).toBeInTheDocument();
  });

  test('renders second news article', () => {
    render(<NewsDetailPage params={{ slug: '2' }} />);

    expect(screen.getByText('全新产品系列正式发布')).toBeInTheDocument();
    expect(screen.getByText('2026-02-25')).toBeInTheDocument();
    expect(screen.getByText('THPMG产品团队')).toBeInTheDocument();
  });

  test('renders not found for invalid slug', () => {
    render(<NewsDetailPage params={{ slug: '999' }} />);

    expect(screen.getByText('新闻不存在')).toBeInTheDocument();
    expect(screen.getByText('← 返回新闻中心')).toBeInTheDocument();
  });

  test('renders related news section', () => {
    render(<NewsDetailPage params={{ slug: '1' }} />);

    expect(screen.getByText('相关新闻')).toBeInTheDocument();
  });

  test('renders back button', () => {
    render(<NewsDetailPage params={{ slug: '1' }} />);

    expect(screen.getByText('← 返回新闻中心')).toBeInTheDocument();
  });

  test('renders tags section', () => {
    render(<NewsDetailPage params={{ slug: '1' }} />);

    expect(screen.getByText('标签：')).toBeInTheDocument();
    expect(screen.getByText('公司动态')).toBeInTheDocument();
    expect(screen.getByText('荣誉奖项')).toBeInTheDocument();
  });

  test('renders share section', () => {
    render(<NewsDetailPage params={{ slug: '1' }} />);

    expect(screen.getByText('分享到：')).toBeInTheDocument();
  });
});