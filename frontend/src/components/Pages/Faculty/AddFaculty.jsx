// src/components/Pages/Faculty/AddFaculty.jsx
import React, { useState, useEffect } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./addfaculty.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";

const AddFaculty = () => {
  const [faculty, setFaculty] = useState({ name: "", role: "" });
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaculty({ ...faculty, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:3001/api/faculties", faculty)
      .then(() => {
        toast.success("Faculty added successfully");
        navigate("/faculties");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dashboard>
      <div className="addFaculty">
        <Link to="/faculties" className="btn btn-secondary mb-3">
          <i className="fa fa-arrow-left"></i> Back
        </Link>

        <h3>Add Faculty</h3>

        <form className="addFacultyForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label htmlFor="name">Faculty Name:</label>
            <input
              type="text"
              name="name"
              value={faculty.name}
              onChange={handleChange}
              placeholder="Enter Faculty Name"
              required
            />
          </div>

          <div className="inputGroup">
            <label htmlFor="role">Select Role:</label>
            <select
              name="role"
              value={faculty.role}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Role --</option>
              {roles.map((r) => (
                <option key={r._id} value={r._id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputGroup">
            <button type="submit" className="btn btn-primary">
              <i className="fa fa-save"></i> Add Faculty
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddFaculty;
