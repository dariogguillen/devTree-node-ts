import colors from "colors";
import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI not found.");
    const url: string = `${process.env.MONGO_URI}`;
    const { connection } = await mongoose.connect(url);
    const host = `${connection.host}:${connection.port}`;
    console.log(colors.blue.italic.bold(`Mongo DB connected to: ${host}`));
  } catch (error) {
    const message = (error as { message: string }).message;
    console.error(
      colors.bgRed.white.bold(
        `ERROR TRYING TO CONNECT TO MONGO DB: ${message}.`,
      ),
    );
    process.exit(1);
  }
};
