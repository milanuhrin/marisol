import React from 'react'
import '../../global.css'
import { motion } from 'framer-motion'

export const SectionDividerWaveOneSide = ({ fill = 'white' }: { fill?: string }) => {
   return (
      <motion.div className="wave-divider-top-down z-0">
         <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 100" // Reduced height for mobile
            preserveAspectRatio="none"
            className="section-divider-svg"
         >
            <path
               d="M321.39,40.44c58-8,114.16-20.13,172-30.86C575.78,0,661.58,0.99,743.84,18.33C823.78,34,906.67,58,985.66,72.83c70.05,14.48,146.53,18.09,214.34,3V0H0V20.35A600.21,600.21,0,0,0,321.39,40.44Z"
               className="shape-fill"
               fill={fill}
            />
         </svg>
      </motion.div>
   )
}