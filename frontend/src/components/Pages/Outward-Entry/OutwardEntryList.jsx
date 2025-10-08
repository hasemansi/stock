import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import "./outwardEntry.css";

const OutwardEntryList = () => {
    const [entries, setEntries] = useState([]);

    const fetchEntries = async () => {
        try {
            const res = await axios.get("http://localhost:3001/api/outward-entry");
            setEntries(res.data);
        } catch {
            toast.error("Failed to load outward entries");
        }
    };

    useEffect(() => { fetchEntries(); }, []);

    return (
        <Dashboard>
            <div className="outwardEntryList">
                <div className="headerRow">
                    <h3>Outward Entries</h3>
                    <Link to="/add-outward-entry" className="btn btn-primary">Add Outward Entry</Link>
                </div>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Outward #</th>
                            <th>Date</th>
                            <th>Department</th>
                            <th>Products</th>
                            <th>Total (₹)</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {entries.length === 0 ? (
                            <tr><td colSpan="7">No outward entries found.</td></tr>
                        ) : (
                            entries.map((e, idx) => (
                                <tr key={e._id}>
                                    <td>{idx + 1}</td>
                                    <td>{e.outwardNumber}</td>
                                    <td>{new Date(e.outwardDate).toLocaleDateString()}</td>
                                    <td>{e.department?.name}</td>
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

export default OutwardEntryList;
