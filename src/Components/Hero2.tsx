import React from 'react';
import { GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { motion } from 'framer-motion';
import { hero2ImageLayouts, hero2Items } from 'Utilities/Data';
import { SectionDividerSharp } from 'svg/SectionDividerSharp';
import { cardVariants } from 'Utilities/motionVariants';
import { TitleText } from './Footer/TitleText';


interface Props {
  img1: IGatsbyImageData;
  img2: IGatsbyImageData;
  img3: IGatsbyImageData;
  img4: IGatsbyImageData;
  containerStyles?: string;
  textWrapperStyles?: string;
  ulStyles?: string;
  liStyles?: string;
  liTextStyles?: string;
  imageWrapper?: string;
}

export const Hero2 = (props: Props) => {
  const {
    img1,
    img2,
    img3,
    img4,
    textWrapperStyles = '',
    containerStyles = '',
    ulStyles = '',
    liStyles = '',
    liTextStyles = '',
    imageWrapper = '',
  } = props;

  /* eslint-disable no-console */
  console.log('Debugging Hero2 component rendered');
  console.log('Hero2 props:', props);
  /* eslint-enable no-console */
  const images = [img1, img2, img3, img4];

  return (
    
    <section
    id="about"
    className={`${containerStyles} padding-X-2-18rem gap-3o5-6rem relative flex max-w-full flex-col bg-gradient-to-b from-white to-[#f0f0f0] sm:grid sm:grid-cols-2 sm:grid-rows-1 sm:items-center sm:justify-center`}
    >        

        {/* Images */}
        <div
          className={`${imageWrapper} z-10 grid max-w-[33rem] grid-cols-12 grid-rows-2 gap-4 justify-self-center sm:col-start-1 sm:row-start-1`}
        >
          {hero2ImageLayouts.map((item, i) => (
            <motion.div
              key={i}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ margin: '60px', once: true }}
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
                image={images[i]}
                alt={`Gallery image ${i + 1}`}
              />
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <motion.div
          className={`${textWrapperStyles} z-10 flex flex-col gap-[3.5rem] sm:col-start-2 sm:row-start-1 sm:self-center sm:justify-self-center`}
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ margin: '400px', once: true }}
          variants={cardVariants}
        >
          <h2 className="text-xl font-bold">Vlastnosti apartmánu Marisol</h2>
          <ul
            className={`${ulStyles} flex flex-col gap-6 self-center justify-self-center sm:grid sm:grid-cols-2`}
          >
            {hero2Items.map((name, i) => (
              <li
                className={`${
                  i % 2 === 1 ? 'ml-[1.5rem]' : ''
                } ${liStyles} flex sm:ml-0 lg:mt-0`}
                key={i}
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-800">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a 1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </span>
                <span
                  className={`${liTextStyles} ml-4 text-base font-medium leading-6 text-gray-500`}
                >
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <SectionDividerSharp fill="#fafdfd" />
        {/* Section: Availability Calendar
            <div id="pricelist" className="text-center py-8">
          <TitleText>Cenník a dostupnosť apartmánu</TitleText>
          <div className="availability-calendar-container">
            Placeholder for the availability calendar
            <p className="text-gray-500">Kalendár dostupnosti bude pridaný neskôr.</p>
          </div> 
        </div> */}
      </section>
      
  );
};