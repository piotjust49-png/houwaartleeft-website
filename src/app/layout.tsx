import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://houwaartleeft.be'),
  title: 'Houwaart Leeft',
  description: 'Het meerdaagse dorpsfeest van Houwaart.',
  openGraph: {
    siteName: 'Houwaart Leeft',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
