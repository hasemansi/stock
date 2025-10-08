import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./inwardEntry.css";

const emptyProductRow = () => ({ product: "", quantity: 0, price: 0 });

const AddInwardEntry = () => {
    const [inward, setInward] = useState({
        inwardNumber: "",
        inwardDate: "",
        order: "",
        supplier: "",
        products: [emptyProductRow()],
        remarks: ""
    });
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/api/orders")
            .then(res => setOrders(res.data))
            .catch(() => toast.error("Failed to load orders"));
    }, []);

    // When order changes, populate products and supplier
    const handleOrderChange = (e) => {
        const orderId = e.target.value;
        const selectedOrder = orders.find(o => o._id === orderId);
        if (selectedOrder) {
            setInward(prev => ({
                ...prev,
                order: orderId,
                supplier: selectedOrder.supplier._id,
                products: selectedOrder.products.map(p => ({
                    product: p.product._id,
                    quantity: p.quantity,
                    price: p.price
                }))
            }));
        }
    };

    const handleProductChange = (index, field, value) => {
        setInward(prev => {
            const products = [...prev.products];
            products[index] = { ...products[index], [field]: Number(value) || 0 };
            return { ...prev, products };
        });
    };

    const addProductRow = () => setInward(prev => ({ ...prev, products: [...prev.products, emptyProductRow()] }));
    const removeProductRow = (index) => setInward(prev => ({
        ...prev,
        products: prev.products.filter((_, i) => i !== index)
    }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3001/api/inward-entry", inward);
            toast.success(res.data.message);
            navigate("/inward-entry");
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to create inward entry");
        }
    };

    return (
        <Dashboard>
            <div className="addInwardEntry">
                <Link to="/inward-entry" className="btn btn-secondary mb-3">Back</Link>
                <h3>Add Inward Entry</h3>
                <form onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Inward Number:</label>
                        <input type="text" value={inward.inwardNumber} onChange={e => setInward({ ...inward, inwardNumber: e.target.value })} required />
                    </div>

                    <div className="inputGroup">
                        <label>Inward Date:</label>
                        <input type="date" value={inward.inwardDate} onChange={e => setInward({ ...inward, inwardDate: e.target.value })} />
                    </div>

                    <div className="inputGroup">
                        <label>Select Order:</label>
                        <select value={inward.order} onChange={handleOrderChange} required>
                            <option value="">-- Select Order --</option>
                            {orders.map(o => <option key={o._id} value={o._id}>{o.orderNumber}</option>)}
                        </select>
                    </div>

                    <div className="inputGroup">
                        <label>Supplier:</label>
                        <input type="text" value={inward.supplier.name || ""} disabled />
                    </div>

                    <div>
                        <label>Products:</label>
                        {inward.products.map((p, idx) => (
                            <div key={idx} className="productRow">
                                <input type="text" value={p.product.name || p.product} disabled />
                                <input type="number" value={p.quantity} onChange={e => handleProductChange(idx, "quantity", e.target.value)} />
                                <input type="number" value={p.price} onChange={e => handleProductChange(idx, "price", e.target.value)} />
                                <button type="button" onClick={() => removeProductRow(idx)}>Remove</button>
                            </div>
                        ))}
                        <button type="button" onClick={addProductRow}>Add Product</button>
                    </div>

                    <div className="inputGroup">
                        <label>Remarks:</label>
                        <textarea value={inward.remarks} onChange={e => setInward({ ...inward, remarks: e.target.value })} />
                    </div>

                    <button type="submit" className="btn btn-primary">Create Inward Entry</button>
                </form>
            </div>
        </Dashboard>
    );
};

export default AddInwardEntry;
