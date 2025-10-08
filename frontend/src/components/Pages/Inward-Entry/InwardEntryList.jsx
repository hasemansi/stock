import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./inwardEntry.css";

const InwardEntryList = () => {
  const [entries, setEntries] = useState([]);

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/inward-entry");
      setEntries(res.data);
    } catch {
      toast.error("Failed to load inward entries");
    }
  };

  useEffect(() => { fetchEntries(); }, []);

  return (
    <Dashboard>
      <div className="inwardEntryList">
        <div className="headerRow">
          <h3>Inward Entries</h3>
          <Link to="/add-inward-entry" className="btn btn-primary">Add Inward Entry</Link>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Inward #</th>
              <th>Date</th>
              <th>Order #</th>
              <th>Supplier</th>
              <th>Products</th>
              <th>Total (₹)</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody>
            {entries.length === 0 ? (
              <tr><td colSpan="8">No inward entries found.</td></tr>
            ) : (
              entries.map((e, idx) => (
                <tr key={e._id}>
                  <td>{idx+1}</td>
                  <td>{e.inwardNumber}</td>
                  <td>{new Date(e.inwardDate).toLocaleDateString()}</td>
                  <td>{e.order?.orderNumber}</td>
                  <td>{e.supplier?.name}</td>
                  <td>
                    {e.products.map(p => (
                      <div key={p.product?._id}>{p.product?.name} x {p.quantity}</div>
                    ))}
                  </td>
                  <td>{e.totalAmount}</td>
                  <td>{e.remarks || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
};

export default InwardEntryList;
