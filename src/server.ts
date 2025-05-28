import express from "express";
import { connectDB } from "./config/db";
import "dotenv/config";

const app = express();

// Routing
app.get("/", (req, res) => {
  res.send("Hola mundo en express / typescript");
});
connectDB();

export default app;
