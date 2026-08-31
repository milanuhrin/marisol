import React, { useState } from 'react';
import { Lang, LanguageProvider } from 'i18n/LanguageProvider';
import { BookingDates, EMPTY_BOOKING_DATES } from 'Utilities/booking';
import About from 'Components/About';
import Availability from 'Components/Availability';
import Contact from 'Components/Contact';
import { Footer, Landing } from 'Components/export';
import Gallery from 'Components/Gallery';
import Pricelist from 'Components/Pricelist';
import RenviaPromo from 'Components/RenviaPromo';
import Reservation from 'Components/Reservation';
import Testimonials from 'Components/Testimonials';

type ApartmentPageProps = {
  initialLang: Lang;
};

const ApartmentContent = () => {
  const [bookingDates, setBookingDates] = useState<BookingDates>({
    ...EMPTY_BOOKING_DATES,
  });

  return (
    <>
      <Landing />
      <About />
      <Gallery />
      <Testimonials />
      <Pricelist />
      <Availability
        selectedDates={bookingDates}
        onDatesChange={setBookingDates}
      />
      <Reservation
        selectedDates={bookingDates}
        onDatesCleared={() => setBookingDates({ ...EMPTY_BOOKING_DATES })}
      />
      <Contact />
      <Footer />
      <RenviaPromo />
    </>
  );
};

export const ApartmentPage = ({ initialLang }: ApartmentPageProps) => (
  <LanguageProvider initialLang={initialLang}>
    <ApartmentContent />
  </LanguageProvider>
);

export default ApartmentPage;
