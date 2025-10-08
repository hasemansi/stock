import InwardEntry from "../models/inwardEntry.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";
import Supplier from "../models/supplierModel.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create Inward Entry
export const createInwardEntry = async (req, res) => {
  try {
    const { inwardNumber, inwardDate, order, products, remarks } = req.body;

    if (!inwardNumber || !order || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Inward number, order, and products are required." });
    }

    if (!isValidObjectId(order)) return res.status(400).json({ message: "Invalid order ID." });

    const orderDoc = await Order.findById(order).populate("supplier products.product");
    if (!orderDoc) return res.status(404).json({ message: "Order not found." });

    let totalAmount = 0;
    const normalizedProducts = [];

    for (const p of products) {
      const prod = orderDoc.products.find(op => op.product._id.toString() === p.product);
      if (!prod) return res.status(400).json({ message: "Product not in order." });

      totalAmount += p.quantity * p.price;
      normalizedProducts.push({ product: p.product, quantity: p.quantity, price: p.price });

      // Update product stock
      const productDoc = await Product.findById(p.product);
      productDoc.quantity += p.quantity;
      await productDoc.save();
    }

    const inwardEntry = await InwardEntry.create({
      inwardNumber,
      inwardDate: inwardDate || Date.now(),
      order,
      supplier: orderDoc.supplier._id,
      products: normalizedProducts,
      totalAmount,
      remarks: remarks || ""
    });

    res.status(201).json({ message: "Inward entry created successfully", inwardEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all inward entries
export const getAllInwardEntries = async (req, res) => {
  try {
    const entries = await InwardEntry.find()
      .populate("order", "orderNumber")
      .populate("supplier", "name company")
      .populate("products.product", "name");

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
