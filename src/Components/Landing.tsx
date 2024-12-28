import { SectionDivider } from 'Components/export';
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage, GatsbyImage } from 'gatsby-plugin-image';
import { Navigation } from './Navigation/Navigation';

interface Props {
  containerStyles?: string;
}

export const Landing = (props: Props) => {
  const { containerStyles } = props;

  // Fetch images from the gallery
  const data = useStaticQuery(graphql`
    query {
      image1: file(relativePath: { eq: "landing/landing_01_o_1hmk9fog21b1i1r9u1mggbi1equ2j.jpeg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
      image2: file(relativePath: { eq: "landing/landing_02_DSC_4418.jpg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
      image3: file(relativePath: { eq: "landing/landing_03_IMG_4476.jpg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
      image4: file(relativePath: { eq: "landing/landing_04_IMG_7995.jpg" }) {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, layout: FULL_WIDTH)
        }
      }
    }
  `);

  const images = [
    getImage(data.image1),
    getImage(data.image2),
    getImage(data.image3),
    getImage(data.image4),
  ].filter(Boolean);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Image rotation logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000); // Total duration: 7 seconds (5s display + 2s transition)

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <>
      <Navigation />
      <motion.section
        className={`${containerStyles} relative z-10 w-full h-screen`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      >
        {/* Image container */}
        <div className="absolute inset-0 w-full h-[90vh] z-0 overflow-hidden">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 1 }}
              animate={{
                opacity: currentImageIndex === index ? 1 : 0,
                scale: currentImageIndex === index ? 1.1 : 1, // Scale up slightly for zooming effect
              }}
              transition={{
                opacity: { duration: 2 }, // Transition duration
                scale: { duration: 7, ease: 'linear' }, // Continuous zoom
              }}
              className="absolute inset-0 w-full h-full flex justify-center items-center"
            >
              {image && (
                <GatsbyImage
                  image={image}
                  alt={`Landing background image ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="absolute bottom-[10%] left-0 w-full h-[100px] z-30 pointer-events-none">
          <SectionDivider fill="white" />
        </div>
      </motion.section>
    </>
  );
};