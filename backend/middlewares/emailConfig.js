import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "gyanranjan9661@gmail.com",
    pass: "hrmz exkp exml yxtq",
  },
});

