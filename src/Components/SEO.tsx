import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { getSrc, IGatsbyImageData } from 'gatsby-plugin-image';
import { Lang } from 'i18n/LanguageProvider';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  lang?: Lang;
  pathname?: string;
};

type SEOQueryData = {
  site: {
    siteMetadata: {
      defaultTitle: string;
      defaultDescription: string;
      siteUrl: string;
    };
  };
  socialImage: {
    childImageSharp: {
      socialImageData: IGatsbyImageData;
    };
  };
  propertyImages: {
    nodes: Array<{
      childImageSharp: {
        propertyImageData: IGatsbyImageData;
      } | null;
    }>;
  };
};

const SEO = ({
  title,
  description,
  image,
  lang = 'sk',
  pathname = '/',
}: SEOProps) => {
  const data: SEOQueryData = useStaticQuery(graphql`
    query MarisolSEO {
      site {
        siteMetadata {
          defaultTitle: title
          defaultDescription: description
          siteUrl
        }
      }
      socialImage: file(
        relativePath: { eq: "weblanding/landing_01.webp" }
      ) {
        childImageSharp {
          socialImageData: gatsbyImageData(
            width: 1200
            height: 630
            layout: FIXED
            placeholder: NONE
            formats: [JPG]
            quality: 85
            transformOptions: { fit: COVER, cropFocus: CENTER }
          )
        }
      }
      propertyImages: allFile(
        filter: {
          relativePath: {
            in: [
              "weblanding/landing_01.webp"
              "webfeatures/spalna1.webp"
              "webfeatures/spalna2.webp"
              "webfeatures/kupelna.webp"
              "webfeatures/obyvacka.webp"
              "webfeatures/kuchyna.webp"
              "webabout/small_terasa.webp"
              "webactivities/pool.webp"
            ]
          }
        }
        sort: { fields: relativePath, order: ASC }
      ) {
        nodes {
          childImageSharp {
            propertyImageData: gatsbyImageData(
              width: 1200
              layout: CONSTRAINED
              placeholder: NONE
              formats: [WEBP]
              quality: 82
            )
          }
        }
      }
    }
  `);

  const { defaultTitle, defaultDescription, siteUrl } = data.site.siteMetadata;
  const siteRoot = siteUrl.replace(/\/$/, '');
  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const canonicalUrl = `${siteRoot}${
    normalizedPath === '/' || normalizedPath.endsWith('/')
      ? normalizedPath
      : `${normalizedPath}/`
  }`;
  const slovakUrl = `${siteRoot}/`;
  const englishUrl = `${siteRoot}/en/`;

  const localized =
    lang === 'sk'
      ? {
          title: 'Apartmán Marisol Seaview Torrevieja | La Mata',
          description:
            'Apartmán pri mori v Torrevieji pre 5 hostí, s bazénom, terasou a parkovaním. Pláž La Mata je vzdialená približne 10 minút pešo.',
          rentalName: 'Apartmán Marisol Seaview v Torrevieja',
          imageAlt: 'Apartmán Marisol Seaview pri pláži La Mata v Torrevieji',
          locale: 'sk_SK',
          alternateLocale: 'en_GB',
        }
      : {
          title: 'Marisol Seaview Apartment Torrevieja | La Mata',
          description:
            'Seaside apartment in Torrevieja for up to 5 guests, with a pool, terrace and free parking. La Mata Beach is about a 10-minute walk away.',
          rentalName: 'Marisol Seaview Apartment in Torrevieja',
          imageAlt: 'Marisol Seaview Apartment near La Mata Beach in Torrevieja',
          locale: 'en_GB',
          alternateLocale: 'sk_SK',
        };

  const socialImagePath = getSrc(
    data.socialImage.childImageSharp.socialImageData
  );
  const socialImageUrl = image
    ? image.startsWith('http')
      ? image
      : `${siteRoot}${image.startsWith('/') ? image : `/${image}`}`
    : `${siteRoot}${socialImagePath}`;
  const propertyImageUrls = data.propertyImages.nodes
    .map((node) =>
      node.childImageSharp
        ? getSrc(node.childImageSharp.propertyImageData)
        : undefined
    )
    .filter((src): src is string => Boolean(src))
    .map((src) => `${siteRoot}${src}`);

  const seoTitle = title || localized.title || defaultTitle;
  const seoDescription =
    description || localized.description || defaultDescription;

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteRoot}/#website`,
        url: slovakUrl,
        name: 'Marisol Seaview Apartment',
        alternateName: 'Marisol Seaview',
        inLanguage: ['sk', 'en'],
      },
      {
        '@type': 'VacationRental',
        '@id': `${siteRoot}/#vacation-rental`,
        additionalType: 'Apartment',
        identifier: 'marisol-seaview-torrevieja',
        name: localized.rentalName,
        description: seoDescription,
        url: canonicalUrl,
        image: propertyImageUrls,
        latitude: 38.00162359953118,
        longitude: -0.6520540005199259,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Urbanización Torre del Moro',
          addressLocality: 'Torrevieja',
          addressRegion: 'Alicante',
          addressCountry: 'ES',
        },
        checkinTime: '15:00:00',
        checkoutTime: '11:00:00',
        telephone: '+421902217449',
        email: 'marisol.seaview@gmail.com',
        sameAs: [
          'https://www.facebook.com/profile.php?id=61572969472888',
          'https://www.instagram.com/marisol_seaview_apartment/',
        ],
        containsPlace: {
          '@type': 'Accommodation',
          additionalType: 'EntirePlace',
          occupancy: {
            '@type': 'QuantitativeValue',
            value: 5,
          },
          numberOfBedrooms: 2,
          numberOfBathroomsTotal: 1,
          bed: [
            {
              '@type': 'BedDetails',
              numberOfBeds: 1,
              typeOfBed: 'Double',
            },
            {
              '@type': 'BedDetails',
              numberOfBeds: 2,
              typeOfBed: 'Single',
            },
            {
              '@type': 'BedDetails',
              numberOfBeds: 1,
              typeOfBed: 'Sofa',
            },
          ],
          amenityFeature: [
            'ac',
            'balcony',
            'beachAccess',
            'childFriendly',
            'freeParking',
            'pool',
            'wifi',
          ].map((name) => ({
            '@type': 'LocationFeatureSpecification',
            name,
            value: true,
          })),
        },
      },
    ],
  };

  return (
    <>
      <html lang={lang} />
      <title>{seoTitle}</title>
      <link rel="icon" href="/marisol-favicon-v3.ico" type="image/x-icon" />
      <link rel="manifest" href="/manifest.webmanifest" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="sk" href={slovakUrl} />
      <link rel="alternate" hrefLang="en" href={englishUrl} />
      <link rel="alternate" hrefLang="x-default" href={slovakUrl} />
      <meta name="description" content={seoDescription} />
      <meta name="robots" content="index,follow" />
      <meta name="application-name" content="Marisol" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="Marisol" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="theme-color" content="#1f1f1f" />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Marisol Seaview Apartment" />
      <meta property="og:locale" content={localized.locale} />
      <meta property="og:locale:alternate" content={localized.alternateLocale} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={socialImageUrl} />
      <meta property="og:image:secure_url" content={socialImageUrl} />
      <meta property="og:image:type" content="image/jpeg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={localized.imageAlt} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={socialImageUrl} />
      <meta name="twitter:image:alt" content={localized.imageAlt} />

      <script type="application/ld+json">
        {JSON.stringify(structuredData).replace(/</g, '\\u003c')}
      </script>
    </>
  );
};

export default SEO;
