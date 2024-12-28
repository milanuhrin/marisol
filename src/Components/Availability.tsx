import React, { useState } from 'react';
import { TitleText } from './export';

const Availability = () => {
  const reservedDates = ['2024-12-25', '2024-12-26', '2024-12-27'];

  // Slovak months and days
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
  const daysOfWeek = ['PO', 'UT', 'ST', 'ŠT', 'PI', 'SO', 'NE'];

  // State for current month and year
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Handle month navigation
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

  // Generate calendar days for a given month and year
  const generateCalendarDays = (month, year) => {
    const days = [];
    const today = new Date().toISOString().split('T')[0];
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const lastDayOfMonth = new Date(year, month + 1, 0).getDate();

    // Calculate offset for the first day (PO is day 1 in Slovak calendar)
    const offset = (firstDayOfMonth + 6) % 7;

    // Fill empty days before the first day of the month
    for (let i = 0; i < offset; i++) {
      days.push(null);
    }

    // Fill actual days
    for (let day = 1; day <= lastDayOfMonth; day++) {
      const dateObj = new Date(year, month, day);
      const dateString = dateObj.toISOString().split('T')[0];

      days.push({
        date: dateString,
        day,
        isReserved: reservedDates.includes(dateString),
        isToday: dateString === today,
      });
    }

    return days;
  };

  // Generate data for current and next month
  const calendarDaysCurrent = generateCalendarDays(currentMonth, currentYear);
  const nextMonth = (currentMonth + 1) % 12;
  const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  const calendarDaysNext = generateCalendarDays(nextMonth, nextMonthYear);

  return (
    <div id="availability" className="text-center py-8">
      <div className="py-8">
        <TitleText>Dostupnosť</TitleText>
        <div className="calendar-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '2rem' }}>
          {/* Left Month */}
          <div className="calendar">
            <div className="calendar-header" style={{ display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => changeMonth('prev')}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'black', cursor: 'pointer' }}
              >
                &#9664;
              </button>
              <span style={{ marginLeft: '1rem' }}>
                {months[currentMonth]} {currentYear}
              </span>
            </div>
            <div className="calendar-grid">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="calendar-day-header">
                  {day}
                </div>
              ))}
              {calendarDaysCurrent.map((day, index) =>
                day ? (
                  <div
                    key={index}
                    className={`calendar-day 
                      ${day.isReserved ? 'reserved' : 'available'} 
                      ${day.isToday ? 'today' : ''}`}
                  >
                    {day.day}
                  </div>
                ) : (
                  <div key={index} className="calendar-day empty"></div>
                )
              )}
            </div>
          </div>

          {/* Right Month */}
          <div className="calendar">
            <div className="calendar-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <span style={{ marginRight: '1rem' }}>
                {months[nextMonth]} {nextMonthYear}
              </span>
              <button
                onClick={() => changeMonth('next')}
                style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: 'black', cursor: 'pointer' }}
              >
                &#9654;
              </button>
            </div>
            <div className="calendar-grid">
              {daysOfWeek.map((day, index) => (
                <div key={index} className="calendar-day-header">
                  {day}
                </div>
              ))}
              {calendarDaysNext.map((day, index) =>
                day ? (
                  <div
                    key={index}
                    className={`calendar-day 
                      ${day.isReserved ? 'reserved' : 'available'} 
                      ${day.isToday ? 'today' : ''}`}
                  >
                    {day.day}
                  </div>
                ) : (
                  <div key={index} className="calendar-day empty"></div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Availability;