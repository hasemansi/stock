import React, { useState, useEffect } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./updatedepartment.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UpdateDepartment = () => {
    const [department, setDepartment] = useState({ name: "", college: "" });
    const [colleges, setColleges] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/colleges")
            .then((res) => setColleges(res.data))
            .catch((err) => console.log(err));

        axios
            .get(`http://localhost:3001/api/departments/${id}`)
            .then((res) => setDepartment(res.data.department || res.data))
            .catch(() => toast.error("Error fetching department data"));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDepartment({ ...department, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:3001/api/departments/${id}`, department)
            .then(() => {
                toast.success("Department updated successfully");
                navigate("/departments");
            })
            .catch(() => toast.error("Error updating department"));
    };

    return (
        <Dashboard>
            <div className="updateDepartment">
                <Link to="/departments" className="btn btn-secondary mb-3">
                    <i className="fa-solid fa-backward"></i> Back
                </Link>

                <h3>Update Department</h3>

                <form className="updateDepartmentForm" onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label>Department Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={department.name}
                            onChange={handleChange}
                            placeholder="Enter Department Name"
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Select College:</label>
                        <select
                            name="college"
                            value={department.college}
                            onChange={handleChange}
                            required
                        >
                            <option value="">-- Select College --</option>
                            {colleges.map((col) => (
                                <option key={col._id} value={col._id}>
                                    {col.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="inputGroup">
                        <button type="submit" className="btn btn-primary">
                            <i className="fa-solid fa-pen-to-square"></i> Update Department
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
};

export default UpdateDepartment;
