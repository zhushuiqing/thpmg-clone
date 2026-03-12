import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  test('renders footer with company info', () => {
    render(<Footer />);

    expect(screen.getByText('THPMG')).toBeInTheDocument();
    expect(screen.getByText('专业服务，值得信赖')).toBeInTheDocument();
  });

  test('renders navigation sections', () => {
    render(<Footer />);

    // Check that navigation sections exist by checking for links using Chinese text
    expect(screen.getByRole('link', { name: '关于我们' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '服务项目' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '新闻中心' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '联系我们' })).toBeInTheDocument();
  });

  test('renders contact information', () => {
    render(<Footer />);

    expect(screen.getByText('info@thpmg.com')).toBeInTheDocument();
  });

  test('renders copyright notice', () => {
    render(<Footer />);

    expect(screen.getByText('© 2026 THPMG. All rights reserved.')).toBeInTheDocument();
  });
});
