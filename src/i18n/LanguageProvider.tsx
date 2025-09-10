import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type Lang = 'sk' | 'en';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
};

const I18nCtx = createContext<Ctx | null>(null);

export const LanguageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('sk');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && window.localStorage.getItem('lang')) as Lang | null;
    if (saved === 'sk' || saved === 'en') setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem('lang', lang);
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang }), [lang]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
};

export const useI18n = () => {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
};