import {
  faAddressCard,
  faClipboard,
  faPhone,
  faUserGraduate,
} from '@fortawesome/free-solid-svg-icons';

export const hero2Items = [
  'Hudobné školy',
  'Profesionálni hudobníci',
  'Rekreační amatéri',
  'Oprava mechaniky',
];

export const hero2ImageLayouts = [
  {
    alt: 'Detska',
    class: 'w-[100%] self-end col-span-6 object-contain ',
  },
  {
    alt: 'Obyvacka',
    class: ' w-[100%] self-end col-span-6 ',
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
    icon: faClipboard,
  },
  {
    name: 'O apartmáne',
    link: '#about',
    icon: faClipboard,
  },
  {
    name: 'Galéria',
    link: '#galery',
    icon: faAddressCard,
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
    icon: faUserGraduate,
  },
];