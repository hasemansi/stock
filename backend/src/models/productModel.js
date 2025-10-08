import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",   // link with Supplier model
        required: true
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
