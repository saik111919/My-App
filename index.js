const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const { getClientAndCollection } = require("./Src/DB");
const { getClientAndCollection } = require("./Src/DB/db");
const app = express();
const cors = require('cors');

dotenv.config();

// Import routes

const authRoute = require("./Src/Routes/auth");

// DATABASE
getClientAndCollection();

const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Optionally, you can also handle the "disconnected" event
db.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  });
});

// Middlewares

const corsOptions = {
  origin: [
    "https://urban-space-goldfish-v9w74www7jxfp67q-5173.app.github.dev",
    // "*",
  ],
  credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json())

app.use("/api", authRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
