import React from 'react';
import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage, GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { TitleText } from './export';
import { SectionDividerSharp } from 'svg/SectionDividerSharp';
import { hero2ImageLayouts, hero2Items } from 'Utilities/Data';
import { cardVariants } from 'Utilities/motionVariants';
import { SectionDividerWaveOneSide } from 'svg/SectionDividerWaveOneSide';

const About = () => {
  // Fetch images using GraphQL query
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
    }
  `);

  const hero2Images = data.hero2.edges.map((edge) => getImage(edge.node));

  return (
    <section id="about" className="text-center py-8 bg-gradient-to-b from-white to-[#e6f6ff]">
      <div className="py-8">
        <TitleText>O apartmáne Marisol</TitleText>
      </div>
      <div className="px-48 text-justify text-base font-medium leading-6 text-gray-500 mb-4">
        Krásny východ slnka nad morom, príjemná dovolenková atmosféra či voňavá káva na terase - to
        všetko môžete zažiť u nás, v apartmáne Marisol. Nachádza sa v jednej z najobľúbenejších
        lokalít mesta Torrevieja, blízko známeho mesta Alicante v Španielsku. Vedľa parku a tiež
        historického bodu mesta Torre del Moro. Mimo ruchu centra mesta a zároveň na krok od
        reštaurácií, supermarketu, lekárne, autobusovej zastávky, no najmä dlhej piesočnej pláže La
        Mata, ktorá je každoročne ocenená modrou vlajkou. Nezameniteľná liečivá mikroklíma, športové
        vyžitie i večerná zábava sú predpokladom pre prežitie nezabudnuteľnej dovolenky, či už pre
        páry, alebo rodiny.
      </div>

      {hero2Images.length >= 4 && (
        <div className="padding-X-2-18rem gap-3o5-6rem relative flex max-w-full flex-col sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:items-center sm:justify-center">
          {/* Images */}
          <div className="z-10 grid max-w-[33rem] grid-cols-12 grid-rows-2 gap-4 justify-self-center sm:col-start-1 sm:row-start-1">
            {hero2ImageLayouts.map((item, i) => (
              <motion.div
                key={i}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ margin: '60px', once: false }}
                whileHover={{ scale: 1.08 }}
                variants={{
                  ...cardVariants,
                  offscreen: { y: 150 },
                }}
                className={`z-20 h-auto w-auto rounded-lg object-cover ${item.class}`}
              >
                <GatsbyImage
                  imgClassName="rounded-lg w-auto block object-cover"
                  className="block w-auto rounded-lg shadow-xl"
                  image={hero2Images[i]!} // Non-null assertion
                  alt={`Gallery image ${i + 1}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Features */}
          <motion.div
            className="z-10 flex flex-col gap-[3.5rem] sm:col-start-2 sm:row-start-1 sm:self-center sm:justify-self-center"
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ margin: '400px', once: false }}
            variants={cardVariants}
          >
            <h2 className="text-xl font-bold">Čo ponúka apartmán Marisol</h2>
            <ul className="flex flex-col gap-6 self-center justify-self-center sm:grid sm:grid-cols-2">
              {hero2Items.map((name, i) => (
                <li
                  className={`${
                    i % 2 === 1 ? 'ml-[1.5rem]' : ''
                  } flex sm:ml-0 lg:mt-0`}
                  key={i}
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-300 text-green-800">
                    <svg
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a 1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </span>
                  <span className="ml-4 text-base font-medium leading-6 text-gray-500">
                    {name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        
        </div>
        
      )}
    {/* Add divider */}
    <SectionDividerWaveOneSide fill="#e6f6ff" />
    </section>
  );
};

export default About;