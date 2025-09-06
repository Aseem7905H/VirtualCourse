import User from "../model/userModel.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import sendMail from "../config/sendmail.js"; 

export const signUp = async (req , res ) => {
    try {
        const {name , email , password , role } = req.body 
        let existUser = await User.findOne({email});
        if(existUser){
            return res.status(400).json({message:"User already exists"});

        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Invalid email format"});
        } 
        if(password.length < 8){
            return res.status(400).json({message:"Password must be at least 8 characters long"});
        }
        let hashPassword = await bcrypt.hash(password,10)
        const user =  await User.create({
            name , email , password:hashPassword  , role 
        })
        let token = await genToken(user._id) ;
        res.cookie("token", token, {
            httpOnly: true,
            secure:  false,
            sameSite: "Strict",
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
        });
        return res.status(201).json({message:"User created successfully", user});

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`"sign up error: ${error.message}"`});
    }
}

export const login = async (req , res ) => {
    try {
        const {email , password } = req.body
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not exist"});
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message:"Invalid credentials"});
        }
        let token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
        });
        return res.status(200).json({message:"Login successful", user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:`"login error: ${error.message}"`});
    }
} 

export const logOut = async (req, res) => { 
    try {
        await res.clearCookie("token");
        return res.status(200).json({message:"Logged out successfully"});
    } catch (error) {
        return res.status(500).json({message:`"logout error: ${error.message}"`});
    }
}

export  const sendOTP = async (req, res) => { 
     try {
         const {email} = req.body ;
         const user = await User.findOne({email});
         if(!user){
             return res.status(400).json({message:"User does not found "});
         }

         const otp = Math.floor(1000 + Math.random() * 9000).toString();
         user.resetOtp = otp;
         user.OtpExpires = Date.now() + 5 * 60 * 1000; // 5 minutes
         user.isOtpVerified = false; // Reset OTP verification status
         await user.save();
         await sendMail(email, otp);

         return res.status(200).json({message:"OTP sent successfully "});
     } catch (error) {
         return res.status(500).json({message:`"send OTP error: ${error}"`});
     }
}

export const verifyOTP = async (req, res) => { 
    try {
         const {email, otp} = req.body;
         const user = await User.findOne({email});
         if(!user){
             return res.status(400).json({message:"User does not found "});
         }
         if(user.resetOtp !== otp){
             return res.status(400).json({message:"Invalid OTP"});
         }
         if(user.OtpExpires < Date.now()){
             return res.status(400).json({message:"OTP expired"});
         }
         user.isOtpVerified = true;
         user.resetOtp = undefined ; // Clear OTP after verification
         user.OtpExpires = undefined;
         await user.save();
         return res.status(200).json({message:"OTP verified successfully"});
    } catch (error) {
        return res.status(500).json({message:`"verify OTP error: ${error}"`});
    }

}

export const resetPassword = async (req, res ) => {
    try {
        const {email , password } = req.body; 
        const user  = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"User does not found "});
        }
        if(!user.isOtpVerified){
            return res.status(400).json({message:"OTP verification required"});
        }
        user.password = await bcrypt.hash(password, 10);
        user.isOtpVerified = false; // Reset OTP verification status
        await user.save();
        return res.status(200).json({message:"Password reset successfully"});
    } catch (error) {
        return res.status(500).json({message:`"reset password error: ${error}"`});
    }
}

export const googleAuth = async (req, res) => { 
    try {
        const {name,email ,role} = req.body;
        let  user = await User.findOne({email});
        if(!user){
            user = await User.create({
                name, email , role
            })
        }
        const token = await genToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 2 * 24 * 60 * 60 * 1000 // 2 days
        });
        return res.status(200).json({message:"Google login successful", user});
    } catch (error) {
        return res.status(500).json({message:`"Google login error: ${error.message}"`});
    }
}