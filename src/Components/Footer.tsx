import React from "react";
import { motion } from "framer-motion";
import { useI18n } from 'i18n/LanguageProvider';

export const Footer = () => {
  const { t } = useI18n();
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
        
        {/* Address - Clickable with Navigation Choice */}
        <motion.div className="flex flex-col items-center text-sm" whileHover={{ scale: 1.1 }}>
          {/* Address Title */}
          <div className="flex items-center space-x-2">
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
            <span className="text-black text-lg">Urbanizacion Torre Del Moro</span>
          </div>
          </motion.div>
          
          {/* Navigation Options (Google Maps & Waze) in One Row */}
          <motion.div className="flex flex-col items-center text-sm" whileHover={{ scale: 1.1 }}>
          <div className="flex items-center space-x-2 mt-1">
            {/* Navigation Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className="text-blue-600"
            >
              <path d="M12 2C8.1 2 5 5.1 5 9c0 4.4 5 10 7 12 2-2 7-7.6 7-12 0-3.9-3.1-7-7-7zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5S10.6 6.5 12 6.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z"></path>
            </svg>
            
            <span className="text-gray-700 text-lg font-semibold">{t('footer.navigate')}</span>

            {/* Google Maps */}
            <motion.a
              href="https://www.google.com/maps/dir/?api=1&destination=38.00162359953118,-0.6520540005199259"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              Google Maps
            </motion.a>

            {/* Waze */}
            <motion.a
              href="https://waze.com/ul?ll=38.00162359953118,-0.6520540005199259&navigate=yes"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline"
            >
              Waze
            </motion.a>
          </div>
        </motion.div>
      </div>
    </motion.div>
    </motion.footer>
  );
};