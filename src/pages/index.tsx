import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Landing } from "Components/export";
import "../../global.css";
import About from "Components/About";
import Availability from "Components/Availability";
import Gallery from "Components/Gallery";
import Pricelist from "Components/Pricelist";
import Reservation from "Components/Reservation";
import Contact from "Components/Contact";
import SEO from "Components/SEO";

const clientId = "2lsi9hdb7i9oet476clprm1vqe";
const redirectUri = "https://www.marisol.sk";
const cognitoDomain = "https://us-east-17ev5jsggd.auth.us-east-1.amazoncognito.com";
const cognitoTokenUrl = `${cognitoDomain}/oauth2/token`;


const IndexPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      // Exchange code for access token
      fetch(cognitoTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          client_id: clientId,
          redirect_uri: redirectUri,
          code,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("token", data.access_token);
          navigate("/admin"); // Redirect after login
        })
        .catch((err) => console.error("Error exchanging code:", err));
    }
  }, [navigate]);

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