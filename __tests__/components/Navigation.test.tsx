import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navigation from '../../components/Navigation';

describe('Navigation Component', () => {
  test('renders navigation component', () => {
    render(<Navigation />);
    // Just verify the component renders without error
    expect(document.querySelector('nav')).toBeInTheDocument();
  });
});
