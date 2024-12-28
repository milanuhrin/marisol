const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import cors

// Create an instance of the Express app
const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Route to handle email sending
app.post('/api/send-email', async (req, res) => {
  console.log('Request body:', req.body);
  const { name, email, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'apartmanspanielsko@gmail.com', // Replace with your Gmail
      pass: 'ztadoylltoyxukvx', // Replace with your Gmail app password
    },
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'apartmanspanielsko@gmail.com',
    subject: `Nová správa od ${name}`,
    text: message,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    res.status(200).send('Správa bola úspešne odoslaná.');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Nepodarilo sa odoslať správu.');
  }
});

// Start the server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
