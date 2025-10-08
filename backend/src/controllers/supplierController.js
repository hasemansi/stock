import Supplier from "../models/supplierModel.js";

// Create Supplier
export const createSupplier = async (req, res) => {
  try {
    const { name, email, phone, address, company, GST_code } = req.body;

    if (!name || !email || !phone || !address || !company || !GST_code) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Supplier.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Supplier with this email already exists" });
    }

    const supplier = await Supplier.create({ name, email, phone, address, company, GST_code });
    res.status(201).json({ message: "Supplier created successfully", supplier });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Suppliers
export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    if (!suppliers || suppliers.length === 0) {
      return res.status(404).json({ message: "No suppliers found." });
    }
    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Get Supplier by ID
export const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }
    res.status(200).json(supplier);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Update Supplier
export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address, company, GST_code } = req.body;

    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      { name, email, phone, address, company, GST_code },
      { new: true }
    );

    if (!updatedSupplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    res.status(200).json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};

// Delete Supplier
export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findById(id);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found." });
    }

    await Supplier.findByIdAndDelete(id);
    res.status(200).json({ message: "Supplier deleted successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
};
