import React, { useState, useEffect } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./updateRole.css";
import { FaSave } from "react-icons/fa";

export default function UpdateRole() {
    const { id } = useParams();
    const [role, setRole] = useState({ role_id: "", name: "" });
    const navigate = useNavigate();

    useEffect(() => {
        console.log("Role ID from params:", id); 
        fetchRole();
    }, [id]);

    const fetchRole = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/roles/${id}`);
            setRole(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setRole({ ...role, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3001/api/roles/${id}`, role);
            navigate("/roles");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Dashboard>
            <div className="updateRole">
                <h3>Update Role</h3>
                <form onSubmit={handleSubmit} className="updateRoleForm">
                    <div className="inputGroup">
                        <label>Role ID</label>
                        <input
                            type="text"
                            name="role_id"
                            value={role.role_id}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label>Role Name</label>
                        <input
                            type="text"
                            name="name"
                            value={role.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        <FaSave /> Update
                    </button>
                </form>
            </div>
        </Dashboard>
    );
}
