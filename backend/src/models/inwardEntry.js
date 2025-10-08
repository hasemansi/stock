import mongoose from "mongoose";

const inwardProductSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true, min: 0 } // unit price at purchase
}, { _id: false });

const inwardEntrySchema = new mongoose.Schema({
    inwardNumber: { type: String, required: true, unique: true },
    inwardDate: { type: Date, default: Date.now },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true }, // reference to the Order
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier", required: true },
    products: [inwardProductSchema],
    totalAmount: { type: Number, required: true, min: 0 },
    remarks: { type: String }
}, { timestamps: true });

export default mongoose.model("InwardEntry", inwardEntrySchema);
