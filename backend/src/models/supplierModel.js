import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    company: { type: String, required: true },
    GST_code: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Supplier", supplierSchema);
