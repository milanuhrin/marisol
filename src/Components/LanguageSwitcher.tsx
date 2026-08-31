import React from 'react';
import { Link } from 'gatsby';
import { useI18n } from '../i18n/LanguageProvider';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { lang } = useI18n();
  // základný štýl len na hover efekt, bez ovalu a paddingu
  const btn = 'inline-flex items-center justify-center hover:opacity-80 transition';

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <Link
        to="/"
        hrefLang="sk"
        aria-label="Slovenčina"
        title="Slovenčina"
        aria-current={lang === 'sk' ? 'page' : undefined}
        className={`${btn} ${lang === 'sk' ? 'opacity-100' : 'opacity-70'}`}
      >
        <span style={{ fontSize: 25, lineHeight: 1 }}>🇸🇰</span>
      </Link>
      <Link
        to="/en/"
        hrefLang="en"
        aria-label="English"
        title="English"
        aria-current={lang === 'en' ? 'page' : undefined}
        className={`${btn} ${lang === 'en' ? 'opacity-100' : 'opacity-70'}`}
      >
        <span style={{ fontSize: 25, lineHeight: 1 }}>🇬🇧</span>
      </Link>
    </div>
  );
};
