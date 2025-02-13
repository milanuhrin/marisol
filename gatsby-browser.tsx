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

// ✅ Function to scroll to a section based on the hash (#availability, etc.)
const scrollToHash = () => {
  if (typeof window !== "undefined" && window.location.hash) {
    const hash = window.location.hash.replace("#", ""); // Get hash without #
    const targetElement = document.getElementById(hash);

    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100); // Small delay to ensure the element exists
    }
  }
};

// ✅ Run these functions on client-side only
if (typeof window !== "undefined") {
  removeFbclid();
  scrollToHash(); // Ensure it runs on initial page load
}

// ✅ Wrap the entire app inside BrowserRouter
export const wrapRootElement = ({ element }: WrapRootElementProps) => {
  useEffect(() => {
    scrollToHash(); // Run on navigation
  }, []);

  return <BrowserRouter>{element}</BrowserRouter>;
};