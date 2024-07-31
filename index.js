import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";
import { getClientAndCollection } from "./Src/DB/db.js";
import corsOptions from "./Src/Common/CorsOption.js";
import router from "./Src/Routes/router.js";

config();

const app = express();
const PORT = process.env.PORT || 4000;

// DATABASE CONNECTION
getClientAndCollection();

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB"));
db.on("disconnected", () => console.warn("MongoDB disconnected"));

process.on("SIGINT", () => {
  mongoose.connection.close(() => {
    console.log("MongoDB connection closed through app termination");
    process.exit(0);
  });
});

// MIDDLEWARES
app.use(cors(corsOptions));
app.use(express.json());
app.use("/api", router);
app.use(express.static("public"));

// SERVE SPA
app.get("*", (req, res) =>
  res.sendFile(path.resolve(__dirname, "public", "index.html"))
);

// START SERVER
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
