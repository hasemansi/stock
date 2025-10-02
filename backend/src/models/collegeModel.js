// models/collegeModel.js
import mongoose from "mongoose";

const collegeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    user: {   // reference to User
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // must match your User model name
        required: true
    },
    location: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("College", collegeSchema);
