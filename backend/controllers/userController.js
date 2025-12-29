import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User : /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;

    if (!name || !email || !mobile || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const existingUser = await userModel.findOne({
      $or: [{ email }, { mobile }]
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      mobile,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      user: { email: user.email, name: user.name, mobile: user.mobile },
      message: "User Registered",
    });
  } catch (error) {
    console.log(error.message);
    res.status(201).json({ success: false, message: error.message });
  }
};

// Login User : /api/user/login
export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Missing details",
      });
    }

    // If Email is not registered
    const user = await userModel.findOne({
      $or: [
        { email: identifier },
        { mobile: identifier }
      ]
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not registered" });
    }

    // If Password doesn't match
    const isMatch = await bcrypt.compare(password, user.password);

    if (user && !isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }

    // If User is registered & password matches
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true, //Prevent JavaScript to access cookie
      secure: process.env.NODE_ENV === "production", //Use secure cookie in Production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF Protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //Cookie expiration time
    });

    return res.status(200).json({
      success: true,
      user: { email: user.email, name: user.name, mobile: user.mobile },
      message: "Login Successful",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Check auth : /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const userId = req.user;
    const user = await userModel.findById(userId).select("-password"); // to exclude password
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User Not Authorized" });
    }
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Logout User : /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, //Prevent JavaScript to access cookie
      secure: process.env.NODE_ENV === "production", //Use secure cookie in Production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF Protection
    });

    return res.status(200).json({ success: true, message: "Logged Out" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
