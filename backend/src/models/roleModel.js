import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        role_id: { type: String, required: true, unique: true }, // Unique ID for role
        name: { type: String, required: true, unique: true } // e.g., Admin, User
    },
    { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
