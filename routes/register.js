const {app} = require('./server')
const {register} = require('../controllors/register')
const {verify_otp} = require('../controllors/register')

// const {verifyJWT} = require('../middelware/verifyJWT')

app.post('/register',register)
app.post('/verify_otp',verify_otp)
//app.use(verifyJWT)
