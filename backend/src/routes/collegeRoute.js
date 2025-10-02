// routes/collegeRoute.js
import express from "express";
import {
    createCollege,
    getAllColleges,
    getCollegeById,
    updateCollege,
    deleteCollege
} from "../controllers/collegeController.js";

const router = express.Router();

// Create a new college
router.post("/", createCollege);

// Get all colleges
router.get("/", getAllColleges);

// Get a single college by ID
router.get("/:id", getCollegeById);

// Update a college by ID
router.put("/:id", updateCollege);

// Delete a college by ID
router.delete("/:id", deleteCollege);

export default router;
