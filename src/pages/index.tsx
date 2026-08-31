import React from "react";
import "../../global.css";
import ApartmentPage from "Components/ApartmentPage";
import SEO from "Components/SEO";

const IndexPage = () => <ApartmentPage initialLang="sk" />;

// ✅ Uses Gatsby's `<Head>` API
export const Head = () => <SEO lang="sk" pathname="/" />;

export default IndexPage;
