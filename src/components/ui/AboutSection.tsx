import { useTranslations } from 'next-intl';

interface Pillar {
  icon: string;
  title: string;
  text: string;
}

export default function AboutSection() {
  const t = useTranslations('about');
  const pillars = t.raw('pillars') as Pillar[];

  return (
    <section id="over" className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-heading font-semibold uppercase tracking-wide text-hl-orange text-sm mb-1">
          {t('kicker')}
        </p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-hl-navy mb-8">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div className="space-y-4 text-[1.05rem] text-hl-navy/85">
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
          </div>

          <ul className="grid gap-4">
            {pillars.map((p) => (
              <li
                key={p.title}
                className="flex gap-4 items-start bg-white border border-hl-navy/10 rounded-2xl p-5 shadow-sm"
              >
                <span className="text-2xl leading-none">{p.icon}</span>
                <div>
                  <h3 className="font-heading font-semibold text-hl-navy text-lg">{p.title}</h3>
                  <p className="text-hl-navy/65 text-sm">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
