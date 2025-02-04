import React, { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

interface WrapRootElementProps {
  element: ReactNode;
}

export const wrapRootElement = ({ element }: WrapRootElementProps): JSX.Element => {
  return <BrowserRouter>{element}</BrowserRouter>;
};