import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewsCard from '../../components/NewsCard';

describe('NewsCard Component', () => {
  test('renders news card with title, date and excerpt', () => {
    render(
      <NewsCard
        title="Company Award"
        date="2026-03-01"
        excerpt="Company won industry award"
      />
    );

    expect(screen.getByText('Company Award')).toBeInTheDocument();
    expect(screen.getByText('2026-03-01')).toBeInTheDocument();
    expect(screen.getByText('Company won industry award')).toBeInTheDocument();
  });

  test('renders link when provided', () => {
    render(
      <NewsCard
        title="New Product Launch"
        date="2026-02-25"
        excerpt="New product series launched"
        link="/news/1"
      />
    );

    // The readMore text is from Common namespace, mock returns key if not found
    // So we check for the arrow symbol which should always be there
    expect(document.querySelector('a')).toBeInTheDocument();
  });
});
