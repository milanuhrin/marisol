import React, { ReactNode, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

interface WrapRootElementProps {
  element: ReactNode;
}

// ✅ Function to remove `fbclid` from URL before rendering the page
const removeFbclid = () => {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    if (url.searchParams.has("fbclid")) {
      url.searchParams.delete("fbclid"); // Remove fbclid parameter
      window.history.replaceState({}, document.title, url.pathname + url.search);
    }
  }
};

// ✅ Function to scroll to the correct section if a hash exists
const scrollToHash = () => {
  if (typeof window !== "undefined" && window.location.hash) {
    setTimeout(() => {
      const hash = window.location.hash.replace("#", ""); // Get the ID without #
      const targetElement = document.getElementById(hash);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300); // Small delay to allow Gatsby to render the element
  }
};

// ✅ React component to handle effects (fixing the white screen issue)
const AppWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  useEffect(() => {
    removeFbclid();
    scrollToHash();
  }, []); // Run on mount

  return <>{children}</>;
};

// ✅ Wrap Gatsby's root element inside BrowserRouter + AppWrapper
export const wrapRootElement = ({ element }: WrapRootElementProps) => (
  <BrowserRouter>
    <AppWrapper>{element}</AppWrapper>
  </BrowserRouter>
);