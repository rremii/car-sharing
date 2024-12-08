const nodemailer = require("nodemailer");

// Configure the email transporter
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Replace with your SMTP server
  port: 587,
  secure: false, // true for 465, false for other ports
  tls: {
    rejectUnauthorized: false, // true for 465, false for other ports
  },
  auth: {
    user: process.env.SMTP_EMAIL, // Replace with your email address
    pass: process.env.SMTP_PASSWORD, // Replace with your password
  },
});

// Function to send email
const sendMail = async ({ to, subject, text, from, html }) => {
  try {
    const info = await transporter.sendMail({
      from, // Replace with sender address
      to, // List of receivers
      subject, // Subject line
      text, // Plain text body
      html,
    });
    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendMail };
