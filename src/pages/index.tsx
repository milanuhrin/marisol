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
import { AuthProvider } from "react-oidc-context";

// ✅ AWS Cognito Auth Config
const cognitoAuthConfig = {
  authority: "https://marisol.auth.us-east-1.amazoncognito.com",
  // client_id: "7ha456rvc4bc7c7ve527eqrpie", // Replace with your actual Cognito App Client ID
  client_id: "hrdsud6flksjbei479jcadat0",
  redirect_uri: "https://main.d39j8o309sk3xb.amplifyapp.com/",
  response_type: "code",
  scope: "email openid profile",
};

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
    <AuthProvider {...cognitoAuthConfig}>
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
    </AuthProvider>
  );
};

// ✅ Uses Gatsby's `<Head>` API
export const Head = () => <SEO />;

export default IndexPage;