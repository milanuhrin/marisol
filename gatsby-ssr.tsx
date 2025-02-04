import React from "react";

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return element; // No BrowserRouter to prevent SSR issues
};