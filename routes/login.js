const {app} = require('./server')
const {login} = require('./controllers/login')


const {verifyJWT} = require('../middelware/verifyJWT')

app.post('/login',login)

app.use(verifyJWT)
