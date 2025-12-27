import mongoose, { Schema, model } from "mongoose";

const visitorSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  name: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  roomNo: {
    type: String,
    required: true
  },

  idType: {
    type: String,
    enum: ["Aadhaar", "PAN", "Passport", "Driving License"],
    required: true
  },

  idNumber: {
    type: String,
    required: true
  },
  checkInTime: {
    type: Date,
    default: Date.now
  },
  checkOutTime: {
    type: Date,
    default: null
  },
  otp: {
    type: String,
    default: null
  },

  otpExpiresAt: {
    type: Date,
    default: null
  },

  otpAttempts: {
    type: Number,
    default: 0
  },

  otpLastSentAt: {
    type: Date,
    default: null
  }
},
  { timestamps: true }
);

export default model("Visitor", visitorSchema);
