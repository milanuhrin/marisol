import React, { useState, useEffect } from 'react';

const images = [
  '/images/gallery/01_4559.jpg',
  '/images/gallery/02_4382.jpg',
  '/images/gallery/03_4555.jpg',
];

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);

  // Automatically switch photos every 3 seconds (only in normal view)
  useEffect(() => {
    if (!isFullScreen) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [isFullScreen]);

  // Handle keyboard navigation in full-screen mode
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFullScreen) {
        if (e.key === 'ArrowLeft') {
          setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
        } else if (e.key === 'ArrowRight') {
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        } else if (e.key === 'Escape') {
          setIsFullScreen(false);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullScreen]);

  // Handle manual navigation
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div id="gallery" className="text-center py-8">
      <div className="py-8">
        <h2 className="text-2xl font-bold">Galéria</h2>
      </div>

      {/* Normal view */}
      {!isFullScreen && (
        <div
          className="gallery-container hover:interactive"
          onClick={() => setIsFullScreen(true)} // Opens full-screen on click
        >
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt=""
              className={`gallery-image ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      )}

      {/* Full-screen view */}
      {isFullScreen && (
        <div className="fullscreen-gallery">
          <button className="gallery-arrow left" onClick={handlePrev}>
            ❮
          </button>
          <img src={images[currentIndex]} alt="" className="fullscreen-image" />
          <button className="gallery-arrow right" onClick={handleNext}>
            ❯
          </button>
          <button className="close-gallery" onClick={() => setIsFullScreen(false)}>
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default Gallery;