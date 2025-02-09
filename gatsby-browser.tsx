import React, { ReactNode, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

interface WrapRootElementProps {
  element: ReactNode;
}

// Function to remove fbclid from the URL
const removeFbclid = () => {
  if (typeof window !== "undefined") {
    const url = new URL(window.location.href);
    if (url.searchParams.has("fbclid")) {
      url.searchParams.delete("fbclid"); // Remove the fbclid parameter
      window.history.replaceState({}, document.title, url.pathname + url.search);
    }
  }
};

export const wrapRootElement = ({ element }: WrapRootElementProps) => {
  useEffect(() => {
    removeFbclid();
  }, []);

  return <BrowserRouter>{element}</BrowserRouter>;
};