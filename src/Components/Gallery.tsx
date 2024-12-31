import React, { useState, useEffect, useRef } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { TitleText } from './export';

// Dynamically import images
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
  const [containerStyle, setContainerStyle] = useState({ width: 'auto', height: '600px' }); // Dynamic width and height
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

  // Update container size in sync with image change
  const updateContainerSize = () => {
    if (imgRef.current) {
      const img = imgRef.current;
      const aspectRatio = img.naturalWidth / img.naturalHeight;
      setContainerStyle({ width: `${600 * aspectRatio}px`, height: '600px' });
    }
  };

  useEffect(() => {
    updateContainerSize();
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

      <div
        className={`text-center text-base font-medium leading-6 text-gray-500`}
      >
        <div
          className="gallery-container"
          style={{
            ...containerStyle,
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
                onLoad={updateContainerSize} // Ensure size updates when the image loads
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