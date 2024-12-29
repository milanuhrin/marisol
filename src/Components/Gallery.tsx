import React, { useState, useEffect, useRef } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { TitleText } from './export'; 
const images = [
  '/images/gallery/01_4559.jpg',
  '/images/gallery/02_4382.jpg',
  '/images/gallery/03_4555.jpg',
  '/images/gallery/04_2639.jpg',
  '/images/gallery/05_2643.jpg',
  '/images/gallery/06_4553.jpg',
  '/images/gallery/07_4552.jpg',
  '/images/gallery/08_4640.jpg',
  '/images/gallery/09_4645.jpg',
  '/images/gallery/10_4681.jpg',
  '/images/gallery/11_4634.jpg',
  '/images/gallery/12_4636.jpg',
  '/images/gallery/13_4522.jpg',
  '/images/gallery/14_4665.jpg',
  '/images/gallery/15_4594.jpg',
  '/images/gallery/16_4599.jpg',
  '/images/gallery/17_4612.jpg',
  '/images/gallery/18_4572.jpg',
  '/images/gallery/19_4579.jpg',
  '/images/gallery/20_2588.jpg',
  '/images/gallery/21_4456.jpg',
  '/images/gallery/23_2511.jpg',
  '/images/gallery/24_2516.jpg',
  '/images/gallery/25_2530.jpg',
  '/images/gallery/26_2548.jpg',
  '/images/gallery/27_2541.jpg',
  '/images/gallery/28_4481.jpg',
  '/images/gallery/29_4537.jpg',
  '/images/gallery/31_4442.jpg',
  '/images/gallery/32_4449.jpg',
  '/images/gallery/33_4734.jpg',
  '/images/gallery/34_4579.jpg',
  '/images/gallery/35_4696.jpg',
  '/images/gallery/36_7997.jpg',
  '/images/gallery/37_2598.jpg',
  '/images/gallery/38_2612.jpg',
  '/images/gallery/39_2619.jpg',
  '/images/gallery/40_2629.jpg',
  '/images/gallery/41_2636.jpg',
  '/images/gallery/42_4392.jpg',
  '/images/gallery/43_4404.jpg',
];

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [containerWidth, setContainerWidth] = useState('auto'); // Dynamic width for the container
  const imgRef = useRef<HTMLImageElement>(null);

  // Automatically change images every 3 seconds (only when fullscreen is not active)
  useEffect(() => {
    if (!isOpen) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isOpen]);

  // Adjust container width dynamically based on the image's aspect ratio
  useEffect(() => {
    const adjustContainerWidth = () => {
      if (imgRef.current) {
        const img = imgRef.current;
        const aspectRatio = img.naturalWidth / img.naturalHeight;
        setContainerWidth(`${600 * aspectRatio}px`); // Height is fixed at 600px
      }
    };
    adjustContainerWidth();
  }, [currentIndex]);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => setIsOpen(false);

  const moveToNext = () => setCurrentIndex((currentIndex + 1) % images.length);

  const moveToPrev = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <div id="gallery" className="text-center py-8">
      <div className="py-8">
        <TitleText>Galéria</TitleText>
      </div>

      <div className={`text-center text-base font-medium leading-6 text-gray-500`}>
        <div
          className="gallery-container"
          style={{
            width: containerWidth,
            height: '600px', // Fixed height
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`gallery-item ${
                index === currentIndex ? 'active' : ''
              }`}
              onClick={() => openLightbox(index)}
            >
              <img
                src={image}
                alt=""
                className="gallery-image"
                ref={index === currentIndex ? imgRef : null} // Reference the current image
              />
              <div className="gallery-overlay">
                <span className="fullscreen-icon">🔍 Zvačšiť</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full-screen Lightbox */}
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
    </div>
  );
};

export default Gallery;