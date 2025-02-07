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

      {/* Table Container (Ensures Full Width + Scroll on Small Screens) */}
      <motion.div
        className="overflow-x-auto px-6 sm:px-8 lg:px-10 mt-8"
        variants={sectionVariants}
      >
        <div className="w-full max-w-[720px] mx-auto border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full border-collapse text-gray-500">
            <thead className="bg-cyan-500 text-white">
              <tr>
                <th className="py-4 px-6 text-sm sm:text-base">Obdobie</th>
                <th className="py-4 px-6 text-sm sm:text-base">1 noc*</th>
                <th className="py-4 px-6 text-sm sm:text-base">10+ nocí</th>
                <th className="py-4 px-6 text-sm sm:text-base">30+ nocí</th>
                <th className="py-4 px-6 pr-6 text-sm sm:text-base whitespace-nowrap">Odvoz**</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Január – Apríl</td>
                <td className="py-4 px-4 text-sm sm:text-base">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">65 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">35 €</td>
                <td className="py-4 px-4 pr-6 text-sm sm:text-base">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Máj</td>
                <td className="py-4 px-4 text-sm sm:text-base">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">- €</td>
                <td className="py-4 px-4 pr-6 text-sm sm:text-base">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Jún</td>
                <td className="py-4 px-4 text-sm sm:text-base">95 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">- €</td>
                <td className="py-4 px-4 pr-6 text-sm sm:text-base">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Júl – August</td>
                <td className="py-4 px-4 text-sm sm:text-base">125 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">115 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">- €</td>
                <td className="py-4 px-4 pr-6 text-sm sm:text-base">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">September</td>
                <td className="py-4 px-4 text-sm sm:text-base">95 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">- €</td>
                <td className="py-4 px-4 pr-6 text-sm sm:text-base">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">Október</td>
                <td className="py-4 px-4 text-sm sm:text-base">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">- €</td>
                <td className="py-4 px-4 pr-6 text-sm sm:text-base">65 €</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm sm:text-base font-semibold">November – December</td>
                <td className="py-4 px-4 text-sm sm:text-base">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">65 €</td>
                <td className="py-4 px-4 text-sm sm:text-base">35 €</td>
                <td className="py-4 px-4 pr-6 text-sm sm:text-base">65 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Notes (Aligned with Table) */}
      <motion.div
        className="w-full max-w-[720px] mx-auto text-gray-600 mt-4 pl-4 sm:pl-6 text-sm sm:text-base leading-relaxed"
        variants={sectionVariants}
      >
        <p className="mb-1 text-left">* Minimálny počet nocí: 3</p>
        <p className="text-left">** Cena za jednu cestu z letiska Alicante do apartmánu alebo naspäť.</p>
      </motion.div>
    </motion.section>
  );
};

export default Pricelist;