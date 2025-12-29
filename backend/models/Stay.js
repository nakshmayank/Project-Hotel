import mongoose from "mongoose";

const staySchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
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

        status: {
            type: String,
            enum: ["ACTIVE", "COMPLETED"],
            default: "ACTIVE"
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

export default mongoose.model("Stay", staySchema);
