import React, { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TitleText } from "./TitleText";
import { useI18n } from "i18n/LanguageProvider";
import { sectionVariants } from "Utilities/motionVariants";

const FACEBOOK_REVIEWS_URL =
  "https://www.facebook.com/profile.php?id=61572969472888&sk=reviews";

const reviews = [
  {
    name: "Diana M.",
    date: "Júl 2026",
    platform: "Facebook",
    expandable: false,
    text: "Ubytovanie v Marisol Seaview apartment vrelo odporúčam každému, je to naozaj nádherné miesto, ubytovanie nemalo žiadnu chybu, absolútna topka, bazén tiež vynikajúci a komunikácia s prenajímateľom bola tiež výborná. Určite sa radi vrátime na toto čarovné miesto ❤️",
  },
  {
    name: "We We",
    date: "Jún 2026",
    platform: "Facebook",
    text: "Krásny, super zariadený apartmán. Boli sme tu aj s dvoma malými deťmi a veľmi sa nám tu páčilo. Komunikácia s pani majiteľkou aj s pani priamo na mieste na 1*. Sú veľmi ochotné a vedia perfektne poradiť, či už potrebujete poradiť s výletom alebo požičaním auta, taktiež aj v prípade nejakej núdze, keď sme napríklad potrebovali lekára. Ďakujeme 🤩🙂",
  },
  {
    name: "Lukáš N.",
    date: "Marec 2026",
    platform: "Facebook",
    text: "Krásne spracovaná webová stránka, výborná komunikácia, ktorá ma ešte pred pobytom ubezpečila v tom, že pobyt v apartmáne Marisol bude bezproblémový. Jasné pokyny pred príchodom na ubytovanie, v apartmáne sme našli všetko potrebné – vybavenie kuchyne, 2× TV, kapsule do práčky, hygienické potreby, kapsule Dolce Gusto, koreniny... naozaj všetko, čo potrebujete. S manželkou, ktorá je detská animátorka a umelec SMEJLINKA, sme veľmi pozitívne ocenili rôzne spoločenské hry a hračky, ktoré boli v apartmáne. Rovnako tiež hračky do piesku a stoličky na pláž. Môžem len odporúčať všetkými desiatimi. Keď sa niekedy vrátime, veľmi radi sa opäť ubytujeme v apartmáne Marisol. Ďakujeme veľmi pekne.",
  },
  {
    name: "Monika B.",
    date: "Február 2026",
    platform: "Facebook",
    text: "Beautiful and spacious apartment, great layout, office area in the second bedroom, and some sea views too. It has everything you could need. I stayed for 3 weeks, and will likely come back next year. Fast WiFi, 2 smart TVs. It's in a great area, within walking distance to the beach, many restaurants and supermarkets. The bus stop is a 2 min walk. Michaela was amazing to deal with as well. Highly recommend. 💛",
  },
  {
    name: "Jeanette",
    date: "Október 2025",
    platform: "Airbnb",
    rating: 5,
    text: "Very nice and well planned apartment. Plenty of good equipment and everything you needed was there. Clean and fresh and tidy. Extra plus because the bed was clean and fresh! Everything worked out perfectly! Very friendly host who responded quickly. Walking distance to swimming, bus and grocery store, restaurants etc. Can't be better! Would love to come back! ⭐️💛⭐️",
  },
  {
    name: "Anna L.",
    date: "Október 2025",
    platform: "Facebook",
    text: "Apartmán je krásny, čistý, útulne zariadený, priestranný a veľmi dobre vybavený. Vrátane kníh, hier, aj slnečníkov a stoličiek na pláž. Bazén vo vnútrobloku je veľké plus. Blízko sú reštaurácie, do 10 minút veľké potraviny, kde majú plody mora od výmyslu sveta. Naproti je park, z ktorého sme pozorovali východy Slnka. Chodievali sme najmä na pláž La Mata – piesková s pozvoľným vstupom do mora. V okolí je množstvo miest na spoznávanie a výlety. A skvelé je aj to, že sa tu neskoro stmieva. Odporúčam aj komunikáciu, na 1*.",
  },
  {
    name: "Sandra",
    date: "August 2025",
    platform: "Airbnb",
    rating: 5,
    text: "We had a fantastic stay at this property! The location was perfect — just a short walk to many great restaurants and with easy access to local shops. The beach was only a few minutes drive, which made it ideal for relaxing days by the sea. The accommodation was comfortable, clean, and well-equipped, making our stay very enjoyable. We would definitely recommend it to anyone visiting the area and would love to return!",
  },
  {
    name: "Alena R.",
    date: "Jún 2025",
    platform: "Facebook",
    text: "Začiatkom júna sme strávili týždeň na tomto nádhernom mieste. Apartmán má výbornú polohu, blízko k moru. Pláže čisté, obchody, bary a reštaurácie všade naokolo. Apartmán je ale v pokojnom rezorte na kľúč, cítili sme sa naozaj komfortne a bezpečne. V areáli je aj udržiavaný bazén na plávanie, aj pre detičky. Okolo bazéna krásne olivovníky... milujem 😍. Vybavenie v apartmáne úplne postačuje na varenie, umývačka potešila. Všade čisto a voňavo. Majitelia maximálne príjemní a ústretoví, zabezpečili nám aj taxi z letiska. Oddýchli sme si neskutočne, radi sa budeme na toto úžasné miesto vracať ❤️🙏🏻",
  },
  {
    name: "Isabell .P",
    date: "Marec 2025",
    platform: "Facebook",
    text: "We had a great stay! The apartment was a perfect base for relaxing and still being close to other cities for day trips. It was very clean and had great amenities (coffee machine, washing machine...). It has a good location – close to the beach (about 15 min walking) and there is also a swimming pool in the apartment complex. I would definitely recommend and stay here again! ☺️",
  },
];

