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
import { AuthProvider, useAuth } from "react-oidc-context";

// ✅ AWS Cognito Auth Config (Fixed)
const cognitoAuthConfig = {
  authority: "https://marisol.auth.us-east-1.amazoncognito.com", // ✅ Correct Cognito Hosted UI domain
  // client_id: "7ha456rvc4bc7c7ve527eqrpie", // ✅ Correct App Client ID
  client_id: "hrdsud6flksjbei479jcadat0",
  redirect_uri: "https://main.d39j8o309sk3xb.amplifyapp.com/", // ✅ Matches Cognito Allowed Callback URLs
  response_type: "code",
  scope: "email openid profile", // ✅ Matches Cognito Scopes
};

// ✅ Function to Automatically Refresh Authentication
const AuthHandler = () => {
  const auth = useAuth();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      console.log("🔄 Not authenticated, redirecting to login...");
      auth.signinRedirect();
    } else {
      console.log("✅ User is authenticated:", auth.user);
    }
  }, [auth]);

  return null;
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
      <AuthHandler />
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