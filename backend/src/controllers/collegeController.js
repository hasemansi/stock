import College from "../models/collegeModel.js";
import User from "../models/User.js";

// Create a new college
export const createCollege = async (req, res) => {
    try {
        const { name, email, location, user } = req.body;

        // Check if user user exists
        const userExist = await User.findById(user);
        console.log("Incoming user id:", user);
        if (!userExist) {
            return res.status(400).json({ message: "user user does not exist." });
        }

        const newCollege = new College({ name, email, location, user });
        const savedCollege = await newCollege.save();

        // populate the user field before sending back
        await savedCollege.populate("user", "name email");

        res.status(201).json(savedCollege);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get all colleges
export const getAllColleges = async (req, res) => {
    try {
        const colleges = await College.find().populate("user", "name email");
        if (!colleges || colleges.length === 0) {
            return res.status(404).json({ message: "No colleges found." });
        }
        res.status(200).json(colleges);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Get college by ID
export const getCollegeById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req);
        const college = await College.findById(id).populate("user", "name email");
        if (!college) {
            return res.status(404).json({ message: "College not found." });
        }
        res.status(200).json(college);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Update college
export const updateCollege = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, location, user } = req.body;

        // Optional: check if new user exists
        if (user) {
            const userExist = await User.findById(user);
            if (!userExist) {
                return res.status(400).json({ message: "user user does not exist." });
            }
        }

        const updatedCollege = await College.findByIdAndUpdate(
            id,
            { name, email, location, user },
            { new: true }
        ).populate("user", "name email");

        if (!updatedCollege) {
            return res.status(404).json({ message: "College not found." });
        }

        res.status(200).json(updatedCollege);
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};

// Delete college
export const deleteCollege = async (req, res) => {
    try {
        const { id } = req.params;
        const college = await College.findById(id);
        if (!college) {
            return res.status(404).json({ message: "College not found." });
        }

        await College.findByIdAndDelete(id);
        res.status(200).json({ message: "College deleted successfully!" });
    } catch (error) {
        res.status(500).json({ errorMessage: error.message });
    }
};
