import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import mainRouter from "./routes/index.js";
import redirectRouter from "./routes/redirect.js";


const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: true }));

app.use("/api", mainRouter);
app.use("/t", redirectRouter);


async function start() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, () => console.log(`*${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start();
