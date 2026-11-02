import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/app/i18n/routing';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'FraudLens — See the fraud before it sees you',
  description: 'See the fraud before it sees you. Scan suspicious messages, links, QR codes and files, learn your rights, and find help reporting cybercrime.',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const localeValue = locale as (typeof routing.locales)[number];

  if (!routing.locales.includes(localeValue)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
