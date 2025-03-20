const express = require('express');
const {login} = require('./controllers/login')

const router = express.Router();
const {verifyJWT} = require('../middelware/verifyJWT')

app.post('/login',login)

app.use(verifyJWT)
module.exports = router;