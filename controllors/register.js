import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import User from '../models/users';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
//router.post('/register', 
const register = async (req, res) => {
    res.render('register.ejs');

    let{firstname,lastname,username,password,email}=req.body
    if (!firstname || !lastname|| !username || !email || !password || !gender || !phone  || !birthday){
        return res.json({message : 'enter all data....'})
       
    }
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email already registered' });

        const existingPhone = await User.findOne({ phone });
        if (existingPhone) return res.status(400).json({ message: 'Phone number already registered' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const otp = generateOTP();
        const user = new User({ name, email, phone, password: hashedPassword, otp });
        await user.save();

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otp}`,
        });

        res.status(200).json({ message: 'OTP sent to email' });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
}
module.exports = {register}
//router.post('/verify-otp',
const verify_otp =  async (req, res) => {
    const { email, otp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });
        if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

        user.verified = true;
        user.otp = null;
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'OTP verified', token });
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
}
module.exports = {verify_otp}

export default router;
