import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TitleText } from "./TitleText";
import { useI18n } from "i18n/LanguageProvider";
import { sectionVariants } from "Utilities/motionVariants";

const FACEBOOK_REVIEWS_URL =
  "https://www.facebook.com/profile.php?id=61572969472888&sk=reviews";

const reviews = [
  {
    name: "Diana M.",
    date: "Júl 2026",
    expandable: false,
    text: "Ubytovanie v Marisol Seaview apartment vrelo odporúčam každému, je to naozaj nádherné miesto, ubytovanie nemalo žiadnu chybu, absolútna topka, bazén tiež vynikajúci a komunikácia s prenajímateľom bola tiež výborná. Určite sa radi vrátime na toto čarovné miesto ❤️",
  },
  {
    name: "We We",
    date: "Jún 2026",
    text: "Krásny, super zariadený apartmán. Boli sme tu aj s dvoma malými deťmi a veľmi sa nám tu páčilo. Komunikácia s pani majiteľkou aj s pani priamo na mieste na 1*. Sú veľmi ochotné a vedia perfektne poradiť, či už potrebujete poradiť s výletom alebo požičaním auta, taktiež aj v prípade nejakej núdze, keď sme napríklad potrebovali lekára. Ďakujeme 🤩🙂",
  },
  {
    name: "Lukáš N.",
    date: "Marec 2026",
    text: "Krásne spracovaná webová stránka, výborná komunikácia, ktorá ma ešte pred pobytom ubezpečila v tom, že pobyt v apartmáne Marisol bude bezproblémový. Jasné pokyny pred príchodom na ubytovanie, v apartmáne sme našli všetko potrebné – vybavenie kuchyne, 2× TV, kapsule do práčky, hygienické potreby, kapsule Dolce Gusto, koreniny... naozaj všetko, čo potrebujete. S manželkou, ktorá je detská animátorka a umelec SMEJLINKA, sme veľmi pozitívne ocenili rôzne spoločenské hry a hračky, ktoré boli v apartmáne. Rovnako tiež hračky do piesku a stoličky na pláž. Môžem len odporúčať všetkými desiatimi. Keď sa niekedy vrátime, veľmi radi sa opäť ubytujeme v apartmáne Marisol. Ďakujeme veľmi pekne.",
  },
  {
    name: "Monika B.",
    date: "Február 2026",
    text: "Beautiful and spacious apartment, great layout, office area in the second bedroom, and some sea views too. It has everything you could need. I stayed for 3 weeks, and will likely come back next year. Fast WiFi, 2 smart TVs. It's in a great area, within walking distance to the beach, many restaurants and supermarkets. The bus stop is a 2 min walk. Michaela was amazing to deal with as well. Highly recommend. 💛",
  },
  {
    name: "Anna L.",
    date: "Október 2025",
    text: "Apartmán je krásny, čistý, útulne zariadený, priestranný a veľmi dobre vybavený. Vrátane kníh, hier, aj slnečníkov a stoličiek na pláž. Bazén vo vnútrobloku je veľké plus. Blízko sú reštaurácie, do 10 minút veľké potraviny, kde majú plody mora od výmyslu sveta. Naproti je park, z ktorého sme pozorovali východy Slnka. Chodievali sme najmä na pláž La Mata – piesková s pozvoľným vstupom do mora. V okolí je množstvo miest na spoznávanie a výlety. A skvelé je aj to, že sa tu neskoro stmieva. Odporúčam aj komunikáciu, na 1*.",
  },
  {
    name: "Alena R.",
    date: "Jún 2025",
    text: "Začiatkom júna sme strávili týždeň na tomto nádhernom mieste. Apartmán má výbornú polohu, blízko k moru. Pláže čisté, obchody, bary a reštaurácie všade naokolo. Apartmán je ale v pokojnom rezorte na kľúč, cítili sme sa naozaj komfortne a bezpečne. V areáli je aj udržiavaný bazén na plávanie, aj pre detičky. Okolo bazéna krásne olivovníky... milujem 😍. Vybavenie v apartmáne úplne postačuje na varenie, umývačka potešila. Všade čisto a voňavo. Majitelia maximálne príjemní a ústretoví, zabezpečili nám aj taxi z letiska. Oddýchli sme si neskutočne, radi sa budeme na toto úžasné miesto vracať ❤️🙏🏻",
  },
];

const Testimonials = () => {
  const { t } = useI18n();
  const [expandedReview, setExpandedReview] = useState<number | null>(null);

  return (
    <motion.section
      id="testimonials"
      className="scroll-mt-12 bg-gradient-to-b from-white to-[#e6f6ff] px-4 py-16 text-center sm:px-6"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.01 }}
      variants={sectionVariants}
    >
      <TitleText>{t("testimonials.title")}</TitleText>
      <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-gray-500 sm:text-base">
        {t("testimonials.summary")}
      </p>

      <div className="testimonials-carousel mx-auto mt-10 max-w-screen-lg px-1 pb-10">
        <Swiper
          modules={[Mousewheel, Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          mousewheel={{ forceToAxis: true }}
          grabCursor
          simulateTouch
          allowTouchMove
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {reviews.map((review, index) => {
            const isExpanded = expandedReview === index;

            return (
              <SwiperSlide key={`${review.name}-${review.date}`}>
                <motion.article
                  className="group flex h-full flex-col rounded-2xl border border-cyan-100 bg-white p-6 text-left shadow-md transition-shadow duration-300 hover:shadow-xl sm:p-7"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#16303b] to-[#2C5364] text-base font-bold text-white">
                        {review.name.charAt(0)}
                      </span>
                      <div>
                        <p className="font-bold text-gray-700">{review.name}</p>
                        <p className="text-sm text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1877f2] text-sm text-white"
                      aria-hidden="true"
                    >
                      <i className="fab fa-facebook-f" />
                    </span>
                  </div>

                  <blockquote
                    className="text-base leading-7 text-gray-600"
                    style={
                      isExpanded
                        ? undefined
                        : {
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: 12,
                            overflow: "hidden",
                          }
                    }
                  >
                    <span
                      className="mr-1 text-2xl font-bold text-cyan-500"
                      aria-hidden="true"
                    >
                      “
                    </span>
                    {review.text}
                    <span
                      className="ml-1 text-2xl font-bold text-cyan-500"
                      aria-hidden="true"
                    >
                      ”
                    </span>
                  </blockquote>

                  {review.expandable !== false && (
                    <button
                      type="button"
                      className="mt-3 self-start text-sm font-semibold text-cyan-600 hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                      onClick={() =>
                        setExpandedReview(isExpanded ? null : index)
                      }
                      aria-expanded={isExpanded}
                    >
                      {isExpanded
                        ? t("testimonials.show_less")
                        : t("testimonials.show_more")}
                    </button>
                  )}

                  <div className="mt-auto flex items-center justify-center border-t border-gray-100 pt-4 text-sm font-semibold">
                    <a
                      href={FACEBOOK_REVIEWS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${review.name} – ${t(
                        "testimonials.open_facebook"
                      )}`}
                      className="shrink-0 text-[#1877f2] hover:underline focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                    >
                      {t("testimonials.open_facebook")}{" "}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                </motion.article>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </motion.section>
  );
};

export default Testimonials;
