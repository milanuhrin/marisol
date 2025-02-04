import React from "react";
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