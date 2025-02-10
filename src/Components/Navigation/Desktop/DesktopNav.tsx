import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import React from 'react'
import { menuItems } from 'Utilities/Data'
import { container, desktopMenuItems } from 'Utilities/motionVariants'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClipboard, faAddressCard, faPhone } from '@fortawesome/free-solid-svg-icons'

interface Props {}

export const DesktopNav = (props: Props) => {
   return (
      <>
         <motion.ul
            initial={'hidden'}
            animate={'show'}
            variants={container}
            className='padding-X-2-18rem whitespace-nowrap w-full sm:justify-end z-20 hidden items-center sm:flex sm:space-x-8'
         >
            {/* ✅ Navigation Menu Items (LEFT SIDE) */}
            {menuItems.map((item, i) => (
               <motion.li
                  className="text-silver hover:font-bold hover:text-cyan-500 hover:text-lg cursor-pointer transition duration-300"
                  variants={desktopMenuItems}
                  key={i}
                  onClick={item.action || undefined}
               >
                  {item.icon && <FontAwesomeIcon icon={item.icon} className="mr-2" />}

                  {item.link && item.link.startsWith("/") ? (
                     <Link to={item.link} aria-label={item.name}>
                        {item.name}
                     </Link>
                  ) : item.link ? (
                     <a href={item.link} aria-label={item.name}>
                        {item.name}
                     </a>
                  ) : (
                     <span aria-label={item.name}>{item.name}</span>
                  )}
               </motion.li>
            ))}

            {/* ✅ Clickable Logo on the RIGHT SIDE Redirects to Login Page */}
            <motion.li className='ml-auto' variants={desktopMenuItems}>
               <Link aria-label='Login Page' to='/login'>
                  <img
                     src="https://dznnrbng6qb50.cloudfront.net/images/landing/marisol_favicon_white.png"
                     alt="Marisol Logo"
                     className="h-10 w-auto" // Adjust size as needed
                  />
               </Link>
            </motion.li>
         </motion.ul>
      </>
   )
}