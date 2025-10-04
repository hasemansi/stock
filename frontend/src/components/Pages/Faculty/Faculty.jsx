// src/components/Pages/Faculty/Faculty.jsx
import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./faculty.css";
import axios from "axios";
import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Faculty = () => {
    const [faculties, setFaculties] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/faculties")
            .then((res) => setFaculties(res.data))
            .catch((err) => console.log(err));
    }, []);

    const deleteFaculty = async (id) => {
        if (window.confirm("Are you sure you want to delete this faculty?")) {
            await axios.delete(`http://localhost:3001/api/faculties/${id}`);
            setFaculties(faculties.filter((f) => f._id !== id));
        }
    };

    return (
        <Dashboard>
            <div className="facultyTable">
                <div className="headerRow">
                    <h3>Faculty List</h3>
                    <Link to="/add-faculty" className="btn btn-primary">
                        <i className="fa fa-plus"></i> Add Faculty
                    </Link>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th>Faculty Name</th>
                            <th>Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {faculties.map((faculty) => (
                            <tr key={faculty._id}>
                                <td>{faculty.name}</td>
                                <td>{faculty.role?.name}</td>
                                <td className="actionButtons">
                                    <Link
                                        to={`/update-faculty/${faculty._id}`}
                                        className="btn btn-success"
                                    >
                                        <i className="fa fa-pen"></i>
                                    </Link>
                                    <button
                                        onClick={() => deleteFaculty(faculty._id)}
                                        className="btn btn-danger"
                                    >
                                        <i className="fa fa-trash"></i>
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

export default Faculty;
