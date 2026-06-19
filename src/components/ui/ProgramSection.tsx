import { useTranslations } from 'next-intl';
import type { ProgramDay } from '@/types';

export default function ProgramSection() {
  const t = useTranslations('program');
  const days = t.raw('days') as ProgramDay[];

  return (
    <section id="programma" className="py-20 sm:py-24 bg-hl-pale">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-heading font-semibold uppercase tracking-wide text-hl-orange text-sm mb-1">
          {t('kicker')}
        </p>
        <h2 className="font-heading font-bold text-3xl sm:text-4xl text-hl-navy mb-8">
          {t('title')}
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {days.map((day) => (
            <article
              key={day.day}
              className={`rounded-3xl p-6 shadow-lg border flex flex-col ${
                day.featured
                  ? 'bg-hl-mint border-hl-navy/15'
                  : 'bg-white border-hl-navy/5'
              }`}
            >
              <div className="flex items-center justify-between mb-5">
                <span className="inline-flex flex-col items-center justify-center bg-hl-orange text-white rounded-2xl w-16 h-16 leading-none shadow-sm">
                  <span className="text-xs uppercase tracking-wide">{day.weekday}</span>
                  <span className="font-display text-3xl">{day.day}</span>
                  <span className="text-[0.65rem] uppercase">{day.month}</span>
                </span>
                <span
                  className={`font-heading font-semibold text-sm text-hl-navy px-3 py-1.5 rounded-full ${
                    day.featured ? 'bg-white' : 'bg-hl-pale'
                  }`}
                >
                  {day.tag}
                </span>
              </div>

              <ul className="grid gap-3.5">
                {day.items.map((item) => (
                  <li
                    key={item.title}
                    className="grid grid-cols-[5.5rem_1fr] gap-2.5 items-baseline"
                  >
                    <span className="font-heading font-semibold text-sm text-hl-orange whitespace-nowrap">
                      {item.time}
                    </span>
                    <div>
                      <strong className="block text-hl-navy font-bold">{item.title}</strong>
                      {item.description && (
                        <p className="text-hl-navy/65 text-sm leading-snug">{item.description}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="text-center mt-8 text-hl-navy/65 text-sm">{t('note')}</p>
      </div>
    </section>
  );
}
