import React from "react";
import { motion } from "framer-motion";
import { TitleText } from "./TitleText"; // Import TitleText
import { SectionDividerWaveOneSide } from "svg/SectionDividerWaveOneSide";
import { sectionVariants } from "Utilities/motionVariants"; // Import motion variants

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
        className="text-center py-8 flex flex-col items-center justify-center space-y-6 scroll-mt-12"
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.01 }}
        variants={sectionVariants}
      >
        {/* Title: Napíšte nám */}
        <div className="relative py-8 sm:py-4 sm:mt-[-20px] sm:relative sm:-top-4">
          <TitleText>Kontaktujte nás na:</TitleText>
        </div>

        {/* Phone Number - Clickable */}
        <motion.a
          href="tel:+421902217449"
          className="flex items-center space-x-2 text-gray-700 text-lg font-semibold"
          whileHover={{ scale: 1.1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-gray-600"
          >
            <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.06-.24c1.17.42 2.44.65 3.73.65.55 0 1 .45 1 1v3.56a1 1 0 01-1 1A19.92 19.92 0 012 4a1 1 0 011-1h3.57c.55 0 1 .45 1 1 0 1.29.22 2.56.65 3.73.14.36.05.77-.24 1.06l-2.36 2.36z"></path>
          </svg>
          <span>+421 902 217 449</span>
        </motion.a>


        {/* WhatsApp - Clickable */}
        <motion.a
          href="https://wa.me/421902217449"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-green-600 text-lg font-semibold"
          whileHover={{ scale: 1.1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-green-600"
          >
            <path d="M12 2a10 10 0 00-9 14.7L2 22l5.4-1.4A10 10 0 1012 2zm0 18a8 8 0 01-4-1.1l-.3-.2-3.2.8.9-3.1-.2-.3A8 8 0 1112 20zm3.3-5.7c-.2-.1-1.2-.6-1.4-.7s-.3-.1-.5.1-.5.7-.7.9-.3.2-.5.1a6 6 0 01-2.6-1.6 6 6 0 01-1.6-2.6c-.1-.2 0-.4.1-.5s.6-.7.7-.9.1-.3.1-.5V7.3c0-.2 0-.3-.2-.4s-.5-.6-.7-.8-.4-.2-.5-.2H6.1c-.2 0-.4 0-.6.2-.2.3-.8 1-1 2s.2 2.1.3 2.3a9 9 0 004.5 4.5c.6.3 1.2.5 2 .7a4 4 0 002-.2c.6-.2 1.3-.6 1.4-1s.2-1.2.2-1.3 0-.2-.2-.3z"></path>
          </svg>
          <span>Napíšte nám na WhatsApp</span>
        </motion.a>

        {/* Email Address - Clickable */}
        <motion.a
          href="mailto:marisol.seaview@gmail.com"
          className="flex items-center space-x-2 text-gray-700 text-lg"
          whileHover={{ scale: 1.1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            className="text-gray-600"
          >
            <path d="M22 6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6zM4 6h16v2.5l-8 5-8-5V6zm0 4l7.35 4.59a1 1 0 001.3 0L20 10v8H4v-8z"></path>
          </svg>
          <span>marisol.seaview@gmail.com</span>
        </motion.a>

        {/* Facebook Link */}
        <motion.a
          href="https://www.facebook.com/profile.php?id=61572969472888"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-blue-600 text-lg font-semibold"
          whileHover={{ scale: 1.1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            className="text-blue-600"
          >
            <path d="M22 12a10 10 0 10-11.5 9.95v-7.05H7.9V12h2.6V9.6c0-2.6 1.6-4 3.9-4 1.1 0 2 .1 2.3.1v2.5h-1.6c-1.3 0-1.6.6-1.6 1.5V12h2.7l-.4 2.9h-2.3v7.05A10 10 0 0022 12z"></path>
          </svg>
          <span>Sledujte nás na Facebooku</span>
        </motion.a>

        {/* Instagram Link */}
        <motion.a
          href="https://www.instagram.com/marisol_seaview_apartment/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-pink-600 text-lg font-semibold"
          whileHover={{ scale: 1.1 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            width="30"
            height="30"
            className="text-pink-600"
          >
            <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm10 1a1 1 0 00-1 1 1 1 0 002 0c0-.6-.4-1-1-1zm-5 2a5 5 0 100 10 5 5 0 000-10zm0 2c1.7 0 3 1.3 3 3s-1.3 3-3 3-3-1.3-3-3 1.3-3 3-3z"></path>
          </svg>
          <span>Sledujte nás na Instagrame</span>
        </motion.a>

        {/* Google Map Section */}
        <motion.div
          className="w-full bg-white p-6 rounded-lg shadow-md max-w-screen-lg mx-auto"
          variants={sectionVariants}
        >
          <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
            Poloha apartmánu
          </h3>
          <div className="w-full rounded-lg overflow-hidden" style={{ height: "400px" }}>
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