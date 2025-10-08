import Product from "../models/productModel.js";
import Supplier from "../models/supplierModel.js";

// Create Product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, quantity, supplier } = req.body;

        if (!name || !price || !quantity || !supplier) {
            return res.status(400).json({ message: "All required fields must be provided" });
        }

        // Check supplier exists
        const supplierExists = await Supplier.findById(supplier);
        if (!supplierExists) {
            return res.status(400).json({ message: "Supplier does not exist" });
        }

        const product = await Product.create({ name, description, price, quantity, supplier });
        res.status(201).json({ message: "Product created successfully", product });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get all products with supplier info
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("supplier", "name email phone address");
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found." });
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get product by ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id).populate("supplier", "name email phone address");
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update Product
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, quantity, supplier } = req.body;

        if (supplier) {
            const supplierExists = await Supplier.findById(supplier);
            if (!supplierExists) {
                return res.status(400).json({ message: "Supplier does not exist" });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, description, price, quantity, supplier },
            { new: true }
        ).populate("supplier", "name email phone address");

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete Product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Product deleted successfully!" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
