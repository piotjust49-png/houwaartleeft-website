import { useTranslations } from 'next-intl';

interface SponsorPackage {
  name: string;
  desc: string;
  features: string[];
}

export default function SponsorSection() {
  const t = useTranslations('sponsors');
  const pkg = t.raw('package') as SponsorPackage;

  return (
    <section id="sponsors" className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-heading font-semibold uppercase tracking-wide text-hl-orange text-sm mb-1">
          {t('kicker')}
        </p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-hl-navy mb-6">
          {t('title')}
        </h2>
        <p className="max-w-2xl text-hl-navy/85 text-[1.05rem] mb-9">{t('intro')}</p>

        <div className="max-w-md mx-auto">
          <div className="relative rounded-3xl p-8 flex flex-col bg-hl-navy text-white shadow-lg">
            <h3 className="font-heading font-bold text-2xl mb-1.5">{pkg.name}</h3>
            <p className="text-white/80 mb-5">{pkg.desc}</p>

            <ul className="grid gap-2.5 mb-6">
              {pkg.features.map((f) => (
                <li key={f} className="relative pl-6">
                  <span className="absolute left-0 text-hl-orange font-bold">✓</span>
                  {f}
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="inline-flex justify-center items-center px-6 py-3 bg-hl-orange text-white font-heading font-semibold rounded-full hover:bg-hl-orange-dark transition-colors"
            >
              {t('interest')}
            </a>
          </div>
        </div>

        <p className="text-center mt-9 text-[1.05rem] text-hl-navy/85">{t('cta')}</p>
      </div>
    </section>
  );
}
