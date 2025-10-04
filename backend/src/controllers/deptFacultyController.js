// controllers/deptFacultyController.js
import DeptFaculty from "../models/deptFaculty.js";

// Create mapping
export const assignFacultyToDept = async (req, res) => {
  try {
    const { department, faculty } = req.body;

    const mapping = new DeptFaculty({ department, faculty });
    await mapping.save();

    res.status(201).json(mapping);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addAssignment = async (req, res) => {
  try {
    const { department, faculty } = req.body;

    if (!Array.isArray(department) || !Array.isArray(faculty)) {
      return res.status(400).json({ message: "Department and Faculty must be arrays" });
    }

    const assignment = new DeptFaculty({ department, faculty });
    await assignment.save();

    res.status(201).json({ message: "Assignment added successfully", assignment });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all mappings
export const getDeptFaculties = async (req, res) => {
  try {
    const mappings = await DeptFaculty.find()
      .populate("department")
      .populate("faculty");

    res.json(mappings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get faculty by department
export const getFacultyByDepartment = async (req, res) => {
  try {
    const { deptId } = req.params;
    const faculties = await DeptFaculty.find({ department: deptId }).populate("faculty");

    res.json(faculties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete mapping
export const deleteDeptFaculty = async (req, res) => {
  try {
    await DeptFaculty.findByIdAndDelete(req.params.id);
    res.json({ message: "Mapping deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
