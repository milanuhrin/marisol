import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import React from 'react'
import { menuItems } from 'Utilities/Data'
import { container, desktopMenuItems } from 'Utilities/motionVariants'

interface Props {}

export const DesktopNav = (props: Props) => {
   return (
      <>
         <motion.ul
            initial={'hidden'}
            animate={'show'}
            variants={container}
            className='padding-X-2-18rem whitespace-nowrap w-full sm:justify-end z-20 hidden items-center sm:flex sm:space-x-8'>
            <motion.li
               className='text-silver mr-auto w-[7rem]'
               variants={desktopMenuItems}>
               <Link aria-label='logo' to='/'>
                  <StaticImage
                     src='../../../images/logo-darkGrey.png'
                     alt='logo'
                     placeholder='none'
                  />
               </Link>
            </motion.li>

            {menuItems.map((item, i) => (
               <motion.li
                  className='text-silver'
                  variants={desktopMenuItems}
                  key={i}>
                  <Link to={item.link} aria-label={item.name}>
                     {item.name}
                  </Link>
               </motion.li>
            ))}
         </motion.ul>
      </>
   )
}
