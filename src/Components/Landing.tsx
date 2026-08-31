import { SectionDivider } from 'Components/export';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { useI18n } from 'i18n/LanguageProvider';
import React, { useEffect, useMemo, useState } from 'react';
import { Navigation } from './Navigation/Navigation';

interface Props {
  containerStyles?: string;
}

type LandingQueryData = {
  landingImages: {
    nodes: {
      relativePath: string;
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    }[];
  };
  logo: {
    childImageSharp: {
      gatsbyImageData: IGatsbyImageData;
    };
  };
};

export const Landing = (props: Props) => {
  const { containerStyles } = props;
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const data: LandingQueryData = useStaticQuery(graphql`
    query LandingImages {
      landingImages: allFile(
        filter: {
          relativeDirectory: { eq: "weblanding" }
          name: { regex: "/^landing_/" }
          extension: { eq: "webp" }
        }
      ) {
        nodes {
          relativePath
          childImageSharp {
            gatsbyImageData(
              layout: FULL_WIDTH
              placeholder: BLURRED
              formats: [AUTO, WEBP]
              quality: 78
              breakpoints: [375, 667, 1024, 1536, 2048]
            )
          }
        }
      }
      logo: file(relativePath: { eq: "weblanding/logo.png" }) {
        childImageSharp {
          gatsbyImageData(
            width: 512
            layout: CONSTRAINED
            placeholder: NONE
            formats: [AUTO, WEBP]
            quality: 90
          )
        }
      }
    }
  `);

  const images = useMemo(
    () =>
      data.landingImages.nodes
        .slice()
        .sort((a, b) => a.relativePath.localeCompare(b.relativePath))
        .map((node) => getImage(node))
        .filter((image): image is IGatsbyImageData => Boolean(image)),
    [data.landingImages.nodes]
  );
  const logo = getImage(data.logo);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Rotate one mounted image instead of keeping all five in the viewport.
  useEffect(() => {
    if (images.length < 2 || shouldReduceMotion) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length, shouldReduceMotion]);

  // Warm the browser cache for only the next responsive image after the
  // current hero has had time to load.
  useEffect(() => {
    if (images.length < 2) return;

    const preloadTimer = window.setTimeout(() => {
      const nextIndex = (currentImageIndex + 1) % images.length;
      const nextImageData = images[nextIndex]?.images.fallback;

      if (!nextImageData?.src) return;

      const nextImage = new Image();
      if (nextImageData.sizes) nextImage.sizes = nextImageData.sizes;
      if (nextImageData.srcSet) nextImage.srcset = nextImageData.srcSet;
      nextImage.src = nextImageData.src;
    }, 1500);

    return () => window.clearTimeout(preloadTimer);
  }, [currentImageIndex, images]);

  const currentImage = images[currentImageIndex];

  return (
    <>
      <Navigation />
      <motion.section
        className={`${containerStyles} relative z-10 mx-auto aspect-[4/5] w-full max-w-screen-lg sm:aspect-[3/2]`}
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          opacity: { duration: shouldReduceMotion ? 0 : 1 },
          scale: {
            duration: shouldReduceMotion ? 0 : 5,
            ease: 'linear',
          },
        }}
        id='home'
      >
        <h1 className="sr-only">{t('seo.h1')}</h1>

        {/* Image container */}
        <div className="absolute inset-0 z-0 h-full w-full overflow-hidden">
          <AnimatePresence>
            {currentImage && (
              <motion.div
                key={currentImageIndex}
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 1 }}
                animate={{
                  opacity: 1,
                  scale: shouldReduceMotion ? 1 : 1.15,
                }}
                exit={{ opacity: shouldReduceMotion ? 1 : 0 }}
                transition={{
                  opacity: { duration: shouldReduceMotion ? 0 : 2 },
                  scale: {
                    duration: shouldReduceMotion ? 0 : 7,
                    ease: 'linear',
                  },
                }}
                className="absolute inset-0 flex h-full w-full items-center justify-center"
              >
                <GatsbyImage
                  image={currentImage}
                  alt={`Marisol Seaview Apartment – fotografia ${currentImageIndex + 1}`}
                  className="h-full w-full"
                  imgClassName="h-full w-full object-cover"
                  loading={currentImageIndex === 0 ? 'eager' : 'lazy'}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Logo */}
        {logo && (
          <div className="absolute right-[6%] top-1/2 z-50 -translate-y-1/2">
            <GatsbyImage
              image={logo}
              alt="Marisol Seaview Apartment"
              className="h-auto w-44 sm:w-56 lg:w-64"
              imgClassName="object-contain"
              loading="eager"
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
