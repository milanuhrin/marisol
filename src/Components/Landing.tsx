import { SectionDivider } from 'Components/export';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { Navigation } from './Navigation/Navigation';

interface Props {
  containerStyles?: string;
}

export const Landing = (props: Props) => {
  const { containerStyles } = props;

  // Store images in S3 (CloudFront URLs)
  const images = [
    "https://dznnrbng6qb50.cloudfront.net/images/landing/landing_01.webp",
    "https://dznnrbng6qb50.cloudfront.net/images/landing/landing_02.webp",
    "https://dznnrbng6qb50.cloudfront.net/images/landing/landing_03.webp",
    "https://dznnrbng6qb50.cloudfront.net/images/landing/landing_04.webp",
    "https://dznnrbng6qb50.cloudfront.net/images/landing/landing_05.webp"
  ];

  const logo = "https://dznnrbng6qb50.cloudfront.net/images/landing/logo.png";

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Prefetch the next image
  useEffect(() => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    const nextImage = new Image();
    nextImage.src = images[nextIndex];

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Rotate images every 5 seconds

    return () => clearInterval(interval);
  }, [currentImageIndex, images.length]);

  return (
    <>
      <Navigation />
      <motion.section
        className={`${containerStyles} relative z-10 mx-auto aspect-[4/5] w-full max-w-screen-lg sm:aspect-[3/2]`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 5, ease: 'linear' },
        }}
        id='home'
      >
        {/* Image container */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: currentImageIndex === index ? 1 : 0,
                scale: currentImageIndex === index ? 1.15 : 1, // Zoom effect
              }}
              transition={{
                opacity: { duration: 2 },
                scale: { duration: 7, ease: 'linear' },
              }}
              className="absolute inset-0 w-full h-full flex justify-center items-center"
            >
              {/* Lazy Load Image */}
              <img
                src={image}
                alt={`Landing background ${index + 1}`}
                className="w-full h-full object-cover"
                loading={currentImageIndex === index ? "eager" : "lazy"}
              />
            </motion.div>
          ))}
        </div>

        {/* Logo */}
        {logo && (
          <div className="absolute right-[6%] top-1/2 z-50 -translate-y-1/2">
            <img
              src={logo}
              alt="Logo"
              className="h-auto w-44 sm:w-56 lg:w-64"
              loading="lazy"
            />
          </div>
        )}

        {/* Divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-30 h-[30px] w-full">
          <SectionDivider fill="white" />
        </div>
      </motion.section>
    </>
  );
};
