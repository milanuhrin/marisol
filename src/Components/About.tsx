import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { graphql, useStaticQuery } from 'gatsby';
import { getImage, GatsbyImage, IGatsbyImageData } from 'gatsby-plugin-image';
import { TitleText } from './export';
import { SectionDividerWaveOneSide } from 'svg/SectionDividerWaveOneSide';
import { hero2ImageLayouts } from 'Utilities/Data';
import { cardVariants } from 'Utilities/motionVariants';
import { useMediaQuery } from "react-responsive";

const About = () => {
  const [activeTab, setActiveTab] = useState(0); // Added state for active tab

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
      { icon: "fa-water", text: "Výhľad na more" },
      { icon: "fa-parking", text: "Parkovanie zdarma" },
      { icon: "fa-snowflake", text: "Klimatizácia" },
      { icon: "fa-baby", text: "Detská postieľka" },
      { icon: "fa-glass-cheers", text: "Presklená terasa" },
      { icon: "fa-lock", text: "Uzavretý areál" },
      { icon: "fa-tshirt", text: "Žehlička" },
      { icon: "fa-chair", text: "Detská stolička" },
      { icon: "fa-sun", text: "Otvorená terasa" },
      { icon: "fa-wifi", text: "Internet" },
      { icon: "fa-wind", text: "Sušiak" },
      { icon: "fa-puzzle-piece", text: "Hračky" },
      { icon: "fa-utensils", text: "Jedálenský stôl" },
      { icon: "fa-desktop", text: "Pracovné miesto" },
      { icon: "fa-broom", text: "Vysávač" },
      { icon: "fa-dice", text: "Spoločenské hry" },
  ];
  
  const smallScreenBenefits = [
      { icon: "fa-water", text: "Výhľad na more" },
      { icon: "fa-snowflake", text: "Klimatizácia" },
      { icon: "fa-glass-cheers", text: "Presklená terasa" },
      { icon: "fa-tshirt", text: "Žehlička" },
      { icon: "fa-sun", text: "Otvorená terasa" },
      { icon: "fa-wind", text: "Sušiak" },
      { icon: "fa-utensils", text: "Jedálenský stôl" },
      { icon: "fa-broom", text: "Vysávač" },
      { icon: "fa-parking", text: "Parkovanie zdarma" },
      { icon: "fa-baby", text: "Detská postieľka" },
      { icon: "fa-lock", text: "Uzavretý areál" },
      { icon: "fa-chair", text: "Detská stolička" },
      { icon: "fa-wifi", text: "Internet" },
      { icon: "fa-puzzle-piece", text: "Hračky" },
      { icon: "fa-desktop", text: "Pracovné miesto" },
      { icon: "fa-dice", text: "Spoločenské hry" },
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
      title: "Spálňa 1",
      image: featuresImages["spalna1.jpg"],
      features: [
        "manželská posteľ",
        "skrine a nábytok",
        "posteľné prádlo",
        "vešiaky",
        "televízor / Netflix",
      ],
    },
    {
    title: "Spálňa 2",
    image: featuresImages["spalna2.jpg"],
    features: [
      "2x jednolôžková posteľ",
      "skrine a nábytok",
      "pracovné miesto",
      "posteľné prádlo",
      "vešiaky",    ],
    },
    {
      title: "Obývačka",
      image: featuresImages["obyvacka.jpg"], // Replace with the actual image path
      features: [
        "rozkladacia pohovka",
        "kreslá",
        "konferenčné stolíky",
        "barový stôl",
        "knižnica a knihy",
        "televízor / Netflix",
      ],
    },
    {
      title: "Kúpeľňa",
      image: featuresImages["kupelna.jpg"],
      features: [
        "sprchový kút",
        "wc a umývadlo",
        "kúpeľňový nábytok",
        "fén",
        "sprchový gél",
        "tekuté mydlo",
        "uteráky",
      ],
    },
    {
      title: "Kuchyňa",
      image: featuresImages["kuchyna.jpg"],
      features: [
          "chladnička",
          "elektrická rúra",
          "mikrovlnka",
          "varná doska",
          "práčka",
          "príbory a taniere",
          "poháre",
          "hrnce",
          "kávovar",
          "varná kanvica",
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
        <TitleText>O apartmáne Marisol</TitleText>
        <div className="px-12 lg:px-28 text-justify text-base font-medium leading-6 text-gray-500 mb-4 mt-8 max-w-screen-lg mx-auto">
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
      <h2 className="text-xl font-bold text-center mb-8 mt-8">Vybavenie apartmánu</h2>

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
            {section.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 px-16 sm:px-28">
        <div>
          <h3 className="text-xl font-bold mb-4">{sections[activeTab].title}</h3>
          <div className="pl-3 sm:pl-0">
            <ul className="space-y-3 text-gray-600">
              {sections[activeTab].features.map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  <i className="fas fa-check text-black text-xl"></i>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center items-center">
          {sections[activeTab].image ? (
            <GatsbyImage
              image={sections[activeTab].image!}
              alt={sections[activeTab].title}
              className="rounded-lg shadow-lg object-cover sm:w-full"
            />
          ) : (
            <p>No image available</p>
          )}
        </div>
      </div>

      {/* Add Gray Line Below */}
      <div className="border-b border-gray-300 w-full mt-6 px-4 sm:px-28"></div>
    </motion.div>
    {/* Add Benefits Section */}
    <motion.div className="py-8 max-w-screen-lg mx-auto">
        <h2 className="text-xl font-bold text-center mb-8 ">Ponúkame nasledovné benefity</h2>
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
  <h2 className="text-xl font-bold text-center mb-8">Naše podmienky</h2>

  {/* Responsive Grid */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 px-12">
    {/* Left Column */}
    <div className="flex flex-col space-y-2">
      {[
        { label: "Check-in:", value: "15:00" },
        { label: "Check-out:", value: "11:00" },
        { label: "Záloha:", value: "20% pri potvrdení rezervácie" },
        { label: "Doplatok:", value: "80% 14 dní pred pobytom" }
      ].map((item, index) => (
        <div key={index} className="flex w-full">
          <span className="font-bold text-gray-700 w-1/2 sm:w-1/3 text-left">{item.label}</span>
          <span className="text-gray-600 w-1/2 sm:w-2/3 text-left pl-8 sm:pl-0">{item.value}</span>
        </div>
      ))}
    </div>

    {/* Right Column */}
    <div className="flex flex-col space-y-2">
      {[
        { label: "Domáce zvieratá:", value: "🚫" },
        { label: "Fajčenie:", value: "🚫" },
        { label: "Párty:", value: "🚫" },
        { label: "Bezbariérový prístup:", value: "🚫" }
      ].map((item, index) => (
        <div key={index} className="flex w-full">
          <span className="font-bold text-gray-700 w-1/2 sm:w-1/3 text-left">{item.label}</span>
          <span className="text-red-600 w-1/2 sm:w-2/3 text-left pl-8 sm:pl-0">{item.value}</span>
        </div>
      ))}
    </div>
  </div>
</motion.div>

    {/* Aktivity Subsection */}
      <div className="py-8 max-w-screen-lg mx-auto">
        <h2 className="text-xl font-bold text-center ">Aktivity a atrakcie</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8 mx-6 sm:mx-12 lg:mx-20 ">
          {[
            { title: 'Bazén', image: 'pool.png', description: 'Okúpte sa v spoločnom bazéne po celý rok. Je priamo pred apartmánom. Pozostáva z dvoch častí - pre dospelých aj pre deti.' },
            { title: 'Pláž', image: 'beach.jpg', description: 'V blízkosti apartmánu nájdete niekoľko pekných piesočnatých pláží, no určite najobľúbenejšou je pláž La Mata, ktorá získava každý rok modrú vlajku. Je široká a dlhá, tiahne sa až do vedľajšieho mesta. ' },
            { title: 'Soľné jazerá', image: 'salt-lakes.png', description: 'Európsky unikát, ružové soľné jazerá, ktoré lákajú fotografov, no najmä vytvárajú ozdravnú mimroklímu, ktorú len tak niekde nenájdete. V minulosti dostalo mesto vďaka nim aj ocenenie WHO. Nezabudnite si odfotiť plameniaky, postávajúce priamo v jazerách.' },
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