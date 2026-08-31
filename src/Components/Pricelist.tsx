import React from 'react';
import { TitleText } from './export';
import { motion } from 'framer-motion';
import { sectionVariants } from 'Utilities/motionVariants';
import { useI18n } from 'i18n/LanguageProvider';
import { formatNightlyRate, PRICING_PERIODS } from 'Utilities/pricing';

const Pricelist = () => {
  const { t } = useI18n();

  return (
    <motion.section
      id="pricelist"
      className="scroll-mt-12 text-center py-8"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.01 }}
      variants={sectionVariants}
    >
      {/* Title */}
      <motion.div variants={sectionVariants}>
        <TitleText>{t('pricelist.title')}</TitleText>
      </motion.div>

      {/* First Table (Pricing) */}
      <motion.div
        className="overflow-x-auto sm:overflow-x-hidden px-4 sm:px-6 lg:px-8 mt-8"
        variants={sectionVariants}
      >
        <div className="max-w-lg mx-auto lg:max-w-[700px] border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full border-collapse text-gray-500">
            <thead className="bg-cyan-500 text-white">
              <tr>
                <th className="py-4 px-4 text-sm sm:text-base">{t('pricelist.period')}</th>
                <th className="py-4 px-4 text-sm sm:text-base">{t('pricelist.one_night')}</th>
                <th className="py-4 px-4 text-sm sm:text-base">{t('pricelist.ten_nights')}</th>
                <th className="py-4 px-4 text-sm sm:text-base">{t('pricelist.thirty_nights')}</th>
              </tr>
            </thead>
            <tbody>
              {PRICING_PERIODS.map((period, index) => (
                <tr
                  key={period.translationKey}
                  className={index < PRICING_PERIODS.length - 1 ? 'border-b' : ''}
                >
                  <td className="py-4 px-4 text-sm sm:text-base font-semibold">
                    {t(period.translationKey)}
                  </td>
                  <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">
                    {formatNightlyRate(period.rates.standard)}
                  </td>
                  <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">
                    {formatNightlyRate(period.rates.extended)}
                  </td>
                  <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">
                    {formatNightlyRate(period.rates.monthly)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Notes */}
      <motion.div
        className="max-w-lg lg:max-w-[700px] mx-auto text-gray-600 mt-4 px-4 sm:px-6 text-sm sm:text-base"
        variants={sectionVariants}
      >
        <p className="mb-1 text-left">{t('pricelist.note')}</p>
      </motion.div>

      {/* Space Between Tables */}
      <div className="mt-12"></div>

      {/* Second Table (Transport) */}
      <motion.div
        className="overflow-x-auto sm:overflow-x-hidden px-4 sm:px-6 lg:px-8"
        variants={sectionVariants}
      >
        <div className="max-w-lg mx-auto lg:max-w-[700px] border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full border-collapse text-gray-500">
            <thead className="bg-cyan-500 text-white">
              <tr>
                <th className="py-4 px-4 text-sm sm:text-base text-left">{t('pricelist.transfer_title')}</th>
                <th className="py-4 px-4 text-sm sm:text-base">{t('pricelist.price')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold text-left">{t('pricelist.transfer_desc')}</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">max. 65 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Pricelist;
