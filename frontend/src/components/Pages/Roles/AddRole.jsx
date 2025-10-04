// import React, { useState } from "react";
// import Dashboard from "../../Auth/Dashboard";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./addRole.css";
// import { FaArrowLeft ,FaSave} from "react-icons/fa";


// export default function AddRole() {
//     const [role, setRole] = useState({ role_id: "", name: "" });
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setRole({ ...role, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.post("http://localhost:3001/api/roles", role);
//             navigate("/roles");
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     return (
//         <Dashboard>
//             <div className="addRole">
//                 {/* Back button */}
//                 <Link to="/roles" className="btn btn-secondary mb-3">
//                     <FaArrowLeft /> Back
//                 </Link>
//                 <h3>Add Role</h3>
//                 <form onSubmit={handleSubmit} className="addRoleForm">
//                     <div className="inputGroup">
//                         <label>Role ID</label>
//                         <input
//                             type="text"
//                             name="role_id"
//                             value={role.role_id}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <div className="inputGroup">
//                         <label>Role Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={role.name}
//                             onChange={handleChange}
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-primary">
//                         <FaSave /> Save
//                     </button>
//                 </form>
//             </div>
//         </Dashboard>
//     );
// }

// AddRole.jsx
import React, { useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./addrole.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";

const AddRole = () => {
    const [role, setRole] = useState({ name: "" });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setRole({ ...role, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/api/roles", role)
            .then((res) => {
                toast.success("Role added successfully");
                navigate("/roles");
            })
            .catch((err) => console.log(err));
    };

    return (
        <Dashboard>
            <div className="addRole">
                {/* Back button */}
                <Link to="/roles" className="btn btn-secondary mb-3">
                    <FaArrowLeft /> Back
                </Link>

                <h3>Add Role</h3>

                <form className="addRoleForm" onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label htmlFor="role">Role ID</label>
                        <input
                            type="text"
                            name="role_id"
                            value={role.role_id}
                            onChange={handleChange}
                            placeholder="Enter Role Id"
                            required
                        />
                    </div>
                    <div className="inputGroup">
                        <label htmlFor="name">Role Name:</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={role.name}
                            onChange={handleChange}
                            placeholder="Enter Role Name"
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <button type="submit" className="btn btn-primary">
                            Add Role
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
};

export default AddRole;
