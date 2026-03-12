import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Hero from '../../components/Hero';

describe('Hero Component', () => {
  test('renders hero section with title and subtitle', () => {
    render(
      <Hero
        title="Professional Services"
        subtitle="We provide professional services you can trust"
      />
    );

    expect(screen.getByText('Professional Services')).toBeInTheDocument();
    expect(screen.getByText('We provide professional services you can trust')).toBeInTheDocument();
  });

  test('renders primary CTA button when provided', () => {
    render(
      <Hero
        title="Our Services"
        subtitle="Discover our comprehensive service offerings"
        ctaText="Learn More"
        ctaLink="/services"
      />
    );

    expect(screen.getByText('Learn More')).toBeInTheDocument();
  });

  test('renders secondary CTA button when provided', () => {
    render(
      <Hero
        title="Contact Us"
        subtitle="Get in touch with our team"
        secondaryCtaText="Contact"
        secondaryCtaLink="/contact"
      />
    );

    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  test('renders both CTA buttons when provided', () => {
    render(
      <Hero
        title="Get Started"
        subtitle="Begin your journey with us"
        ctaText="Primary Action"
        ctaLink="/primary"
        secondaryCtaText="Secondary Action"
        secondaryCtaLink="/secondary"
      />
    );

    expect(screen.getByText('Primary Action')).toBeInTheDocument();
    expect(screen.getByText('Secondary Action')).toBeInTheDocument();
  });
});