import React from "react";
import { BrowserRouter } from "react-router-dom";

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return <BrowserRouter>{element}</BrowserRouter>;
};