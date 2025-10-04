import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./deptfaculty.css";

const DeptFaculty = () => {
    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/deptfaculty");
                setAssignments(res.data);
            } catch (err) {
                console.log(err);
                toast.error("Error fetching Dept-Faculty assignments");
            }
        };
        fetchAssignments();
    }, []);

    const deleteAssignment = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/deptfaculty/${id}`);
            setAssignments(assignments.filter((a) => a._id !== id));
            toast.success("Assignment deleted successfully");
        } catch (err) {
            console.log(err);
            toast.error("Error deleting assignment");
        }
    };

    return (
        <Dashboard>
            <div className="deptFacultyTable">
                <button className="btn btn-primary mb-3">
                    <Link
                        to="/add-deptfaculty"
                        style={{ color: "white", textDecoration: "none" }}
                    >
                        Add Assignment
                    </Link>
                </button>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Department</th>
                            <th>Faculty</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {assignments.map((a, index) => (
                            <tr key={a._id}>
                                <td>{index + 1}</td>
                                <td>{a.department?.name || "N/A"}</td>
                                <td>
                                    {a.faculties?.map((f) => f.name).join(", ") || "N/A"}
                                </td>
                                <td className="actionButtons">
                                    <Link
                                        to={`/update-deptfaculty/${a._id}`}
                                        className="btn btn-success me-2"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => deleteAssignment(a._id)}
                                        className="btn btn-danger"
                                    >
                                        Delete
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

export default DeptFaculty;
