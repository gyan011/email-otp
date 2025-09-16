import express from 'express'
import { UserModel } from '../models/userModel.js';
import bcrypt from "bcryptjs"
import { resendVerificationCode, sendVerificationCode, welcomeEmail } from '../middlewares/email.js';

export const register = async (req, res) => {
    try {
        const {email, password, name} = req.body;
        if(!email || !password || !name) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        const ExitsUser = await UserModel.findOne({email});
        if(ExitsUser) {
            return res.status(400).json({
                success:false,
                message:"User already exists Please Login!"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

        const user = new UserModel({
            email,
            password: hashedPassword,
            name,
            verificationCode,
            verificationCodeExpires: expiryTime
        })
        await user.save();
        sendVerificationCode(user.email, verificationCode);

        return res.status(200).json({
            success: true,
            message: "User register successfully ",
            user
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const VerifyEmail = async (req, res) => {
    try {
        const {code} = req.body;
        const user = await UserModel.findOne({
            verificationCode: code
        })

        if(!user) {
            return res.status(400).json({
                success:false,
                message:"Invalid or expired code!"
            })
        }

        if (user.verificationCodeExpires < Date.now()) {
            return res.status(400).json({
                success: false,
                message: "Code expired! Please request a new one.",
            });
        }

        user.isVerified = true;
        user.verificationCode = undefined;
        user.verificationCodeExpires = undefined;
        await user.save()
        
        await welcomeEmail(user.email, user.name)
        return res.status(200).json({
            success:true,
            message:"Email veified Successfully!"
        })

    } catch (error) {
        console.log(error)
                return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const resendCode = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        if (user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "User already verified",
            });
        }

        // generate new code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        const expiryTime = new Date(Date.now() + 10 * 60 * 1000);

        user.verificationCode = verificationCode;
        user.verificationCodeExpires = expiryTime;
        await user.save();

        await resendVerificationCode(user.email, verificationCode);

        return res.status(200).json({
            success: true,
            message: "New verification code sent successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
