import React from "react";

const SEO = () => {
  return (
    <>
      <title>Marisol - Apartmány na prenájom</title>
      <meta name="description" content="Apartmán na prenájom pri mori - rezervujte si svoj pobyt ešte dnes!" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </>
  );
};

export const Head = () => <SEO />; // ✅ Use Gatsby's built-in Head API

export default SEO;