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
import Reservation from 'Components/Reservation';
import Contact from 'Components/Contact';

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
      <Landing />
      <About />
      <Gallery />
      <Pricelist />
      <Availability />
      <Reservation />
      <Contact />
      <Footer />
    </>
  );
};

export default IndexPage;