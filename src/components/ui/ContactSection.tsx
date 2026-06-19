import { useTranslations } from 'next-intl';

export default function ContactSection() {
  const t = useTranslations('contact');

  return (
    <section id="contact" className="py-20 sm:py-24 bg-hl-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="font-heading font-semibold uppercase tracking-wide text-hl-mint text-sm mb-1">
            {t('kicker')}
          </p>
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-4">{t('title')}</h2>
          <p className="text-white/85 max-w-md">{t('text')}</p>
        </div>

        <div className="grid gap-4">
          <a
            href={`mailto:${t('email')}`}
            className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4 items-center bg-white/[0.07] border border-white/20 rounded-2xl px-6 py-5 hover:bg-white/15 hover:-translate-y-0.5 transition-all"
          >
            <span className="row-span-2 text-3xl">✉️</span>
            <span className="text-xs uppercase tracking-widest text-hl-mint">{t('emailLabel')}</span>
            <span className="font-heading font-semibold text-lg">{t('email')}</span>
          </a>

          <a
            href={t('facebookUrl')}
            target="_blank"
            rel="noopener"
            className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4 items-center bg-white/[0.07] border border-white/20 rounded-2xl px-6 py-5 hover:bg-white/15 hover:-translate-y-0.5 transition-all"
          >
            <span className="row-span-2 text-3xl">📘</span>
            <span className="text-xs uppercase tracking-widest text-hl-mint">{t('facebookLabel')}</span>
            <span className="font-heading font-semibold text-lg">{t('facebookName')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
