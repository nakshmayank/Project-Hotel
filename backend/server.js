import dotenv from 'dotenv';
dotenv.config();

import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors";
import connectDB from "./configs/db.js";
import userRouter from "./routes/userRoute.js";
import stayRouter from './routes/stayRoutes.js';
// import connectCloudinary from "./configs/cloudinary.js";
// import { stripeWebhooks } from "./controllers/orderController.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
// await connectCloudinary();

// Allow multiple origins
const allowedOrigins = ["http://localhost:5173"];

// Payment Confirmation using Webhook
// app.post("/stripe", express.raw({ type: "application/json" }), stripeWebhooks);

// Middleware Configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get("/", (req, res) => res.send("API is working."));
// app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/stays", stayRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
