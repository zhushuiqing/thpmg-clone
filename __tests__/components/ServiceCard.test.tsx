import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ServiceCard from '../../components/ServiceCard';

describe('ServiceCard Component', () => {
  test('renders service card with title and description', () => {
    render(
      <ServiceCard
        title="Professional Consulting"
        description="Comprehensive professional consulting services"
        icon="💡"
      />
    );

    expect(screen.getByText('Professional Consulting')).toBeInTheDocument();
    expect(screen.getByText('Comprehensive professional consulting services')).toBeInTheDocument();
    expect(screen.getByText('💡')).toBeInTheDocument();
  });

  test('renders service list when provided', () => {
    const services = ['Service 1', 'Service 2', 'Service 3'];

    render(
      <ServiceCard
        title="Technical Support"
        description="Full technical support services"
        icon="🛠️"
        services={services}
      />
    );

    services.forEach(service => {
      expect(screen.getByText(service)).toBeInTheDocument();
    });
  });

  test('renders link when provided', () => {
    render(
      <ServiceCard
        title="Custom Development"
        description="Custom development services"
        icon="💻"
        link="/services"
      />
    );

    expect(document.querySelector('a')).toBeInTheDocument();
  });
});
