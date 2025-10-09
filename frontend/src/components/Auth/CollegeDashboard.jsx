import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import axios from "axios";
import "./collegeDashboard.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Dashboard from "./Dashboard";

const CollegeDashboard = () => {
  const [summary, setSummary] = useState({
    departments: 0,
    suppliers: 0,
    products: 0,
    orders: 0,
    pendingOrders: 0,
    approvedOrders: 0,
    inward: 0,
    outward: 0
  });
  const [productChart, setProductChart] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  const fetchDashboardData = async () => {
    try {
      const [deptRes, suppRes, prodRes, orderRes, inwardRes, outwardRes] = await Promise.all([
        axios.get("http://localhost:3001/api/departments"),
        axios.get("http://localhost:3001/api/suppliers"),
        axios.get("http://localhost:3001/api/products"),
        axios.get("http://localhost:3001/api/orders"),
        axios.get("http://localhost:3001/api/inward-entry"),
        axios.get("http://localhost:3001/api/outward-entry")
      ]);

      const departments = deptRes.data.length;
      const suppliers = suppRes.data.length;
      const products = prodRes.data.length;
      const orders = orderRes.data.length;
      const pendingOrders = orderRes.data.filter(o => o.status === "Pending").length;
      const approvedOrders = orderRes.data.filter(o => o.status === "Approved").length;
      const inward = inwardRes.data.length;
      const outward = outwardRes.data.length;

      setSummary({ departments, suppliers, products, orders, pendingOrders, approvedOrders, inward, outward });
      setProductChart(prodRes.data.map(p => ({ name: p.name, quantity: p.quantity })));
      setRecentActivity(orderRes.data.slice(-5).reverse());
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchDashboardData(); }, []);

  return (
    <Dashboard>
      <div className="college-dashboard">
        <h2 className="dashboard-title">College Stock Management Dashboard</h2>

        {/* Summary Section */}
        <div className="summary-section">
          <div className="summary-card bg-blue"><i className="fa fa-building"></i><h4>Departments</h4><p>{summary.departments}</p></div>
          <div className="summary-card bg-green"><i className="fa fa-truck"></i><h4>Suppliers</h4><p>{summary.suppliers}</p></div>
          <div className="summary-card bg-yellow"><i className="fa fa-box"></i><h4>Products</h4><p>{summary.products}</p></div>
          <div className="summary-card bg-purple"><i className="fa fa-clipboard"></i><h4>Total Orders</h4><p>{summary.orders}</p></div>
          <div className="summary-card bg-indigo"><i className="fa fa-arrow-down"></i><h4>Inward</h4><p>{summary.inward}</p></div>
          <div className="summary-card bg-red"><i className="fa fa-arrow-up"></i><h4>Outward</h4><p>{summary.outward}</p></div>
        </div>

        {/* Status Section */}
        <div className="status-section">
          <div className="status-card bg-pending"><i className="fa fa-spinner"></i><h4>Pending Orders</h4><p>{summary.pendingOrders}</p></div>
          <div className="status-card bg-approved"><i className="fa fa-check-circle"></i><h4>Approved Orders</h4><p>{summary.approvedOrders}</p></div>
        </div>

       

        {/* Recent Activity */}
        <div className="recent-section">
          <h3>Recent Orders</h3>
          <table>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Department</th>
                <th>Supplier</th>
                <th>Status</th>
                <th>Total (₹)</th>
              </tr>
            </thead>
            <tbody>
              {recentActivity.length === 0 ? (
                <tr><td colSpan="5">No recent orders</td></tr>
              ) : (
                recentActivity.map(o => (
                  <tr key={o._id}>
                    <td>{o.orderNumber}</td>
                    <td>{o.department?.name || "N/A"}</td>
                    <td>{o.supplier?.name || "N/A"}</td>
                    <td>{o.status}</td>
                    <td>₹{o.totalAmount}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Navigation */}
        <div className="dashboard-buttons">
          <Link to="/orders" className="btn primary">Manage Orders</Link>
          <Link to="/products" className="btn success">Manage Products</Link>
        </div>
      </div>
    </Dashboard>
  );
};

export default CollegeDashboard;
