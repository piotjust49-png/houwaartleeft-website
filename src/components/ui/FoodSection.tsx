import { useTranslations } from 'next-intl';

export default function FoodSection() {
  const t = useTranslations('food');

  const cards = [
    { title: t('eat.title'), text: t('eat.text') },
    { title: t('drink.title'), text: t('drink.text') },
  ];

  return (
    <section id="eten" className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-heading font-semibold uppercase tracking-wide text-hl-orange text-sm mb-1">
          {t('kicker')}
        </p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-hl-navy mb-8">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {cards.map((c) => (
            <div key={c.title} className="bg-hl-mint rounded-3xl p-8 shadow-sm">
              <h3 className="font-heading font-bold text-2xl text-hl-navy mb-2.5">{c.title}</h3>
              <p className="text-hl-navy/85">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
