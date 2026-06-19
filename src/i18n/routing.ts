import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // Voorlopig enkel Nederlands. Voeg hier extra talen toe (bv. 'fr', 'en')
  // en maak een bijhorend bestand in /messages om de site meertalig te maken.
  locales: ['nl'],
  defaultLocale: 'nl',
  localeDetection: true,
  pathnames: {
    '/': '/',
  },
});

export type Locale = (typeof routing.locales)[number];
