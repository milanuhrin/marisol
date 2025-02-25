import React from "react";
import { GatsbySSR } from "gatsby";

export const wrapRootElement = ({ element }: { element: React.ReactNode }) => {
  return element; // No BrowserRouter to prevent SSR issues
};

export const onRenderBody: GatsbySSR["onRenderBody"] = ({ setHeadComponents }) => {
  setHeadComponents([
    // ✅ Add Google Analytics Script
    <script
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-3FPGJMG229"
      key="google-analytics"
    />,
    <script
      key="google-analytics-config"
      dangerouslySetInnerHTML={{
        __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3FPGJMG229');
        `,
      }}
    />,
  ]);
};