import React, { ReactNode } from "react";
import { BrowserRouter as Router } from "react-router-dom";

interface WrapPageElementProps {
  element: ReactNode;
}

export const wrapPageElement = ({ element }: WrapPageElementProps): ReactNode => {
  return <Router>{element}</Router>;
};