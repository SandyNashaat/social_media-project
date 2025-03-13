// const express = require('express');
// const mongoose = require('mongoose')
// require('dotenv').config();
// const connectDB = require('./config/db')
// const cookieParser = require('cookie-parser');
// const profileRoutes = require("./routes/profile");
// const postRoutes = require("./routes/profile");
// const uploadRoutes = require("./routes/profile");
// const videoRoutes = require("./routes/profile");
// const storyRoutes = require("./routes/profile");
// const friendRoutes = require("./routes/profile");
// const allpostRoutes = require("./routes/profile");
// const path = require("path");
// const cors = require('cors');

// const app = express();

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use("/api", videoRoutes); 
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// app.use(express.json())
// app.use(cors())
// app.use(cookieParser());



// // app.use( profileRoutes());
// // app.use("/api", postRoutes());
// // app.use("/api", uploadRoutes()); 
// // app.use("/api", storyRoutes()); 
// // app.use("/api", friendRoutes());
// // app.use("/api", allpostRoutes());

// app.use("/api", profileRoutes);
// app.use("/api", postRoutes);
// app.use("/api", uploadRoutes); 
// app.use("/api", storyRoutes); 
// app.use("/api", friendRoutes);
// app.use("/api", allpostRoutes);
// connectDB()

// const friendRoutes = require('./routes/friends');

// connectDB();
// app.use('/api/friends', friendRoutes);

// mongoose.connection.once('open', ()=>{
//     console.log('Connected DB......')
//     app.listen(process.env.PORT, ()=>{
//         console.log('SERVER In Runing.........')
//     })
// })

// mongoose.connection.on('error', (error)=>{
//     console.error(error)
// })

// module.exports = {app}


const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

const profileRoutes = require("./routes/profile");
const friendRoutes = require("./routes/friends");

const app = express();

// Connect to Database **before** using routes
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/profile", profileRoutes);
app.use("/api/friends", friendRoutes);

// Database Connection & Server Start
mongoose.connection.once("open", () => {
  console.log("Connected to DB...");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}...`);
  });
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

module.exports = app; // Export app directly

