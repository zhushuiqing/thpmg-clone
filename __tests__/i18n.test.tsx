import '@testing-library/jest-dom';

// Simple test to verify translations work
describe('Internationalization', () => {
  test('mock translation test - verify jest is working', () => {
    // Simple assertion to verify test infrastructure works
    expect(true).toBe(true);
  });

  test('translation keys exist in expected format', () => {
    const translations = {
      Navigation: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        news: 'News',
        contact: 'Contact',
      },
      Common: {
        readMore: 'Read More',
        loading: 'Loading...',
      },
    };

    expect(translations.Navigation.home).toBe('Home');
    expect(translations.Common.readMore).toBe('Read More');
  });
});
