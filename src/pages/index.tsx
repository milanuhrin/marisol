import React from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AnimOnScroll,
  Footer,
  Landing,
} from 'Components/export';
import SEO from 'Components/seo.js';
import '../../global.css';
import About from 'Components/About';
import Availability from 'Components/Availability';
import Gallery from 'Components/Gallery';
import Pricelist from 'Components/Pricelist';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const IndexPage = () => {
  let width = 0;
  if (typeof window !== 'undefined') {
    const { innerWidth } = window;
    width = innerWidth;
  }

  return (
    <>
      <SEO />
      <Landing containerStyles="" />
      <About />
      <main id="mainContent" className="flex flex-col">
        <Gallery />
        <Pricelist />
        <Availability />
      </main>
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