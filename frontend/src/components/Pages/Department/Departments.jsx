import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./department.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Departments = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/departments")
            .then((res) => setDepartments(res.data))
            .catch((err) => console.log(err));
    }, []);

    const deleteDepartment = async (id) => {
        await axios
            .delete(`http://localhost:3001/api/departments/${id}`)
            .then((res) => {
                setDepartments((prev) => prev.filter((d) => d._id !== id));
                toast.success(res.data.message, { position: "top-right" });
            })
            .catch((err) => toast.error("Error deleting department"));
    };

    return (
        <Dashboard>
            <div className="departmentTable">
                <button className="btn btn-primary mb-3">
                    <Link to="/add-department" style={{ color: "white", textDecoration: "none" }}>
                        Add Department <i className="fa-solid fa-building"></i>
                    </Link>
                </button>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Department Name</th>
                            <th>College</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departments.map((dept, index) => (
                            <tr key={dept._id}>
                                <td>{index + 1}</td>
                                <td>{dept.name}</td>
                                <td>{dept.college?.name || "N/A"}</td>
                                <td>
                                    <Link to={`/update-department/${dept._id}`} className="btn btn-success me-2">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                        onClick={() => deleteDepartment(dept._id)}
                                        className="btn btn-danger"
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Dashboard>
    );
};

export default Departments;
