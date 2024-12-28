import { motion } from 'framer-motion'
import { Link } from 'gatsby'
import * as React from 'react'
import { mobileMenuListItem } from 'Utilities/motionVariants'

interface Props {
   text: string
   link: string
   toggleOpen: () => void
}

export const MenuItem = (props: Props) => {
   const { text, link, toggleOpen } = props

   return (
      <motion.li
         className='my-[1rem] font-bold text-mediumSilver'
         variants={mobileMenuListItem}
         whileTap={{ scale: 0.8 }}>
         <Link
            onClick={() => toggleOpen()}
            className='flex w-[12rem] h-[2rem]'
            to={link}
            aria-label={text}>
            {text}
         </Link>
      </motion.li>
   )
}
