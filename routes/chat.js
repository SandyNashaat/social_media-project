const express = require('express');
const { getMessages, sendMessage } = require('../controllors/chat')
const router = express.Router();

router.get('/:chatId', getMessages);
router.post('/', sendMessage);

module.exports = router;
