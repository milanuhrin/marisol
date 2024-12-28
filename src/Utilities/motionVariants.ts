export const container = {
   hidden: {},
   show: {
      transition: {
         delayChildren: 0.3,
         staggerChildren: 0.1,
      },
   },
}

export const desktopMenuItems = {
   hidden: { y: -70 },
   show: { y: 0 },
}

export const sidebarVariants = {
   open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 254px 35px)`,
      transition: {
         type: 'spring',
         stiffness: 20,
         restDelta: 2,
      },
   }),
   closed: {
      clipPath: 'circle(0px at 254px 0px)',
      transition: {
         delay: 0.3,
         type: 'spring',
         stiffness: 400,
         damping: 40,
      },
   },
}
export const mobileMenuListItem = {
   open: {
      x: 0,
   },
   closed: {
      x: 270,
   },
}

export const mobileMenuItems = {
   open: {
      transition: { staggerChildren: 0.07, delayChildren: 0.2 },
   },
   closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
   },
}

export const cardVariants = {
   offscreen: {
      y: 400,
      opacity: 0,
   },
   onscreen: {
      opacity: 1,
      y: 0,
      transition: {
         ease: 'easeOut',
         duration: 0.4,
      },
   },
}

export const appear = (ease = 'easeOut', delay = 0, duration = 0.3) => ({
   initialColor: {
      backgroundColor: '#5e84b1',
   },
   finalColor: {
      backgroundColor: '#1f1f1f',
      transition: {
         duration: 1,
      },
   },
   hidden: {
      scale: 0,
   },
   visible: {
      scale: 1,
      transition: {
         ease: ease,
         delay: delay,
         duration: duration,
      },
   },
})
