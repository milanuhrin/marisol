import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sectionVariants } from 'Utilities/motionVariants';

const Reservation = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    checkIn: '',
    checkOut: '',
    guests: 1,
    message: '',
  });
  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };
  
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    try {
      const formattedCheckIn = formatDate(formData.checkIn);
      const formattedCheckOut = formatDate(formData.checkOut);
  
      const response = await fetch('http://localhost:5001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: 'Rezervácia apartmánu',
          message: `Dobrý deň,\n\nRezervácia apartmánu:\n\nMeno: ${formData.name}\nEmail: ${formData.email}\nCheck-in: ${formattedCheckIn}\nCheck-out: ${formattedCheckOut}\nPočet hostí: ${formData.guests}\n\nSpráva:\n${formData.message}`,
        }),
      });
  
      if (response.ok) {
        setFormStatus('Rezervácia bola úspešne odoslaná.\n Počkajte, prosím,  na potvrdenie rezervácie.');
        setFormData({ name: '', email: '', checkIn: '', checkOut: '', guests: 1, message: '' });
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
      className="text-center py-8 bg-gray-100"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.01 }}
      variants={sectionVariants}
    >
      <motion.div variants={sectionVariants}>
        <h2 className="text-2xl font-bold mb-4">Rezervujte si dovolenku u nás</h2>
        <p className="text-gray-600 mb-6">Vyplňte formulár pre rezerváciu ubytovania</p>
      </motion.div>

      <motion.div
        className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md"
        variants={sectionVariants}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meno a priezvisko</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Check-in</label>
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
            <label className="block text-sm font-medium text-gray-700">Check-out</label>
            <input
              type="date"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleInputChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Počet hostí</label>
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
          <div>
            <label className="block text-sm font-medium text-gray-700">Správa</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Napíšte akékoľvek ďalšie informácie alebo otázky k rezervácii..."
              rows={4}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
          >
            Rezervovať
          </button>
        </form>
        {formStatus && (
          <p className="mt-4 text-sm text-center text-gray-600">{formStatus}</p>
        )}
      </motion.div>
    </motion.section>
  );
};

export default Reservation;