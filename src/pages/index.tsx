import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Footer, Landing } from "Components/export";
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
    <Router>
      <SEO />
      <Routes>
        {/* Main Website */}
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
        {/* Login Page */}
        <Route path="/login" element={<Login />} />
        {/* Admin Page */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};
export const Head = () => <SEO />;

export default IndexPage;