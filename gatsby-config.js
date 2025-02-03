module.exports = {
  siteMetadata: {
    title: 'Marisol Apartment',
    description: 'Marisol Apartment',
    titleTemplate: "%s | Marisol Apartment",
    siteUrl: 'https://marisol.sk',
    image: "/default-image.jpg"
  },
  plugins: [
    `gatsby-plugin-fontawesome-css`,
    'gatsby-plugin-root-import',
    'gatsby-plugin-pnpm',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'marisol-wepage',
        protocol: "https",
        hostname: "marisol.sk",
        cloudfrontDistributionId: 'E255DY8HXE81HK',
        acl: null,
      },
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-QLGH6XXEYR',
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: ['auto', 'avif'],
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
