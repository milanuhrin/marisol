import React, { ReactNode } from "react";

interface WrapRootElementProps {
  element: ReactNode;
}

export const wrapRootElement = ({ element }: WrapRootElementProps): ReactNode => {
  return element;
};