import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },

        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Role",   // Refers to Role collection
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Faculty", facultySchema);
