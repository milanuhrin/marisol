//LanguageProvider.tsx
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

/** Types */
export type Lang = 'sk' | 'en';

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const I18nCtx = createContext<Ctx | null>(null);

/** ---- Translations ---- */
const translations: Record<Lang, Record<string, string>> = {
  sk: {
    // Headings & intro
    'about.title': 'O apartmáne',
    'about.longText':
      'Krásny východ slnka nad morom, príjemná dovolenková atmosféra či voňavá káva na terase - to všetko môžete zažiť u nás, v apartmáne Marisol. Nachádza sa v jednej z najobľúbenejších lokalít mesta Torrevieja, blízko známeho mesta Alicante v Španielsku. Vedľa parku a tiež historického bodu mesta Torre del Moro. Mimo ruchu centra mesta a zároveň na krok od reštaurácií, supermarketu, lekárne, autobusovej zastávky, no najmä dlhej piesočnej pláže La Mata, ktorá je každoročne ocenená modrou vlajkou. Nezameniteľná liečivá mikroklíma, športové vyžitie i večerná zábava sú predpokladom pre prežitie nezabudnuteľnej dovolenky, či už pre páry, alebo rodiny.',

    // Facts under hero image
    'about.facts.guests': '5 osôb',
    'about.facts.bedrooms': '2 spálne',
    'about.facts.glass_terrace': 'presklená terasa',
    'about.facts.bathrooms': '1 kúpeľňa',
    'about.facts.pool': 'bazén',
    'about.facts.airport': 'letisko 35 min autom',
    'about.facts.beach': 'pláž 10 min pešo',
    'about.facts.restaurants': 'reštaurácie 5 min pešo',

    // Equipment section
    'about.equipment.title': 'Vybavenie apartmánu',

    // Sections (tabs)
    'about.sections.bedroom1': 'Spálňa 1',
    'about.sections.bedroom1.feature.double_bed': 'manželská posteľ',
    'about.sections.bedroom1.feature.wardrobe': 'skrine a nábytok',
    'about.sections.bedroom1.feature.bedding': 'posteľné prádlo',
    'about.sections.bedroom1.feature.hangers': 'vešiaky',
    'about.sections.bedroom1.feature.tv_netflix': 'televízor / Netflix',

    'about.sections.bedroom2': 'Spálňa 2',
    'about.sections.bedroom2.feature.twin_beds': '2x jednolôžková posteľ',
    'about.sections.bedroom2.feature.wardrobe': 'skrine a nábytok',
    'about.sections.bedroom2.feature.workspace': 'pracovné miesto',
    'about.sections.bedroom2.feature.bedding': 'posteľné prádlo',
    'about.sections.bedroom2.feature.hangers': 'vešiaky',

    'about.sections.livingroom': 'Obývačka',
    'about.sections.livingroom.feature.sofa_bed': 'rozkladacia pohovka',
    'about.sections.livingroom.feature.armchairs': 'kreslá',
    'about.sections.livingroom.feature.coffee_tables': 'konferenčné stolíky',
    'about.sections.livingroom.feature.bar_table': 'barový stôl',
    'about.sections.livingroom.feature.library_books': 'knižnica a knihy',
    'about.sections.livingroom.feature.tv_netflix': 'televízor / Netflix',

    'about.sections.bathroom': 'Kúpeľňa',
    'about.sections.bathroom.feature.shower': 'sprchový kút',
    'about.sections.bathroom.feature.toilet_sink': 'wc a umývadlo',
    'about.sections.bathroom.feature.storage': 'kúpeľňový nábytok',
    'about.sections.bathroom.feature.hairdryer': 'fén',
    'about.sections.bathroom.feature.shower_gel': 'sprchový gél',
    'about.sections.bathroom.feature.soap': 'tekuté mydlo',
    'about.sections.bathroom.feature.towels': 'uteráky',

    'about.sections.kitchen': 'Kuchyňa',
    'about.sections.kitchen.feature.fridge': 'chladnička',
    'about.sections.kitchen.feature.oven': 'elektrická rúra',
    'about.sections.kitchen.feature.microwave': 'mikrovlnka',
    'about.sections.kitchen.feature.hob': 'varná doska',
    'about.sections.kitchen.feature.washing_machine': 'práčka',
    'about.sections.kitchen.feature.cutlery_dishes': 'príbory a taniere',
    'about.sections.kitchen.feature.glasses': 'poháre',
    'about.sections.kitchen.feature.pots': 'hrnce',
    'about.sections.kitchen.feature.coffee_machine': 'kávovar',
    'about.sections.kitchen.feature.kettle': 'varná kanvica',

    // Benefits
    'about.benefits.title': 'Ponúkame nasledovné benefity',
    'about.benefits.sea_view': 'Výhľad na more',
    'about.benefits.free_parking': 'Parkovanie zdarma',
    'about.benefits.ac': 'Klimatizácia',
    'about.benefits.baby_cot': 'Detská postieľka',
    'about.benefits.glass_terrace': 'Presklená terasa',
    'about.benefits.gated_area': 'Uzavretý areál',
    'about.benefits.iron': 'Žehlička',
    'about.benefits.high_chair': 'Detská stolička',
    'about.benefits.open_terrace': 'Otvorená terasa',
    'about.benefits.wifi': 'Internet',
    'about.benefits.drying_rack': 'Sušiak',
    'about.benefits.toys': 'Hračky',
    'about.benefits.dining_table': 'Jedálenský stôl',
    'about.benefits.workspace': 'Pracovné miesto',
    'about.benefits.vacuum': 'Vysávač',
    'about.benefits.board_games': 'Spoločenské hry',

    // More info
    'about.more_info.title': 'Ďalšie informácie',
    'about.more_info.checkin': 'Check-in:',
    'about.more_info.checkout': 'Check-out:',
    'about.more_info.deposit': 'Záloha:',
    'about.more_info.deposit_value': '20% pri potvrdení rezervácie',
    'about.more_info.balance': 'Doplatok:',
    'about.more_info.balance_value': '80% 14 dní pred pobytom',
    'about.more_info.pets': 'Domáce zvieratá:',
    'about.more_info.smoking': 'Fajčenie:',
    'about.more_info.accessible': 'Bezbariérový prístup:',

    // Activities
    'about.activities.title': 'Aktivity a atrakcie',
    'about.activities.pool.title': 'Bazén',
    'about.activities.pool.desc':
      'Okúpte sa v spoločnom bazéne po celý rok. Je priamo pred apartmánom. Pozostáva z dvoch častí - pre dospelých aj pre deti.',
    'about.activities.beach.title': 'Pláž',
    'about.activities.beach.desc':
      'V blízkosti apartmánu nájdete niekoľko pekných piesočnatých pláží, no určite najobľúbenejšou je pláž La Mata, ktorá získava každý rok modrú vlajku. Je široká a dlhá, tiahne sa až do vedľajšieho mesta. ',
    'about.activities.salt_lakes.title': 'Soľné jazerá',
    'about.activities.salt_lakes.desc':
      'Európsky unikát, ružové soľné jazerá, ktoré lákajú fotografov, no najmä vytvárajú ozdravnú mikroklímu, ktorú len tak niekde nenájdete. V minulosti dostalo mesto vďaka nim aj ocenenie WHO. Nezabudnite si odfotiť plameniaky, postávajúce priamo v jazerách.',
    'about.activities.history.title': 'Historické miesta',
    'about.activities.history.desc':
      'Torrevieja bola v minulosti rybárska dedina, ktorá mnohopočetne narástla vďaka ťažbe soli. Svoje meno získala po starobylej strážnej veži, ktorú nájdete priamo v susednom Torre del Moro parku. Určite vás však potešia večerné prechádzky centrom Torreviejy, kde sa vám zapáči niekoľko historických miest.',
    'about.activities.safari.title': 'Safari Elche',
    'about.activities.safari.desc':
      'S deťmi, či bez nich, vyrazte do ZOO Safari Elche, ktoré sa nachádza 30 minút autom od apartmánu. O program budete mať postarané.',
    'about.activities.market.title': 'Trhy',
    'about.activities.market.desc':
      'Obľúbenou atrakciou pre turistov i domácich sú jednoznačne pouličné trhy, ktoré sa konajú pravidelne, v konkrétny deň v týždni v jednotlivých častiach mesta. Kúpite tam najmä čerstvé ovocie a zeleninu, lokálne jedlá, ale i oblečenie.',
    'about.activities.aquapark.title': 'Aquapark',
    'about.activities.aquapark.desc':
      'Strávte aj celý deň v aquaparku Aquopolis Torrevieja. Je otvorený v letných mesiacoch a ponúka zábavu i relax. Nachádza sa 4 km od apartmánu.',
    'about.activities.watersports.title': 'Vodné športy',
    'about.activities.watersports.desc':
      'Pre milovníkov vodných športov je moderný wakepark Mosquito ideálnou voľbou. Nachádza sa len 6 km od apartmánu. Okrem toho môžete vyskúšať parasailing, flyboard, surfovanie, alebo pokojnejší paddle board.',
    'about.activities.running.title': 'Beh a bicyklovanie',
    'about.activities.running.desc':
      'Ak aj vy milujete beh, prechádzky, či bicyklovanie, môžete vyraziť ešte pred raňajkami, na ktorúkoľvek stranu. Odporúčame však najmä krásny Molino Park na piesočných dunách, chodníky pri skalných útesoch, či pokojne jógu v susednom Torre Del Moro parku.',
    'about.activities.golf.title': 'Golf',
    'about.activities.golf.desc':
      'V okruhu 15 km od apartmánu nájdete viac ako desiatku kvalitných golfových ihrísk. Vyskúšajte napríklad obľúbený Greenlands sport club, bude sa vám páčiť.',

    'about.no_image': 'Obrázok nie je k dispozícii',

    // Gallery
    'gallery.title': 'Galéria',

    // Pricelist
    'pricelist.title': 'Cenník na rok 2025',
    'pricelist.period': 'Obdobie',
    'pricelist.one_night': '1 noc*',
    'pricelist.ten_nights': '10+ nocí',
    'pricelist.thirty_nights': '30+ nocí',
    'pricelist.jan_apr': 'Január – Apríl',
    'pricelist.may': 'Máj',
    'pricelist.jun': 'Jún',
    'pricelist.jul_aug': 'Júl – August',
    'pricelist.sep': 'September',
    'pricelist.oct': 'Október',
    'pricelist.nov_dec': 'November – December',
    'pricelist.note': '* Apartmán je možné rezervovať minimálne na 3 noci.',
    'pricelist.transfer_title': 'Zabezpečíme vám transfer z letiska Alicante do apartmánu a naspäť',
    'pricelist.price': 'Cena',
    'pricelist.transfer_desc': 'Cena za jeden smer (celé auto - max. 4 osoby)',

    // SK
    'availability.title': 'Obsadenosť',
    'availability.legend.past': 'minulosť',
    'availability.legend.booked': 'obsadený',
    'availability.legend.available': 'voľný',
    'months.january':'Január','months.february':'Február','months.march':'Marec','months.april':'Apríl',
    'months.may':'Máj','months.june':'Jún','months.july':'Júl','months.august':'August',
    'months.september':'September','months.october':'Október','months.november':'November','months.december':'December',
    'daysShort.mon':'Po','daysShort.tue':'Ut','daysShort.wed':'St','daysShort.thu':'Št','daysShort.fri':'Pi','daysShort.sat':'So','daysShort.sun':'Ne',

    // Reservation
    'reservation.title': 'Predbežná rezervácia',
    'reservation.first_name': 'Meno',
    'reservation.last_name': 'Priezvisko',
    'reservation.email': 'Email',
    'reservation.guests': 'Počet hostí',
    'reservation.check_in': 'Check-in',
    'reservation.check_out': 'Check-out',
    'reservation.message': 'Správa',
    'reservation.placeholder': 'Napíšte akékoľvek ďalšie informácie alebo otázky k rezervácii...',
    'reservation.sending': 'Odosielanie...',
    'reservation.submit': 'Rezervovať',
    'reservation.success': '✅ Rezervácia bola úspešne odoslaná.',
    'reservation.error': '❌ Chyba',
    'reservation.try_again': 'Skúste znova.',
    'reservation.network_error': '❌ Nepodarilo sa odoslať rezerváciu. Skontrolujte pripojenie.',

    // Contact
    'contact.title': 'Kontaktujte nás na:',
    'contact.whatsapp': 'Napíšte nám na WhatsApp',
    'contact.facebook': 'Sledujte nás na Facebooku',
    'contact.instagram': 'Sledujte nás na Instagrame',
    'contact.location': 'Poloha apartmánu',

    // Footer
    'footer.navigate': 'Spustiť navigáciu:',
  },

  en: {
    // Headings & intro
    'about.title': 'About the apartment',
    'about.longText':
      'A beautiful sunrise over the sea, a pleasant holiday atmosphere, or fragrant coffee on the terrace – all this you can experience with us at Marisol Apartment. It is located in one of the most popular areas of Torrevieja, near the well-known city of Alicante in Spain. Next to a park and also the historic landmark Torre del Moro. Away from the hustle and bustle of the city center, yet just steps from restaurants, a supermarket, a pharmacy, a bus stop, and above all the long sandy La Mata beach, which is awarded the Blue Flag every year. The unique healing microclimate, opportunities for sports, and evening entertainment are the perfect ingredients for an unforgettable holiday, whether for couples or families.',

    // Facts under hero image
    'about.facts.guests': '5 guests',
    'about.facts.bedrooms': '2 bedrooms',
    'about.facts.glass_terrace': 'glass terrace',
    'about.facts.bathrooms': '1 bathroom',
    'about.facts.pool': 'pool',
    'about.facts.airport': 'airport 35 min by car',
    'about.facts.beach': 'beach 10 min by walk',
    'about.facts.restaurants': 'restaurants 5 min by walk',

    // Equipment section
    'about.equipment.title': 'Apartment equipment',

    // Sections (tabs)
    'about.sections.bedroom1': 'Bedroom 1',
    'about.sections.bedroom1.feature.double_bed': 'double bed',
    'about.sections.bedroom1.feature.wardrobe': 'wardrobes and furniture',
    'about.sections.bedroom1.feature.bedding': 'bed linen',
    'about.sections.bedroom1.feature.hangers': 'hangers',
    'about.sections.bedroom1.feature.tv_netflix': 'TV / Netflix',

    'about.sections.bedroom2': 'Bedroom 2',
    'about.sections.bedroom2.feature.twin_beds': 'two single beds',
    'about.sections.bedroom2.feature.wardrobe': 'wardrobes and furniture',
    'about.sections.bedroom2.feature.workspace': 'workspace',
    'about.sections.bedroom2.feature.bedding': 'bed linen',
    'about.sections.bedroom2.feature.hangers': 'hangers',

    'about.sections.livingroom': 'Living room',
    'about.sections.livingroom.feature.sofa_bed': 'sofa bed',
    'about.sections.livingroom.feature.armchairs': 'armchairs',
    'about.sections.livingroom.feature.coffee_tables': 'coffee tables',
    'about.sections.livingroom.feature.bar_table': 'bar table',
    'about.sections.livingroom.feature.library_books': 'bookshelf and books',
    'about.sections.livingroom.feature.tv_netflix': 'TV / Netflix',

    'about.sections.bathroom': 'Bathroom',
    'about.sections.bathroom.feature.shower': 'shower',
    'about.sections.bathroom.feature.toilet_sink': 'toilet and sink',
    'about.sections.bathroom.feature.storage': 'bathroom storage',
    'about.sections.bathroom.feature.hairdryer': 'hair dryer',
    'about.sections.bathroom.feature.shower_gel': 'shower gel',
    'about.sections.bathroom.feature.soap': 'liquid soap',
    'about.sections.bathroom.feature.towels': 'towels',

    'about.sections.kitchen': 'Kitchen',
    'about.sections.kitchen.feature.fridge': 'fridge',
    'about.sections.kitchen.feature.oven': 'electric oven',
    'about.sections.kitchen.feature.microwave': 'microwave',
    'about.sections.kitchen.feature.hob': 'hob',
    'about.sections.kitchen.feature.washing_machine': 'washing machine',
    'about.sections.kitchen.feature.cutlery_dishes': 'cutlery and plates',
    'about.sections.kitchen.feature.glasses': 'glasses',
    'about.sections.kitchen.feature.pots': 'pots',
    'about.sections.kitchen.feature.coffee_machine': 'coffee machine',
    'about.sections.kitchen.feature.kettle': 'kettle',

    // Benefits
    'about.benefits.title': 'We offer the following benefits',
    'about.benefits.sea_view': 'Sea view',
    'about.benefits.free_parking': 'Free parking',
    'about.benefits.ac': 'Air conditioning',
    'about.benefits.baby_cot': 'Baby cot',
    'about.benefits.glass_terrace': 'Glass terrace',
    'about.benefits.gated_area': 'Gated area',
    'about.benefits.iron': 'Iron',
    'about.benefits.high_chair': 'High chair',
    'about.benefits.open_terrace': 'Open terrace',
    'about.benefits.wifi': 'Wi‑Fi',
    'about.benefits.drying_rack': 'Drying rack',
    'about.benefits.toys': 'Toys',
    'about.benefits.dining_table': 'Dining table',
    'about.benefits.workspace': 'Workspace',
    'about.benefits.vacuum': 'Vacuum cleaner',
    'about.benefits.board_games': 'Board games',

    // More info
    'about.more_info.title': 'Additional information',
    'about.more_info.checkin': 'Check‑in:',
    'about.more_info.checkout': 'Check‑out:',
    'about.more_info.deposit': 'Deposit:',
    'about.more_info.deposit_value': '20% upon reservation confirmation',
    'about.more_info.balance': 'Balance:',
    'about.more_info.balance_value': '80% 14 days before arrival',
    'about.more_info.pets': 'Pets:',
    'about.more_info.smoking': 'Smoking:',
    'about.more_info.accessible': 'Accessible:',

    // Activities
    'about.activities.title': 'Activities and attractions',
    'about.activities.pool.title': 'Pool',
    'about.activities.pool.desc':
      'Enjoy the shared pool year‑round. It is right in front of the apartment and consists of two areas – for adults and for children.',
    'about.activities.beach.title': 'Beach',
    'about.activities.beach.desc':
      'There are several lovely sandy beaches near the apartment, but the most popular is La Mata, awarded the Blue Flag every year. It is wide and long, stretching to the neighboring town.',
    'about.activities.salt_lakes.title': 'Salt lakes',
    'about.activities.salt_lakes.desc':
      'A European rarity: pink salt lakes that attract photographers and, above all, create a healing microclimate you won’t find just anywhere. The city was even recognized by WHO thanks to them. Don’t forget to take photos of the flamingos standing right in the lakes.',
    'about.activities.history.title': 'Historic sites',
    'about.activities.history.desc':
      'Torrevieja used to be a fishing village that grew significantly thanks to salt mining. It took its name from the ancient watchtower, which you can find in the neighboring Torre del Moro park. You’ll also enjoy evening walks in the center of Torrevieja with several historic spots.',
    'about.activities.safari.title': 'Safari Elche',
    'about.activities.safari.desc':
      'With or without kids, head to ZOO Safari Elche, about 30 minutes by car from the apartment. You’ll have your day planned.',
    'about.activities.market.title': 'Markets',
    'about.activities.market.desc':
      'A favorite attraction for tourists and locals alike are the regular street markets held on specific days of the week in different parts of town. You’ll find fresh fruit and vegetables, local foods, and clothing.',
    'about.activities.aquapark.title': 'Aquapark',
    'about.activities.aquapark.desc':
      'Spend a whole day at the Aquopolis Torrevieja water park. It is open during the summer months and offers both fun and relaxation. It is located 4 km from the apartment.',
    'about.activities.watersports.title': 'Water sports',
    'about.activities.watersports.desc':
      'For water sports lovers, the modern Mosquito wakepark is an ideal choice, located just 6 km away. You can also try parasailing, flyboarding, surfing, or a more relaxed paddle board.',
    'about.activities.running.title': 'Running and cycling',
    'about.activities.running.desc':
      'If you love running, walking or cycling, you can head out even before breakfast, in any direction. We especially recommend the beautiful Molino Park on the sand dunes, the paths along the rocky cliffs, or even yoga in the nearby Torre Del Moro park.',
    'about.activities.golf.title': 'Golf',
    'about.activities.golf.desc':
      'Within a 15 km radius you’ll find more than a dozen quality golf courses. Try the popular Greenlands Sport Club—you’ll love it.',

    'about.no_image': 'No image available',

    // Gallery
    'gallery.title': 'Gallery',

    // Pricelist
    'pricelist.title': 'Price list for 2025',
    'pricelist.period': 'Period',
    'pricelist.one_night': '1 night*',
    'pricelist.ten_nights': '10+ nights',
    'pricelist.thirty_nights': '30+ nights',
    'pricelist.jan_apr': 'January – April',
    'pricelist.may': 'May',
    'pricelist.jun': 'June',
    'pricelist.jul_aug': 'July – August',
    'pricelist.sep': 'September',
    'pricelist.oct': 'October',
    'pricelist.nov_dec': 'November – December',
    'pricelist.note': '* Minimum stay is 3 nights.',
    'pricelist.transfer_title': 'We can arrange a transfer from Alicante airport to the apartment and back',
    'pricelist.price': 'Price',
    'pricelist.transfer_desc': 'One-way price (entire car – up to 4 people)',

    // EN
    'availability.title': 'Availability',
    'availability.legend.past': 'past',
    'availability.legend.booked': 'booked',
    'availability.legend.available': 'available',
    'months.january':'January','months.february':'February','months.march':'March','months.april':'April',
    'months.may':'May','months.june':'June','months.july':'July','months.august':'August',
    'months.september':'September','months.october':'October','months.november':'November','months.december':'December',
    'daysShort.mon':'Mon','daysShort.tue':'Tue','daysShort.wed':'Wed','daysShort.thu':'Thu','daysShort.fri':'Fri','daysShort.sat':'Sat','daysShort.sun':'Sun',

    // Reservation
    'reservation.title': 'Reservation request',
    'reservation.first_name': 'First name',
    'reservation.last_name': 'Last name',
    'reservation.email': 'Email',
    'reservation.guests': 'Guests',
    'reservation.check_in': 'Check-in',
    'reservation.check_out': 'Check-out',
    'reservation.message': 'Message',
    'reservation.placeholder': 'Write any additional information or questions about the reservation...',
    'reservation.sending': 'Sending...',
    'reservation.submit': 'Book now',
    'reservation.success': '✅ Reservation was successfully sent.',
    'reservation.error': '❌ Error',
    'reservation.try_again': 'Please try again.',
    'reservation.network_error': '❌ Failed to send reservation. Check your connection.',

    // Contact
    'contact.title': 'Contact us:',
    'contact.whatsapp': 'Write to us on WhatsApp',
    'contact.facebook': 'Follow us on Facebook',
    'contact.instagram': 'Follow us on Instagram',
    'contact.location': 'Apartment location',

    // Footer
    'footer.navigate': 'Start navigation:',

  },
};

/** Provider */
export const LanguageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [lang, setLang] = useState<Lang>('sk');

  useEffect(() => {
    const saved = (typeof window !== 'undefined' && window.localStorage.getItem('lang')) as Lang | null;
    if (saved === 'sk' || saved === 'en') setLang(saved);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem('lang', lang);
    if (typeof document !== 'undefined') document.documentElement.lang = lang;
  }, [lang]);

  const t = useMemo(() => {
    return (key: string) => translations[lang]?.[key] ?? key;
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);

  return <I18nCtx.Provider value={value}>{children}</I18nCtx.Provider>;
};

/** Hook */
export const useI18n = () => {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
};