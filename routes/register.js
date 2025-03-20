const express = require('express');
const {register} = require('../controllors/register')
const {verify_otp} = require('../controllors/register')
const {forgotpassword} =require('../controllors/register')
const {resetpassword} =require('../controllors/register')
// const {verifyJWT} = require('../middelware/verifyJWT')
const router = express.Router();
app.post('/register',register)
app.post('/verify_otp',verify_otp)
// app.post('/forgot-password',forgotpassword)
// app.post('/reset-password/:token',resetpassword)
//app.use(verifyJWT)
module.exports = router;