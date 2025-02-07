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

      {/* Table */}
      <motion.div
        className="overflow-x-auto sm:overflow-x-hidden px-4 sm:px-6 lg:px-8 mt-8"
        variants={sectionVariants}
      >
        <div className="max-w-lg mx-auto lg:max-w-[700px] border border-gray-300 rounded-lg shadow-lg overflow-hidden">
          <table className="w-full border-collapse text-gray-500">
            <thead className="bg-cyan-500 text-white">
              <tr>
                <th className="py-4 px-6 text-sm sm:text-base">Obdobie</th>
                <th className="py-4 px-6 text-sm sm:text-base">
                  1 noc*
                </th>
                <th className="py-4 px-6 text-sm sm:text-base">10+ nocí</th>
                <th className="py-4 px-6 text-sm sm:text-base">30+ nocí</th>
                <th className="py-4 px-6 text-sm sm:text-base">
                  Odvoz**
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">Január – Apríl</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">35 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">Máj</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">Jún</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">95 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">Júl – August</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">125 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">115 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">September</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">95 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">Október</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">85 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">- €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm sm:text-base">November – December</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">75 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">35 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">65 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Notes Below the Table */}
      <motion.div
        className="text-gray-600 mt-4 px-6 text-sm sm:text-base"
        variants={sectionVariants}
      >
        <p className="mb-1">* Minimálny počet nocí: 3</p>
        <p>** Cena za jednu cestu z letiska Alicante do apartmánu alebo naspäť.</p>
      </motion.div>
    </motion.section>
  );
};

export default Pricelist;