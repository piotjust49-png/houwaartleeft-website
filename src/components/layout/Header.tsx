'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('nav');
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '#over', label: t('over') },
    { href: '#programma', label: t('programma') },
    { href: '#eten', label: t('eten') },
    { href: '#praktisch', label: t('praktisch') },
    { href: '#sponsors', label: t('sponsors') },
  ] as const;

  return (
    <header className="bg-hl-cream/90 backdrop-blur border-b border-hl-navy/10 sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#top" className="flex items-baseline gap-1 shrink-0">
            <span className="font-heading font-bold text-2xl text-hl-navy">Houwaart</span>
            <span className="font-heading font-bold text-2xl text-hl-orange">Leeft</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hoofdnavigatie">
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="px-3 py-2 text-sm font-heading font-medium text-hl-navy rounded-full hover:bg-hl-mint transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center px-4 py-2 bg-hl-orange text-white font-heading font-semibold text-sm rounded-full hover:bg-hl-orange-dark transition-colors"
            >
              {t('contact')}
            </a>

            <button
              className="lg:hidden p-2 rounded text-hl-navy hover:bg-hl-mint transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav id="mobile-menu" className="lg:hidden bg-hl-cream border-t border-hl-navy/10" aria-label="Mobiele navigatie">
          <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">
            {[...navLinks, { href: '#contact', label: t('contact') }].map(({ href, label }) => (
              <a
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="block px-3 py-2 text-sm font-heading font-medium text-hl-navy rounded-lg hover:bg-hl-mint transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
