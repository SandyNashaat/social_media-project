const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to User
  imageUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
