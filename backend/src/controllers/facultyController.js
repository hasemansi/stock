import Faculty from "../models/facultyModel.js";

// Get all faculties (populate role)
export const getFaculties = async (req, res) => {
    try {
        const faculties = await Faculty.find().populate("role", "role_id name");
        res.json(faculties);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get faculty by ID
export const getFacultyById = async (req, res) => {
    try {
        const faculty = await Faculty.findById(req.params.id).populate("role", "role_id name");
        if (!faculty) return res.status(404).json({ errorMessage: "Faculty not found" });
        res.json(faculty);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Create a new faculty
export const createFaculty = async (req, res) => {
    try {
        const { name, role } = req.body;

        const faculty = new Faculty({ name, role });
        await faculty.save();

        res.status(201).json(faculty);
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
};

// Update faculty
export const updateFaculty = async (req, res) => {
    try {
        const { name, role } = req.body;

        const updatedFaculty = await Faculty.findByIdAndUpdate(
            req.params.id,
            { name, role },
            { new: true, runValidators: true }
        ).populate("role", "role_id name");

        if (!updatedFaculty)
            return res.status(404).json({ errorMessage: "Faculty not found" });

        res.json(updatedFaculty);
    } catch (error) {
        res.status(400).json({ errorMessage: error.message });
    }
};

// Delete faculty
export const deleteFaculty = async (req, res) => {
    try {
        const deletedFaculty = await Faculty.findByIdAndDelete(req.params.id);
        if (!deletedFaculty)
            return res.status(404).json({ errorMessage: "Faculty not found" });

        res.json({ message: "Faculty deleted successfully" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
