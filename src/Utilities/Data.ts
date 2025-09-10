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

export const menuItems = [
  {
    name: 'Domov',
    link: '#home',
  },
  {
    name: 'O apartmáne',
    link: '#about',
  },
  {
    name: 'Galéria',
    link: '#gallery',
  },
  {
    name: 'Cenník',
    link: '#pricelist',
  },
  {
    name: 'Obsadenosť',
    link: '#availability',
  },
  {
    name: 'Rezervácia',
    link: '#reservation',
  },
  {
    name: 'Kontakt',
    link: '#contact',
  },
  {
    name: '+421 902 217 449',
    icon: faPhone,
    action: () => {
      window.open('tel:+421902217449', '_self');
    },
  },
]
export type Lang = 'sk' | 'en';

type MenuItemBase = {
  link?: string;
  icon?: any;
  action?: () => void;
  labels: { sk: string; en: string };
};

// definícia menu pre každý jazyk
export const menuItemsBase: MenuItemBase[] = [
  {
    link: '/',
    icon: faClipboard,
    labels: { sk: 'Domov', en: 'Home' },
  },
  {
    link: '/about',
    icon: faAddressCard,
    labels: { sk: 'O apartmáne', en: 'About' },
  },
  {
    link: '/gallery',
    labels: { sk: 'Galéria', en: 'Gallery' },
  },
  {
    link: '/pricing',
    labels: { sk: 'Cenník', en: 'Pricing' },
  },
  {
    link: '/booking',
    labels: { sk: 'Rezervácia', en: 'Reservation' },
  },
  {
    link: '/contact',
    labels: { sk: 'Kontakt', en: 'Contact' },
  },
  {
    // príklad pre telefón
    action: () => {
      window.location.href = 'tel:+421902217449';
    },
    icon: faPhone,
    labels: { sk: 'Zavolať', en: 'Call' },
  },
];

// helper ktorý vráti menuItems s aktuálnym názvom
export const getMenuItems = (lang: Lang) =>
  menuItemsBase.map(mi => ({
    ...mi,
    name: mi.labels[lang],
  }));