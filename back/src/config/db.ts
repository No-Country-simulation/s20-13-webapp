import mongoose from "mongoose";
import { config } from "dotenv";

config();

export const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      `${process.env.MONGO_URL}${process.env.MONGO_COLLECTION}`
    );

    console.log(`✅ MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`❌ MongoDB connection error: ${error}`);

    process.exit(1);
  }
};
