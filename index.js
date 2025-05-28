import express from "express";

const app = express();

// Routing
app.get("/", (req, res) => {
  res.send("Hola mundo en express");
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log("Server Working...");
});
