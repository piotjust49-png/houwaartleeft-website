import { useTranslations } from 'next-intl';

interface PracticalItem {
  icon: string;
  title: string;
  text: string;
}

export default function PracticalSection() {
  const t = useTranslations('practical');
  const items = t.raw('items') as PracticalItem[];

  return (
    <section id="praktisch" className="py-20 sm:py-24 bg-hl-pale">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-heading font-semibold uppercase tracking-wide text-hl-orange text-sm mb-1">
          {t('kicker')}
        </p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-hl-navy mb-8">
          {t('title')}
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-hl-navy/5"
            >
              <span className="text-3xl">{item.icon}</span>
              <h3 className="font-heading font-semibold text-hl-navy mt-2.5 mb-1.5">{item.title}</h3>
              <p className="text-hl-navy/65 text-sm">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
