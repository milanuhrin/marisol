// Data.ts
import { faClipboard, faAddressCard, faPhone } from '@fortawesome/free-solid-svg-icons';

export const hero2Items = [
  'Klimatizácia',
  'Internet',
  'Pracovný stôl',
  'Netflix',
];

export const hero2ImageLayouts = [
  {
    alt: 'Detska',
    class: 'w-[100%] self-end col-span-6 object-contain ',
  },
  {
    alt: 'Spalna',
    class: ' w-[130%] self-end col-span-4 ',
  },
  {
    alt: 'Obyvacka',
    class: ' w-[80%] col-span-5 justify-self-end',
  },
  {
    alt: 'Terasa',
    class: 'w-[100%] col-span-6',
  },
];

export type Lang = 'sk' | 'en';

type MenuItemBase = {
  link?: string;
  icon?: any;
  action?: () => void;
  labels: { sk: string; en: string };
};

// Jediný zdroj pravdy pre menu (hash odkazy ako pôvodne)
export const menuItemsBase: MenuItemBase[] = [
  {
    link: '#home',
    labels: { sk: 'Domov', en: 'Home' },
  },
  {
    link: '#about',
    labels: { sk: 'O apartmáne', en: 'About' },
  },
  {
    link: '#gallery',
    labels: { sk: 'Galéria', en: 'Gallery' },
  },
  {
    link: '#pricelist',
    labels: { sk: 'Cenník', en: 'Pricing' },
  },
  {
    link: '#availability',
    labels: { sk: 'Obsadenosť', en: 'Availability' },
  },
  {
    link: '#reservation',
    labels: { sk: 'Rezervácia', en: 'Reservation' },
  },
  {
    link: '#contact',
    labels: { sk: 'Kontakt', en: 'Contact' },
  },
  {
    link: 'tel:+421902217449',
    icon: faPhone,
    labels: { sk: '+421 902 217 449', en: '+421 902 217 449' },
  },
];

// Helper: vráti menu s preloženým názvom podľa jazyka
export const getMenuItems = (lang: Lang) =>
  menuItemsBase.map(mi => ({
    ...mi,
    name: mi.labels[lang],
  }));