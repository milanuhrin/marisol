import React, { useState, useEffect, useRef } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { motion } from 'framer-motion';
import { TitleText } from './export';
import { SectionDividerWaveOneSide } from 'svg/SectionDividerWaveOneSide';
import { sectionVariants } from 'Utilities/motionVariants'; // Import motion variants

const images = Array.from({ length: 43 }, (_, i) =>
  require(`../images/gallery/${String(i + 1).padStart(2, '0')}_${[
    '4559',
    '4382',
    '4555',
    '2639',
    '2643',
    '4553',
    '4552',
    '4640',
    '4645',
    '4681',
    '4634',
    '4636',
    '4522',
    '4665',
    '4594',
    '4599',
    '4612',
    '4572',
    '4579',
    '2588',
    '4456',
    '4447',
    '2511',
    '2516',
    '2530',
    '2548',
    '2541',
    '4481',
    '4537',
    '4547',
    '4442',
    '4449',
    '4734',
    '4579',
    '4696',
    '7997',
    '2598',
    '2612',
    '2619',
    '2629',
    '2636',
    '4392',
    '4404',
  ][i]}.jpg`).default
);

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [containerStyle, setContainerStyle] = useState({ width: 'auto', height: '600px' });
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [isOpen]);

  const updateContainerSize = () => {
    if (imgRef.current) {
      const img = imgRef.current;
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      if (window.innerWidth <= 768) {
        // For small screens
        setContainerStyle({ width: '400px', height: `${400 / aspectRatio}px` });
      } else {
        // For larger screens
        setContainerStyle({ width: `${600 * aspectRatio}px`, height: '600px' });
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      updateContainerSize();
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call once to set initial size

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    updateContainerSize();
  }, [currentIndex]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const moveToNext = () => setCurrentIndex((currentIndex + 1) % images.length);
  const moveToPrev = () => setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div id="gallery" className="relative">
      <div className="absolute w-full top-0">
        <SectionDividerWaveOneSide fill="#f0f0f0" />
      </div>
      <motion.section
        className="relative text-center py-8"
        initial="offscreen"
        whileInView="onscreen"
        exit="exit"
        viewport={{ once: true, amount: 0.01 }}
        variants={sectionVariants}
      >
        {/* Title */}
        <motion.div className="py-8">
          <TitleText>Galéria</TitleText>
        </motion.div>

        {/* Gallery Container */}
        <motion.div
          className="gallery-container relative"
          style={{ ...containerStyle }}
          initial="offscreen"
          animate="onscreen"
          variants={sectionVariants}
        >
          {images.map((image, index) => (
            <motion.div
              key={index}
              className={`gallery-item ${index === currentIndex ? 'active' : ''}`}
              onClick={() => openLightbox(index)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={image}
                alt=""
                className="gallery-image"
                ref={index === currentIndex ? imgRef : null}
                onLoad={updateContainerSize}
              />
              {/* Overlay with magnifier and text */}
              {index === currentIndex && (
                <motion.div
                  className="gallery-overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                  whileHover={{ opacity: 1 }}
                  onClick={() => openLightbox(index)}
                >
                  <div className="text-white flex items-center gap-2">
                    <i className="fa fa-search-plus text-xl" aria-hidden="true"></i>
                    <span className="text-2xl font-bold">Zväčšiť</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        {isOpen && (
          <Lightbox
            mainSrc={images[currentIndex]}
            nextSrc={images[(currentIndex + 1) % images.length]}
            prevSrc={images[(currentIndex - 1 + images.length) % images.length]}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={moveToPrev}
            onMoveNextRequest={moveToNext}
          />
        )}
      </motion.section>
    </div>
  );
};

export default Gallery;