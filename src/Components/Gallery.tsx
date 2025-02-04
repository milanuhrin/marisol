import React, { useState, useEffect, useRef } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { motion } from 'framer-motion';
import { TitleText } from './export';
import { SectionDividerWaveOneSide } from 'svg/SectionDividerWaveOneSide';
import { sectionVariants } from 'Utilities/motionVariants'; // Import motion variants

// 🔹 CloudFront URL (Replace with your actual CloudFront domain)
const IMAGE_BASE_URL = "https://dznnrbng6qb50.cloudfront.net/images/gallery"; 

// 🔹 List of image filenames (Converted to WebP)
const imageFileNames = [
  "01_4559.webp", "02_4382.webp", "03_4555.webp", "04_2639.webp",
  "05_2643.webp", "06_4553.webp", "07_4552.webp", "08_4640.webp",
  "09_4645.webp", "10_4681.webp", "11_4634.webp", "12_4636.webp",
  "13_4522.webp", "14_4665.webp", "15_4594.webp", "16_4599.webp",
  "17_4612.webp", "18_4572.webp", "19_4579.webp", "20_2588.webp",
  "21_4456.webp", "22_4447.webp", "23_2511.webp", "24_2516.webp",
  "25_2530.webp", "26_2548.webp", "27_2541.webp", "28_4481.webp",
  "29_4537.webp", "30_4547.webp", "31_4442.webp", "32_4449.webp",
  "33_4734.webp", "34_4579.webp", "35_4696.webp", "36_7997.webp",
  "37_2598.webp", "38_2612.webp", "39_2619.webp", "40_2629.webp",
  "41_2636.webp", "42_4392.webp", "43_4404.webp"
];

// 🔹 Generate full URLs
const images = imageFileNames.map(name => `${IMAGE_BASE_URL}/${name}`);

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
  }, [isOpen]);

  const updateContainerSize = () => {
    if (imgRef.current) {
      const img = imgRef.current;
      const aspectRatio = img.naturalWidth / img.naturalHeight;

      if (window.innerWidth <= 768) {
        setContainerStyle({ width: '400px', height: `${400 / aspectRatio}px` });
      } else {
        setContainerStyle({ width: `${600 * aspectRatio}px`, height: '600px' });
      }
    }
  };

  useEffect(() => {
    window.addEventListener('resize', updateContainerSize);
    updateContainerSize(); // Set initial size

    return () => {
      window.removeEventListener('resize', updateContainerSize);
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
      <div className="transform z-10 max-w-screen-lg mx-auto">
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
                alt={`Gallery Image ${index + 1}`}
                className="gallery-image"
                ref={index === currentIndex ? imgRef : null}
                onLoad={updateContainerSize}
                loading="lazy" // 🔹 Lazy loading for faster performance
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