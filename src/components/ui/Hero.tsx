'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import StringLights from './StringLights';

// Startdatum van het feest (countdown-doel).
// Maand is 0-gebaseerd: 8 = september. → vr 11 sep 2026, 20u00.
const EVENT_START = new Date(2026, 8, 11, 20, 0, 0);

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(): TimeLeft | null {
  const diff = EVENT_START.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

export default function Hero() {
  const t = useTranslations('hero');
  const [time, setTime] = useState<TimeLeft | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const timer = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  const units = mounted && time
    ? [
        { value: time.days, label: t('countdown.days'), pad: false },
        { value: time.hours, label: t('countdown.hours'), pad: true },
        { value: time.minutes, label: t('countdown.minutes'), pad: true },
        { value: time.seconds, label: t('countdown.seconds'), pad: true },
      ]
    : [];

  return (
    <section
      id="top"
      className="relative flex items-center min-h-[92vh] overflow-hidden text-center text-white py-24 bg-gradient-to-b from-[#b3cd9a] via-hl-sage to-hl-green"
    >
      <div className="absolute inset-0 bg-dots opacity-30 pointer-events-none" />

      {/* Lampjesslingers zoals op de cover — één streng loopt achter de titel */}
      <StringLights className="absolute inset-0 h-full w-full z-[1] pointer-events-none" />

      {/* Ronde badge zoals op de affiche */}
      <div className="hidden sm:flex absolute -bottom-16 -right-16 lg:-bottom-12 lg:-right-12 w-56 h-56 lg:w-64 lg:h-64 rounded-full bg-hl-green-dark/95 rotate-[-8deg] items-center justify-center text-center shadow-xl pointer-events-none">
        <p className="font-display text-2xl lg:text-3xl leading-tight text-hl-mint -translate-y-6 lg:-translate-y-8 -translate-x-4">
          MET<br />HAMBURGERS<br />EN COCKTAILS
        </p>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="font-heading font-semibold uppercase tracking-wide text-sm mb-3 opacity-95">
          {t('kicker')}
        </p>

        <div className="relative inline-block mb-4">
          <span
            aria-hidden="true"
            className="absolute -inset-x-12 -inset-y-8 bg-hl-pale/35 blur-2xl rounded-[45%]"
          />
          <h1 className="relative leading-[0.92]">
            <span className="block font-display text-6xl sm:text-7xl lg:text-8xl tracking-wide [text-shadow:0_4px_0_rgba(31,58,95,0.25)]">
              HOUWAART
            </span>
            <span className="block font-marker text-5xl sm:text-6xl lg:text-7xl text-hl-orange -mt-1 -rotate-2 [text-shadow:0_3px_0_rgba(0,0,0,0.15)]">
              Leeft
            </span>
          </h1>
        </div>

        <p className="inline-block font-heading font-bold text-lg sm:text-2xl bg-hl-orange text-white px-6 py-2 rounded-full shadow mb-4">
          {t('dates')}
        </p>

        <p className="text-lg sm:text-xl max-w-xl mx-auto mb-8 opacity-95">{t('subtitle')}</p>

        {/* Countdown */}
        <div className="flex justify-center gap-3 flex-wrap mb-8 min-h-[92px]">
          {units.map((u) => (
            <div
              key={u.label}
              className="bg-white/15 border border-white/35 rounded-2xl px-5 py-3 min-w-[78px] backdrop-blur-sm"
            >
              <span className="block font-display text-4xl leading-none">
                {u.pad ? String(u.value).padStart(2, '0') : u.value}
              </span>
              <span className="text-xs uppercase tracking-widest opacity-90">{u.label}</span>
            </div>
          ))}
          {mounted && !time && (
            <p className="font-heading font-semibold text-xl py-4">{t('countdown.live')}</p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#programma"
            className="inline-flex items-center px-7 py-3.5 bg-hl-orange text-white font-heading font-semibold rounded-full shadow hover:bg-hl-orange-dark hover:-translate-y-0.5 transition-all"
          >
            {t('ctaProgram')}
          </a>
          <a
            href="#sponsors"
            className="inline-flex items-center px-7 py-3.5 border-2 border-white/70 bg-white/15 text-white font-heading font-semibold rounded-full hover:bg-white hover:text-hl-navy hover:-translate-y-0.5 transition-all"
          >
            {t('ctaSponsor')}
          </a>
        </div>
      </div>
    </section>
  );
}
