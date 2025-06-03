import colors from "colors";
import { v2 as cloudinary } from "cloudinary";

if (
  process.env.CLOUDINARY_CLOUD_NAME === undefined ||
  process.env.CLOUDINARY_API_KEY === undefined ||
  process.env.CLOUDINARY_API_SECRET === undefined
) {
  console.error(
    colors.bgRed.white.bold("ERROR: CLOUDINARY CREDENTIALS NOT FOUND."),
  );
  process.exit(1);
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
