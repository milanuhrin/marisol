import React from "react";
import { Footer, Landing } from "Components/export";
import "../../global.css";
import About from "Components/About";
import Availability from "Components/Availability";
import Gallery from "Components/Gallery";
import Pricelist from "Components/Pricelist";
import Reservation from "Components/Reservation";
import Contact from "Components/Contact";
import SEO from "Components/SEO";
import Testimonials from "Components/Testimonials";
import RenviaPromo from "Components/RenviaPromo";

const IndexPage = () => {
  return (
    <>
      <SEO />
      <Landing />
      <About />
      <Gallery />
      <Testimonials />
      <Pricelist />
      <Availability />
      <Reservation />
      <Contact />
      <Footer />
      <RenviaPromo />
    </>
  );
};

// ✅ Uses Gatsby's `<Head>` API
export const Head = () => <SEO />;

export default IndexPage;
