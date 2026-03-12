import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactPage from '../../app/[locale]/contact/page';

// Mock the params promise
const mockParams = Promise.resolve({ locale: 'zh' });

describe('ContactPage', () => {
  test('renders hero section with title', async () => {
    render(await ContactPage({ params: mockParams }));

    // Use getAllByText since '联系我们' appears in both navigation and page title
    expect(screen.getAllByText('联系我们').length).toBeGreaterThan(0);
    // '首页' appears in navigation breadcrumb
    expect(screen.getAllByText('首页').length).toBeGreaterThan(0);
  });

  test('renders contact info section', async () => {
    render(await ContactPage({ params: mockParams }));

    expect(screen.getByText('联系方式')).toBeInTheDocument();
    expect(screen.getByText('电子邮箱')).toBeInTheDocument();
    expect(screen.getByText('联系电话')).toBeInTheDocument();
    expect(screen.getByText('公司地址')).toBeInTheDocument();
  });

  test('renders contact details', async () => {
    render(await ContactPage({ params: mockParams }));

    expect(screen.getByText('info@thpmg.com')).toBeInTheDocument();
    expect(screen.getByText('+86 123 4567 8900')).toBeInTheDocument();
    expect(screen.getByText('北京市朝阳区某某大厦18层')).toBeInTheDocument();
  });

  test('renders contact form section', async () => {
    render(await ContactPage({ params: mockParams }));

    expect(screen.getByText('在线咨询')).toBeInTheDocument();
    expect(screen.getByText('姓名')).toBeInTheDocument();
    expect(screen.getByText('邮箱')).toBeInTheDocument();
    expect(screen.getByText('留言内容')).toBeInTheDocument();
  });

  test('renders map section', async () => {
    render(await ContactPage({ params: mockParams }));

    expect(screen.getByText('公司位置')).toBeInTheDocument();
    expect(screen.getByText('地图功能将在生产环境配置后显示')).toBeInTheDocument();
  });

  test('renders business hours section', async () => {
    render(await ContactPage({ params: mockParams }));

    expect(screen.getByText('工作时间')).toBeInTheDocument();
    expect(screen.getByText('周一至周五')).toBeInTheDocument();
    expect(screen.getByText('周六')).toBeInTheDocument();
    expect(screen.getByText('周日及节假日')).toBeInTheDocument();
    expect(screen.getByText('09:00 - 18:00')).toBeInTheDocument();
    expect(screen.getByText('休息')).toBeInTheDocument();
  });
});