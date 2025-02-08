import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TitleText } from './export';
import { sectionVariants } from 'Utilities/motionVariants';

const Reservation = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false); // 🔵 Show loading

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formattedCheckIn = formatDate(formData.checkIn);
      const formattedCheckOut = formatDate(formData.checkOut);
      const fullName = `${formData.firstName} ${formData.lastName}`;

      const response = await fetch(
        'https://8jwwggkrye.execute-api.us-east-1.amazonaws.com/prod/send-email',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: fullName,
            email: formData.email,
            message: `Dobrý deň,\n\nMám záujem o rezerváciu apartmánu:\n\nMeno a priezvisko: ${fullName}\nEmail: ${formData.email}\nCheck-in: ${formattedCheckIn}\nCheck-out: ${formattedCheckOut}\nPočet hostí: ${formData.guests}\n\nSpráva:\n${formData.message}`,
          }),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        setFormStatus(`✅ Rezervácia bola úspešne odoslaná.`);
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          checkIn: '',
          checkOut: '',
          guests: 1,
          message: '',
        });
      } else {
        setFormStatus(`❌ Chyba: ${responseData.error || 'Skúste znova.'}`);
      }
    } catch (error) {
      console.error('Error sending reservation email:', error);
      setFormStatus('❌ Nepodarilo sa odoslať rezerváciu. Skontrolujte pripojenie.');
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
        <TitleText>Predbežná rezervácia</TitleText>
        <div style={{ marginBottom: '2rem' }}></div>

        <motion.div
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.01 }}
          variants={sectionVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">Meno</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">Priezvisko</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
              <div className="col-span-3">
                <label className="block text-sm text-left font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="col-span-1 flex flex-col">
                <label className="block text-sm text-left font-medium text-gray-700 whitespace-nowrap">
                  Počet hostí
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  className="mt-1 p-2 border border-gray-300 rounded-md text-center min-w-[80px]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">Check-in</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full h-10 border border-gray-300 rounded-md bg-white text-gray-900 appearance-none"
                  required
                />
              </div>
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">Check-out</label>
                <input
                  type="date"
                  name="checkOut"
                  value={formData.checkOut}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full h-10 border border-gray-300 rounded-md bg-white text-gray-900 appearance-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-left font-medium text-gray-700">Správa</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                onFocus={(e) => e.stopPropagation()} // 🔴 Stops event bubbling to the menu
                placeholder="Napíšte akékoľvek ďalšie informácie alebo otázky k rezervácii..."
                rows={4}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm text-gray-900 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Odosielanie...' : 'Rezervovať'}
            </button>
          </form>

          {formStatus && <p className="mt-4 text-sm text-center text-gray-600">{formStatus}</p>}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Reservation;