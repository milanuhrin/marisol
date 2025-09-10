import React from 'react';
import { useI18n } from '../i18n/LanguageProvider';

export const LanguageSwitcher: React.FC<{ className?: string }> = ({ className }) => {
  const { lang, setLang } = useI18n();
  const btn = 'inline-flex items-center justify-center rounded-full border px-2 py-1 text-sm leading-none hover:opacity-80 transition';

  return (
    <div className={`flex items-center gap-2 ${className ?? ''}`}>
      <button
        aria-label="Slovenčina"
        title="Slovenčina"
        className={`${btn} ${lang === 'sk' ? 'opacity-100' : 'opacity-60'}`}
        onClick={() => setLang('sk')}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>🇸🇰</span>
      </button>
      <button
        aria-label="English"
        title="English"
        className={`${btn} ${lang === 'en' ? 'opacity-100' : 'opacity-60'}`}
        onClick={() => setLang('en')}
      >
        <span style={{ fontSize: 18, lineHeight: 1 }}>🇬🇧</span>
      </button>
    </div>
  );
};