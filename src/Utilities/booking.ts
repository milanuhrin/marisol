export type BookingDates = {
  checkIn: string;
  checkOut: string;
};

export const EMPTY_BOOKING_DATES: BookingDates = {
  checkIn: '',
  checkOut: '',
};

export const MINIMUM_STAY_NIGHTS = 3;

export const toLocalDateString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatDisplayDate = (dateString: string) => {
  if (!dateString) return '';

  const [year, month, day] = dateString.split('-');
  if (!year || !month || !day) return dateString;

  return `${day}.${month}.${year}`;
};

export const getStayNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 0;

  const start = Date.parse(`${checkIn}T00:00:00Z`);
  const end = Date.parse(`${checkOut}T00:00:00Z`);
  return Math.round((end - start) / 86400000);
};
