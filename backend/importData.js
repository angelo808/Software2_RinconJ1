const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/userModel');
const { USERS } = require('../src/data/users');  

dotenv.config();

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000,
      socketTimeoutMS: 60000,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

async function importData() {
  try {
    mongoose.set('bufferCommands', false);  // Ensure commands are not buffered

    await retryOperation(async () => await User.deleteMany(), 5, 20000);  // Retry delete operation
    await retryOperation(async () => await User.insertMany(USERS), 5, 20000);  // Retry insert operation

    console.log('Data Imported Successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
}
async function retryOperation(operation, retries = 5, delay = 20000) {
  for (let i = 0; i < retries; i++) {
    try {
      await operation();
      return;
    } catch (error) {
      if (i === retries - 1) throw error;
      console.log(`Retrying operation, attempt ${i + 1}`);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
}


connectDB().then(importData);

