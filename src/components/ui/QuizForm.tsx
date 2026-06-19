'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

type Status = 'idle' | 'sending' | 'success' | 'error';

const initialValues = {
  teamName: '',
  contactName: '',
  email: '',
  phone: '',
  participants: '',
  remarks: '',
  website: '', // honeypot
};

export default function QuizForm() {
  const t = useTranslations('quizForm');
  const [values, setValues] = useState(initialValues);
  const [status, setStatus] = useState<Status>('idle');

  function update(field: keyof typeof initialValues) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [field]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('request failed');
      setStatus('success');
      setValues(initialValues);
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-lg text-center border border-hl-navy/5">
        <div className="text-5xl mb-4">🎉</div>
        <h2 className="font-heading font-bold text-2xl text-hl-navy mb-2">{t('successTitle')}</h2>
        <p className="text-hl-navy/75 mb-6">{t('successText')}</p>
        <button
          onClick={() => setStatus('idle')}
          className="inline-flex items-center px-6 py-3 bg-hl-orange text-white font-heading font-semibold rounded-full hover:bg-hl-orange-dark transition-colors"
        >
          {t('again')}
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full rounded-xl border border-hl-navy/15 bg-white px-4 py-3 text-hl-navy outline-none focus:border-hl-orange focus:ring-2 focus:ring-hl-orange/30 transition';
  const labelClass = 'block font-heading font-semibold text-sm text-hl-navy mb-1.5';

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-hl-navy/5 grid gap-5">
      {/* Honeypot — verborgen voor mensen */}
      <input
        type="text"
        name="website"
        value={values.website}
        onChange={update('website')}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="teamName" className={labelClass}>{t('teamName')} *</label>
        <input id="teamName" type="text" required value={values.teamName} onChange={update('teamName')} className={inputClass} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="contactName" className={labelClass}>{t('contactName')} *</label>
          <input id="contactName" type="text" required value={values.contactName} onChange={update('contactName')} className={inputClass} />
        </div>
        <div>
          <label htmlFor="participants" className={labelClass}>{t('participants')} *</label>
          <input id="participants" type="number" min={1} max={6} required value={values.participants} onChange={update('participants')} className={inputClass} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="email" className={labelClass}>{t('email')} *</label>
          <input id="email" type="email" required value={values.email} onChange={update('email')} className={inputClass} />
        </div>
        <div>
          <label htmlFor="phone" className={labelClass}>{t('phone')} *</label>
          <input id="phone" type="tel" required value={values.phone} onChange={update('phone')} className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="remarks" className={labelClass}>{t('remarks')}</label>
        <textarea id="remarks" rows={3} value={values.remarks} onChange={update('remarks')} placeholder={t('remarksPlaceholder')} className={inputClass} />
      </div>

      {status === 'error' && (
        <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          <strong>{t('errorTitle')}.</strong> {t('errorText')}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex justify-center items-center px-7 py-3.5 bg-hl-orange text-white font-heading font-semibold rounded-full shadow hover:bg-hl-orange-dark transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
