const express = require('express');
const router = express.Router();
const friendController = require('../controllors/friends');

router.post('/add-friend/:friendId', friendController.addFriend);
router.post('/handle-request/:requesterId', friendController.handleFriendRequest);
router.post('/remove-friend/:friendId', friendController.removeOrBlockFriend);
router.get('/friends/:userId', friendController.getFriends);
router.get('/friend-requests/:userId', friendController.getFriendRequests);

module.exports = router;
