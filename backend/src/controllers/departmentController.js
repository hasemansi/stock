import Department from "../models/departmentModel.js";
import College from "../models/collegeModel.js";

// Create Department
export const createDepartment = async (req, res) => {
    try {
        const { name, college } = req.body;
        if (!name || !college) {
            return res.status(400).json({ message: "Name and College are required" });
        }

        const department = await Department.create({ name, college });
        res.status(201).json({ message: "Department created successfully", department });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all departments
export const getAllDepartments = async (req, res) => {
    try {
        const departments = await Department.find().populate("college", "name email location");
        if (!departments || departments.length === 0) {
            return res.status(404).json({ message: "No departments found." });
        }
        res.status(200).json(departments);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get department by ID
export const getDepartmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id).populate("college", "name email location");
        if (!department) {
            return res.status(404).json({ message: "Department not found." });
        }
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update Department
export const updateDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, college } = req.body;

        if (college) {
            const collegeExist = await College.findById(college);
            if (!collegeExist) {
                return res.status(400).json({ message: "College does not exist." });
            }
        }

        const updatedDepartment = await Department.findByIdAndUpdate(
            id,
            { name, college },
            { new: true }
        ).populate("college", "name email location");

        if (!updatedDepartment) {
            return res.status(404).json({ message: "Department not found." });
        }

        res.status(200).json(updatedDepartment);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete Department
export const deleteDepartment = async (req, res) => {
    try {
        const { id } = req.params;
        const department = await Department.findById(id);
        if (!department) {
            return res.status(404).json({ message: "Department not found." });
        }

        await Department.findByIdAndDelete(id);
        res.status(200).json({ message: "Department deleted successfully!" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
