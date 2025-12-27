import express from "express";
import authUser from "../middlewares/authUser.js";
import {
  checkInVisitor,
  checkOutVisitor,
  getMyStay,
  sendCheckoutOTP,
  verifyCheckoutOTP
} from "../controllers/visitorController.js";

const visitorRouter = express.Router();

/* Visitor Dashboard Routes */
visitorRouter.post("/checkin", authUser, checkInVisitor);
visitorRouter.put("/checkout", authUser, checkOutVisitor);
visitorRouter.get("/my-stay", authUser, getMyStay);
visitorRouter.post("/checkout/send-otp", sendCheckoutOTP);
visitorRouter.post("/checkout/verify-otp", verifyCheckoutOTP);

export default visitorRouter;
