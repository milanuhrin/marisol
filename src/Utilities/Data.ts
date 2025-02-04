import {
  faAddressCard,
  faClipboard,
  faPhone,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';

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
    name: 'Dostupnosť',
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
    name: 'Prihlásenie',
    link: '/login',
  },
  {
    name: '+421 902 217 449',
    icon: faPhone,
    action: () => {
      window.location.href = 'tel:+421902217449';
    },
  },

];