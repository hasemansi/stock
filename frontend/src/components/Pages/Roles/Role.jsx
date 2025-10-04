import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";
import "./role.css";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

export default function Role() {
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/roles");
      setRoles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteRole = async (id) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      try {
        await axios.delete(`http://localhost:3001/api/roles/${id}`);
        fetchRoles();
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Dashboard>
      <div className="roleTable">
        <div className="headerSection">
          <h3>Role List</h3>
          <Link to="/add-role" className="btn btn-primary">
            <FaPlus /> Add Role
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>Role ID</th>
              <th>Role Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role) => (
              <tr key={role._id}>
                <td>{role.role_id}</td>
                <td>{role.name}</td>
                <td className="actionButtons">
                  <Link to={`/update-role/${role._id}`} className="btn btn-success">
                    <FaEdit />
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteRole(role._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
}
