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
        <div className="relative py-8 sm:py-4 sm:mt-[-20px] sm:relative sm:-top-4">
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
              title="Map to New Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d555.7636266851779!2d-0.6522457776675346!3d38.0018758763158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2ssk!4v1739004632262!5m2!1sen!2ssk"
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