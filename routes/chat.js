const {app} = require('./server')
const {setupChat} = require('../controllors/chat')
app.get('/chat',setupChat)