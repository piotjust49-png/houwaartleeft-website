import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Anton, Fredoka, Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '../globals.css';

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const fredoka = Fredoka({
  subsets: ['latin'],
  variable: '--font-fredoka',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL('https://houwaartleeft.be'),
    title: {
      template: `%s | ${t('siteName')}`,
      default: t('siteName'),
    },
    openGraph: {
      locale,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as 'nl')) {
    notFound();
  }

  const allMessages = await getMessages();
  // Enkel de namespaces die clientcomponenten nodig hebben naar de browser sturen.
  const clientMessages = {
    nav: allMessages.nav,
    hero: allMessages.hero,
  };

  return (
    <html
      lang={locale}
      className={`${anton.variable} ${fredoka.variable} ${inter.variable}`}
    >
      <body className="font-body bg-hl-cream text-hl-navy antialiased">
        <NextIntlClientProvider messages={clientMessages}>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-hl-orange focus:text-white focus:px-4 focus:py-2"
          >
            Ga naar inhoud
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
