import mongoose from "mongoose";

const orderProductSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true, min: 0 } // unit price at time of ordering
}, { _id: false });

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  orderDate: { type: Date, default: Date.now },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Supplier",
    required: true
  },
  products: [orderProductSchema],
  totalAmount: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Delivered", "Cancelled"],
    default: "Pending"
  },
  remarks: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
