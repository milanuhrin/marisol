import React from 'react';
import { TitleText } from './export';
import { motion } from 'framer-motion';
import { sectionVariants } from 'Utilities/motionVariants'; // Import motion variants

const Pricelist = () => {
  return (
    <motion.section
      id="pricelist"
      className="text-center py-8"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.01 }}
      variants={sectionVariants}
    >
      {/* Title */}
      <motion.div variants={sectionVariants}>
        <TitleText>Cenník na rok 2025</TitleText>
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
                <th className="py-4 px-4 text-sm sm:text-base">Obdobie</th>
                <th className="py-4 px-4 text-sm sm:text-base">1 noc*</th>
                <th className="py-4 px-4 text-sm sm:text-base">12+ nocí</th>
                <th className="py-4 px-4 text-sm sm:text-base">30+ nocí</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Január – Apríl</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">35 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Máj</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Jún</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">95 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Júl – August</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">125 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">115 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">September</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">95 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Október</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">November – December</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">35 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Notes (Directly Below First Table) */}
      <motion.div
        className="max-w-lg lg:max-w-[700px] mx-auto text-gray-600 mt-4 px-4 sm:px-6 text-sm sm:text-base"
        variants={sectionVariants}
      >
        <p className="mb-1 text-left">* Apartmán je možné rezervovať minimálne na 3 noci.</p>
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
                <th className="py-4 px-4 text-sm sm:text-base text-left">Zabezpečíme vám transfer z letiska Alicante do apartmánu a naspäť</th>
                <th className="py-4 px-4 text-sm sm:text-base">Cena</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold text-left">Cena za jeden smer (celé auto - max. 4 osoby)</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
              </tr>
              {/* <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold text-left">Z apartmánu na letisko Alicante</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Pricelist;