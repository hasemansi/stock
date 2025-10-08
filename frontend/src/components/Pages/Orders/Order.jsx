import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./order.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/orders");
      setOrders(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;
    try {
      const res = await axios.delete(`http://localhost:3001/api/orders/${id}`);
      setOrders((prev) => prev.filter((o) => o._id !== id));
      toast.success(res.data.message || "Order deleted");
    } catch (err) {
      console.error(err);
      toast.error("Error deleting order");
    }
  };

  return (
    <Dashboard>
      <div className="orderTable">
        <div className="order-header">
          <h3>
            <i className="fas fa-shopping-cart"></i> Orders
          </h3>
          <Link to="/add-order" className="btn-add">
            <i className="fas fa-plus-circle"></i> Add Order
          </Link>
        </div>

        <table className="order-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Order#</th>
              <th>Date</th>
              <th>Department</th>
              <th>Supplier</th>
              <th>Items</th>
              <th>Total (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan="9" className="no-data">
                  <i className="fas fa-exclamation-circle"></i> No orders found
                </td>
              </tr>
            ) : (
              orders.map((o, i) => (
                <tr key={o._id}>
                  <td>{i + 1}</td>
                  <td>{o.orderNumber}</td>
                  <td>{new Date(o.orderDate).toLocaleDateString()}</td>
                  <td>{o.department?.name || "N/A"}</td>
                  <td>{o.supplier?.name || "N/A"}</td>
                  <td>{o.products?.length || 0}</td>
                  <td>{o.totalAmount}</td>
                  <td>
                    <span
                      className={`status-badge ${
                        o.status === "Completed"
                          ? "status-complete"
                          : o.status === "Pending"
                          ? "status-pending"
                          : "status-other"
                      }`}
                    >
                      {o.status}
                    </span>
                  </td>
                  <td>
                    <Link to={`/update-order/${o._id}`} className="btn-icon edit">
                      <i className="fas fa-edit"></i>
                    </Link>
                    <button
                      onClick={() => deleteOrder(o._id)}
                      className="btn-icon delete"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
};

export default Order;
