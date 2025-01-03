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
            <thead className="bg-blue-300 text-white">
              <tr>
                <th className="py-4 px-4 text-sm sm:text-base">Obdobie</th>
                <th className="py-4 px-4 text-sm sm:text-base">Cena za noc</th>
                <th className="py-4 px-4 text-sm sm:text-base">10+ nocí</th>
                <th className="py-4 px-4 text-sm sm:text-base">30+ nocí</th>
                <th className="py-4 px-4 text-sm sm:text-base">Odvoz</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">Január – Apríl</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">200 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">180 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">150 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">100 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">Máj</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">250 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">230 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">220 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">100 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">Jún</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">250 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">230 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">220 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">100 €</td>
              </tr>
              <tr className="border-b">
                <td className="py-4 px-4 text-sm sm:text-base">Júl – September</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">300 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">280 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">260 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">100 €</td>
              </tr>
              <tr>
                <td className="py-4 px-4 text-sm sm:text-base">Október – December</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">200 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">180 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">150 €</td>
                <td className="py-4 px-4 text-sm sm:text-base whitespace-nowrap">100 €</td>
              </tr>
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Pricelist;