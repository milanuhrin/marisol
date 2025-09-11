import React from 'react';
import { useI18n } from '../i18n/LanguageProvider';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { lang, setLang } = useI18n();
  // základný štýl len na hover efekt, bez ovalu a paddingu
  const btn = 'inline-flex items-center justify-center hover:opacity-80 transition';

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <button
        aria-label="Slovenčina"
        title="Slovenčina"
        className={`${btn} ${lang === 'sk' ? 'opacity-100' : 'opacity-70'}`}
        onClick={() => setLang('sk')}
      >
        <span style={{ fontSize: 25, lineHeight: 1 }}>🇸🇰</span>
      </button>
      <button
        aria-label="English"
        title="English"
        className={`${btn} ${lang === 'en' ? 'opacity-100' : 'opacity-70'}`}
        onClick={() => setLang('en')}
      >
        <span style={{ fontSize: 25, lineHeight: 1 }}>🇬🇧</span>
      </button>
    </div>
  );
};