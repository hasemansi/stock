import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    college: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "College",   // must match your College model name
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Department", departmentSchema);
