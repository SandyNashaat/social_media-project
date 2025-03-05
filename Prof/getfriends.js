const Friend = require("../models/friends");
const user = require("../models/users");

// Get Friends List
exports.getFriends = async (req, res) => {
  try {
    const userId = req.params.userId;

    const friends = await Friend.find({
      userId,
      status: "accepted",
    }).populate("friendId", "name email");

    res.json(friends);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Send Friend Request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { userId, friendId } = req.body;

    if (userId === friendId) return res.status(400).send("Cannot add yourself!");

    const existingRequest = await Friend.findOne({ userId, friendId });

    if (existingRequest) return res.status(400).send("Friend request already sent.");

    const newRequest = new Friend({ userId, friendId, status: "pending" });
    await newRequest.save();

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Accept Friend Request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    const request = await Friend.findById(requestId);

    if (!request || request.status !== "pending") {
      return res.status(404).send("Friend request not found or already accepted.");
    }

    request.status = "accepted";
    await request.save();

    res.json({ message: "Friend request accepted", request });
  } catch (err) {
    res.status(500).send(err.message);
  }
};
