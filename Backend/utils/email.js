import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,   // Use explicit SMTP settings
  port: process.env.SMTP_PORT,   // 587 (TLS) or 465 (SSL)
  secure: process.env.SMTP_SECURE === "true", // Convert to boolean
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // Make sure your .env matches this
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: `"Your App Name" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log(`📧 Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
