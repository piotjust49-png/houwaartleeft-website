import { useTranslations } from 'next-intl';

interface SponsorPackage {
  name: string;
  desc: string;
  featured?: boolean;
  features: string[];
}

export default function SponsorSection() {
  const t = useTranslations('sponsors');
  const packages = t.raw('packages') as SponsorPackage[];

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

        <div className="grid md:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`relative rounded-3xl p-8 flex flex-col border ${
                pkg.featured
                  ? 'bg-hl-navy text-white border-hl-navy shadow-lg md:scale-[1.03]'
                  : 'bg-white border-hl-navy/10 shadow-sm'
              }`}
            >
              {pkg.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-hl-orange text-white font-heading font-semibold text-xs px-4 py-1.5 rounded-full whitespace-nowrap">
                  {t('popular')}
                </span>
              )}
              <h3 className={`font-heading font-bold text-2xl mb-1.5 ${pkg.featured ? 'text-white' : 'text-hl-navy'}`}>
                {pkg.name}
              </h3>
              <p className={`mb-5 ${pkg.featured ? 'text-white/80' : 'text-hl-navy/65'}`}>{pkg.desc}</p>

              <ul className="grid gap-2.5 mb-6 flex-1">
                {pkg.features.map((f) => (
                  <li key={f} className="relative pl-6">
                    <span className="absolute left-0 text-hl-orange font-bold">✓</span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`inline-flex justify-center items-center px-6 py-3 font-heading font-semibold rounded-full transition-colors ${
                  pkg.featured
                    ? 'bg-hl-orange text-white hover:bg-hl-orange-dark'
                    : 'border-2 border-hl-navy text-hl-navy hover:bg-hl-navy hover:text-white'
                }`}
              >
                {t('interest')}
              </a>
            </div>
          ))}
        </div>

        <p className="text-center mt-9 text-[1.05rem] text-hl-navy/85">{t('cta')}</p>
      </div>
    </section>
  );
}
