import express from "express"
import { register, resendCode, VerifyEmail } from "../controllers/Auth.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", register);
AuthRoute.post("/verify-email", VerifyEmail);
AuthRoute.post("/resend-code", resendCode);

export default AuthRoute;