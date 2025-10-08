import mongoose from "mongoose";

const outwardProductSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const outwardEntrySchema = new mongoose.Schema({
    outwardNumber: { type: String, required: true, unique: true },
    outwardDate: { type: Date, default: Date.now },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
    products: [outwardProductSchema],
    remarks: { type: String }
}, { timestamps: true });

export default mongoose.model("OutwardEntry", outwardEntrySchema);
