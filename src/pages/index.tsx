import React from "react";
import { AnimOnScroll, Footer, Landing } from "Components/export";
import "../../global.css";
import About from "Components/About";
import Availability from "Components/Availability";
import Gallery from "Components/Gallery";
import Pricelist from "Components/Pricelist";
import Reservation from "Components/Reservation";
import Contact from "Components/Contact";
import SEO from "Components/SEO";

const IndexPage = () => {
  return (
    <>
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

// ✅ Uses Gatsby's `<Head>` API
export const Head = () => <SEO />;

export default IndexPage;