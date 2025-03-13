const Story = require("../models/story");

// // Add Story Controller
// exports.addStory = async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).send("No file uploaded");

//     const newStory = new Story({
//       userId: req.body.userId,
//       mediaUrl: `/uploads/${req.file.filename}`,
//       type: req.file.mimetype.startsWith("image/") ? "image" : "video",
//     });

//     await newStory.save();
//     res.status(201).json(newStory);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };

// // Get Stories
// exports.getStories = async (req, res) => {
//   try {
//     const stories = await Story.find().sort({ createdAt: -1 });
//     res.json(stories);
//   } catch (err) {
//     res.status(500).send(err.message);
//   }
// };
// Add Story Controller
exports.addStory = async (req, res) => {
  try {
    // Validate file upload
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // Validate userId
    if (!req.body.userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Create new story
    const newStory = new Story({
      userId: req.body.userId,
      mediaUrl: `/uploads/${req.file.filename}`,
      type: req.file.mimetype.startsWith("image/") ? "image" : "video",
    });

    await newStory.save();
    res.status(201).json({ message: "Story added successfully", story: newStory });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get Stories
exports.getStories = async (req, res) => {
  try {
    const stories = await Story.find().sort({ createdAt: -1 });
    res.json(stories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
