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

export const sectionVariants = {
   offscreen: { opacity: 0, y: 100 },
   onscreen: {
     opacity: 1,
     y: 0,
     transition: { type: 'spring', bounce: 0.5, duration: 1 },
   },
   exit: {
     y: 0, // Prevent vertical bouncing during exit
     transition: { type: 'tween', duration: 0.2 }, // Smooth fade out
   },
 };

export const footerVariants = {
   hidden: { opacity: 0, y: 100 },
   visible: { opacity: 1, y: 0, transition: { type: 'spring', bounce: 0.4, duration: 1 } },
};