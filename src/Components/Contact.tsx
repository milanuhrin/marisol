import React from 'react';
import { motion } from 'framer-motion';
import { TitleText } from './TitleText'; // Import TitleText
import { SectionDividerWaveOneSide } from 'svg/SectionDividerWaveOneSide';
import { sectionVariants } from 'Utilities/motionVariants'; // Import motion variants

export const Contact = () => {
  return (
    <section className="relative bg-[#e6f6ff]">
      {/* Section Divider at the top */}
      <div className="absolute w-full top-0 transform rotate-180 z-10">
        <SectionDividerWaveOneSide fill="#e6f6ff" />
      </div>

      {/* Motion Section with animation */}
      <motion.section
        id="contact"
        className="text-center py-8"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.01 }}
        variants={sectionVariants}
      >
        {/* Title with consistent styling */}
        <div className="py-8">
          <TitleText>Kontakt</TitleText>
        </div>

        {/* Google Map Section */}
        <motion.div
          className="w-full max-w-screen-lg bg-white p-6 rounded-lg shadow-md mx-auto"
          variants={sectionVariants}
        >
          <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
            Poloha apartmánu
          </h3>
          <div className="w-full rounded-lg overflow-hidden" style={{ height: '400px' }}>
            <iframe
              title="Map to Torre del Moro"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.4293929417484!2d-0.6542631846295505!3d38.00168707971524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63a9b7a2e08c89%3A0xa6a3d565d4b5406a!2s38%C2%B000%2706.1%22N%200%C2%B039%2707.5%22W!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </motion.section>
    </section>
  );
};

export default Contact;