import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from 'i18n/LanguageProvider';
import { sectionVariants } from 'Utilities/motionVariants';

const RenviaMark = () => (
  <svg
    viewBox="0 0 512 512"
    role="img"
    aria-label="Renvia"
    className="h-full w-full"
  >
    <rect
      x="6"
      y="6"
      width="500"
      height="500"
      rx="98"
      fill="#0e1627"
      stroke="#46639e"
      strokeWidth="6"
    />
    <path
      fill="#c8d6ff"
      d="M85 85H302C379 85 427 123 427 187C427 241 397 276 340 286L427 427H337L239 291H175V427H85V212H299C322 212 336 204 336 191C336 177 322 168 299 168H85V85Z"
    />
  </svg>
);

const RenviaPromo = () => {
  const { t } = useI18n();
  const renviaUrl =
    'https://renvia.app/?utm_source=marisol.sk&utm_medium=referral&utm_campaign=marisol_promo';

  return (
    <section
      aria-label={t('renviaPromo.title')}
      className="w-full bg-[#e6f6ff] px-4 pb-6 pt-2 lg:pb-8"
    >
      <motion.div
        className="relative mx-auto w-full max-w-screen-lg overflow-hidden rounded-xl border border-[#303a51] bg-[#111622] px-4 py-2.5 text-left shadow-[0_8px_24px_rgba(14,22,39,0.14)] lg:rounded-2xl lg:px-6 lg:py-4"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        variants={sectionVariants}
      >
        <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#7f9fff] to-transparent opacity-50" />

        <div className="relative z-10 lg:hidden">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 shrink-0 rounded-lg shadow-[0_0_14px_rgba(127,159,255,0.14)]">
              <RenviaMark />
            </div>

            <div className="min-w-0">
              <p className="text-[0.66rem] font-bold uppercase leading-3 tracking-[0.16em] text-[#c8d6ff]">
                Renvia
              </p>
              <p className="truncate text-[0.58rem] leading-3 text-[#8f9bb3]">
                Rental Performance Intelligence
              </p>
            </div>

            <a
              href={renviaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto inline-flex min-h-[30px] shrink-0 items-center gap-1 rounded-md px-1.5 text-[0.68rem] font-semibold text-[#a9bdff] transition hover:bg-[#202a43] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7f9fff] focus:ring-offset-2 focus:ring-offset-[#111622]"
              aria-label={t('renviaPromo.cta')}
            >
              {t('renviaPromo.ctaShort')}
              <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="mt-3 border-t border-[#2c3448] pt-3 text-center">
            <h2 className="text-[0.8rem] font-semibold leading-[1.15rem] text-[#c8d6ff]">
              {t('renviaPromo.title')}
            </h2>
            <p className="mt-1 text-[0.68rem] leading-4 text-[#98a4bb]">
              {t('renviaPromo.description')}
            </p>
          </div>
        </div>

        <div className="relative z-10 hidden items-center gap-4 lg:grid lg:grid-cols-[auto_minmax(0,1fr)_auto]">
          <div className="flex shrink-0 items-center gap-2.5">
            <div className="h-10 w-10 rounded-lg shadow-[0_0_14px_rgba(127,159,255,0.14)]">
              <RenviaMark />
            </div>
            <div>
              <p className="text-[0.68rem] font-bold uppercase leading-3 tracking-[0.16em] text-[#c8d6ff]">
                Renvia
              </p>
              <p className="whitespace-nowrap text-[0.6rem] leading-3 text-[#8f9bb3]">
                Rental Performance Intelligence
              </p>
            </div>
          </div>

          <div className="min-w-0 text-center">
            <h2 className="text-base font-semibold leading-5 text-[#c8d6ff] lg:whitespace-nowrap">
              {t('renviaPromo.title')}
            </h2>
            <p className="mt-1 text-sm leading-5 text-[#98a4bb] lg:whitespace-nowrap">
              {t('renviaPromo.description')}
            </p>
          </div>

          <a
            href={renviaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[40px] items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#a9bdff] transition hover:bg-[#202a43] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#7f9fff] focus:ring-offset-2 focus:ring-offset-[#111622]"
            aria-label={t('renviaPromo.cta')}
          >
            {t('renviaPromo.cta')}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default RenviaPromo;
