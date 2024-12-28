import { motion } from 'framer-motion'
import React from 'react'
import { cardVariants } from 'Utilities/motionVariants'

export const AnimOnScroll = ({
  children,
  margin = '220px',
  el = 'div',
}: {
  children: React.ReactElement
  margin?: string
  el?: 'div' | 'img'
}) => {
  const components = {
    div: motion.div,
    img: motion.img,
  }
  const AnimOnScroll = components[el]
  return (
    <AnimOnScroll
      className='w-full'
      initial='offscreen'
      whileInView='onscreen'
      viewport={{ margin: `${margin}`, once: true }}
      variants={cardVariants}>
      {children}
    </AnimOnScroll>
  )
}
