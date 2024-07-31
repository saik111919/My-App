import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const getClientAndCollection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT_DB); // No need for the deprecated options
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export { getClientAndCollection };
