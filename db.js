const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Mongo');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = connectDB;