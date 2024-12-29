import React, { useState } from 'react';
import { TitleText } from './export';

const Availability = () => {
  const reservedDates = [
    '2024-12-25',
    '2024-12-26',
    '2024-12-27',
    '2025-01-30',
    '2025-01-31',
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

  const changeMonth = (direction: 'prev' | 'next') => {
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
      const dateString = dateObj.toISOString().split('T')[0];

      days.push({
        date: dateString,
        day,
        isReserved: reservedDates.includes(dateString),
        isToday: dateString === today,
        isPast: dateString < today,
      });
    }

    return days;
  };

  const calendarDaysCurrent = generateCalendarDays(currentMonth, currentYear);
  const nextMonth = (currentMonth + 1) % 12;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const calendarDaysNext = generateCalendarDays(nextMonth, nextMonthYear);

  return (
    <div id="availability" className="text-center py-8">
      <div className="py-8" style={{ marginTop: '8rem' }}>
        <TitleText>Dostupnosť</TitleText>

        {/* Add space between title and calendar */}
        <div style={{ marginBottom: '2rem' }}></div>

        {/* Calendar Wrapper */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginBottom: '2rem', // Add space between calendar and legend
          }}
        >
          {[calendarDaysCurrent, calendarDaysNext].map((calendarDays, index) => {
            const month = index === 0 ? currentMonth : nextMonth;
            const year = index === 0 ? currentYear : nextMonthYear;
            const isLeftCalendar = index === 0;

            return (
              <div
                key={index}
                style={{
                  backgroundColor: '#f9f9f9',
                  padding: '1rem',
                  borderRadius: '10px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              >
                {/* Header with Arrows */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                    marginBottom: '1rem',
                    position: 'relative',
                  }}
                >
                  {isLeftCalendar && (
                    <button
                      onClick={() => changeMonth('prev')}
                      style={{
                        position: 'absolute',
                        left: '0',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        color: '#1A202C',
                        cursor: 'pointer',
                      }}
                    >
                      &#10094;
                    </button>
                  )}
                  <span>{months[month]} {year}</span>
                  {!isLeftCalendar && (
                    <button
                      onClick={() => changeMonth('next')}
                      style={{
                        position: 'absolute',
                        right: '0',
                        background: 'none',
                        border: 'none',
                        fontSize: '1.5rem',
                        color: '#1A202C',
                        cursor: 'pointer',
                      }}
                    >
                      &#10095;
                    </button>
                  )}
                </div>

                {/* Day Grid */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: '3px',
                  }}
                >
                  {daysOfWeek.map((day, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {day}
                    </div>
                  ))}
                  {calendarDays.map((day, dayIndex) =>
                    day ? (
                      <div
                        key={dayIndex}
                        style={{
                          height: '50px',
                          width: '50px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: '3px',
                          textAlign: 'center',
                          backgroundColor: day.isReserved
                            ? '#f8d7da'
                            : day.isPast
                            ? '#d3d3d3'
                            : '#b3d9ff',
                          color: day.isReserved
                            ? '#721c24'
                            : day.isPast
                            ? '#6c757d'
                            : '#0b5394',
                          textDecoration: day.isPast ? 'line-through' : 'none',
                        }}
                      >
                        {day.day}
                      </div>
                    ) : (
                      <div key={dayIndex}></div>
                    )
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          className={`text-justify text-base font-medium leading-6 text-gray-500`}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#d3d3d3',
                borderRadius: '1px',
              }}
            ></div>
            <span>minulosť</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#f8d7da',
                borderRadius: '1px',
              }}
            ></div>
            <span>obsadený</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#b3d9ff',
                borderRadius: '1px',
              }}
            ></div>
            <span>voľný</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;