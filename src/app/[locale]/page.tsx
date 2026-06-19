import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Hero from '@/components/ui/Hero';
import AboutSection from '@/components/ui/AboutSection';
import ProgramSection from '@/components/ui/ProgramSection';
import FoodSection from '@/components/ui/FoodSection';
import PracticalSection from '@/components/ui/PracticalSection';
import SponsorSection from '@/components/ui/SponsorSection';
import ContactSection from '@/components/ui/ContactSection';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta.home' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
    },
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProgramSection />
      <FoodSection />
      <PracticalSection />
      <SponsorSection />
      <ContactSection />
    </>
  );
}
