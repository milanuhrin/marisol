import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AnimOnScroll, Footer, Landing } from "Components/export";
import "../../global.css";
import About from "Components/About";
import Availability from "Components/Availability";
import Gallery from "Components/Gallery";
import Pricelist from "Components/Pricelist";
import Reservation from "Components/Reservation";
import Contact from "Components/Contact";
import Login from "Components/Login";
import Admin from "Components/Admin";
import SEO from "Components/SEO";

const IndexPage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Runs only on the client
  }, []);

  if (!isClient) {
    return null; // Prevents SSR from rendering the page
  }

  return (
    <>
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
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
};

// ✅ Uses Gatsby's `<Head>` API
export const Head = () => <SEO />;

export default IndexPage;