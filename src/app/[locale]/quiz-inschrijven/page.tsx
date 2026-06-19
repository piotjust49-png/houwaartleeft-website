import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import QuizForm from '@/components/ui/QuizForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'quiz' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical: `/${locale}/quiz-inschrijven` },
  };
}

export default function QuizInschrijvenPage() {
  const t = useTranslations('quiz');
  const info = t.raw('info') as string[];

  return (
    <section className="min-h-screen bg-hl-pale py-16 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/" className="inline-block text-hl-navy/70 hover:text-hl-orange font-heading font-medium mb-8 transition-colors">
          {t('back')}
        </Link>

        <p className="font-heading font-semibold uppercase tracking-wide text-hl-orange text-sm mb-1">
          {t('kicker')}
        </p>
        <h1 className="font-heading font-bold text-3xl sm:text-4xl text-hl-navy mb-4">
          {t('title')}
        </h1>
        <p className="text-hl-navy/85 text-[1.05rem] mb-6">{t('intro')}</p>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 mb-10 text-hl-navy/85">
          {info.map((line) => (
            <li key={line} className="font-heading font-medium">{line}</li>
          ))}
        </ul>

        <QuizForm />
      </div>
    </section>
  );
}
