import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import axios from "axios";
import "./dashboardHome.css";

export default function DashboardHome() {
  const [latestColleges, setLatestColleges] = useState([]);
  const [latestDepartments, setLatestDepartments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collegesRes, departmentsRes] = await Promise.all([
          axios.get("http://localhost:3001/api/colleges?limit=5"),
          axios.get("http://localhost:3001/api/departments?limit=5"),
        ]);
        setLatestColleges(collegesRes.data);
        setLatestDepartments(departmentsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <Dashboard>
      <div className="dashboardHome">
        <h2>Welcome, Admin!</h2>
        <p>Manage your college stock system efficiently from here.</p>

        <div className="quickLinks">
          <div className="linkCard">
            <h3>Colleges</h3>
            <p>Manage all colleges</p>
            <a href="/colleges" className="btn-link">Go</a>
          </div>
          <div className="linkCard">
            <h3>Departments</h3>
            <p>Manage all departments</p>
            <a href="/departments" className="btn-link">Go</a>
          </div>
          <div className="linkCard">
            <h3>Faculty</h3>
            <p>Manage faculty members</p>
            <a href="/faculties" className="btn-link">Go</a>
          </div>
          <div className="linkCard">
            <h3>Roles</h3>
            <p>Manage roles</p>
            <a href="/roles" className="btn-link">Go</a>
          </div>
          <div className="linkCard">
            <h3>Suppliers</h3>
            <p>Manage suppliers</p>
            <a href="/supplier" className="btn-link">Go</a>
          </div>
          <div className="linkCard">
            <h3>Products</h3>
            <p>Manage products</p>
            <a href="/product" className="btn-link">Go</a>
          </div>
        </div>

        <div className="recentSection">
          <h3>Latest Colleges</h3>
          <ul>
            {latestColleges.map((c) => (
              <li key={c._id}>{c.name}</li>
            ))}
          </ul>

          <h3>Latest Departments</h3>
          <ul>
            {latestDepartments.map((d) => (
              <li key={d._id}>{d.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </Dashboard>
  );
}
