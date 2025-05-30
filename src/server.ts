import cors from "cors";
import express from "express";
import router from "./router";
import { connectDB } from "./config/db";
import { corsOptions } from "./config/cors";
import "dotenv/config";

const app = express();

connectDB();

// Cors
app.use(cors(corsOptions));

// Read data from forms
app.use(express.json());

app.use("/", router);

export default app;
