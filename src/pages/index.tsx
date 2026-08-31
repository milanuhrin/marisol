import React, { useState } from "react";
import { Footer, Landing } from "Components/export";
import "../../global.css";
import About from "Components/About";
import Availability from "Components/Availability";
import Gallery from "Components/Gallery";
import Pricelist from "Components/Pricelist";
import Reservation from "Components/Reservation";
import Contact from "Components/Contact";
import SEO from "Components/SEO";
import Testimonials from "Components/Testimonials";
import RenviaPromo from "Components/RenviaPromo";
import { BookingDates, EMPTY_BOOKING_DATES } from "Utilities/booking";

const IndexPage = () => {
  const [bookingDates, setBookingDates] = useState<BookingDates>({
    ...EMPTY_BOOKING_DATES,
  });

  return (
    <>
      <SEO />
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

// ✅ Uses Gatsby's `<Head>` API
export const Head = () => <SEO />;

export default IndexPage;
