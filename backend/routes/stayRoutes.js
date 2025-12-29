import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  startStay,
  addVisitor,
  getMyActiveStay,
  sendCheckoutOTP,
  verifyCheckoutOTP
} from "../controllers/stayController.js";

const stayRouter = express.Router();

stayRouter.post("/start", authUser, startStay);
stayRouter.post("/:stayId/visitors", authUser, addVisitor);
stayRouter.get("/my-stay", authUser, getMyActiveStay);
stayRouter.post("/checkout/send-otp", authUser, sendCheckoutOTP);
stayRouter.post("/checkout/verify-otp", authUser, verifyCheckoutOTP);

export default stayRouter;
