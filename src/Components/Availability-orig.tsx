// Availability.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TitleText } from './export';
import { sectionVariants } from 'Utilities/motionVariants'; // Import the footer variants
import { useI18n } from 'i18n/LanguageProvider'; // ✅ i18n

const API_URL = "https://eb8ya8rtoc.execute-api.us-east-1.amazonaws.com/main/availability"; // Backend API

const Availability: React.FC = () => {
  const { t } = useI18n(); // ✅ translations
  const [reservedDates, setReservedDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchReservedDates = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.success && data.availability) {
          const dates = data.availability.map((item: { date: any; }) => item.date);
          setReservedDates(dates); // Store in state
        } else {
          console.error("🚨 Unexpected API response:", data);
        }
      } catch (error) {
        console.error("❌ Error fetching reserved dates:", error);
      }
    };

    fetchReservedDates();
  }, []);

  // ✅ Localized month/day labels via i18n
  const months = [
    t('months.january'),
    t('months.february'),
    t('months.march'),
    t('months.april'),
    t('months.may'),
    t('months.june'),
    t('months.july'),
    t('months.august'),
    t('months.september'),
    t('months.october'),
    t('months.november'),
    t('months.december'),
  ];
  const daysOfWeek = [
    t('daysShort.mon'),
    t('daysShort.tue'),
    t('daysShort.wed'),
    t('daysShort.thu'),
    t('daysShort.fri'),
    t('daysShort.sat'),
    t('daysShort.sun'),
  ];

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const today = new Date().toISOString().split('T')[0];

  const changeMonth = (direction: string) => {
    if (direction === 'prev') {
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

  const generateCalendarDays = (month: number, year: number) => {
    const days = [];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    const offset = (firstDayOfMonth + 6) % 7;

    for (let i = 0; i < offset; i++) {
      days.push(null);
    }

    for (let day = 1; day <= lastDayOfMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateString = dateObj.toLocaleDateString('sv-SE'); // Format: yyyy-MM-dd

      const isPast = dateString < today;
      const isReserved = reservedDates.includes(dateString);

      days.push({
        date: dateString,
        day,
        isReserved,
        isToday: dateString === today,
        isPast,
        isReservedPast: isReserved && isPast,
      });
    }

    return days;
  };

  const calendarDaysCurrent = generateCalendarDays(currentMonth, currentYear);
  const nextMonth = (currentMonth + 1) % 12;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const calendarDaysNext = generateCalendarDays(nextMonth, nextMonthYear);

  return (
    <motion.section
      id="availability"
      className="text-center py-8"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.01 }}
      variants={sectionVariants}
    >
      <div className="py-8">
        <TitleText>{t('availability.title')}</TitleText>

        {/* Add space between title and calendar */}
        <div style={{ marginBottom: '2rem' }}></div>

        {/* Calendar Wrapper */}
        <motion.div
          className="calendar-wrapper"
          initial="offscreen"
          whileInView="onscreen"
          exit="exit"
          viewport={{ once: true, amount: 0.01 }}
          variants={sectionVariants}
        >
          {[calendarDaysCurrent, calendarDaysNext].map((calendarDays, index) => {
            const month = index === 0 ? currentMonth : nextMonth;
            const year = index === 0 ? currentYear : nextMonthYear;
            const isLeftCalendar = index === 0;

            return (
              <motion.div
                key={index}
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
                      onClick={() => changeMonth('prev')}
                      className="arrow-btn left-arrow"
                    >
                      &#10094;
                    </button>
                  )}
                  <span>{months[month]} {year}</span>
                  {!isLeftCalendar && (
                    <button
                      onClick={() => changeMonth('next')}
                      className="arrow-btn right-arrow"
                    >
                      &#10095;
                    </button>
                  )}
                </div>

                {/* Day Grid */}
                <div className="day-grid">
                  {daysOfWeek.map((day, index) => (
                    <div key={index} className="day-name">
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((day, dayIndex) =>
                    day ? (
                      <motion.div
                        key={dayIndex}
                        className={`calendar-day ${
                          day.isReservedPast
                            ? 'reserved-past'
                            : day.isReserved
                            ? 'reserved'
                            : day.isPast
                            ? 'past'
                            : 'available'
                        }`}
                        whileHover={{ scale: 1.08 }}
                      >
                        {day.day}
                      </motion.div>
                    ) : (
                      <div key={dayIndex}></div>
                    )
                  )}
                </div>
              </motion.div>
            );
          })}
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
            <span>{t('availability.legend.past')}</span>
          </div>
          <div className="legend-item">
            <div className="legend-box reserved-box"></div>
            <span>{t('availability.legend.booked')}</span>
          </div>
          <div className="legend-item">
            <div className="legend-box available-box"></div>
            <span>{t('availability.legend.available')}</span>
          </div>
        </motion.div>
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
        }

        .available-box {
          background-color: #d4edda;
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