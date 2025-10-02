import React, { useEffect, useState } from "react";
import "./college.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Dashboard from "../../Auth/Dashboard";
const College = () => {
    const [colleges, setColleges] = useState([]);

    useEffect(() => {
        const fetchColleges = async () => {
            try {
                const res = await axios.get("http://localhost:3001/api/colleges");
                setColleges(res.data);
            } catch (err) {
                console.log("Error fetching colleges:", err);
                toast.error("Error fetching colleges", { position: "top-right" });
            }
        };
        fetchColleges();
    }, []);

    const deleteCollege = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:3001/api/colleges/${id}`);
            setColleges((prev) => prev.filter((c) => c._id !== id));
            toast.success(res.data.message, { position: "top-right" });
        } catch (err) {
            console.log(err);
            toast.error("Error deleting college", { position: "top-right" });
        }
    };

    return (
        <Dashboard>
        <div className="collegeTable">
            <button className="btn btn-primary mb-3">
                <Link to="/add-college" style={{ color: "white", textDecoration: "none" }}>
                    Add College <i className="fa-solid fa-building-columns"></i>
                </Link>
            </button>

            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>S.No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Location</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {colleges.map((college, idx) => (
                        <tr key={college._id}>
                            <td>{idx + 1}</td>
                            <td>{college.name}</td>
                            <td>{college.email}</td>
                            <td>{college.location}</td>
                            <td>{college.user?.name || "N/A"}</td>
                            <td className="actionButtons">
                                <Link
                                    to={`/update-college/${college._id}`}
                                    className="btn btn-success me-2"
                                >
                                    <i className="fa-solid fa-pen-to-square"></i>
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => deleteCollege(college._id)}
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

export default College;
