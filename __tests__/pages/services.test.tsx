import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServicesPage from '../../app/[locale]/services/page';

describe('ServicesPage', () => {
  test('renders hero section with title', () => {
    render(<ServicesPage />);

    // Use getAllByText since there are multiple elements with the same text
    expect(screen.getAllByText('服务项目').length).toBeGreaterThan(1);
    expect(screen.getAllByText('首页').length).toBeGreaterThan(0);
  });

  test('renders service categories', () => {
    render(<ServicesPage />);

    expect(screen.getAllByText('我们的服务').length).toBeGreaterThan(0);
    expect(screen.getByText('专业咨询')).toBeInTheDocument();
    expect(screen.getByText('技术支持')).toBeInTheDocument();
    expect(screen.getByText('定制开发')).toBeInTheDocument();
    expect(screen.getByText('数据分析')).toBeInTheDocument();
  });

  test('renders service details for each category', () => {
    render(<ServicesPage />);

    // Check professional consulting services
    expect(screen.getByText('战略规划咨询')).toBeInTheDocument();
    expect(screen.getByText('业务流程优化')).toBeInTheDocument();
    expect(screen.getByText('风险管理咨询')).toBeInTheDocument();
    expect(screen.getByText('合规咨询服务')).toBeInTheDocument();

    // Check technical support services
    expect(screen.getByText('系统架构设计')).toBeInTheDocument();
    expect(screen.getByText('技术方案实施')).toBeInTheDocument();
    expect(screen.getByText('系统运维支持')).toBeInTheDocument();
    expect(screen.getByText('技术培训服务')).toBeInTheDocument();
  });

  test('renders service advantages section', () => {
    render(<ServicesPage />);

    expect(screen.getByText('服务优势')).toBeInTheDocument();
    expect(screen.getAllByText('专业团队').length).toBeGreaterThan(0);
    expect(screen.getByText('定制方案')).toBeInTheDocument();
    expect(screen.getByText('质量保证')).toBeInTheDocument();
    expect(screen.getByText('全程支持')).toBeInTheDocument();
    expect(screen.getByText('技术创新')).toBeInTheDocument();
    expect(screen.getByText('客户至上')).toBeInTheDocument();
  });

  test('renders service process timeline', () => {
    render(<ServicesPage />);

    expect(screen.getByText('服务流程')).toBeInTheDocument();
    expect(screen.getAllByText('需求沟通').length).toBeGreaterThan(0);
    expect(screen.getByText('方案制定')).toBeInTheDocument();
    expect(screen.getByText('方案确认')).toBeInTheDocument();
    expect(screen.getByText('项目实施')).toBeInTheDocument();
    expect(screen.getByText('质量验收')).toBeInTheDocument();
    expect(screen.getByText('交付支持')).toBeInTheDocument();
  });

  test('renders CTA section', () => {
    render(<ServicesPage />);

    expect(screen.getByText('开始您的项目')).toBeInTheDocument();
    expect(screen.getByText('获取免费咨询')).toBeInTheDocument();
  });
});
