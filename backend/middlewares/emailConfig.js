import nodemailer from "nodemailer"

// Create a test account or replace with real credentials.
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "gyanranjan9661@gmail.com",
    pass: "hrmz exkp exml yxtq",
  },
});

// const sendEmail = async () => {
//     try {
//         const info = await transporter.sendMail({
//             from: '"Team Deferder_Warriors" <gyanranjan9661@gmail.com>',
//             to: "vh118854@gmail.com",
//             subject: "Hello ✔",
//             text: "Hello Vivek", // plain‑text body
//             html: "<b>Hello Vivek</b>", // HTML body
//         });
//         console.log(info)
//     } catch (error) {
//         console.log(error)
//     }
// }

// sendEmail();