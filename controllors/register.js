
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/users');
require('dotenv').config()

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
const forgotpassword  =  async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset Password',
            html: `<p>Click the button below to reset your password:</p>
                    <a href="${resetLink}" style="background-color: blue; color: white; padding: 10px 20px; text-decoration: none;">Reset Password</a>
                    <p>This link will expire in 15 minutes.</p>`,
        });

        res.status(200).json({ message: 'Reset password email sent' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending reset email', error });
    }
}
module.exports = {forgotpassword}
const resetpassword=  async (req, res) => {
    const { token } = req.params;
    const { newPassword, confirmPassword } = req.body;

    try {
        if (newPassword !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) return res.status(400).json({ message: 'Invalid token or user not found' });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error resetting password', error });
    }
}
module.exports = {resetpassword}

export default router;
