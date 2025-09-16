import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    verificationCode: {
        type: String
    },
    verificationCodeExpires: {
        type: Date,
    },
},{timestamps:true})

export const UserModel = mongoose.model("User", userSchema);