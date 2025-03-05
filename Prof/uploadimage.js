const Image = require("../models/images");

// Upload Image Controller
exports.uploadImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).send("No file uploaded");

    const newImage = new Image({
      userId: req.body.userId,
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).send(err.message);
  }
};