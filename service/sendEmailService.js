require('dotenv').config();
const nodemailer = require('nodemailer');

const sendEmailService = async (email, subject, text) => {
  const config = {
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(config);
  const emailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    text,
  };

  await transporter.sendMail(emailOptions);
};

module.exports = { sendEmailService };
