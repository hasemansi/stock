// routes/deptFacultyRoutes.js
import express from "express";
import {
    assignFacultyToDept,
    getDeptFaculties,
    getFacultyByDepartment,
    deleteDeptFaculty,
} from "../controllers/deptFacultyController.js";

const router = express.Router();

router.post("/", assignFacultyToDept);
router.get("/", getDeptFaculties);
router.get("/:deptId/faculties", getFacultyByDepartment);
router.delete("/:id", deleteDeptFaculty);

export default router;
