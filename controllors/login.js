const {user} = require('../models/users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const login = async(req,res) =>{
    res.render('login.ejs');
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(400).json({message : "All Fields Are Required"});
    }
    const foundUser = await user.findOne({username})
    if (!foundUser) {
        return res.status(401).json({message: "User Does Not Exist"});
    }
    const checkpass = await bcrypt.compare(password, foundUser.password)
    if (!checkpass) {
        return res.status(401).json({message: "Wrong Password"});
    }
    const accessToken = jwt.sign(
    {
        UserInfo : {
            id : foundUser._id
        }
    },
    process.env.ACCESSTOKEN_KEY, 
    {expiresIn : "1m"}
    )
    const refreshToken = jwt.sign(
    {
        UserInfo : {
            id : foundUser._id
        }
    },
    process.env.REFRESHTOKEN_KEY, 
    {expiresIn : "7d"}
    )
    res.cookie('jwt', refreshToken, {
        httpOnly : true,
        secure : true,
        sameSite : "None",
        maxAge : 7 * 24 * 60 * 60 * 1000,
    });
    res.json({
        accessToken,
        email: foundUser.email,
    })
}

module.exports = {login}