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
        className={`${containerStyles} relative z-10 w-full h-screen`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { duration: 1 },
          scale: { duration: 5, ease: 'linear' },
        }}
        id='home'
      >
        {/* Image container */}
        <div className="absolute inset-0 w-full h-[90vh] z-0 overflow-hidden">
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
          <div className="absolute transform -translate-y-1/2 z-50" style={{ top: '50%', right: '8%' }}>
            <img
              src={logo}
              alt="Logo"
              className="w-60 md:w-96 lg:w-144"
              loading="lazy"
            />
          </div>
        )}

        {/* Divider */}
        <div className="absolute bottom-[10%] left-0 w-full h-[30px] z-30 pointer-events-none">
          <SectionDivider fill="white" />
        </div>
      </motion.section>
    </>
  );
};