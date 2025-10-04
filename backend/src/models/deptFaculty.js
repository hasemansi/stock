// models/DeptFaculty.js
import mongoose from "mongoose";

const deptFacultySchema = new mongoose.Schema({
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department", required: true },
  faculty: { type: mongoose.Schema.Types.ObjectId, ref: "Faculty", required: true },
});

export default mongoose.model("DeptFaculty", deptFacultySchema);
