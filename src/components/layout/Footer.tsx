import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const contact = useTranslations('contact');

  return (
    <footer className="bg-hl-navy text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <p className="flex items-baseline justify-center gap-2">
          <span className="font-display text-2xl tracking-wide">HOUWAART</span>
          <span className="font-marker text-xl text-hl-orange -rotate-2">Leeft</span>
        </p>
        <p className="mt-2 text-white/80 text-sm">{t('tagline')}</p>
        <p className="mt-1 text-white/70 text-sm">{t('org')}</p>

        <div className="mt-4 flex items-center justify-center gap-5 text-sm">
          <a href={`mailto:${contact('email')}`} className="text-hl-mint hover:text-white transition-colors">
            {contact('email')}
          </a>
          <a
            href={contact('facebookUrl')}
            target="_blank"
            rel="noopener"
            className="text-hl-mint hover:text-white transition-colors"
          >
            {contact('facebookLabel')}
          </a>
        </div>

        <p className="mt-8 pt-6 border-t border-white/15 text-xs text-white/60">
          © {new Date().getFullYear()} Houwaart Leeft. {t('rights')}.
        </p>
      </div>
    </footer>
  );
}
