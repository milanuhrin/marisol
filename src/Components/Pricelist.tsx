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
      viewport={{ once: false, amount: 0.5 }}
      variants={sectionVariants} // Apply motion variants
    >
      {/* Title */}
      <motion.div className="py-8" variants={sectionVariants}>
        <TitleText>Cenník</TitleText>
      </motion.div>

      {/* Text */}
      <motion.div
        className="text-center text-base font-medium leading-6 text-gray-500 px-48"
        variants={sectionVariants}
      >
        Pricelist placeholder
      </motion.div>
    </motion.section>
  );
};

export default Pricelist;