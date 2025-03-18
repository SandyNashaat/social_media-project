// const Profile = require("../models/Profile");

// // Edit Profile
// exports.editProfile = async (req, res) => {
//   try {
//     const updatedProfile = await Profile.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     if (!updatedProfile) return res.status(404).send("Profile not found");
//     res.json(updatedProfile);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
const User = require("../models/User");
const mongoose = require("mongoose");
// const editProfile = async (userId, profileData) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { ...profileData, updatedAt: Date.now() },
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       throw new Error("User not found");
//     }

//     return updatedUser;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// };

// module.exports = editProfile;


const editProfile = async (userId, profileData) => {
  try {
    // Validate userId format
    if (!mongoose.isValidObjectId(userId)) {
      throw new Error("Invalid user ID format");
    }

    // Update user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { ...profileData, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    // Check if user exists
    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (err) {
    throw new Error(err.message);
  }
};

module.exports = editProfile;

