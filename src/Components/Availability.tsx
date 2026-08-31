// Availability.tsx
import React, { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TitleText } from "./export";
import { sectionVariants } from "Utilities/motionVariants"; // Import the footer variants
import { useI18n } from "i18n/LanguageProvider"; // ✅ i18n
import {
  BookingDates,
  EMPTY_BOOKING_DATES,
  formatDisplayDate,
  getStayNights,
  MINIMUM_STAY_NIGHTS,
  toLocalDateString,
} from "Utilities/booking";
import { calculateStayPrice, formatPrice } from "Utilities/pricing";

const RES_URL =
  "https://eb8ya8rtoc.execute-api.us-east-1.amazonaws.com/main/reservation"; // Backend reservation API

type ReservationPeriod = {
  startDate: string;
  endDate: string;
};

type AvailabilityProps = {
  selectedDates: BookingDates;
  onDatesChange: (dates: BookingDates) => void;
};

const Availability: React.FC<AvailabilityProps> = ({
  selectedDates,
  onDatesChange,
}) => {
  const { t, lang } = useI18n(); // ✅ translations
  const shouldReduceMotion = useReducedMotion();
  const [reservations, setReservations] = useState<
    ReservationPeriod[]
  >([]);
  const [selectionError, setSelectionError] = useState("");
  const [reservationStatus, setReservationStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(RES_URL);
        if (!response.ok) {
          throw new Error(`Reservation API returned ${response.status}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.reservations)) {
          setReservations(data.reservations);
          setReservationStatus("ready");
        } else {
          setReservationStatus("error");
          console.error("🚨 Unexpected reservation API response:", data);
        }
      } catch (error) {
        setReservationStatus("error");
        console.error("❌ Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  // ✅ Localized month/day labels via i18n
  const months = [
    t("months.january"),
    t("months.february"),
    t("months.march"),
    t("months.april"),
    t("months.may"),
    t("months.june"),
    t("months.july"),
    t("months.august"),
    t("months.september"),
    t("months.october"),
    t("months.november"),
    t("months.december"),
  ];
  const daysOfWeek = [
    t("daysShort.mon"),
    t("daysShort.tue"),
    t("daysShort.wed"),
    t("daysShort.thu"),
    t("daysShort.fri"),
    t("daysShort.sat"),
    t("daysShort.sun"),
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const today = toLocalDateString(new Date());

  const isAvailableForCheckIn = (date: string) =>
    !reservations.some(
      (reservation) =>
        reservation.startDate <= date && date < reservation.endDate
    );

  const isStayAvailable = (checkIn: string, checkOut: string) =>
    !reservations.some(
      (reservation) =>
        checkIn < reservation.endDate && checkOut > reservation.startDate
    );

  const formatNights = (nights: number) => {
    const translationKey =
      nights === 1
        ? "availability.selection.night_one"
        : lang === "sk" && nights < 5
        ? "availability.selection.night_few"
        : "availability.selection.nights";

    return `${nights} ${t(translationKey)}`;
  };

  const handleDateClick = (date: string) => {
    if (reservationStatus !== "ready") return;

    const hasIncompleteSelection =
      selectedDates.checkIn && !selectedDates.checkOut;

    if (date === selectedDates.checkIn) {
      setSelectionError("");
      onDatesChange({ ...EMPTY_BOOKING_DATES });
      return;
    }

    if (!hasIncompleteSelection || date <= selectedDates.checkIn) {
      if (!isAvailableForCheckIn(date)) return;

      setSelectionError("");
      onDatesChange({ checkIn: date, checkOut: "" });
      return;
    }

    if (getStayNights(selectedDates.checkIn, date) < MINIMUM_STAY_NIGHTS) {
      setSelectionError(t("availability.selection.minimum_stay"));
      return;
    }

    if (!isStayAvailable(selectedDates.checkIn, date)) {
      setSelectionError(t("availability.selection.unavailable"));
      return;
    }

    setSelectionError("");
    onDatesChange({ checkIn: selectedDates.checkIn, checkOut: date });
  };

  const continueToReservation = () => {
    document.getElementById("reservation")?.scrollIntoView({
      behavior: shouldReduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const changeMonth = (direction: string) => {
    if (direction === "prev") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear((prev) => prev - 1);
      } else {
        setCurrentMonth((prev) => prev - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
      } else {
        setCurrentMonth((prev) => prev + 1);
      }
    }
  };

  const generateReservationCalendarDays = (month: number, year: number) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    const offset = (firstDayOfMonth + 6) % 7;

    for (let i = 0; i < offset; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDayOfMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateString = toLocalDateString(dateObj);

      const isPast = dateString < today;

      // Determine reservation status for this day
      let isStart = false;
      let isEnd = false;
      let isBetween = false;

      for (const res of reservations) {
        if (res.startDate === dateString && res.endDate === dateString) {
          // Same day reservation
          isStart = true;
          isEnd = true;
          break;
        } else if (res.startDate === dateString) {
          isStart = true;
          break;
        } else if (res.endDate === dateString) {
          isEnd = true;
          break;
        } else if (res.startDate < dateString && res.endDate > dateString) {
          isBetween = true;
          break;
        }
      }

      days.push({
        date: dateString,
        day,
        isStart,
        isEnd,
        isBetween,
        isPast,
        isToday: dateString === today,
      });
    }

    return days;
  };

  const nextMonth = (currentMonth + 1) % 12;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

  const reservationDaysCurrent = generateReservationCalendarDays(
    currentMonth,
    currentYear
  );
  const reservationDaysNext = generateReservationCalendarDays(
    nextMonth,
    nextMonthYear
  );
  const selectedStayPrice = calculateStayPrice(
    selectedDates.checkIn,
    selectedDates.checkOut
  );

  return (
    <motion.section
      id="availability"
      className="scroll-mt-12 py-8 text-center"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.01 }}
      variants={sectionVariants}
    >
      <div>
        <TitleText>{t("availability.title")}</TitleText>

        {/* Add space between title and calendar */}
        <div style={{ marginBottom: "2rem" }}></div>

        <p className="mx-auto max-w-lg px-4 text-sm text-gray-500 sm:text-base">
          {selectedDates.checkIn && !selectedDates.checkOut
            ? t("availability.selection.choose_checkout")
            : t("availability.selection.instruction")}
        </p>

        {/* New Reservation Calendar Wrapper */}
        <motion.div
          id="availability-calendars"
          className="calendar-wrapper"
          initial="offscreen"
          whileInView="onscreen"
          exit="exit"
          viewport={{ once: true, amount: 0.01 }}
          variants={sectionVariants}
          style={{ marginTop: "3rem" }}
        >
          {[reservationDaysCurrent, reservationDaysNext].map(
            (calendarDays, index) => {
              const month = index === 0 ? currentMonth : nextMonth;
              const year = index === 0 ? currentYear : nextMonthYear;
              const isLeftCalendar = index === 0;
              const calendarHeadingId = `availability-${year}-${month}-heading`;

              return (
                <motion.div
                  key={`res-${index}`}
                  className="calendar-container"
                  initial="offscreen"
                  whileInView="onscreen"
                  exit="exit"
                  viewport={{ once: true, amount: 0.01 }}
                  variants={sectionVariants}
                >
                  {/* Header with Arrows */}
                  <div className="calendar-header">
                    {isLeftCalendar && (
                      <button
                        type="button"
                        onClick={() => changeMonth("prev")}
                        className="arrow-btn left-arrow"
                        aria-label={t("availability.previous_month")}
                        aria-controls="availability-calendars"
                      >
                        &#10094;
                      </button>
                    )}
                    <span id={calendarHeadingId} aria-live="polite">
                      {months[month]} {year}
                    </span>
                    {!isLeftCalendar && (
                      <button
                        type="button"
                        onClick={() => changeMonth("next")}
                        className="arrow-btn right-arrow"
                        aria-label={t("availability.next_month")}
                        aria-controls="availability-calendars"
                      >
                        &#10095;
                      </button>
                    )}
                  </div>

                  {/* Day Grid */}
                  <div
                    className="day-grid"
                    role="group"
                    aria-labelledby={calendarHeadingId}
                  >
                    {daysOfWeek.map((day, index) => (
                      <div
                        key={index}
                        className="day-name"
                        aria-label={t(`daysLong.${index}`)}
                      >
                        {day}
                      </div>
                    ))}
                    {calendarDays.map((day, dayIndex) => {
                      if (!day) {
                        return <div key={dayIndex} aria-hidden="true"></div>;
                      }

                      const baseStatus = day.isPast
                        ? "past"
                        : day.isStart && day.isEnd
                        ? "full-reserved"
                        : day.isStart
                        ? "half-start"
                        : day.isEnd
                        ? "half-end"
                        : day.isBetween
                        ? "full-reserved"
                        : "available";
                      const isSelectedStart =
                        day.date === selectedDates.checkIn;
                      const isSelectedEnd =
                        day.date === selectedDates.checkOut;
                      const isSelectedRange = Boolean(
                        selectedDates.checkIn &&
                          selectedDates.checkOut &&
                          day.date > selectedDates.checkIn &&
                          day.date < selectedDates.checkOut
                      );
                      const isSelectingCheckOut = Boolean(
                        selectedDates.checkIn && !selectedDates.checkOut
                      );
                      const isDisabled =
                        reservationStatus !== "ready" ||
                        day.isPast ||
                        (isSelectingCheckOut
                          ? day.date <= selectedDates.checkIn
                            ? !isAvailableForCheckIn(day.date)
                            : day.isBetween || (day.isStart && day.isEnd)
                          : !isAvailableForCheckIn(day.date));
                      const selectedStatus = isSelectedStart
                        ? "selected-start"
                        : isSelectedEnd
                        ? "selected-end"
                        : isSelectedRange
                        ? "selected-range"
                        : "";
                      const accessibleStatus = isSelectedStart
                        ? t("availability.date_status.selected_check_in")
                        : isSelectedEnd
                        ? t("availability.date_status.selected_check_out")
                        : isSelectedRange
                        ? t("availability.date_status.selected_range")
                        : reservationStatus === "loading"
                        ? t("availability.date_status.loading")
                        : reservationStatus === "error"
                        ? t("availability.date_status.unavailable")
                        : day.isPast
                        ? t("availability.date_status.past")
                        : isDisabled
                        ? t("availability.date_status.booked")
                        : t("availability.date_status.available");
                      const accessibleDate = [
                        formatDisplayDate(day.date),
                        day.isToday ? t("availability.date_status.today") : "",
                        accessibleStatus,
                      ]
                        .filter(Boolean)
                        .join(", ");

                      return (
                        <motion.button
                          key={day.date}
                          type="button"
                          className={`calendar-day ${baseStatus} ${selectedStatus}`}
                          onClick={() => handleDateClick(day.date)}
                          disabled={isDisabled}
                          aria-pressed={isSelectedStart || isSelectedEnd}
                          aria-current={day.isToday ? "date" : undefined}
                          aria-label={accessibleDate}
                          whileHover={
                            isDisabled || shouldReduceMotion
                              ? undefined
                              : { scale: 1.08 }
                          }
                        >
                          {day.day}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              );
            }
          )}
        </motion.div>

        {/* Legend */}
        <motion.div
          className="legend"
          initial="offscreen"
          whileInView="onscreen"
          exit="exit"
          viewport={{ once: true, amount: 0.01 }}
          variants={sectionVariants}
        >
          <div className="legend-item">
            <div className="legend-box past-box"></div>
            <span>{t("availability.legend.past")}</span>
          </div>
          <div className="legend-item">
            <div className="legend-box reserved-box"></div>
            <span>{t("availability.legend.booked")}</span>
          </div>
          <div className="legend-item">
            <div className="legend-box available-box"></div>
            <span>{t("availability.legend.available")}</span>
          </div>
          <div className="legend-item">
            <div className="legend-box selected-box"></div>
            <span>{t("availability.legend.selected")}</span>
          </div>
        </motion.div>

        <div
          className="mx-auto mt-5 w-full max-w-[820px]"
          aria-live="polite"
        >
          {reservationStatus === "loading" && (
            <p className="text-sm text-gray-500">
              {t("availability.selection.loading")}
            </p>
          )}

          {reservationStatus === "error" && (
            <p className="text-sm font-medium text-red-600">
              {t("availability.selection.load_error")}
            </p>
          )}

          {selectionError && (
            <p className="text-sm font-medium text-red-600">{selectionError}</p>
          )}

          {!selectionError && selectedDates.checkIn && !selectedDates.checkOut && (
            <p className="text-sm font-medium text-cyan-800">
              {t("availability.selection.check_in")}: {formatDisplayDate(selectedDates.checkIn)}
            </p>
          )}

          {!selectionError &&
            selectedDates.checkIn &&
            selectedDates.checkOut &&
            selectedStayPrice !== null && (
            <div className="grid items-center gap-3 rounded-xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:text-left lg:px-6">
              <p className="text-center font-medium leading-5 text-cyan-900 sm:text-left">
                <span className="block font-bold text-cyan-700 sm:inline sm:font-semibold">
                  {t("availability.selection.selected")}:
                </span>{" "}
                <span className="block whitespace-nowrap font-extrabold text-cyan-950 sm:inline sm:whitespace-normal sm:font-bold">
                  {formatDisplayDate(selectedDates.checkIn)} –{" "}
                  {formatDisplayDate(selectedDates.checkOut)}
                  <span className="ml-1 font-bold text-cyan-700">
                    ({formatNights(getStayNights(selectedDates.checkIn, selectedDates.checkOut))})
                  </span>
                </span>
              </p>
              <div className="rounded-lg border border-cyan-200 bg-white px-4 py-2 text-center">
                <span className="block text-xs font-medium text-cyan-700">
                  {t("availability.selection.price")}
                </span>
                <strong className="block text-lg font-bold leading-5 text-cyan-900">
                  {formatPrice(selectedStayPrice, lang)}
                </strong>
              </div>
              <button
                type="button"
                onClick={continueToReservation}
                className="inline-flex min-h-[44px] w-full shrink-0 items-center justify-center rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-white transition hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 sm:w-auto"
              >
                {t("availability.selection.continue")} →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add CSS styling */}
      <style>{`
        .calendar-wrapper {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 2rem;
        }

        .calendar-container {
          background-color: #f9f9f9;
          padding: 1rem;
          border-radius: 10px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .calendar-header {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: bold;
          font-size: 1.2rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .arrow-btn {
          position: absolute;
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 6px;
        }

        .arrow-btn:focus-visible {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }

        .left-arrow {
          left: 0;
        }

        .right-arrow {
          right: 0;
        }

        .day-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 3px;
        }

        .calendar-day {
          height: 50px;
          width: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 3px;
          text-align: center;
          cursor: pointer;
          font: inherit;
          position: relative;
          border: 1px solid transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .calendar-day:focus-visible {
          outline: 2px solid #06b6d4;
          outline-offset: 2px;
        }

        .calendar-day:disabled {
          cursor: default;
        }

        .reserved-past {
          background-color: #d3d3d3;
          color: #6c757d;
          text-decoration: line-through;
        }

        .reserved {
          background-color: #f8d7da;
          color: #721c24;
        }

        .past {
          background-color: #d3d3d3;
          color: #6c757d;
          text-decoration: line-through;
        }

        .available {
          background-color: #d4edda;
          color: #155724;
        }

        .half-start {
          background: linear-gradient(135deg, #d4edda 50%, #f8d7da 50%);
          color: #155724;
        }

        .half-end {
          background: linear-gradient(135deg, #f8d7da 50%, #d4edda 50%);
          color: #155724;
        }

        .full-reserved {
          background-color: #f8d7da;
          background-image: repeating-linear-gradient(
            135deg,
            transparent 0,
            transparent 5px,
            rgba(114, 28, 36, 0.16) 5px,
            rgba(114, 28, 36, 0.16) 8px
          );
          color: #721c24;
        }

        .calendar-day.selected-range {
          background: #cffafe;
          color: #155e75;
          border-color: #67e8f9;
          text-decoration: none;
          box-shadow: inset 0 -3px 0 #0891b2;
          font-weight: 600;
        }

        .calendar-day.selected-start,
        .calendar-day.selected-end {
          background: #06b6d4;
          color: #ffffff;
          border-color: #0891b2;
          box-shadow: inset 0 0 0 2px #0e7490;
          font-weight: 700;
          text-decoration: none;
        }

        .legend {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .legend-box {
          width: 20px;
          height: 20px;
          border-radius: 1px;
        }

        .past-box {
          background-color: #d3d3d3;
        }

        .reserved-box {
          background-color: #f8d7da;
          background-image: repeating-linear-gradient(
            135deg,
            transparent 0,
            transparent 4px,
            rgba(114, 28, 36, 0.22) 4px,
            rgba(114, 28, 36, 0.22) 7px
          );
        }

        .available-box {
          background-color: #d4edda;
        }

        .selected-box {
          background-color: #06b6d4;
          box-shadow: inset 0 0 0 2px #0e7490;
        }

        @media (max-width: 768px) {
      .calendar-wrapper {
        flex-direction: column;
        gap: 10px;
        margin: 1rem 0; /* Add margin on smaller screens */
      }

      .calendar-container {
        padding: 0.8rem; /* Reduce padding on smaller screens */
      }

      .calendar-header {
        font-size: 1rem; /* Adjust font size */
      }

      .day-grid {
        gap: 2px; /* Reduce the gap between days */
      }

      .calendar-day {
        height: 40px; /* Adjust day box size */
        width: 40px;
      }

      .legend {
        flex-wrap: wrap;
        gap: 0.5rem; /* Adjust spacing in legend */
      }

      .legend-item {
        font-size: 0.85rem; /* Adjust text size in legend */
      }
    }
  `}</style>
    </motion.section>
  );
};

export default Availability;
