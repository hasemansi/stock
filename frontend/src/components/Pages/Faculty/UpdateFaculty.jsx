// src/components/Pages/Faculty/UpdateFaculty.jsx
import React, { useState, useEffect } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./updatefaculty.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UpdateFaculty = () => {
  const { id } = useParams();
  const [faculty, setFaculty] = useState({ name: "", role: "" });
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/roles")
      .then((res) => setRoles(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`http://localhost:3001/api/faculties/${id}`)
      .then((res) => setFaculty(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaculty({ ...faculty, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`http://localhost:3001/api/faculties/${id}`, faculty)
      .then(() => {
        toast.success("Faculty updated successfully");
        navigate("/faculties");
      })
      .catch((err) => console.log(err));
  };

  return (
    <Dashboard>
      <div className="updateFaculty">
        <Link to="/faculties" className="btn btn-secondary mb-3">
          <i className="fa fa-arrow-left"></i> Back
        </Link>

        <h3>Update Faculty</h3>

        <form className="updateFacultyForm" onSubmit={submitForm}>
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
              value={faculty.role?._id || faculty.role}
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
              <i className="fa fa-save"></i> Update Faculty
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default UpdateFaculty;
