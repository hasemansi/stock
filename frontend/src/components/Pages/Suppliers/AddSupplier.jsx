import React, { useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./supplier.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddSupplier = () => {
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    GST_code: ""
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/api/suppliers", supplier)
      .then(() => {
        toast.success("Supplier added successfully");
        navigate("/suppliers");
      })
      .catch(() => toast.error("Error adding supplier"));
  };

  return (
    <Dashboard>
      <div className="addSupplier">
        <Link to="/suppliers" className="btn btn-secondary mb-3">
          <i className="fa-solid fa-backward"></i> Back
        </Link>

        <h3>Add Supplier</h3>

        <form className="addSupplierForm" onSubmit={submitForm}>
          {["name", "email", "phone", "address", "company", "GST_code"].map((field) => (
            <div className="inputGroup" key={field}>
              <label>{field === "GST_code" ? "GST Number:" : field.charAt(0).toUpperCase() + field.slice(1) + ":"}</label>
              <input
                type={field === "email" ? "email" : "text"}
                name={field}
                value={supplier[field]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          <div className="inputGroup">
            <button type="submit" className="btn btn-primary">
              <i className="fa-solid fa-plus"></i> Add Supplier
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddSupplier;
