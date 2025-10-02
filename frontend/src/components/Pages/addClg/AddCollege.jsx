import React, { useState, useEffect } from "react";
import "./addcollege.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Dashboard from "../../Auth/Dashboard";
const AddCollege = () => {
    const [college, setCollege] = useState({
        name: "",
        email: "",
        location: "",
        user: "",
    });
    const [users, setUsers] = useState([]); // For admin dropdown
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch all users for Admin dropdown
        axios.get("http://localhost:3001/api/auth/users") // Make sure backend route exists
            .then(res => setUsers(res.data))
            .catch(err => console.log(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCollege({ ...college, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3001/api/colleges", college);
            toast.success("College added successfully!", { position: "top-right" });
            navigate("/colleges");
        } catch (err) {
            console.log(err);
            toast.error("Error adding college", { position: "top-right" });
        }
    };

    return (
        <Dashboard>
            <div className="addCollege">
                <Link to="/colleges" className="btn btn-secondary mb-3">
                    <i className="fa-solid fa-backward"></i> Back
                </Link>

                <h3>Add College</h3>

                <form className="addCollegeForm" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>College Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={college.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={college.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={college.location}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Admin User:</label>
                        <select name="user" value={college.user} onChange={handleChange} required>
                            <option value="">Select Admin</option>
                            {users.map(user => (
                                <option key={user._id} value={user._id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>

                    </div>

                    <button type="submit" className="btn btn-primary">Add College</button>
                </form>
            </div>
        </Dashboard>
    );
};

export default AddCollege;