const Testimonials = () => {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [activeReview, setActiveReview] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({ active: false, startX: 0, scrollLeft: 0 });

  const getClosestReview = () => {
    const track = trackRef.current;
    if (!track) return 0;

    return Array.from(track.children).reduce(
      (closest, child, index) =>
        Math.abs(
          (child as HTMLElement).offsetLeft -
            track.offsetLeft -
            track.scrollLeft
        ) <
        closest.distance
          ? {
              index,
              distance: Math.abs(
                (child as HTMLElement).offsetLeft -
                  track.offsetLeft -
                  track.scrollLeft
              ),
            }
          : closest,
      { index: 0, distance: Number.POSITIVE_INFINITY }
    ).index;
  };

  const scrollToReview = (index: number) => {
    const track = trackRef.current;
    const target = track?.children[index] as HTMLElement | undefined;
    if (!track || !target) return;
    track.scrollTo({
      left: target.offsetLeft - track.offsetLeft,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
    setActiveReview(index);
  };

  return (
    <motion.section
      id="testimonials"
      className="scroll-mt-12 bg-gradient-to-b from-white to-[#e6f6ff] px-4 py-8 text-center sm:px-6"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.01 }}
      variants={sectionVariants}
    >
      <TitleText>{t("testimonials.title")}</TitleText>
      <p className="mx-auto mt-3 max-w-xl text-sm font-medium text-gray-500 sm:text-base">
        {t("testimonials.summary")}
      </p>

      <div className="testimonials-carousel mx-auto mt-10 max-w-screen-lg pb-10">
        <button
          type="button"
          className="testimonials-arrow testimonials-arrow-prev"
          onClick={() => scrollToReview(Math.max(0, activeReview - 1))}
          aria-label={t("testimonials.previous")}
          disabled={activeReview === 0}
        >
          ‹
        </button>
        <div
          ref={trackRef}
          className="testimonials-track"
          onScroll={() => setActiveReview(getClosestReview())}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse") return;
            if ((event.target as HTMLElement).closest("a, button")) return;
            dragRef.current = {
              active: true,
              startX: event.clientX,
              scrollLeft: event.currentTarget.scrollLeft,
            };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (event.pointerType !== "mouse") return;
            if (!dragRef.current.active) return;
            event.currentTarget.scrollLeft =
              dragRef.current.scrollLeft -
              (event.clientX - dragRef.current.startX);
          }}
          onPointerUp={(event) => {
            if (event.pointerType !== "mouse") return;
            dragRef.current.active = false;
            if (event.currentTarget.hasPointerCapture(event.pointerId)) {
              event.currentTarget.releasePointerCapture(event.pointerId);
            }
            scrollToReview(getClosestReview());
          }}
          onPointerCancel={() => {
            dragRef.current.active = false;
          }}
        >
          {reviews.map((review, index) => {
            const isExpanded = expandedReview === index;
            const isAirbnb = review.platform === "Airbnb";

            return (
              <div
                className="testimonial-slide"
                key={`${review.name}-${review.date}`}
              >
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
                        <div className="flex flex-wrap items-center gap-x-2 text-sm">
                          <span className="text-gray-400">{review.date}</span>
                          {review.rating && (
                            <span
                              className="tracking-wide text-amber-400"
                              aria-label={`${review.rating} ${t(
                                "testimonials.stars"
                              )}`}
                            >
                              {"★".repeat(review.rating)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm text-white ${
                        isAirbnb ? "bg-[#ff385c]" : "bg-[#1877f2]"
                      }`}
                      aria-hidden="true"
                    >
                      <i
                        className={`fab ${
                          isAirbnb ? "fa-airbnb" : "fa-facebook-f"
                        }`}
                      />
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
                    {isAirbnb ? (
                      <span className="text-[#ff385c]">Airbnb</span>
                    ) : (
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
                    )}
                  </div>
                </motion.article>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          className="testimonials-arrow testimonials-arrow-next"
          onClick={() =>
            scrollToReview(Math.min(reviews.length - 1, activeReview + 1))
          }
          aria-label={t("testimonials.next")}
          disabled={activeReview === reviews.length - 1}
        >
          ›
        </button>
        <div className="testimonials-dots" aria-label={t("testimonials.navigation")}>
          {reviews.map((review, index) => (
            <button
              type="button"
              key={`${review.name}-dot`}
              className={index === activeReview ? "is-active" : ""}
              onClick={() => scrollToReview(index)}
              aria-label={`${t("testimonials.go_to")} ${index + 1}`}
              aria-current={index === activeReview ? "true" : undefined}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Testimonials;
