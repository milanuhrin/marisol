import { Text as MotionText } from 'Components/TextImg/Text'
import { motion } from 'framer-motion'
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'
import * as React from 'react'

interface Props {
   // Native
   containerStyles?: string
   reversed?: boolean
   loading?: 'lazy' | 'eager'
   id?: string
   sectionDivider?: React.ReactElement
   // Text Comp
   headerText?: string | React.ReactElement
   headerStyle?: string
   paragraphText?: string | React.ReactElement
   paragraphStyle?: string
   textWrapperStyle?: string
   // Image Comp
   img?: IGatsbyImageData | string
   alt?: string
   imgStyle?: string
   imgStyleGatsbyImgTag?: string
}

export const TextImg = (props: Props) => {
   const {
      containerStyles,
      headerText,
      headerStyle,
      paragraphText,
      paragraphStyle,
      textWrapperStyle,
      img,
      alt,
      reversed,
      imgStyleGatsbyImgTag,
      imgStyle,
      loading = 'lazy',
      id,
      sectionDivider,
   } = props
   const Text = motion(MotionText)

   let width = 0
   if (typeof window !== 'undefined') {
      const { innerWidth } = window
      width = innerWidth
   }
   let dynamicStyle
   if (width) {
      dynamicStyle =
         width > 640 && reversed
            ? { gridColumn: '1', gridRow: '1', justifySelf: 'start' }
            : {}
   }
   //  const { scrollY } = useViewportScroll()
   //  const y = useTransform(scrollY, [0, 1], [0, -0.1], {
   //     clamp: false,
   //  })

   return (
      <motion.section
         id={id}
         style={{ transform: 'rotateY:180deg' }}
         className={`${containerStyles} z-20 padding-X-2-18rem gap-3o5-6rem grid w-full justify-center relative sm:grid-cols-2 sm:grid-rows-1 sm:flex-row sm:items-center sm:justify-center  `}>
         {/* Firtst element Text */}

         <Text
            initial='hidden'
            animate='visible'
            paragraphText={paragraphText}
            paragraphStyle={paragraphStyle}
            headerText={headerText}
            headerStyle={headerStyle}
            textWrapperStyle={textWrapperStyle}
         />

         {/* Second element Img */}
         {img &&
            alt &&
            (typeof img === 'string' ? (
               <img
                  className={`${imgStyle}  flex max-w-[30rem] justify-self-center sm:justify-self-end object-cover object-center`}
                  style={{ ...dynamicStyle }}
                  src={img}
               />
            ) : (
               dynamicStyle && (
                  <div
                     style={{ ...dynamicStyle }}
                     className={`${imgStyle} flex max-w-[30rem] justify-self-center sm:justify-self-end  object-cover object-center rounded-2xl  shadow-2xl `}>
                     <GatsbyImage
                        imgStyle={{}}
                        className={`${imgStyle} flex max-w-[30rem]  justify-self-end rounded-2xl  object-cover object-center shadow-2xl `}
                        imgClassName={`${imgStyleGatsbyImgTag} shadow-2xl rounded-2xl `}
                        image={img}
                        alt={alt}
                        loading={loading}
                     />
                  </div>
               )
            ))}
         {sectionDivider}
      </motion.section>
   )
}
