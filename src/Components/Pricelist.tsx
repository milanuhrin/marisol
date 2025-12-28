import React from 'react';
import { TitleText } from './export';
import { motion } from 'framer-motion';
import { sectionVariants } from 'Utilities/motionVariants';
import { useI18n } from 'i18n/LanguageProvider';

const Pricelist = () => {
  const { t } = useI18n();

  return (
    <motion.section
      id="pricelist"
      className="text-center py-8 scroll-mt-8"
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
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">{t('pricelist.jan_apr')}</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">70 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">60 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">35 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">{t('pricelist.may')}</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">55 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">{t('pricelist.jun')}</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">105 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">95 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">{t('pricelist.jul_aug')}</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">145 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">135 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">{t('pricelist.sep')}</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">105 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">95 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">{t('pricelist.oct')}</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">{t('pricelist.nov_dec')}</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">70 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">60 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">35 €</td>
              </tr>
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