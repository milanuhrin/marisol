import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AnimOnScroll,
  Footer,
  Hero2,
  Landing,
} from 'Components/export';
import SEO from 'Components/seo.js';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage, GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image'; // Ensure IGatsbyImageData is imported
import React from 'react';
import '../../global.css';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import About from 'Components/About';
import Availability from 'Components/Availability';

const IndexPage = () => {
  let width = 0;
  if (typeof window !== 'undefined') {
    const { innerWidth } = window;
    width = innerWidth;
  }

  // Define the type for GraphQL query result
  interface ImageNode {
    node: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
  }

  // UseStaticQuery data with types
  const data: {
    hero2: {
      edges: ImageNode[];
    };
    gallery: {
      edges: ImageNode[];
    };
  } = useStaticQuery(graphql`
    query {
      hero2: allFile(filter: { relativePath: { regex: "/small_.*\\.jpg$/" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
      gallery: allFile(filter: { relativeDirectory: { eq: "gallery" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  `);

  const hero2Images = data.hero2.edges.map((edge) => getImage(edge.node));
  const galleryImages = data.gallery.edges.map((edge) => getImage(edge.node));

  return (
    <>
      <SEO />
      <Landing containerStyles="" />
      <About/>

      <main id="mainContent" className="flex flex-col">
        {/* Hero2 Section */}
        {hero2Images.length >= 4 && (
          <Hero2
            img1={hero2Images[0]!} // Non-null assertion since we know the image exists
            img2={hero2Images[1]!}
            img3={hero2Images[2]!}
            img4={hero2Images[3]!}
            textWrapperStyles="!w-[70%]"
            containerStyles="padding-Y-3-6rem"
          />
        )}
      </main>

      <Availability/>

      <Footer />

      {/* Fixed round Phone button */}
      {width < 640 && (
        <div
          onClick={() => window.open('tel:+421905405802', '_self')}
          className="fixed bottom-5 right-5 z-50 flex h-[4rem] w-[4rem] items-center justify-center rounded-full bg-[#dfe4ed]"
        >
          <FontAwesomeIcon
            size="lg"
            className="flex text-[#17303b]"
            icon={faPhone as IconProp}
          />
        </div>
      )}
    </>
  );
};

export default IndexPage;