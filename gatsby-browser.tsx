import React, { ReactNode } from "react";
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

// ✅ Call the function immediately on the client-side
if (typeof window !== "undefined") {
  removeFbclid();
}

export const wrapRootElement = ({ element }: WrapRootElementProps) => (
  <BrowserRouter>{element}</BrowserRouter>
);