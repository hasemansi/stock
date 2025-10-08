import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import "./orderDetails.css";

const OrderDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [search, setSearch] = useState("");

  const fetchAll = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/order-details");
      setOrderDetails(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch order details");
    }
  };

  const handleSearch = async () => {
    if (!search.trim()) {
      fetchAll();
      return;
    }
    try {
      const res = await axios.get(`http://localhost:3001/api/order-details/${search}`);
      setOrderDetails(res.data);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Order not found");
      setOrderDetails([]);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <Dashboard>
      <div className="orderDetailsContainer">
        <h3>Order Details</h3>

        <div className="searchBar">
          <input
            type="text"
            placeholder="Search by Order Number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary" onClick={handleSearch}>Search</button>
          <Link to="/orders" className="btn btn-secondary">Back</Link>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Order #</th>
              <th>Department</th>
              <th>Supplier</th>
              <th>Products</th>
              <th>Total (₹)</th>
              <th>Status</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.length === 0 ? (
              <tr><td colSpan="8">No order details found.</td></tr>
            ) : (
              orderDetails.filter(od => od.order).map((od, idx) => {
                const o = od.order;
                return (
                  <tr key={od._id}>
                    <td>{idx + 1}</td>
                    <td>{o.orderNumber}</td>
                    <td>{o.department?.name || "N/A"}</td>
                    <td>{o.supplier?.name || "N/A"}</td>
                    <td>
                      {o.products.map(p => (
                        <div key={p.product?._id}>
                          {p.product?.name} x {p.quantity} = ₹{p.quantity * p.price}
                        </div>
                      ))}
                    </td>
                    <td>₹{o.totalAmount}</td>
                    <td>{o.status}</td>
                    <td>{o.remarks || "-"}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
};

export default OrderDetails;
