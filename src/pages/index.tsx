import React, { useEffect, useState } from "react";
import { isBrowser } from "../Utilities/helpers";
import { Footer, Landing } from "Components/export";
import "../../global.css";
import About from "Components/About";
import Availability from "Components/Availability";
import Gallery from "Components/Gallery";
import Pricelist from "Components/Pricelist";
import Reservation from "Components/Reservation";
import Contact from "Components/Contact";
import SEO from "Components/SEO";

const IndexPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures client-side rendering
  }, []);

  if (!isClient) {
    return null; // Prevents SSR issues
  }

  // ✅ Dynamically import `react-router-dom` only in the browser
  const { BrowserRouter, Routes, Route } = require("react-router-dom");

  return (
    <>
      <SEO />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
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
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

// ✅ Uses Gatsby's `<Head>` API
export const Head = () => <SEO />;

export default IndexPage;