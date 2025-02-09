import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TitleText } from './export';
import { sectionVariants } from 'Utilities/motionVariants'; // Import the footer variants

const Availability = () => {
  const reservedDates = [
    '2024-12-25',
    '2024-12-26',
    '2024-12-27',
    '2025-01-29',
    '2025-01-30',
    '2025-01-31',
    '2025-02-03',
    '2025-02-04',
    '2025-02-05',
    '2025-02-06',
    '2025-02-07',
    '2025-02-08',
    '2025-02-11',
    '2025-02-12',
    '2025-02-13',
    '2025-02-14',
    '2025-02-15',
    '2025-02-16',
    '2025-03-09',
    '2025-03-10',
    '2025-03-11',
    '2025-03-12',
    '2025-03-13',
    '2025-03-14',
    '2025-03-15',
    '2025-03-16',
    '2025-03-17',
    '2025-03-18',
    '2025-03-19',
    '2025-03-20',
    '2025-03-21',
    '2025-03-22',
    '2025-03-23',
    '2025-03-24',
    '2025-03-25',
    '2025-03-26',
    '2025-03-27',
    '2025-03-28',
    '2025-03-29',
    '2025-03-30',
    '2025-03-31',
    '2025-04-01',
    '2025-04-02',
    '2025-04-03',
    '2025-04-04',
    '2025-04-05',
    '2025-04-06',
    '2025-04-07',
    '2025-04-08',
    '2025-04-09',
    '2025-04-10',
    '2025-04-11',
    '2025-04-12',
    '2025-04-13',
    '2025-04-14',
    '2025-04-15',
    '2025-04-19',
    '2025-04-20',
    '2025-04-21',
    '2025-04-22',
    '2025-04-23',
    '2025-04-24',
    '2025-05-21',
    '2025-05-22',
    '2025-05-23',
    '2025-05-24',
    '2025-05-25',
    '2025-05-26',
    '2025-05-27',
    '2025-05-28',
    '2025-07-06',
    '2025-07-07',
    '2025-07-08',
    '2025-07-09',
    '2025-07-10',
    '2025-07-11',
    '2025-07-12',
    '2025-07-13',
    '2025-07-14',
    '2025-07-15',
    '2025-07-16',
    '2025-07-17',
    '2025-07-18',
    '2025-07-19',
    '2025-07-20',
    '2025-07-21',
    '2025-07-22',
    '2025-07-23',
    '2025-07-24',
    '2025-07-25',
    '2025-07-26',
    '2025-07-27',



  ];

  const months = [
    'Január',
    'Február',
    'Marec',
    'Apríl',
    'Máj',
    'Jún',
    'Júl',
    'August',
    'September',
    'Október',
    'November',
    'December',
  ];
  const daysOfWeek = ['Po', 'Ut', 'St', 'Št', 'Pi', 'So', 'Ne'];

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
        <TitleText>Obsadenosť</TitleText>

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
            <span>minulosť</span>
          </div>
          <div className="legend-item">
            <div className="legend-box reserved-box"></div>
            <span>obsadený</span>
          </div>
          <div className="legend-item">
            <div className="legend-box available-box"></div>
            <span>voľný</span>
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