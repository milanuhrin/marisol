import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage, GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { TitleText } from './export';
import { SectionDividerWaveOneSide } from 'svg/SectionDividerWaveOneSide';
import { hero2ImageLayouts } from 'Utilities/Data';
import { cardVariants } from 'Utilities/motionVariants';
import { useMediaQuery } from "react-responsive";
import { useI18n } from 'i18n/LanguageProvider';

const About = () => {
  const [activeTab, setActiveTab] = useState(0); // Added state for active tab
  const { t } = useI18n(); 
  const data: {
    hero2: {
      edges: {
        node: {
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      }[];
    };
    activities: {
      edges: {
        node: {
          relativePath: string;
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      }[];
    };
    features: {
      edges: {
        node: {
          relativePath: string;
          childImageSharp: {
            gatsbyImageData: IGatsbyImageData;
          };
        };
      }[];
    };
  } = useStaticQuery(graphql`
    query {
      hero2: allFile(filter: { relativePath: { regex: "/small_.*\\.jpg$/" } }) {
        edges {
          node {
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
      activities: allFile(filter: { relativePath: { regex: "/activities/.*\\.(jpg|jpeg|png)$/" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
      features: allFile(filter: { relativePath: { regex: "/features/.*\\.(jpg|jpeg|png)$/" } }) {
        edges {
          node {
            relativePath
            childImageSharp {
              gatsbyImageData(placeholder: BLURRED)
            }
          }
        }
      }
    }
  `);

  const hero2Images = data.hero2.edges.map((edge) => getImage(edge.node));
  const activityImages = data.activities.edges.reduce((acc, edge) => {
    acc[edge.node.relativePath.split('/').pop()!] = getImage(edge.node);
    return acc;
  }, {} as Record<string, IGatsbyImageData | undefined>);
  const featuresImages = data.features.edges.reduce((acc, edge) => {
    acc[edge.node.relativePath.split('/').pop()!] = getImage(edge.node);
    return acc;
  }, {} as Record<string, IGatsbyImageData | undefined>);

  const isLargeScreen = useMediaQuery({ minWidth: 1024 });
  
  const largeScreenBenefits = [
    { icon: 'fa-water', text: t('about.benefits.sea_view') },
    { icon: 'fa-parking', text: t('about.benefits.free_parking') },
    { icon: 'fa-snowflake', text: t('about.benefits.ac') },
    { icon: 'fa-baby', text: t('about.benefits.baby_cot') },
    { icon: 'fa-glass-cheers', text: t('about.benefits.glass_terrace') },
    { icon: 'fa-lock', text: t('about.benefits.gated_area') },
    { icon: 'fa-tshirt', text: t('about.benefits.iron') },
    { icon: 'fa-chair', text: t('about.benefits.high_chair') },
    { icon: 'fa-sun', text: t('about.benefits.open_terrace') },
    { icon: 'fa-wifi', text: t('about.benefits.wifi') },
    { icon: 'fa-wind', text: t('about.benefits.drying_rack') },
    { icon: 'fa-puzzle-piece', text: t('about.benefits.toys') },
    { icon: 'fa-utensils', text: t('about.benefits.dining_table') },
    { icon: 'fa-desktop', text: t('about.benefits.workspace') },
    { icon: 'fa-broom', text: t('about.benefits.vacuum') },
    { icon: 'fa-dice', text: t('about.benefits.board_games') },
  ];
  const smallScreenBenefits = [
    { icon: 'fa-water', text: t('about.benefits.sea_view') },
    { icon: 'fa-snowflake', text: t('about.benefits.ac') },
    { icon: 'fa-glass-cheers', text: t('about.benefits.glass_terrace') },
    { icon: 'fa-tshirt', text: t('about.benefits.iron') },
    { icon: 'fa-sun', text: t('about.benefits.open_terrace') },
    { icon: 'fa-wind', text: t('about.benefits.drying_rack') },
    { icon: 'fa-utensils', text: t('about.benefits.dining_table') },
    { icon: 'fa-broom', text: t('about.benefits.vacuum') },
    { icon: 'fa-parking', text: t('about.benefits.free_parking') },
    { icon: 'fa-baby', text: t('about.benefits.baby_cot') },
    { icon: 'fa-lock', text: t('about.benefits.gated_area') },
    { icon: 'fa-chair', text: t('about.benefits.high_chair') },
    { icon: 'fa-wifi', text: t('about.benefits.wifi') },
    { icon: 'fa-puzzle-piece', text: t('about.benefits.toys') },
    { icon: 'fa-desktop', text: t('about.benefits.workspace') },
    { icon: 'fa-dice', text: t('about.benefits.board_games') },
  ];

  const benefits = isLargeScreen ? largeScreenBenefits : smallScreenBenefits;

  const apartmentConditions = [
    { label: '≈', value: '15:00' },
    { label: 'Check-out', value: '11:00' },
    { label: 'Záloha', value: '20% pri potvrdení rezervácie' },
    { label: 'Doplatok', value: '80% 14 dní pred pobytom' },
    { label: 'Domáce zvieratá', value: '🚫' },
    { label: 'Fajčenie', value: '🚫' },
    { label: 'Párty', value: '🚫' },
    { label: 'Bezbariérový prístup', value: '🚫' },
  ];

  const sections = [
    {
      title: 'about.sections.bedroom1',
      image: featuresImages['spalna1.jpg'],
      features: [
        'about.sections.bedroom1.feature.double_bed',
        'about.sections.bedroom1.feature.wardrobe',
        'about.sections.bedroom1.feature.bedding',
        'about.sections.bedroom1.feature.hangers',
        'about.sections.bedroom1.feature.tv_netflix',
      ],
    },
    {
      title: 'about.sections.bedroom2',
      image: featuresImages['spalna2.jpg'],
      features: [
        'about.sections.bedroom2.feature.twin_beds',
        'about.sections.bedroom2.feature.wardrobe',
        'about.sections.bedroom2.feature.workspace',
        'about.sections.bedroom2.feature.bedding',
        'about.sections.bedroom2.feature.hangers',
      ],
    },
    {
      title: 'about.sections.livingroom',
      image: featuresImages['obyvacka.jpg'],
      features: [
        'about.sections.livingroom.feature.sofa_bed',
        'about.sections.livingroom.feature.armchairs',
        'about.sections.livingroom.feature.coffee_tables',
        'about.sections.livingroom.feature.bar_table',
        'about.sections.livingroom.feature.library_books',
        'about.sections.livingroom.feature.tv_netflix',
      ],
    },
    {
      title: 'about.sections.bathroom',
      image: featuresImages['kupelna.jpg'],
      features: [
        'about.sections.bathroom.feature.shower',
        'about.sections.bathroom.feature.toilet_sink',
        'about.sections.bathroom.feature.storage',
        'about.sections.bathroom.feature.hairdryer',
        'about.sections.bathroom.feature.shower_gel',
        'about.sections.bathroom.feature.soap',
        'about.sections.bathroom.feature.towels',
      ],
    },
    {
      title: 'about.sections.kitchen',
      image: featuresImages['kuchyna.jpg'],
      features: [
        'about.sections.kitchen.feature.fridge',
        'about.sections.kitchen.feature.oven',
        'about.sections.kitchen.feature.microwave',
        'about.sections.kitchen.feature.hob',
        'about.sections.kitchen.feature.washing_machine',
        'about.sections.kitchen.feature.cutlery_dishes',
        'about.sections.kitchen.feature.glasses',
        'about.sections.kitchen.feature.pots',
        'about.sections.kitchen.feature.coffee_machine',
        'about.sections.kitchen.feature.kettle',
      ],
    },
  ];



  return (
    <section id="about" className="text-center max-w-screen-lg mx-auto py-8 bg-gradient-to-b from-white to-[#e6f6ff] ">
      {/* Title with Text */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0, once: true }}
        variants={cardVariants}
        className="py-8"
      >
        <TitleText>{t('about.title')}</TitleText>
        <div className="px-12 lg:px-28 text-justify text-base font-medium leading-6 text-gray-500 mb-4 mt-8 max-w-screen-lg mx-auto">
          {t('about.longText')}
        </div>
      </motion.div>

      {/* Single Image Instead of 4 */}
      {hero2Images.length >= 1 && (
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={cardVariants}
          className="relative flex flex-col sm:flex-row sm:items-center sm:justify-center gap-8 max-w-screen-lg mx-auto"
        >
          {/* Image Section (Only 1 Image) */}
          <div className="z-10 flex justify-center mx-auto">
            <GatsbyImage
              className="rounded-lg shadow-xl max-w-full sm:max-w-[400px] mt-4"
              image={hero2Images.find((img) => img?.images?.fallback?.src?.includes("small_terasa.jpg"))!}
              alt="Terasa Apartmánu Marisol"
            />
          </div>

          {/* Icon-Based Section */}
          <motion.div
            className="z-10 flex flex-col gap-8 sm:self-center sm:justify-self-center max-w-screen-lg mx-auto"
            initial="offscreen"
            whileInView="onscreen"
            variants={cardVariants}
          >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-2 sm:gap-x-4 sm:text-left mt-4">
              {[
                { icon: 'fa-user', text: t('about.facts.guests') },
                { icon: 'fa-bed', text: t('about.facts.bedrooms') },
                { icon: 'fa-cocktail', text: t('about.facts.glass_terrace') },
                { icon: 'fa-bath', text: t('about.facts.bathrooms') },
                { icon: 'fa-swimming-pool', text: t('about.facts.pool') },
                { icon: 'fa-plane', text: t('about.facts.airport') },
                { icon: 'fa-umbrella-beach', text: t('about.facts.beach') },
                { icon: 'fa-utensils', text: t('about.facts.restaurants') },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-6 text-base font-medium text-gray-500">
                  <span className="text-transparent bg-clip-text from-snakeGr1 to-snakeGr2 bg-gradient-to-r">
                    <i className={`fas ${item.icon}`}></i>
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}


      {/* Updated Vybavenie Apartmánu Section */}
      <motion.div
      className="py-8 max-w-screen-lg mx-auto"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.1, once: true }}
      variants={cardVariants}
    >
      <h2 className="text-xl font-bold text-center mb-8 mt-8">{t('about.equipment.title')}</h2>

      {/* Add Gray Line Above */}
      <div className="border-b border-gray-300 mb-6 px-4 sm:px-28"></div>

      {/* Tabs */}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:justify-center sm:space-x-8 border-b pb-4 mb-6 px-4 sm:px-28">
        {sections.map((section, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`font-bold text-l px-4 py-2 rounded-lg transition-all duration-300 ${
              activeTab === index
                ? "text-white bg-cyan-500 shadow-lg"
                : "text-gray-700 hover:text-cyan-500 hover:bg-gray-200"
            }`}
          >
            {t(section.title)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 px-16 sm:px-28">
        <div>
          <h3 className="text-xl font-bold mb-4">{t(sections[activeTab].title)}</h3>
          <div className="pl-3 sm:pl-0">
            <ul className="space-y-3 text-gray-600">
              {sections[activeTab].features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <i className="fas fa-check text-black text-xl"></i>
                  {t(feature)}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {sections[activeTab].image ? (
            <GatsbyImage
              image={sections[activeTab].image!}
              alt={t(sections[activeTab].title)}
              className="rounded-lg shadow-lg object-cover sm:w-full"
            />
          ) : (
            <p>{t('about.no_image')}</p>
          )}
        </div>
      </div>

      {/* Add Gray Line Below */}
      <div className="border-b border-gray-300 w-full mt-6 px-4 sm:px-28"></div>
    </motion.div>
    {/* Add Benefits Section */}
    <motion.div className="py-8 max-w-screen-lg mx-auto">
        <h2 className="text-xl font-bold text-center mb-8 ">{t('about.benefits.title')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-12">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center space-x-4">
              <i className={`fas ${benefit.icon} text-cyan-500 text-2xl`}></i>
              <span className="text-gray-700 font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </motion.div>

{/* Apartment Conditions */}
<motion.div className="py-8 max-w-screen-lg mx-auto">
  <h2 className="text-xl font-bold text-center mb-8">{t('about.more_info.title')}</h2>

  {/* Responsive Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-4">
    {/* Left Column */}
    <div className="flex flex-col space-y-2">
      {[
        { label: t('about.more_info.checkin'), value: '15:00' },
        { label: t('about.more_info.checkout'), value: '11:00' },
        { label: t('about.more_info.deposit'), value: t('about.more_info.deposit_value') },
        { label: t('about.more_info.balance'), value: t('about.more_info.balance_value') }
      ].map((item, index) => (
        <div key={index} className="flex justify-between w-full">
          <span className="font-bold text-gray-700 w-1/3 text-left ">{item.label}</span>
          <span className="text-gray-600 w-2/3 text-left">{item.value}</span>
        </div>
      ))}
    </div>

    {/* Right Column */}
    <div className="flex flex-col space-y-2">
      {[
        { label: t('about.more_info.pets'), value: '🚫' },
        { label: t('about.more_info.smoking'), value: '🚫' },
        { label: t('about.more_info.accessible'), value: '🚫' }
      ].map((item, index) => (
        <div key={index} className="flex justify-between w-full">
          <span className="font-bold text-gray-700 w-1/2 text-left">{item.label}</span>
          <span className="text-red-600 w-1/2 text-left pl-20 sm:pl-0">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
</motion.div>
    {/* Aktivity Subsection */}
      <div className="py-8 max-w-screen-lg mx-auto">
        <h2 className="text-xl font-bold text-center ">{t('about.activities.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 mx-6 sm:mx-12 lg:mx-20 ">
          {[
            { title: t('about.activities.pool.title'), image: 'pool.png', description: t('about.activities.pool.desc') },
            { title: t('about.activities.beach.title'), image: 'beach.jpg', description: t('about.activities.beach.desc') },
            { title: t('about.activities.salt_lakes.title'), image: 'salt-lakes.png', description: t('about.activities.salt_lakes.desc') },
            { title: t('about.activities.history.title'), image: 'old-town.png', description: t('about.activities.history.desc') },
            { title: t('about.activities.safari.title'), image: 'safari.png', description: t('about.activities.safari.desc') },
            { title: t('about.activities.market.title'), image: 'market.png', description: t('about.activities.market.desc') },
            { title: t('about.activities.aquapark.title'), image: 'aquapark.png', description: t('about.activities.aquapark.desc') },
            { title: t('about.activities.watersports.title'), image: 'wakepark.png', description: t('about.activities.watersports.desc') },
            { title: t('about.activities.running.title'), image: 'running.png', description: t('about.activities.running.desc') },
            { title: t('about.activities.golf.title'), image: 'golf.png', description: t('about.activities.golf.desc') },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-justify p-4 bg-white rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <div className="w-32 h-32">
                {activityImages[activity.image] ? (
                  <GatsbyImage
                    image={activityImages[activity.image]!}
                    alt={activity.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <p>{t('about.no_image')}</p>
                )}
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-700">{activity.title}</h3>
              <p className="mt-2 text-sm text-gray-500">{activity.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Divider */}
      <SectionDividerWaveOneSide fill="#e6f6ff" />
    </section>
  );
};

export default About;