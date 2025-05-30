import { CorsOptions } from "cors";

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const withList = [process.env.FRONTEND_URL];
    if (process.argv[2] === "--api") withList.push(undefined);
    withList.includes(origin)
      ? callback(null, true)
      : callback(new Error("Not allowed by CORS"));
  },
};
