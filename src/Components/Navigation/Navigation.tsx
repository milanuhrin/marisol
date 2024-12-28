import { DesktopNav } from 'Components/Navigation/Desktop/DesktopNav';
import { motion, useTransform, useViewportScroll } from 'framer-motion';
import React, { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { appear } from 'Utilities/motionVariants';
import { MobileNav } from './Mobile/MobileNav';

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const ref = useRef(null);
  const handleClickOutside = () => isMenuOpen && setIsMenuOpen(false);
  useOnClickOutside(ref, handleClickOutside);
  const { scrollYProgress } = useViewportScroll();
  const backgroundColorTransition = useTransform(
    scrollYProgress,
    [0, 0.25],
    ['#1f1f1f', '#1f1f1fdd']
  );
  const paddingTransition = useTransform(
    scrollYProgress,
    [0, 0.25],
    ['4rem', '3.5rem']
  );
  return (
    <>
      {/* Height fix due to fixed navigation */}
      <motion.div
        className=" w-full"
        style={{
          height: paddingTransition,
        }}
      >
        {/* Fixed nav */}
        <motion.div
          ref={ref}
          style={{
            backgroundColor: backgroundColorTransition,
            height: paddingTransition,
          }}
          className={` fixed top-0 z-30 flex h-[4rem] w-full items-center sm:justify-end sm:py-[1rem] lg:space-x-16`}
          initial={['initialColor']}
          animate={['finalColor']}
          variants={appear('backOut')}
        >
          <DesktopNav />
          <MobileNav isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </motion.div>
      </motion.div>
    </>
  );
};
