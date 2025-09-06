import { createTransport } from "nodemailer";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
dotenv.config();
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendMail = async (to, otp) => { 
      await transporter.sendMail({
    from: process.env.USER_EMAIL,
    to: to,
    subject: "Reset your password",
    text: `Your OTP for password reset . it's expire in 5 minutes`,
    html: `<b> OTP :${otp}</b>`,
  });
}

export default sendMail;
