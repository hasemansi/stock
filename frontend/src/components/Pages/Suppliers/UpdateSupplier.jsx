import React, { useState, useEffect } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./supplier.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateSupplier = () => {
  const [supplier, setSupplier] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    GST_code: ""
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/suppliers/${id}`)
      .then((res) => setSupplier(res.data))
      .catch(() => toast.error("Error fetching supplier data"));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({ ...supplier, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/api/suppliers/${id}`, supplier)
      .then(() => {
        toast.success("Supplier updated successfully");
        navigate("/suppliers");
      })
      .catch(() => toast.error("Error updating supplier"));
  };

  return (
    <Dashboard>
      <div className="updateSupplier">
        <Link to="/suppliers" className="btn btn-secondary mb-3">
          <i className="fa-solid fa-backward"></i> Back
        </Link>

        <h3>Update Supplier</h3>

        <form className="updateSupplierForm" onSubmit={submitForm}>
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
              <i className="fa-solid fa-pen-to-square"></i> Update Supplier
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default UpdateSupplier;
