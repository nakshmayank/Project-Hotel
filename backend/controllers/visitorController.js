import Visitor from "../models/Visitor.js";

// CheckIn : /api/visitors/checkin
export const checkInVisitor = async (req, res) => {
  try {
    const userId = req.user;
    const { name, mobile, idType, idNumber, roomNo } = req.body;

    if (!name || !mobile || !roomNo) {
      return res.status(400).json({
        success: false,
        message: "Missing required details"
      });
    }

    // Prevent multiple active check-ins
    const existingVisit = await Visitor.findOne({
      userId,
      checkOutTime: null
    });

    if (existingVisit) {
      return res.status(400).json({
        success: false,
        message: "User already checked-in"
      });
    }

    const visitor = await Visitor.create({
      userId,
      name,
      mobile,
      idType,
      idNumber,
      roomNo
    });

    res.status(201).json({
      success: true,
      visitor,
      message: "Check-In Successful"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CheckOut : /api/visitors/checkout
export const checkOutVisitor = async (req, res) => {
  try {
    const userId = req.user;

    const visitor = await Visitor.findOneAndUpdate(
      { userId, checkOutTime: null },
      { checkOutTime: new Date() },
      { new: true }
    );

    if (!visitor) {
      return res.status(400).json({
        success: false,
        message: "No active check-in found"
      });
    }

    res.status(200).json({
      success: true,
      visitor,
      message: "Check-Out Successful"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Fetch Dashboard Data : /api/visitors/my-stay
export const getMyStay = async (req, res) => {
  try {
    const userId = req.user;

    const visitor = await Visitor.findOne({ userId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      visitor
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Send OTP for checkout verfication : /api/visitors/checkout/send-otp
export const sendCheckoutOTP = async (req, res) => {
  const { mobile } = req.body;

  const visitor = await Visitor.findOne({
    mobile,
    checkOutTime: null
  });

  if (!visitor) {
    return res.status(404).json({ message: "No active stay found" });
  }

  // ⏱ Prevent rapid resend (30 sec)
  if (
    visitor.otpLastSentAt &&
    Date.now() - visitor.otpLastSentAt < 30 * 1000
  ) {
    return res.status(429).json({
      message: "Please wait before resending OTP"
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  visitor.otp = otp;
  visitor.otpExpiresAt = Date.now() + 5 * 60 * 1000;
  visitor.otpAttempts = 0;
  visitor.otpLastSentAt = Date.now();

  await visitor.save();

  // 🔧 MOCK SMS (later replace)
  console.log("OTP for", mobile, ":", otp);

  res.json({ success: true });
};

// Verify OTP for checkout : /api/visitors/checkout/verify-otp
export const verifyCheckoutOTP = async (req, res) => {
  const { mobile, otp } = req.body;

  const visitor = await Visitor.findOne({
    mobile,
    checkOutTime: null
  });

  if (!visitor) {
    return res.status(404).json({ message: "No active stay found" });
  }

  if (visitor.otpAttempts >= 3) {
    return res.status(403).json({
      message: "Too many incorrect attempts"
    });
  }

  if (
    visitor.otp !== otp ||
    visitor.otpExpiresAt < Date.now()
  ) {
    visitor.otpAttempts += 1;
    await visitor.save();
    return res.status(400).json({ message: "Invalid or expired OTP" });
  }

  visitor.checkOutTime = new Date();
  visitor.otp = null;
  visitor.otpExpiresAt = null;
  visitor.otpAttempts = 0;

  await visitor.save();

  res.json({ success: true });
};

