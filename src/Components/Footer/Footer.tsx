import React, { useState } from 'react';
import { TitleText } from './TitleText';

export const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/send-email', {
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
    <footer
      id="contact"
      className="bg-silver relative flex w-full flex-col items-center justify-center gap-[2rem] py-10 sm:gap-[2rem] sm:py-[2.5rem]"
    >
      <TitleText>Kontakt</TitleText>

      {/* Row with Contact Form and Map */}
      <div className="flex flex-col sm:flex-row justify-center w-full max-w-6xl gap-8">
        {/* Contact Form */}
        <div className="flex-1 flex flex-col justify-between bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
            Kontaktný formulár
          </h3>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6 h-full">
            {/* Meno and Email Row */}
            <div className="flex gap-4">
              <div className="flex flex-col w-1/2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-2">
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
                <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-2">
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
            {/* Správa Field */}
            <div className="flex flex-col">
              <label htmlFor="message" className="text-sm font-medium text-gray-700 mb-2">
                Správa
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Dobrý deň, mali by sme záujem o apartmán v nasledujúcich termínoch:"
                value={formData.message}
                onChange={handleInputChange}
                rows="5"
                className="w-full rounded-md border border-gray-300 bg-gray-50 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3"
                required
                style={{ textAlign: 'left' }}
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Poslať
            </button>
          </form>
          {formStatus && (
            <p className="mt-4 text-sm text-center text-gray-600">{formStatus}</p>
          )}
        </div>

        {/* Map Section */}
        <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-700 text-center mb-4">
            Lokalita apartmánu
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
        </div>
      </div>

      {/* Contact Info */}
      <div className="w-full max-w-4xl mt-6 text-center">
        <div className="flex items-center justify-center space-x-8 text-xl text-gray-700">
          {/* Phone */}
          <div className="flex items-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              className="text-gray-700"
            >
              <path d="M6.62 10.79a15.09 15.09 0 006.57 6.57l2.2-2.2a1 1 0 011.05-.25 11.38 11.38 0 003.58.57 1 1 0 011 1V20a1 1 0 01-1 1A18 18 0 013 5a1 1 0 011-1h3.33a1 1 0 011 1 11.38 11.38 0 00.57 3.58 1 1 0 01-.25 1.05z"></path>
            </svg>
            <span>0902 217 449</span>
          </div>
          {/* Email */}
          <div className="flex items-center space-x-2">
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
          </div>
        </div>
      </div>
    </footer>
  );
};