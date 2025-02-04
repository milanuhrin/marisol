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