import Product from "../models/productModel.js";
import mongoose from "mongoose";

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price } = req.body;

        if (!name || price === undefined) {
            return res.status(400).json({ message: "Name and price are required." });
        }

        const product = await Product.create({ name, description, price });
        res.status(201).json({ message: "Product created successfully", product });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating product", error: err.message });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching products", error: err.message });
    }
};

// Get a single product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid product id." });

        const product = await Product.findById(id);
        if (!product) return res.status(404).json({ message: "Product not found." });

        res.status(200).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching product", error: err.message });
    }
};

// Update a product by ID
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid product id." });

        const { name, description, price } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price },
            { new: true }
        );

        if (!updatedProduct) return res.status(404).json({ message: "Product not found." });

        res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating product", error: err.message });
    }
};

// Delete a product by ID
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidObjectId(id)) return res.status(400).json({ message: "Invalid product id." });

        const deleted = await Product.findByIdAndDelete(id);
        if (!deleted) return res.status(404).json({ message: "Product not found." });

        res.status(200).json({ message: "Product deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting product", error: err.message });
    }
};
