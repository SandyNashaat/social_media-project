const Video = require("../models/Video");
const mongoose = require("mongoose");
const User = require("../models/User");
// Upload Video Controller
// exports.uploadVideo = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).send("No video uploaded");

//     const newVideo = new Video({
//       userId: req.body.userId,
//       videoUrl: `/uploads/${req.file.filename}`,
//     });

//     await newVideo.save();
//     res.status(201).json(newVideo);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };


// Upload Video Controller
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No video uploaded" });

    const { userId } = req.body;

    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    // Check if user exists before uploading a video
    const userExists = await User.findById(userId);
    if (!userExists) {
      return res.status(404).json({ error: "User not found" });
    }

    const newVideo = new Video({
      userId,
      videoUrl: `/uploads/${req.file.filename}`,
    });

    await newVideo.save();
    res.status(201).json({ message: "Video uploaded successfully", video: newVideo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

