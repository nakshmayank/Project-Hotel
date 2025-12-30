import mongoose from "mongoose";

const visitorSchema = new mongoose.Schema(
  {
    stayId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stay",
      required: true
    },

    firstName: {
      type: String,
      required: true
    },

    lastName: {
      type: String,
      required: true
    },

    mobile: {
      type: String,
      length:10,
      required: true
    },

    email: {
      type: String,
      required: true
    },

    address: {
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
    }
  },
  { timestamps: true }
);

export default mongoose.model("Visitor", visitorSchema);
