import React from "react";
import { motion } from "framer-motion";

export const Footer = () => {
  return (
    <motion.footer
      id="contact"
      className="relative flex flex-col items-center justify-center py-10 bg-[#e6f6ff] "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Contact Info */}
      <motion.div className="w-full text-center">
        <div className="flex flex-col items-center space-y-6 text-lg text-gray-700">
          {/* Facebook Link */}
          <motion.a
            href="https://www.facebook.com/profile.php?id=61572969472888"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
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
            <span className="text-blue-600 font-semibold">Sledujte nás na Facebooku</span>
          </motion.a>

          {/* Instagram Link */}
          <motion.a
            href="https://www.instagram.com/marisol_seaview_apartment/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2"
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
            <span className="text-pink-600 font-semibold">Sledujte nás na Instagrame</span>
          </motion.a>

          {/* Email Address */}
          <motion.div className="flex items-center space-x-2" whileHover={{ scale: 1.1 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="text-gray-700"
            >
              <path d="M22 6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6zM4 6h16v2.5l-8 5-8-5V6zm0 4l7.35 4.59a1 1 0 001.3 0L20 10v8H4v-8z"></path>
            </svg>
            <span>marisol.seaview@gmail.com</span>
          </motion.div>

          {/* Address */}
          <motion.div className="flex items-center space-x-2 text-sm" whileHover={{ scale: 1.1 }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="text-gray-700"
            >
              <path d="M12 3l9 8-1.5 1.5L12 5.25 4.5 12.5 3 11l9-8zm0 4.5l6 5V21h-4v-5H10v5H6v-8.5l6-5z"></path>
            </svg>
            <span>Urbanizacion Torre Del Moro, Torrevieja, Alicante</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.footer>
  );
};