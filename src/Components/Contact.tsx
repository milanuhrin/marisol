import React from 'react';
import { motion } from 'framer-motion';
import { TitleText } from './TitleText'; // Import TitleText
import { SectionDividerWaveOneSide } from 'svg/SectionDividerWaveOneSide';
import { sectionVariants } from 'Utilities/motionVariants'; // Import motion variants

const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

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
        className="w-full bg-white p-6 rounded-lg shadow-md max-w-screen-lg mx-auto"
        variants={sectionVariants}
      >
        <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
          Poloha apartmánu
        </h3>
        <div className="w-full rounded-lg overflow-hidden" style={{ height: '400px' }}>
          <iframe
            title="Map to Torre del Moro"
            src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=38.0018041,-0.6521787&maptype=satellite`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </motion.div>
      </motion.section>
    </section>
  );
};

export default Contact;