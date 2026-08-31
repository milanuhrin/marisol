module.exports = {
  siteMetadata: {
    title: 'Apartmán Marisol Seaview Torrevieja | La Mata',
    description: 'Apartmán pri mori v Torrevieji pre 5 hostí, s bazénom, terasou a parkovaním.',
    titleTemplate: "%s | Marisol Apartment",
    siteUrl: 'https://marisol.sk',
    favicon: "/marisol-favicon-v3.ico"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    `gatsby-plugin-fontawesome-css`,
    'gatsby-plugin-root-import',
    'gatsby-plugin-pnpm',
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'marisol-webpage',
        params: {Bucket: "marisol-webpage",},
        protocol: "https",
        hostname: "marisol.sk",
        cloudfrontDistributionId: 'E255DY8HXE81HK',
        acl: null,
        exclude: ["images/*", "images/**/*"],
        removeNonexistentObjects: false,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-3FPGJMG229",
        ],
        gtagConfig: {
          anonymize_ip: true,
          cookie_expires: 0,
        },
        pluginConfig: {
          head: true,
          respectDNT: true,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ["auto", "webp"],
          placeholder: "blurred",
          quality: 80,
          breakpoints: [480, 768, 1024, 1366, 1920],
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `./src/images`,
      },
      __key: 'images',
    },
  ],
}
