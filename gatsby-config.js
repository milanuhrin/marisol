module.exports = {
  siteMetadata: {
    title: 'Marisol Apartment',
    siteUrl: 'https://ladenie-klavirov.sk',
    titleTemplate: '%s · Marisol Apartmenv',
    description: 'Marisol Apartmen',
    image: '/milan-fb.jpg',
  },
  plugins: [
    `gatsby-plugin-fontawesome-css`,
    'gatsby-plugin-root-import',
    'gatsby-plugin-pnpm',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-s3',
      options: {
        bucketName: 'tatiho-stranka',
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
};
