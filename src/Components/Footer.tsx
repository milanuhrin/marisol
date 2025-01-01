import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TitleText } from './TitleText';
import { sectionVariants } from 'Utilities/motionVariants'; // Import the footer variants

export const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormStatus('Správa bola úspešne odoslaná.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('Nepodarilo sa odoslať správu. Skúste znova.');
      }
    } catch (error) {
      setFormStatus('Nepodarilo sa odoslať správu. Skúste znova.');
    }
  };

  return (
    <motion.footer
      id="contact"
      className="bg-silver relative flex w-full flex-col items-center justify-center gap-[3rem] py-10 sm:gap-[2rem] sm:py-[3rem]"
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: false, amount: 0.5 }}
      variants={sectionVariants} // Use imported footer variants
    >
      {/* Title */}
      <motion.div
        className="py-8"
        style={{ marginTop: '8rem' }}
        variants={sectionVariants} // Use the same variants
      >
        <TitleText>Kontakt</TitleText>
      </motion.div>

      {/* Contact Form and Map */}
      <motion.div
        className="flex flex-col sm:flex-row justify-center w-full max-w-6xl gap-8"
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}
        variants={sectionVariants} // Apply to this section
      >
        {/* Contact Form */}
        <motion.div
          className="flex-1 flex flex-col justify-between bg-white p-6 rounded-lg shadow-md"
          variants={sectionVariants}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
            Napíšte nám
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Meno
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ján Novák"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3"
                  required
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="jan.novak@gmail.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full h-10 rounded-md border border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm px-3"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="message"
                className="text-sm font-medium text-gray-700 mb-2"
              >
                Správa
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Dobrý deň, mali by sme záujem o apartmán v nasledujúcich termínoch:"
                value={formData.message}
                onChange={handleInputChange}
                rows={5}
                className="w-full rounded-md border border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                required
                style={{ textAlign: 'left' }}
              ></textarea>
            </div>
            <motion.button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Poslať
            </motion.button>
          </form>
          {formStatus && (
            <p className="mt-4 text-sm text-center text-gray-600">{formStatus}</p>
          )}
        </motion.div>

        {/* Map Section */}
        <motion.div
          className="flex-1 bg-white p-6 rounded-lg shadow-md"
          variants={sectionVariants}
          whileHover={{ scale: 1.05 }}
        >
          <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
            Poloha apartmánu
          </h3>
          <div className="w-full rounded-lg overflow-hidden" style={{ height: '300px' }}>
            <iframe
              title="Map to Torre del Moro"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3131.4293929417484!2d-0.6542631846295505!3d38.00168707971524!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd63a9b7a2e08c89%3A0xa6a3d565d4b5406a!2s38%C2%B000%2706.1%22N%200%C2%B039%2707.5%22W!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>
      </motion.div>

      {/* Email Section */}
      <motion.div
        className="w-full max-w-4xl mt-6 text-center"
        variants={sectionVariants}
      >
        <div className="flex items-center justify-center space-x-8 text-xl text-gray-700">
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.1 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="text-gray-700"
            >
              <path d="M22 6a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6zM4 6h16v2.5l-8 5-8-5V6zm0 4l7.35 4.59a1 1 0 001.3 0L20 10v8H4v-8z"></path>
            </svg>
            <span>apartmanspanielsko@gmail.com</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.footer>
  );
};