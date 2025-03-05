const Video = require("../models/reels");

// Upload Video Controller
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No video uploaded");

    const newVideo = new Video({
      userId: req.body.userId,
      videoUrl: `/uploads/${req.file.filename}`,
    });

    await newVideo.save();
    res.status(201).json(newVideo);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
