const User = require('../models/users');

// Send Friend Request
exports.addFriend = async (req, res) => {
  const { userId } = req.body;
  const { friendId } = req.params;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!friend) return res.status(404).json({ message: "User not found" });
    if (user.friends.includes(friendId)) return res.status(400).json({ message: "Already friends" });
    if (user.friendRequests.includes(friendId)) return res.status(400).json({ message: "Request already sent" });

    friend.friendRequests.push(userId);
    await friend.save();

    res.status(200).json({ message: "Friend request sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Accept or Reject Friend Request
exports.handleFriendRequest = async (req, res) => {
  const { userId, action } = req.body;
  const { requesterId } = req.params;

  try {
    const user = await User.findById(userId);0
    const requester = await User.findById(requesterId);

    if (!user || !requester) return res.status(404).json({ message: "User not found" });

    user.friendRequests = user.friendRequests.filter(id => id.toString() !== requesterId);

    if (action === 'accept') {
      user.friends.push(requesterId);
      requester.friends.push(userId);
      await requester.save();
    }

    await user.save();
    res.status(200).json({ message: action === 'accept' ? "Request accepted" : "Request rejected" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Remove or Block Friend
exports.removeOrBlockFriend = async (req, res) => {
  const { userId, action } = req.body;
  const { friendId } = req.params;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) return res.status(404).json({ message: "User not found" });

    user.friends = user.friends.filter(id => id.toString() !== friendId);
    friend.friends = friend.friends.filter(id => id.toString() !== userId);

    if (action === 'block') {
      user.blockedUsers.push(friendId);
    }

    await user.save();
    await friend.save();

    res.status(200).json({ message: action === 'block' ? "User blocked" : "Friend removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Get List of Friends
exports.getFriends = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('friends', 'name email');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// طلب ظأهر 
exports.getFriendRequests = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('friendRequests', 'name email');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user.friendRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
