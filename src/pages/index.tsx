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

// ✅ Import Login and Admin pages
import Login from "Components/Login";
import Admin from "../pages/admin";

const IndexPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Runs only in the browser
  }, []);

  if (!isClient) {
    return null; // Prevents SSR from rendering react-router
  }

  // ✅ Import react-router-dom only in the browser
  const { BrowserRouter, Routes, Route } = require("react-router-dom");

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
            <SEO
              title="Marisol Seaview Apartment"
              description="Apartmán s výhľadom na more"
              image="https://dznnrbng6qb50.cloudfront.net/images/landing/landing_01.webp"
            />
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
        {/* ✅ Make sure Login and Admin are correctly referenced */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};

// ✅ Uses Gatsby's `<Head>` API
export const Head = () => <SEO />;

export default IndexPage;