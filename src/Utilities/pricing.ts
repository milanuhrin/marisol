import { getStayNights, MINIMUM_STAY_NIGHTS } from './booking';

export type PricingPeriod = {
  translationKey: string;
  months: number[];
  rates: {
    standard: number;
    extended: number;
    monthly: number | null;
  };
};

export const PRICING_PERIODS: PricingPeriod[] = [
  {
    translationKey: 'pricelist.jan_apr',
    months: [0, 1, 2, 3],
    rates: { standard: 70, extended: 60, monthly: 35 },
  },
  {
    translationKey: 'pricelist.may',
    months: [4],
    rates: { standard: 85, extended: 75, monthly: 55 },
  },
  {
    translationKey: 'pricelist.jun',
    months: [5],
    rates: { standard: 105, extended: 95, monthly: null },
  },
  {
    translationKey: 'pricelist.jul_aug',
    months: [6, 7],
    rates: { standard: 145, extended: 135, monthly: null },
  },
  {
    translationKey: 'pricelist.sep',
    months: [8],
    rates: { standard: 105, extended: 95, monthly: null },
  },
  {
    translationKey: 'pricelist.oct',
    months: [9],
    rates: { standard: 85, extended: 75, monthly: null },
  },
  {
    translationKey: 'pricelist.nov_dec',
    months: [10, 11],
    rates: { standard: 70, extended: 60, monthly: 35 },
  },
];

const getNightlyRate = (month: number, stayNights: number) => {
  const period = PRICING_PERIODS.find((item) => item.months.includes(month));
  if (!period) return null;

  if (stayNights >= 30 && period.rates.monthly !== null) {
    return period.rates.monthly;
  }

  if (stayNights >= 11) return period.rates.extended;
  return period.rates.standard;
};

export const calculateStayPrice = (checkIn: string, checkOut: string) => {
  const stayNights = getStayNights(checkIn, checkOut);
  if (stayNights < MINIMUM_STAY_NIGHTS) return null;

  const start = new Date(`${checkIn}T00:00:00Z`);
  let total = 0;

  for (let nightIndex = 0; nightIndex < stayNights; nightIndex++) {
    const night = new Date(start);
    night.setUTCDate(start.getUTCDate() + nightIndex);
    const nightlyRate = getNightlyRate(night.getUTCMonth(), stayNights);
    if (nightlyRate === null) return null;
    total += nightlyRate;
  }

  return total;
};

export const formatPrice = (price: number, lang: 'sk' | 'en') =>
  new Intl.NumberFormat(lang === 'sk' ? 'sk-SK' : 'en-GB', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);

export const formatNightlyRate = (price: number | null) =>
  price === null ? '- €' : `${price} €`;
