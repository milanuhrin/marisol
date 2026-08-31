// gatsby-ssr.tsx
import React from "react";
import type { GatsbySSR } from "gatsby";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  return <>{element}</>;
};

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  pathname,
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: pathname.startsWith("/en") ? "en" : "sk" });

  // Google Analytics
  setHeadComponents([
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
