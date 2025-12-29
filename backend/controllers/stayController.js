import Stay from "../models/Stay.js";
import userModel from "../models/User.js";
import Visitor from "../models/Visitor.js";

// Start Stay (Check-in session)
export const startStay = async (req, res) => {
    const userId = req.user;

    const activeStay = await Stay.findOne({
        userId,
        status: "ACTIVE"
    });

    if (activeStay) {
        return res.status(400).json({
            success: false,
            message: "Already have an active stay"
        });
    }

    const stay = await Stay.create({ userId });

    res.status(201).json({
        success: true,
        stayId: stay._id
    });
};

// Add Visitor to Stay
export const addVisitor = async (req, res) => {
    const { stayId } = req.params;
    const { firstName, lastName, mobile, idType, idNumber, roomNo } = req.body;

    if (!firstName || !lastName || !mobile || !idType || !idNumber || !roomNo) {
        return res.status(400).json({
            success: false,
            message: "Missing visitor details"
        });
    }

    const visitor = await Visitor.create({
        stayId,
        firstName,
        lastName,
        mobile,
        idType,
        idNumber,
        roomNo
    });

    res.status(201).json({ success: true, visitor });
};

// Get Dashboard Data
export const getMyActiveStay = async (req, res) => {
    const userId = req.user;

    const stay = await Stay.findOne({
        userId,
    }).sort({ createdAt: -1 });

    if (!stay) {
        return res.json({ stay: null, visitors: [] });
    }

    const visitors = await Visitor.find({ stayId: stay._id });

    res.json({ stay, visitors });
};

export const sendCheckoutOTP = async (req, res) => {
    const userId = req.user;

    const user = await userModel.findById(userId);
    if (!user || !user.mobile) {
        return res.status(400).json({
            message: "Registered mobile number not found"
        });
    }

    const stay = await Stay.findOne({
        userId,
        status: "ACTIVE"
    });

    if (!stay) {
        return res.status(404).json({ message: "No active stay found" });
    }

    if (
        stay.otpLastSentAt &&
        Date.now() - stay.otpLastSentAt < 30 * 1000
    ) {
        return res.status(429).json({
            message: "Please wait before resending OTP"
        });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    stay.otp = otp;
    stay.otpExpiresAt = Date.now() + 5 * 60 * 1000;
    stay.otpAttempts = 0;
    stay.otpLastSentAt = Date.now();

    await stay.save();

    console.log("OTP sent to", user.mobile, ":", otp);

    res.json({
        success: true,
        maskedMobile: user.mobile.replace(/(\d{2})\d{6}(\d{2})/, "$1******$2")
    });
};



export const verifyCheckoutOTP = async (req, res) => {
    const userId = req.user;
    const { otp } = req.body;

    const stay = await Stay.findOne({
        userId,
        status: "ACTIVE",
    });

    if (!stay) {
        return res.status(404).json({
            message: "No active stay found"
        });
    }

    if (stay.otpAttempts >= 3) {
        return res.status(403).json({
            message: "Too many incorrect attempts"
        });
    }

    if (
        stay.otp !== otp ||
        stay.otpExpiresAt < Date.now()
    ) {
        stay.otpAttempts += 1;
        await stay.save();
        return res.status(400).json({
            message: "Invalid or expired OTP"
        });
    }

    // ✅ OTP VERIFIED → CHECKOUT
    stay.status = "COMPLETED";
    stay.checkOutTime = new Date();
    stay.otp = null;
    stay.otpExpiresAt = null;
    stay.otpAttempts = 0;

    await stay.save();

    res.json({ success: true, message: "Checkout successful" });
};

