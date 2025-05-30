import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    origin === process.env.FRONTEND_URL
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
};
