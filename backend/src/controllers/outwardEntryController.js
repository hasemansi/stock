import OutwardEntry from "../models/outwardEntry.js";
import Product from "../models/productModel.js";
import Department from "../models/departmentModel.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create Outward Entry
export const createOutwardEntry = async (req, res) => {
  try {
    const { outwardNumber, outwardDate, department, products, remarks } = req.body;

    if (!outwardNumber || !department || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Outward number, department, and products are required." });
    }

    if (!isValidObjectId(department)) return res.status(400).json({ message: "Invalid department ID." });

    const deptDoc = await Department.findById(department);
    if (!deptDoc) return res.status(404).json({ message: "Department not found." });

    let totalAmount = 0;
    const normalizedProducts = [];

    for (const p of products) {
      if (!isValidObjectId(p.product)) return res.status(400).json({ message: "Invalid product ID." });
      const productDoc = await Product.findById(p.product);
      if (!productDoc) return res.status(404).json({ message: `Product not found: ${p.product}` });

      const qty = Number(p.quantity);
      if (qty <= 0) return res.status(400).json({ message: "Quantity must be > 0" });
      if (qty > productDoc.quantity) return res.status(400).json({ message: `Insufficient stock for ${productDoc.name}` });

      // Deduct stock
      productDoc.quantity -= qty;
      await productDoc.save();

      totalAmount += qty * p.price;
      normalizedProducts.push({ product: p.product, quantity: qty, price: p.price });
    }

    const outwardEntry = await OutwardEntry.create({
      outwardNumber,
      outwardDate: outwardDate || Date.now(),
      department,
      products: normalizedProducts,
      totalAmount,
      remarks: remarks || ""
    });

    res.status(201).json({ message: "Outward entry created successfully", outwardEntry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get all outward entries
export const getAllOutwardEntries = async (req, res) => {
  try {
    const entries = await OutwardEntry.find()
      .populate("department", "name")
      .populate("products.product", "name");

    res.status(200).json(entries);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
