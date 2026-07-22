import React, { ChangeEvent, FormEvent, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { TitleText } from './export';
import { sectionVariants } from 'Utilities/motionVariants';
import { useI18n } from 'i18n/LanguageProvider'; // ✅ i18n

const Reservation = () => {
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
    const now = new Date();
    const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
    return localDate.toISOString().slice(0, 10);
  }, []);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
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

    const guests = Number(formData.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > 5) {
      setFormStatus(t('reservation.invalid_guests'));
      return;
    }

    setIsLoading(true);

    try {
      const formattedCheckIn = formatDate(formData.checkIn);
      const formattedCheckOut = formatDate(formData.checkOut);
      const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
      const email = formData.email.trim();
      const message = formData.message.trim();

      // Message localized
      const emailMessage =
        lang === 'sk'
          ? `Dobrý deň,\n\nMám záujem o rezerváciu apartmánu:\n\nMeno a priezvisko: ${fullName}\nEmail: ${email}\nCheck-in: ${formattedCheckIn}\nCheck-out: ${formattedCheckOut}\nPočet hostí: ${guests}\n\nSpráva:\n${message}`
          : `Hello,\n\nI am interested in booking the apartment:\n\nName: ${fullName}\nEmail: ${email}\nCheck-in: ${formattedCheckIn}\nCheck-out: ${formattedCheckOut}\nNumber of guests: ${guests}\n\nMessage:\n${message}`;

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
      className="text-center py-8"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.01 }}
      variants={sectionVariants}
    >
      <div className="py-8">
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
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">{t('reservation.check_in')}</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full h-10 border border-gray-300 rounded-md bg-white text-gray-900 appearance-none"
                  min={today}
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">{t('reservation.check_out')}</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full h-10 border border-gray-300 rounded-md bg-white text-gray-900 appearance-none"
                  min={formData.checkIn || today}
                  required
                />
              </div>
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
