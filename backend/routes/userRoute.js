import express from "express";
import {
  isAuth,
  login,
  logout,
  register,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth); //authUser middleware to verify user
userRouter.get("/logout", authUser, logout); //authUser middleware to verify user to process logout

export default userRouter;