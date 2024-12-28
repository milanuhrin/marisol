import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

const images = [
  '/images/gallery/01_4559.jpg',
  '/images/gallery/02_4382.jpg',
  '/images/gallery/03_4555.jpg',
];

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Automatically change images every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
        <h2 className="text-2xl font-bold">Galéria</h2>
      </div>

      <div className="gallery-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`gallery-item ${
              index === currentIndex ? 'active' : ''
            }`}
            onClick={() => openLightbox(index)}
          >
            <img src={image} alt="" className="gallery-image" />
            <div className="gallery-overlay">
              <span className="fullscreen-icon">🔍 Fullscreen</span>
            </div>
          </div>
        ))}
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