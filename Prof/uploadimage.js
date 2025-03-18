const Image = require("../models/images");
const mongoose = require("mongoose");
const User = require("../models/User");
// Upload Image Controller
// exports.uploadImage = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).send("No file uploaded");

//     const newImage = new Image({
//       userId: req.body.userId,
//       imageUrl: `/uploads/${req.file.filename}`,
//     });

//     await newImage.save();
//     res.status(201).json(newImage);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };



// Upload Image Controller
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const { userId } = req.body;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Check if user exists before uploading an image
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const newImage = new Image({
      userId,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully", image: newImage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
