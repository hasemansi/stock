import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./order.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UpdateOrder = () => {
  const [order, setOrder] = useState({
    department: "",
    supplier: "",
    products: [],
    totalAmount: "",
    status: "",
  });
  const [departments, setDepartments] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/departments").then(res => setDepartments(res.data));
    axios.get("http://localhost:3001/api/suppliers").then(res => setSuppliers(res.data));
    axios.get("http://localhost:3001/api/products").then(res => setProducts(res.data));
    axios.get(`http://localhost:3001/api/orders/${id}`).then(res => setOrder(res.data));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleProductChange = (e) => {
    const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
    setOrder({ ...order, products: selected });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/api/orders/${id}`, order);
      toast.success("Order updated successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Error updating order");
    }
  };

  return (
    <Dashboard>
      <div className="orderFormContainer">
        <Link to="/orders" className="btn-back">
          <i className="fa-solid fa-arrow-left"></i> Back
        </Link>

        <h3>
          <i className="fas fa-edit"></i> Update Order
        </h3>

        <form className="orderForm" onSubmit={submitForm}>
          <div className="inputGroup">
            <label>Department:</label>
            <select name="department" value={order.department} onChange={handleChange} required>
              <option value="">-- Select Department --</option>
              {departments.map((d) => (
                <option key={d._id} value={d._id}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="inputGroup">
            <label>Supplier:</label>
            <select name="supplier" value={order.supplier} onChange={handleChange} required>
              <option value="">-- Select Supplier --</option>
              {suppliers.map((s) => (
                <option key={s._id} value={s._id}>{s.name}</option>
              ))}
            </select>
          </div>

          <div className="inputGroup">
            <label>Products:</label>
            <select multiple name="products" value={order.products} onChange={handleProductChange}>
              {products.map((p) => (
                <option key={p._id} value={p._id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          <div className="inputGroup">
            <label>Total Amount (₹):</label>
            <input
              type="number"
              name="totalAmount"
              value={order.totalAmount}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Status:</label>
            <select name="status" value={order.status} onChange={handleChange}>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="inputGroup">
            <button type="submit" className="btn-submit update">
              <i className="fa-solid fa-save"></i> Update Order
            </button>
          </div>
        </form>
      </div>
    </Dashboard>
  );
};

export default UpdateOrder;
