import React, { useState, useEffect } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "./adddeptfaculty.css";

const AddDeptFaculty = () => {
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [assignment, setAssignment] = useState({
    department: "",
    faculties: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/departments").then((res) => {
      setDepartments(res.data);
    });
    axios.get("http://localhost:3001/api/faculties").then((res) => {
      setFaculties(res.data);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "faculties") {
      const selected = Array.from(options)
        .filter((o) => o.selected)
        .map((o) => o.value);
      setAssignment({ ...assignment, faculties: selected });
    } else {
      setAssignment({ ...assignment, [name]: value });
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/deptfaculty", assignment);
      toast.success("Assignment added successfully");
      navigate("/dept-faculty");
    } catch (err) {
      console.log(err);
      toast.error("Error adding assignment");
    }
  };

  return (
    <Dashboard>
      <div className="addDeptFaculty">
        <Link to="/dept-faculty" className="btn btn-secondary mb-3">
          Back
        </Link>

        <h3>Add Dept-Faculty Assignment</h3>

        <form className="addDeptFacultyForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="department">Select Department:</label>
            <select
              name="department"
              value={assignment.department}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Department --</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputGroup">
            <label htmlFor="faculties">Select Faculties:</label>
            <select
              name="faculties"
              multiple
              value={assignment.faculties}
              onChange={handleChange}
              required
            >
              {faculties.map((f) => (
                <option key={f._id} value={f._id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputGroup">
            <button type="submit" className="btn btn-primary">
              Add Assignment
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddDeptFaculty;
