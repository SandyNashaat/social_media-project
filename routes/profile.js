const express = require("express");
const { editProfile } = require("../Prof/edit");
const { addPost } = require("../Prof/addpost");
const { uploadImage } = require("../Prof/uploadimage");
const { uploadVideo } = require("../Prof/uploadvideo");
const { addStory, getStories } = require("../Prof/addstory");
const { getFriends, sendFriendRequest, acceptFriendRequest } = require("../Prof/getfriends");
const { getAllPosts, createPost } = require("../Prof/getallposts");
const multer = require("multer");
const path = require("path");
const router = express.Router();

// Multer Storage Configuration
const storageimage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const uploadimage = multer({ storageimage });

router.post("/upload-image", uploadimage.single("image"), uploadImage);




const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("video/")) {
        cb(null, true);
      } else {
        cb(new Error("Only videos are allowed"), false);
      }
    },
  });
  
  router.post("/upload-video", upload.single("video"), uploadVideo);


  const story = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const uploadstory = multer({
    story,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (req, file, cb) => {
      if (file.mimetype.startsWith("image/") || file.mimetype.startsWith("video/")) {
        cb(null, true);
      } else {
        cb(new Error("Only images and videos are allowed"), false);
      }
    },
  });
  
  router.post("/add-story", uploadstory.single("media"), addStory);
  router.get("/get-stories", getStories);
router.put("/profile/:userId", editProfile);
router.post("/add-post", addPost);
router.get("/get-friends/:userId", getFriends);
router.post("/send-friend-request", sendFriendRequest);
router.post("/accept-friend-request", acceptFriendRequest);
router.get("/get-all-posts", getAllPosts);
router.post("/create-post", createPost);

module.exports = router;
