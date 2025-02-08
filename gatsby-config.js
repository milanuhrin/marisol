module.exports = {
  siteMetadata: {
    title: 'Marisol Seaview Apartment',
    description: 'Apartmán s výhľadom na more',
    titleTemplate: "%s | Marisol Apartment",
    siteUrl: 'https://marisol.sk',
    image: "https://dznnrbng6qb50.cloudfront.net/images/landing/landing_01.jpg"
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    `gatsby-plugin-fontawesome-css`,
    'gatsby-plugin-root-import',
    'gatsby-plugin-pnpm',
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
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
        include: ["admin/**"],
        removeNonexistentObjects: false,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-QLGH6XXEYR',
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
