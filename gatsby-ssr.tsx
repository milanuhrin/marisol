// gatsby-ssr.tsx
import React from "react";
import type { GatsbySSR } from "gatsby";
import { LanguageProvider } from "./src/i18n/LanguageProvider";

export const wrapRootElement: GatsbySSR["wrapRootElement"] = ({ element }) => {
  // Bez BrowserRouter v SSR, iba i18n provider
  return <LanguageProvider>{element}</LanguageProvider>;
};

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHtmlAttributes,
  setHeadComponents,
}) => {
  setHtmlAttributes({ lang: "sk" });

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