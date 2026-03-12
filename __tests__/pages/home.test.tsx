import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '../../app/[locale]/page';

describe('HomePage', () => {
  test('renders hero section with title and description', () => {
    render(<HomePage />);

    // Check hero section content
    expect(screen.getByText('专业服务，值得信赖')).toBeInTheDocument();
    expect(screen.getByText('我们致力于为客户提供最优质的专业服务，以卓越的品质和专业的态度赢得客户的信任与支持。')).toBeInTheDocument();
  });

  test('renders about section with company information', () => {
    render(<HomePage />);

    expect(screen.getByText('关于我们')).toBeInTheDocument();
    expect(screen.getByText('公司简介')).toBeInTheDocument();
    // Use getAllByText since there are multiple "了解更多 →" links
    expect(screen.getAllByText('了解更多 →').length).toBeGreaterThan(0);
  });

  test('renders services section with service cards', () => {
    render(<HomePage />);

    expect(screen.getByText('我们的服务')).toBeInTheDocument();
    expect(screen.getByText('专业咨询')).toBeInTheDocument();
    expect(screen.getByText('技术支持')).toBeInTheDocument();
    expect(screen.getByText('定制开发')).toBeInTheDocument();
  });

  test('renders news section with news items', () => {
    render(<HomePage />);

    expect(screen.getByText('新闻中心')).toBeInTheDocument();
    expect(screen.getByText('公司荣获行业大奖')).toBeInTheDocument();
    expect(screen.getByText('新产品发布')).toBeInTheDocument();
    expect(screen.getByText('战略合作达成')).toBeInTheDocument();
  });

  test('renders contact CTA section', () => {
    render(<HomePage />);

    expect(screen.getAllByText('联系我们').length).toBeGreaterThan(1);
    expect(screen.getByText('如果您有任何问题或需求，欢迎随时与我们联系。我们的专业团队将竭诚为您服务。')).toBeInTheDocument();
    expect(screen.getByText('立即咨询')).toBeInTheDocument();
  });

  test('renders statistics cards', () => {
    render(<HomePage />);

    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('年经验')).toBeInTheDocument();
    expect(screen.getByText('100+')).toBeInTheDocument();
    expect(screen.getByText('合作企业')).toBeInTheDocument();
  });
});
