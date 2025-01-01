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
    alt: 'Obyvacka',
    class: ' w-[80%] self-end col-span-6 ',
  },
  {
    alt: 'Terasa',
    class: ' w-[100%] col-span-5 justify-self-end',
  },
  {
    alt: 'Spalna',
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
    name: 'Kontakt',
    link: '#contact',
  },
  {
    name: '+421 902 217 449',
    icon: faPhone,
    action: () => {
      window.location.href = 'tel:+421902217449';
    },
  },
];