import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./supplier.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);

  const fetchSuppliers = () => {
    axios
      .get("http://localhost:3001/api/suppliers")
      .then((res) => setSuppliers(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const deleteSupplier = async (id) => {
    await axios
      .delete(`http://localhost:3001/api/suppliers/${id}`)
      .then((res) => {
        setSuppliers((prev) => prev.filter((s) => s._id !== id));
        toast.success(res.data.message);
      })
      .catch(() => toast.error("Error deleting supplier"));
  };

  return (
    <Dashboard>
      <div className="supplierTable">
        <button className="btn btn-primary mb-3">
          <Link to="/add-supplier" style={{ color: "white", textDecoration: "none" }}>
            Add Supplier <i className="fa-solid fa-user-plus"></i>
          </Link>
        </button>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>GST Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((sup, index) => (
              <tr key={sup._id}>
                <td>{index + 1}</td>
                <td>{sup.name}</td>
                <td>{sup.email}</td>
                <td>{sup.phone}</td>
                <td>{sup.company}</td>
                <td>{sup.GST_code}</td>
                <td>
                  <Link to={`/update-supplier/${sup._id}`} className="btn btn-success me-2">
                    <i className="fa-solid fa-pen-to-square"></i>
                  </Link>
                  <button onClick={() => deleteSupplier(sup._id)} className="btn btn-danger">
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

export default Suppliers;
