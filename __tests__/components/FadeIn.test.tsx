import { render, screen } from '@testing-library/react';
import FadeIn from '@/components/FadeIn';

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();

beforeEach(() => {
  window.IntersectionObserver = mockIntersectionObserver as unknown as typeof IntersectionObserver;
  mockIntersectionObserver.mockClear();
});

describe('FadeIn', () => {
  it('renders children correctly', () => {
    mockIntersectionObserver.mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    render(
      <FadeIn>
        <div data-testid="content">Test Content</div>
      </FadeIn>
    );

    expect(screen.getByTestId('content')).toBeInTheDocument();
  });

  it('applies default props correctly', () => {
    mockIntersectionObserver.mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    const { container } = render(
      <FadeIn>
        <div>Content</div>
      </FadeIn>
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toBeInTheDocument();
  });

  it('accepts custom direction prop', () => {
    mockIntersectionObserver.mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    render(
      <FadeIn direction="left" distance={60}>
        <div data-testid="left-content">Left Content</div>
      </FadeIn>
    );

    expect(screen.getByTestId('left-content')).toBeInTheDocument();
  });

  it('accepts custom delay and duration', () => {
    mockIntersectionObserver.mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    render(
      <FadeIn delay={500} duration={1200}>
        <div data-testid="delayed-content">Delayed Content</div>
      </FadeIn>
    );

    expect(screen.getByTestId('delayed-content')).toBeInTheDocument();
  });

  it('handles direction="none" correctly', () => {
    mockIntersectionObserver.mockImplementation(() => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    }));

    render(
      <FadeIn direction="none">
        <div data-testid="none-content">No Direction Content</div>
      </FadeIn>
    );

    expect(screen.getByTestId('none-content')).toBeInTheDocument();
  });
});
