// utils/email.js

import nodemailer from "nodemailer";

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_ID, // Your Gmail email address
    pass: process.env.GMAIL_PASS, // Your Gmail password or an app-specific password
  },
});

// Function to send email verification link
export const sendEmailVerification = async (email: any, token: any) => {
  const mailOptions = {
    from: process.env.GMAIL_ID,
    to: email,
    subject: "Verify Your Email",
    html: `
      <p>Thank you for signing up! Please verify your email by clicking the link below:</p>
      <a href="${process.env.NEXT_PUBLIC_BASE_URL}/verify/${token}">Verify Email</a>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email verification sent successfully.");
  } catch (error) {
    console.error("Error sending email verification:", error);
  }
};
