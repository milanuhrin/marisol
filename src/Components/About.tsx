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
        viewport={{ amount: 0, once: true }}
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
          <div className="z-10 grid max-w-[33rem] grid-cols-12 grid-rows-2 gap-4 pl:20 justify-self-center sm:col-start-1 sm:row-start-1">
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
          {/* Icon-Based Section */}
          <motion.div
            className="z-10 flex flex-col gap-8 sm:col-start-2 sm:row-start-1 sm:self-center sm:justify-self-center"
            initial="offscreen"
            whileInView="onscreen"
            variants={cardVariants}
          >
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-4 sm:text-left mt-4">
              {[
                { icon: 'fa-user', text: '5 osôb' },
                { icon: 'fa-bed', text: '2 spálne' },
                { icon: 'fa-cocktail', text: 'presklená terasa' },
                { icon: 'fa-bath', text: '1 kúpeľňa' },
                { icon: 'fa-swimming-pool', text: 'bazén' },
                { icon: 'fa-plane', text: 'letisko 35 min autom' },
                { icon: 'fa-umbrella-beach', text: 'pláž 10 min pešo' },
                { icon: 'fa-utensils', text: 'reštaurácie 5 min pešo' },
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-6 text-base font-medium text-gray-500">
                  <span className=" text-transparent bg-clip-text from-snakeGr1 to-snakeGr2 bg-gradient-to-r">
                    <i className={`fas ${item.icon}`}></i>
                  </span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}


      {/* Vybavenie Apartmánu */}
      <motion.div
      className="py-8"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0.1, once: true }}
      variants={cardVariants}
        
      >
        <h2 className="text-xl font-bold text-center mb-8 mt-4">Vybavenie apartmánu a podmienky</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-12">
          {/* Kuchyňa */}
          <div className="p-6 border rounded-lg shadow-lg bg-gray-50 w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">2 spálne</h3>
            <ul className="space-y-3">
              {[
                'manželská posteľ',
                '2x jednolôžková posteľ',
                'skrine a nábytok',
                'pracovné miesto',
                'posteľné prádlo',
                'vešiaky',
                'televízor / Netflix'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm font-normal text-gray-500">
                  <span className="text-sm text-gray-700">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Kúpeľňa */}
          <div className="p-6 border rounded-lg shadow-lg bg-gray-50 w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Kúpeľňa</h3>
            <ul className="space-y-3">
              {[
                'sprchový kút',
                'wc a umývadlo',
                'kúpeľňový nábytok',
                'fén',
                'sprchový gél',
                'tekuté mydlo',
                'uteráky',
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm font-normal text-gray-500">
                  <span className="text-sm text-gray-700">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Obývačka */}
          <div className="p-6 border rounded-lg shadow-lg bg-gray-50 w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Kuchyňa</h3>
            <ul className="space-y-3">
              {[
                'chladnička', 
                'elektrická rúra', 
                'mikrovlnka', 
                'varná doska', 
                'práčka',
                'príbory a taniere',
                'poháre',
                'hrnce',
                'kávovar',
                'varná kanvica'
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm font-normal text-gray-500">
                  <span className="text-sm text-gray-700">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Spálňa */}
          <div className="p-6 border rounded-lg shadow-lg bg-gray-50 w-full">
            <h3 className="text-lg font-semibold mb-4 text-gray-700">Obývačka</h3>
            <ul className="space-y-3">
              {['rozkladacia pohovka',
               'kreslá',
                'konferenčné stolíky',
                'barový stôl',
                'knižnica a knihy',
                'televízor / Netflix'
                ].map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm font-normal text-gray-500">
                  <span className="text-sm text-gray-700">✔</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Aktivity Subsection */}
      <div className="py-8">
        <h2 className="text-xl font-bold text-center ">Aktivity a atrakcie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 mx-6 sm:mx-12 lg:mx-20 ">
          {[
            { title: 'Bazén', image: 'pool.png', description: 'Okúpte sa v spoločnom bazéne po celý rok. Je priamo pred apartmánom. Pozostáva z dvoch častí - pre dospelých aj pre deti.' },
            { title: 'Pláž', image: 'beach.jpg', description: 'V blízkosti apartmánu nájdete niekoľko pekných piesočnatých pláží, no určite najobľúbenejšou je pláž La Mata, ktorá získava každý rok modrú vlajku. Je široká a dlhá, tiahne sa až do vedľajšieho mesta. ' },
            { title: 'Soľné jazerá', image: 'salt-lakes.jpg', description: 'Európsky unikát, ružové soľné jazerá, ktoré lákajú fotografov, no najmä vytvárajú ozdravnú mimroklímu, ktorú len tak niekde nenájdete. V minulosti dostalo mesto vďaka nim aj ocenenie WHO. Nezabudnite si odfotiť plameniaky, postávajúce priamo v jazerách.' },
            { title: 'Trhy', image: 'market.png', description: 'Obľúbenou atrakciou pre turistov i domácich sú jednoznačne pouličné trhy, ktoré sa konajú pravidelne, v konkrétny deň v týždni v jednotlivých častiach mesta. Kúpite tam najmä čerstvé ovocie a zeleninu, lokálne jedlá, ale i oblečenie.' },
            { title: 'Wakepark', image: 'wakepark.png', description: 'Pre milovníkov vodných športov je moderný wakepark Mosquito ideálnou voľbou. Nachádza sa len 6 km od apartmánu.' },
            { title: 'Golf', image: 'golf.png', description: 'V okruhu 15km od apartmánu nájdete viac ako desiatku kvalitných golfových ihrísk. Vyskúšajte napríklad obľúbený Greenlands sport club, bude sa vám páčiť.' },
            { title: 'Beh a bicyklovanie', image: 'running.png', description: 'Ak aj vy milujete beh, prechádzky, či byciklovanie, môžte vyraziť ešte pred raňajkami, na ktorúkoľvek stranu. Odporúčame však najmä krásny Molino Park na piesočných dunách, chodníky pri skalných útesoch, či pokojne jógu v susednom Torre Del Moro parku.' },
            { title: 'Parasailing', image: 'parasailing.png', description: 'Zažite nezabudnuteľný adrenalínový zážitok z lietania nad morom.' },
            { title: 'Safari Elche', image: 'safari.png', description: 'S deťmi, či bez nich, vyrazte do ZOO Safari Elche, ktoré sa nachádza 30 minút autom od apartmánu. O program budete mať postarané.' },
            { title: 'Požičovňa lodí', image: 'boat-rental.png', description: 'Preskúmajte pobrežie a okolitý oceán vlastným tempom s prenajatou loďou.' },
            { title: 'Aquapark', image: 'aquapark.png', description: 'Strávte aj celý deň v aquaparku Aquopolis Torrevieja. Je otvorený v letných mesiacoch a ponúka zábavu i relax. Nachádza sa 4 km od apartmánu.' },
            { title: 'Historické miesta', image: 'old-town.png', description: 'Torrevieja bola v minulosti rybárska dedina, ktorá mnohopočetne narástla vďaka ťažbe soli. Svoje meno získala po starobylej strážnej veži, ktorú nájdete priamo v susednom Torre del Moro parku. Určite vás však potešia večerné prechádzky centrom Torreviejy, kde sa vám zapáči niekoľko historických miest.' },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-justify p-4 bg-white rounded-lg shadow-md transition-transform hover:scale-105"
            >
              <div className="w-32 h-32">
                <GatsbyImage
                  image={activityImages[activity.image]!}
                  alt={activity.title}
                  className="w-full h-full object-cover rounded-lg"
                />
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