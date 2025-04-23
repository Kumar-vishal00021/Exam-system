const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: '8b4784001@smtp-brevo.com', // Brevo SMTP Login
    pass: '1ydWbEIAaC2FO7z5' // Brevo SMTP Key (Master Password)
  }
});

const mailOptions = {
  from: 'kumarvishal00021@gmail.com', // Your verified sender email
  to: 'shaktibkj802212@gmail.com',
  subject: 'Test Email from Brevo via SMTP',
  text: 'This is a test email from Brevo using SMTP.',
  html: '<h1>Test Email</h1><p>This is a test email from Brevo using SMTP.</p>'
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error('Error sending email:', error);
  } else {
    console.log('Email sent successfully:', info.response);
  }
});