import mongoose from "mongoose";

const uri = process.env.MONGODB_URI as string;

if (!uri) {
  throw new Error("MONGODB_URI nije definisan ❌");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);

    console.log("MongoDB connected batice 🚀");
  } catch (error) {
    console.error("DB error:", error);
    process.exit(1);
  }
};