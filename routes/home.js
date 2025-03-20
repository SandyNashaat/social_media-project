const express = require('express');
const {Post_comment} = require('../controllors/home/put_comment')
const {Post_like} = require('../controllors/home/put_likes')
const {comments_scroll} =require('../controllors/home/scroll_comments')
const {Post_scrolle} =require('../controllors/home/scrolle')
const {verifyJWT} = require('../middelware/verifyJWT')
const {app} = require('../server');

const router = express.Router();
app.use(verifyJWT)
router.post('/register',Post_comment)
router.post('/verify_otp',Post_like)
router.post('/forgot-password',comments_scroll)
router.post('/reset-password/:token',Post_scrolle)
module.exports = router;