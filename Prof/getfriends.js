const Friend = require("../models/Friend");
const User = require("../models/User");
const mongoose = require("mongoose");
// // Get Friends List
// exports.getFriends = async (req, res) => {
//   try {
//     const userId = req.params.userId;

//     const friends = await Friend.find({
//       userId,
//       status: "accepted",
//     }).populate("friendId", "name email");

//     res.json(friends);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// // Send Friend Request
// exports.sendFriendRequest = async (req, res) => {
//   try {
//     const { userId, friendId } = req.body;

//     if (userId === friendId) return res.status(400).send("Cannot add yourself!");

//     const existingRequest = await Friend.findOne({ userId, friendId });

//     if (existingRequest) return res.status(400).send("Friend request already sent.");

//     const newRequest = new Friend({ userId, friendId, status: "pending" });
//     await newRequest.save();

//     res.status(201).json(newRequest);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// // Accept Friend Request
// exports.acceptFriendRequest = async (req, res) => {
//   try {
//     const { requestId } = req.body;

//     const request = await Friend.findById(requestId);

//     if (!request || request.status !== "pending") {
//       return res.status(404).send("Friend request not found or already accepted.");
//     }

//     request.status = "accepted";
//     await request.save();

//     res.json({ message: "Friend request accepted", request });
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };




// Get Friends List
exports.getFriends = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const friends = await Friend.find({ userId, status: "accepted" })
      .populate("friendId", "name email");

    res.json(friends);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(friendId)) {
      return res.status(400).json({ error: "Invalid user ID or friend ID" });
    }

    if (userId === friendId) {
      return res.status(400).json({ error: "You cannot send a friend request to yourself!" });
    }

    // Check if both users exist
    const sender = await User.findById(userId);
    const receiver = await User.findById(friendId);

    if (!sender || !receiver) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if request already exists
    const existingRequest = await Friend.findOne({ userId, friendId });

    if (existingRequest) {
      return res.status(400).json({ error: "Friend request already sent." });
    }

    // Create friend request
    const newRequest = new Friend({ userId, friendId, status: "pending" });
    await newRequest.save();

    res.status(201).json({ message: "Friend request sent", request: newRequest });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Accept Friend Request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    if (!mongoose.isValidObjectId(requestId)) {
      return res.status(400).json({ error: "Invalid request ID" });
    }

    const request = await Friend.findById(requestId);

    if (!request || request.status !== "pending") {
      return res.status(404).json({ error: "Friend request not found or already accepted." });
    }

    request.status = "accepted";
    await request.save();

    res.json({ message: "Friend request accepted", request });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
