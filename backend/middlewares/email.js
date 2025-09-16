import { Verification_Email_Template, Welcome_Email_Template, Resend_Verification_Email_Template } from "../libs/emailTemplate.js";
import { transporter } from "./emailConfig.js";


export const sendVerificationCode = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"Team Deferder_Warriors" <gyanranjan9661@gmail.com>',
            to: email,
            subject: "Verify Your Email",
            text: "Verify Your Email", // plain‑text body
            html: Verification_Email_Template.replace("{verificationCode}", verificationCode), // HTML body
        });
        console.log('Email send successfully', response)
    } catch (error) {
        console.log("Email error")
    }
}

export const welcomeEmail = async (email, name) => {
    try {
        const response = await transporter.sendMail({
            from: '"Team Deferder_Warriors" <gyanranjan9661@gmail.com>',
            to: email,
            subject: "Welcome to Our Community!",
            text: "Welcome", 
            html: Welcome_Email_Template.replace("{name}", name), 
        });
        console.log('Email send successfully', response)
    } catch (error) {
        console.log("Email error")
    }
}

export const resendVerificationCode = async (email, verificationCode) => {
    try {
        const response = await transporter.sendMail({
            from: '"Team Defender_Warriors" <gyanranjan9661@gmail.com>',
            to: email,
            subject: "Resend Verification Code",
            text: "Here is your new verification code",
            html: Resend_Verification_Email_Template.replace("{verificationCode}", verificationCode),
        });
        console.log('Resend Email sent successfully', response);
    } catch (error) {
        console.log("Resend Email error", error);
    }
};
