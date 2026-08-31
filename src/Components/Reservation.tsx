import React, { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TitleText } from './export';
import { sectionVariants } from 'Utilities/motionVariants';
import { useI18n } from 'i18n/LanguageProvider'; // ✅ i18n
import {
  BookingDates,
  EMPTY_BOOKING_DATES,
  formatDisplayDate,
  getStayNights,
  MINIMUM_STAY_NIGHTS,
  toLocalDateString,
} from 'Utilities/booking';
import { calculateStayPrice, formatPrice } from 'Utilities/pricing';

type DatePickerFieldProps = {
  label: string;
  name: 'checkIn' | 'checkOut';
  value: string;
  min: string;
  placeholder: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

const DatePickerField = ({
  label,
  name,
  value,
  min,
  placeholder,
  onChange,
}: DatePickerFieldProps) => {
  const inputId = `reservation-${name}`;

  const openPicker = (event: React.MouseEvent<HTMLInputElement>) => {
    const input = event.currentTarget as HTMLInputElement & {
      showPicker?: () => void;
    };
    input.showPicker?.();
  };

  return (
    <div>
      <label
        htmlFor={inputId}
        className="block text-left text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div className="relative mt-1 h-10 rounded-md border border-gray-300 bg-white focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500">
        <div
          className={`pointer-events-none flex h-full items-center justify-between px-2 text-left text-base ${
            value ? 'text-gray-900' : 'text-gray-500'
          }`}
          aria-hidden="true"
        >
          <span>{value ? formatDisplayDate(value) : placeholder}</span>
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0 text-gray-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 3v3M17 3v3M4 9h16M5 5h14a1 1 0 0 1 1 1v14H4V6a1 1 0 0 1 1-1Z" />
          </svg>
        </div>
        <input
          id={inputId}
          type="date"
          name={name}
          value={value}
          onChange={onChange}
          onClick={openPicker}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          min={min}
          required
        />
      </div>
    </div>
  );
};

type ReservationProps = {
  selectedDates?: BookingDates;
  onDatesCleared?: () => void;
};

const Reservation = ({
  selectedDates = EMPTY_BOOKING_DATES,
  onDatesCleared,
}: ReservationProps) => {
  const { t, lang } = useI18n();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: '',
    website: '',
  });

  const [formStatus, setFormStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const today = useMemo(() => {
    return toLocalDateString(new Date());
  }, []);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      checkIn: selectedDates.checkIn,
      checkOut: selectedDates.checkOut,
    }));
    setFormStatus('');
  }, [selectedDates.checkIn, selectedDates.checkOut]);

  const minimumCheckOut = useMemo(() => {
    if (!formData.checkIn) return today;

    const date = new Date(`${formData.checkIn}T12:00:00`);
    date.setDate(date.getDate() + MINIMUM_STAY_NIGHTS);
    return toLocalDateString(date);
  }, [formData.checkIn, today]);

  const stayPrice = useMemo(
    () => calculateStayPrice(formData.checkIn, formData.checkOut),
    [formData.checkIn, formData.checkOut]
  );

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      if (
        name === 'checkIn' &&
        prev.checkOut &&
        getStayNights(value, prev.checkOut) < MINIMUM_STAY_NIGHTS
      ) {
        return { ...prev, checkIn: value, checkOut: '' };
      }

      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('');

    if (formData.website) {
      setFormStatus(t('reservation.success'));
      return;
    }

    if (formData.checkIn < today || formData.checkOut <= formData.checkIn) {
      setFormStatus(t('reservation.invalid_dates'));
      return;
    }

    if (getStayNights(formData.checkIn, formData.checkOut) < MINIMUM_STAY_NIGHTS) {
      setFormStatus(t('reservation.invalid_minimum_stay'));
      return;
    }

    const totalStayPrice = calculateStayPrice(
      formData.checkIn,
      formData.checkOut
    );
    if (totalStayPrice === null) {
      setFormStatus(t('reservation.invalid_dates'));
      return;
    }

    const guests = Number(formData.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > 5) {
      setFormStatus(t('reservation.invalid_guests'));
      return;
    }

    setIsLoading(true);

    try {
      const formattedCheckIn = formatDisplayDate(formData.checkIn);
      const formattedCheckOut = formatDisplayDate(formData.checkOut);
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      const email = formData.email.trim();
      const message = formData.message.trim();
      const formattedStayPrice = formatPrice(totalStayPrice, lang);

      // Message localized
      const emailMessage =
        lang === 'sk'
          ? `Dobrý deň,\n\nMám záujem o rezerváciu apartmánu:\n\nMeno a priezvisko: ${fullName}\nEmail: ${email}\nCheck-in: ${formattedCheckIn}\nCheck-out: ${formattedCheckOut}\nPočet hostí: ${guests}\nCena pobytu: ${formattedStayPrice}\n\nSpráva:\n${message}`
          : `Hello,\n\nI am interested in booking the apartment:\n\nName: ${fullName}\nEmail: ${email}\nCheck-in: ${formattedCheckIn}\nCheck-out: ${formattedCheckOut}\nNumber of guests: ${guests}\nStay price: ${formattedStayPrice}\n\nMessage:\n${message}`;

      const response = await fetch(
        'https://8jwwggkrye.execute-api.us-east-1.amazonaws.com/prod/send-email',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            email,
            message: emailMessage,
          }),
        }
      );

      const responseData = await response.json().catch(() => ({}));
      if (response.ok) {
        setFormStatus(t('reservation.success'));
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          checkIn: '',
          checkOut: '',
          guests: 1,
          message: '',
          website: '',
        });
        onDatesCleared?.();
      } else {
        setFormStatus(`${t('reservation.error')}: ${responseData.error || t('reservation.try_again')}`);
      }
    } catch (error) {
      console.error('🚨 Error sending reservation email:', error);
      setFormStatus(t('reservation.network_error'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      id="reservation"
      className="scroll-mt-44 text-center py-8"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.01 }}
      variants={sectionVariants}
    >
      <div>
        <TitleText>{t('reservation.title')}</TitleText>
        <div style={{ marginBottom: '2rem' }}></div>

        <motion.div
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.01 }}
          variants={sectionVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="absolute left-[-10000px]" aria-hidden="true">
              <label htmlFor="reservation-website">Website</label>
              <input
                id="reservation-website"
                type="text"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">
                  {t('reservation.first_name')}
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  maxLength={80}
                  autoComplete="given-name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">
                  {t('reservation.last_name')}
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  maxLength={80}
                  autoComplete="family-name"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <label className="block text-sm text-left font-medium text-gray-700">
                  {t('reservation.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  maxLength={254}
                  autoComplete="email"
                  required
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="block text-sm text-left font-medium text-gray-700 whitespace-nowrap">
                  {t('reservation.guests')}
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  max="5"
                  className="mt-1 p-2 border border-gray-300 rounded-md text-center min-w-[80px]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <DatePickerField
                label={t('reservation.check_in')}
                name="checkIn"
                value={formData.checkIn}
                onChange={handleInputChange}
                min={today}
                placeholder={lang === 'sk' ? 'dd.mm.rrrr' : 'dd.mm.yyyy'}
              />
              <DatePickerField
                label={t('reservation.check_out')}
                name="checkOut"
                value={formData.checkOut}
                onChange={handleInputChange}
                min={minimumCheckOut}
                placeholder={lang === 'sk' ? 'dd.mm.rrrr' : 'dd.mm.yyyy'}
              />
            </div>

            <div>
              <p className="block text-left text-sm font-medium text-gray-700">
                {t('reservation.price')}
              </p>
              <output
                className={`mt-1 flex min-h-[48px] w-full items-center justify-center rounded-md border px-3 ${
                  stayPrice === null
                    ? 'border-gray-300 bg-gray-50 text-gray-400'
                    : 'border-cyan-200 bg-cyan-50 text-cyan-900'
                }`}
                aria-live="polite"
              >
                {stayPrice === null ? (
                  <span className="text-base font-medium">
                    {t('reservation.price_placeholder')}
                  </span>
                ) : (
                  <strong className="text-lg font-bold leading-5">
                    {formatPrice(stayPrice, lang)}
                  </strong>
                )}
              </output>
            </div>

            <div>
              <label className="block text-sm text-left font-medium text-gray-700">
                {t('reservation.message')}
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t('reservation.placeholder')}
                rows={4}
                maxLength={2000}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-gray-900 bg-white resize-none text-[16px] focus:outline-none focus:ring-2 focus:ring-cyan-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isLoading}
            >
              {isLoading ? t('reservation.sending') : t('reservation.submit')}
            </button>
          </form>

          {formStatus && <p className="mt-4 text-sm text-center text-gray-600" role="status" aria-live="polite">{formStatus}</p>}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Reservation;
