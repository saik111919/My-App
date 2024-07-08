const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const { getClientAndCollection } = require("./Src/DB");
const { getClientAndCollection } = require("./Src/DB/db");
const app = express();
const cors = require("cors");
const path = require("path");

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
    "http://localhost:5173",
    "http://localhost:4000",
    "http://localhost:5000",
    "https://my-app-one-chi-83.vercel.app",
    "https://my-app-git-main-vsmh11.vercel.app",
    "https://my-app-vsmh11.vercel.app",
    "http://localhost:5173/",
    "*",
  ],
  credentials: true, //access-control-allow-credentials:true
  // optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());

app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(express.static("public"));

app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "public", "index.html"))
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
