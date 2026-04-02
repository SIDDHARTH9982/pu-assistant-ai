import mongoose from 'mongoose';

export const connectDB = async () => {
  const maxRetries = 5;
  let attempts = 0;

  while (attempts < maxRetries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log(`✅ MongoDB connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      attempts++;
      console.error(`❌ MongoDB connection attempt ${attempts}/${maxRetries} failed: ${error.message}`);
      if (attempts === maxRetries) {
        console.error('💡 Make sure MongoDB is running on your system.');
        console.error('💡 Start MongoDB: net start MongoDB');
        console.error('💡 Or use MongoDB Atlas - update MONGO_URI in .env');
        process.exit(1);
      }
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
};
