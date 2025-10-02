import React, { useEffect, useState } from "react";
import "./updatecollege.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Dashboard from "../../Auth/Dashboard";
const UpdateCollege = () => {
    const initialCollege = {
        name: "",
        email: "",
        location: "",
        user: "", // Admin user id
    };
    const [college, setCollege] = useState(initialCollege);
    const navigate = useNavigate();
    const { id } = useParams();

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setCollege({ ...college, [name]: value });
    };

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/colleges/${id}`)
            .then((response) => {
                setCollege(response.data.college || response.data);
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error fetching college data", { position: "top-right" });
            });
    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();
        await axios
            .put(`http://localhost:3001/api/colleges/${id}`, college)
            .then((response) => {
                toast.success("College updated successfully!", { position: "top-right" });
                navigate("/colleges");
            })
            .catch((error) => {
                console.log(error);
                toast.error("Error updating college", { position: "top-right" });
            });
    };

    return (
        <Dashboard>
            <div className="updateCollege">
                <Link to="/colleges" type="button" className="btn btn-secondary mb-3">
                    <i className="fa-solid fa-backward"></i> Back
                </Link>

                <h3>Update College</h3>

                <form className="updateCollegeForm" onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label htmlFor="name">College Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={college.name}
                            onChange={inputHandler}
                            name="name"
                            autoComplete="off"
                            placeholder="Enter College Name"
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="email">College Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={college.email}
                            onChange={inputHandler}
                            name="email"
                            autoComplete="off"
                            placeholder="Enter College Email"
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="location">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={college.location}
                            onChange={inputHandler}
                            name="location"
                            autoComplete="off"
                            placeholder="Enter College Location"
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label htmlFor="user">Admin User ID:</label>
                        <input
                            type="text"
                            id="user"
                            value={college.user}
                            onChange={inputHandler}
                            name="user"
                            autoComplete="off"
                            placeholder="Enter Admin User ID"
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
};

export default UpdateCollege;
