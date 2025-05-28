import mongoose from "mongoose";

export const connectDB = async () => {
  console.log(process.env.MONGO_URI);
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found.");
    const url: string = `${process.env.MONGO_URI}`;
    const { connection } = await mongoose.connect(url);
    const host = `${connection.host}:${connection.port}`;
    console.log(`Mongo DB conected to: ${host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
