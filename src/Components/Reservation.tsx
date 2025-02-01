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

    try {
      const formattedCheckIn = formatDate(formData.checkIn);
      const formattedCheckOut = formatDate(formData.checkOut);
      const fullName = `${formData.firstName} ${formData.lastName}`;

      const response = await fetch('http://localhost:5001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          name: fullName,
          subject: 'Rezervácia apartmánu',
          message: `Dobrý deň,\n\nMám záujem o rezerváciu apartmánu:\n\nMeno a priezvisko: ${fullName}\nEmail: ${formData.email}\nCheck-in: ${formattedCheckIn}\nCheck-out: ${formattedCheckOut}\nPočet hostí: ${formData.guests}\n\nSpráva:\n${formData.message}`,
        }),
      });

      if (response.ok) {
        setFormStatus('Rezervácia bola úspešne odoslaná.\n Počkajte, prosím, na potvrdenie rezervácie.');
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
        setFormStatus('Nepodarilo sa odoslať rezerváciu. Skúste znova.');
      }
    } catch (error) {
      console.error('Error sending reservation email:', error);
      setFormStatus('Nepodarilo sa odoslať rezerváciu. Skúste znova.');
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
        {/* Title with consistent styling */}
        <TitleText>Predbežná rezervácia</TitleText>

        {/* Add space between the title and form */}
        <div style={{ marginBottom: '2rem' }}></div>

        <motion.div
          className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300"
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.01 }}
          variants={sectionVariants}
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: First Name and Last Name */}
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

            {/* Row 2: Email and Počet hostí */}
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
              <div className="col-span-1">
                <label className="block text-sm text-left font-medium text-gray-700">Počet hostí</label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Row 3: Check-in and Check-out */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-left font-medium text-gray-700">Check-in</label>
                <input
                  type="date"
                  name="checkIn"
                  value={formData.checkIn}
                  onChange={handleInputChange}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
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
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>

            {/* Row 4: Message */}
            <div>
              <label className="block text-sm text-left font-medium text-gray-700">Správa</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Napíšte akékoľvek ďalšie informácie alebo otázky k rezervácii..."
                rows={4}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md text-sm"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 transition"
            >
              Rezervovať
            </button>
          </form>
          {formStatus && (
            <p className="mt-4 text-sm text-center text-gray-600">{formStatus}</p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Reservation;