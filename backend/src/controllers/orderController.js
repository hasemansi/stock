import Order from "../models/orderModel.js";
import Department from "../models/departmentModel.js";
import Supplier from "../models/supplierModel.js";
import Product from "../models/productModel.js";
import OrderDeatails from "../models/orderDetails.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create Order
export const createOrder = async (req, res) => {
    try {
        const { orderNumber, orderDate, department, supplier, products, status, remarks } = req.body;

        // Basic validations...
        if (!orderNumber || !department || !supplier || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "orderNumber, department, supplier and products are required." });
        }

        // Validate department and supplier
        const deptExists = await Department.findById(department);
        const suppExists = await Supplier.findById(supplier);
        if (!deptExists || !suppExists) return res.status(400).json({ message: "Department or Supplier not found." });

        // Validate products and calculate total
        let total = 0;
        const normalizedProducts = [];

        for (const p of products) {
            const prodDoc = await Product.findById(p.product);
            if (!prodDoc) return res.status(400).json({ message: `Product not found: ${p.product}` });

            const qty = Number(p.quantity);
            if (qty <= 0) return res.status(400).json({ message: "Quantity must be > 0" });

            const unitPrice = (typeof p.price === "number" && p.price >= 0) ? p.price : prodDoc.price;

            total += unitPrice * qty;
            normalizedProducts.push({ product: p.product, quantity: qty, price: unitPrice });
        }

        // ✅ Create the order first
        const order = await Order.create({
            orderNumber,
            orderDate: orderDate || Date.now(),
            department,
            supplier,
            products: normalizedProducts,
            totalAmount: total,
            status: status || "Pending",
            remarks: remarks || ""
        });

        // ✅ Now create the OrderDetails referencing this order
        await OrderDeatails.create({ order: order._id });

        // Populate for response
        const result = await order
        await order.populate("department", "name")
        await order.populate("supplier", "name company GST_code")
        await order.populate("products.product", "name")

        res.status(201).json({ message: "Order created successfully", order: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


// Get all orders
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("department", "name")
            .populate("supplier", "name company")
            .populate("products.product", "name");
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get order by id
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid order id." });

        const order = await Order.findById(id)
            .populate("department", "name")
            .populate("supplier", "name company GST_code")
            .populate("products.product", "name description price");

        if (!order) return res.status(404).json({ message: "Order not found." });
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update order
export const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid order id." });

        const { orderNumber, orderDate, department, supplier, products, status, remarks } = req.body;

        // Validate department and supplier if provided
        if (department) {
            const deptExists = await Department.findById(department);
            if (!deptExists) return res.status(400).json({ message: "Department not found." });
        }
        if (supplier) {
            const suppExists = await Supplier.findById(supplier);
            if (!suppExists) return res.status(400).json({ message: "Supplier not found." });
        }

        // Validate products and calculate total
        let total = 0;
        let normalizedProducts = [];
        if (products) {
            if (!Array.isArray(products) || products.length === 0) {
                return res.status(400).json({ message: "Products must be a non-empty array." });
            }

            for (const p of products) {
                const prodDoc = await Product.findById(p.product);
                if (!prodDoc) return res.status(400).json({ message: `Product not found: ${p.product}` });

                const qty = Number(p.quantity);
                if (qty <= 0) return res.status(400).json({ message: "Quantity must be > 0" });

                const unitPrice = (typeof p.price === "number" && p.price >= 0) ? p.price : prodDoc.price;
                total += unitPrice * qty;
                normalizedProducts.push({ product: p.product, quantity: qty, price: unitPrice });
            }
        }

        // Build update object
        const updateData = {
            ...(orderNumber && { orderNumber }),
            ...(orderDate && { orderDate }),
            ...(department && { department }),
            ...(supplier && { supplier }),
            ...(products && { products: normalizedProducts, totalAmount: total }),
            ...(status && { status }),
            ...(remarks && { remarks })
        };

        const updatedOrder = await Order.findByIdAndUpdate(id, updateData, { new: true })
            .populate("department", "name")
            .populate("supplier", "name company GST_code")
            .populate("products.product", "name price");

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({ message: "Order updated successfully", order: updatedOrder });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating order", error: err.message });
    }
};


// Delete order
export const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid order id." });

        const deleted = await Order.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Order not found." });

        res.status(200).json({ message: "Order deleted successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Example: Mark order as stock received
export const receiveStock = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid order id." });
    }

    // Find the order
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found." });

    // Here you can implement your logic for receiving stock
    // e.g., update inventory, quantities, etc.

    // ✅ Automatically update status to Approved
    order.status = "Approved";
    await order.save();

    res.status(200).json({ message: "Stock received and order approved.", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating order status", error: err.message });
  }
};
