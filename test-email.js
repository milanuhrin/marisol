const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'apartmanspanielsko@gmail.com', // Replace with your Gmail
    pass: 'ztadoylltoyxukvx', // Replace with your Gmail app password
  },
});

const mailOptions = {
  from: 'milan.uhrin19@gmail.com',
  to: 'apartmanspanielsko@gmail.com',
  subject: 'Test Email',
  text: 'This is a test email from Node.js.',
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error while sending email:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});
