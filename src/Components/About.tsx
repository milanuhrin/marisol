import React from 'react';
import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage, GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { TitleText } from './export';
import { SectionDividerWaveOneSide } from 'svg/SectionDividerWaveOneSide';
import { hero2ImageLayouts } from 'Utilities/Data';
import { cardVariants } from 'Utilities/motionVariants';

const About = () => {
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
      activities: allFile(filter: { relativePath: { regex: "/activities/.*\\.(jpg|png)$/" } }) {
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

  return (
    <section id="about" className="text-center py-8 bg-gradient-to-b from-white to-[#e6f6ff]">
      {/* Title with Text */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0, once: false }}
        variants={cardVariants}
        className="py-8"
      >
        <TitleText>O apartmáne Marisol</TitleText>
        <div className="px-28 text-justify text-base font-medium leading-6 text-gray-500 mb-4 mt-8">
          Krásny východ slnka nad morom, príjemná dovolenková atmosféra či voňavá káva na terase - to
          všetko môžete zažiť u nás, v apartmáne Marisol. Nachádza sa v jednej z najobľúbenejších
          lokalít mesta Torrevieja, blízko známeho mesta Alicante v Španielsku. Vedľa parku a tiež
          historického bodu mesta Torre del Moro. Mimo ruchu centra mesta a zároveň na krok od
          reštaurácií, supermarketu, lekárne, autobusovej zastávky, no najmä dlhej piesočnej pláže La
          Mata, ktorá je každoročne ocenená modrou vlajkou. Nezameniteľná liečivá mikroklíma, športové
          vyžitie i večerná zábava sú predpokladom pre prežitie nezabudnuteľnej dovolenky, či už pre
          páry, alebo rodiny.
        </div>
      </motion.div>

      {/* 4 Images + Section Beside */}
      {hero2Images.length >= 4 && (
        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          variants={cardVariants}
          className="relative flex max-w-full flex-col sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:items-center sm:justify-center gap-8"
        >
          {/* Images Section */}
          <div className="z-10 grid max-w-[33rem] grid-cols-12 grid-rows-2 gap-4 justify-self-center sm:col-start-1 sm:row-start-1">
            {hero2ImageLayouts.map((item, i) => (
              <motion.div
                key={i}
                initial="offscreen"
                whileInView="onscreen"
                whileHover={{ scale: 1.08 }}
                variants={{
                  ...cardVariants,
                  offscreen: { y: 150 },
                }}
                className={`z-20 h-auto w-auto rounded-lg object-cover ${item.class}`}
              >
                <GatsbyImage
                  imgClassName="rounded-lg w-auto block object-cover"
                  className="block w-auto rounded-lg shadow-xl mt-4"
                  image={hero2Images[i]!}
                  alt={`Gallery image ${i + 1}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Icon-Based Section */}
          <motion.div
            className="z-10 flex flex-col gap-8 sm:col-start-2 sm:row-start-1 sm:self-center sm:justify-self-center"
            initial="offscreen"
            whileInView="onscreen"
            variants={cardVariants}
          >
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-6 sm:text-left mt-4 ">
              {[
                { icon: '👤', text: '5 ľudí' },
                { icon: '🛌', text: '2 spálne' },
                { icon: '🍹', text: 'terasa' },
                { icon: '🛁', text: '1 kúpeľňa' },
                { icon: '🏊', text: 'bazén' },
                { icon: '✈️', text: 'letisko 35 min autom' },
                { icon: '🏖️', text: 'pláž 10 min pešo' },
                { icon: '🍽️', text: 'reštaurácie 5 min pešo' },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-6 text-base font-medium text-gray-500">
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}

      {/* Vybavenie Apartmánu */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.1, once: false }}
        variants={cardVariants}
        className="py-8"
      >
        <h2 className="text-xl font-bold pl-6 lg:pl-12 mt-8">Vybavenie Apartmánu</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:grid-cols-3 sm:gap-x-6 pl-32 mt-8 lg:mt-12 sm:text-left">
          {[
            'Klimatizácia', 
            'Televízor',
            'Internet',
            'Netflix',
            'Kávovar',
            'Elektrická rúra',
            'Mikrovlnka',
            'Varná doska',
            'Chladnička',
            'Varná kanvica',
            'Práčka',
            'Pracovné miesto',
            'Posteľná bielizeň',
            'Uteráky',
            'Detská postieľka',
            'Detská stolička',
            'Hračky a hry',
          ].map((amenity, index) => (
            <li key={index} className="flex items-center gap-4 text-base font-medium text-gray-500">
              <span className="text-sm">✔</span>
              <span>{amenity}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Podmienky */}
      <motion.div
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ amount: 0.1, once: false }}
        variants={cardVariants}
        className="py-8"
      >
        <h2 className="text-xl font-bold pl-6 lg:pl-12">Podmienky</h2>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 pl-32 mt-8 lg:mt-12">
          {[
            { text: 'Fajčenie', icon: '🚫' },
            { text: 'Párty', icon: '🚫' },
            { text: 'Domáce zvieratá', icon: '🚫' },
            'Deti',
          ].map((amenity, index) => (
            <li key={index} className="flex items-center gap-4 text-base font-medium text-gray-500">
              <span className="text-sm">
                {typeof amenity === 'object' ? amenity.icon : '✔'}
              </span>
              <span>{typeof amenity === 'object' ? amenity.text : amenity}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Aktivity Subsection */}
      <div className="py-8 mx-6 sm:mx-12 lg:mx-20">
        <h2 className="text-xl font-bold pl-20 text-center">Aktivity</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mt-8">
          {[
            { title: 'Bazén', image: 'pool.png', description: 'Užite si relaxáciu v modernom bazéne.' },
            { title: 'Pláž', image: 'beach.jpg', description: 'Piesočná pláž je len pár krokov od apartmánu.' },
            { title: 'Soľné jazerá', image: 'salt-lakes.png', description: 'Navštívte nádherné liečivé soľné jazerá.' },
            { title: 'Wakepark', image: 'wakepark.png', description: 'Zažite adrenalín na vode v modernom wakeparku.' },
            { title: 'Golf', image: 'golf.png', description: 'Zahrajte si golf na profesionálnych ihriskách.' },
            { title: 'Beh a bicyklovanie', image: 'running-cycling.jpg', description: 'Beh či cyklistika v krásnom prostredí.' },
            { title: 'Safari Elche', image: 'safari.png', description: 'Objavte exotické zvieratá v Safari Elche.' },
            { title: 'Aquapark', image: 'aquapark.jpg', description: 'Zábava a tobogány v aquaparku.' },
            { title: 'Trhy', image: 'market.png', description: 'Navštívte miestne trhy plné tradičných produktov.' },
            { title: 'Historické miesta', image: 'historical-places.jpg', description: 'História v blízkych historických miestach.' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <div className="w-32 h-32">
                <GatsbyImage
                  image={activityImages[activity.image]!}
                  alt={activity.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="mt-4 text-lg font-bold">{activity.title}</h3>
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