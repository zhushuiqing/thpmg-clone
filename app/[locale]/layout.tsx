import { NextIntlClientProvider, useMessages } from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = useMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Navigation />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </NextIntlClientProvider>
  );
}