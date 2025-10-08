import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./addorder.css";

const emptyProductRow = () => ({ product: "", quantity: "", price: 0 });

const AddOrder = () => {
    const [order, setOrder] = useState({
        orderNumber: "",
        orderDate: "",
        department: "",
        supplier: "",
        products: [emptyProductRow()],
        status: "Pending",
        remarks: ""
    });

    const [departments, setDepartments] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [products, setProducts] = useState([]); // list of products to choose from
    const navigate = useNavigate();

    useEffect(() => {
        axios.get("http://localhost:3001/api/departments").then(r => setDepartments(r.data)).catch(() => toast.error("Failed to load departments"));
        axios.get("http://localhost:3001/api/suppliers").then(r => setSuppliers(r.data)).catch(() => toast.error("Failed to load suppliers"));
        axios.get("http://localhost:3001/api/products").then(r => setProducts(r.data)).catch(() => toast.error("Failed to load products"));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrder(prev => ({ ...prev, [name]: value }));
    };

    const handleProductChange = (index, field, value) => {
        setOrder(prev => {
            const newProducts = [...prev.products];
            newProducts[index] = { ...newProducts[index], [field]: value };

            // if product changed, update price to product.current price
            if (field === "product") {
                const prodObj = products.find(p => p._id === value);
                newProducts[index].price = prodObj ? prodObj.price : 0;
            }

            // ensure quantity is number
            if (field === "quantity") {
                newProducts[index].quantity = Number(value);
            }

            return { ...prev, products: newProducts };
        });
    };

    const addProductRow = () => {
        setOrder(prev => ({ ...prev, products: [...prev.products, emptyProductRow()] }));
    };

    const removeProductRow = (idx) => {
        setOrder(prev => {
            const newProducts = prev.products.filter((_, i) => i !== idx);
            return { ...prev, products: newProducts.length ? newProducts : [emptyProductRow()] };
        });
    };

    const calcTotal = () => {
        return order.products.reduce((sum, p) => {
            const qty = Number(p.quantity) || 0;
            const pr = Number(p.price) || 0;
            return sum + qty * pr;
        }, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic client-side validation
        if (!order.orderNumber || !order.department || !order.supplier) {
            toast.error("Order number, department and supplier are required");
            return;
        }
        if (!order.products.length || order.products.some(p => !p.product || !p.quantity)) {
            toast.error("Please add at least one product with quantity");
            return;
        }

        const payload = {
            orderNumber: order.orderNumber,
            orderDate: order.orderDate || undefined,
            department: order.department,
            supplier: order.supplier,
            products: order.products.map(p => ({ product: p.product, quantity: p.quantity, price: p.price })),
            status: order.status,
            remarks: order.remarks
        };

        try {
            const res = await axios.post("http://localhost:3001/api/orders", payload);
            toast.success(res.data.message || "Order created");
            navigate("/orders");
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || "Failed to create order");
        }
    };

    return (
        <Dashboard>
            <div className="addOrder">
                <Link to="/orders" className="btn btn-secondary mb-3">Back</Link>
                <h3>Add Order</h3>

                <form className="addOrderForm" onSubmit={handleSubmit}>
                    <div className="inputGroup">
                        <label>Order Number:</label>
                        <input type="text" name="orderNumber" value={order.orderNumber} onChange={handleChange} required />
                    </div>

                    <div className="inputGroup">
                        <label>Order Date:</label>
                        <input type="date" name="orderDate" value={order.orderDate ? new Date(order.orderDate).toISOString().substr(0, 10) : ""} onChange={handleChange} />
                    </div>

                    <div className="inputGroup">
                        <label>Department:</label>
                        <select name="department" value={order.department} onChange={handleChange} required>
                            <option value="">-- Select Department --</option>
                            {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
                        </select>
                    </div>

                    <div className="inputGroup">
                        <label>Supplier:</label>
                        <select name="supplier" value={order.supplier} onChange={handleChange} required>
                            <option value="">-- Select Supplier --</option>
                            {suppliers.map(s => <option key={s._id} value={s._id}>{s.name} ({s.company})</option>)}
                        </select>
                    </div>

                    <div>
                        <label style={{ fontWeight: "bold" }}>Products:</label>
                        <div className="productsGrid" style={{ marginTop: 8 }}>
                            <div className="header">Product</div>
                            <div className="header">Unit Price</div>
                            <div className="header">Quantity</div>
                            <div className="header">Remove</div>

                            {order.products.map((row, idx) => (
                                <React.Fragment key={idx} className="productRow">
                                    <div>
                                        <select value={row.product} onChange={(e) => handleProductChange(idx, "product", e.target.value)} required>
                                            <option value="">-- select product --</option>
                                            {products.map(p => <option key={p._id} value={p._id}>{p.name}</option>)}
                                        </select>
                                    </div>

                                    <div>
                                        <input type="number" step="0.01" value={row.price} onChange={(e) => handleProductChange(idx, "price", Number(e.target.value) || 0)} />
                                    </div>

                                    <div>
                                        <input type="number"  value={row.quantity} onChange={(e) => handleProductChange(idx, "quantity", Number(e.target.value) || 1)} />
                                    </div>

                                    <div>
                                        <button type="button" onClick={() => removeProductRow(idx)} className="smallBtn danger">Remove</button>
                                    </div>
                                </React.Fragment>
                            ))}
                        </div>

                        <div style={{ marginTop: 10 }}>
                            <button type="button" onClick={addProductRow} className="smallBtn secondary">Add Product</button>
                        </div>
                    </div>

                    <div className="inputGroup">
                        <label>Remarks:</label>
                        <textarea name="remarks" value={order.remarks} onChange={(e) => setOrder(prev => ({ ...prev, remarks: e.target.value }))} />
                    </div>

                    <div className="totalRow">
                        <div className="label">Total Amount:</div>
                        <div>₹{calcTotal()}</div>
                    </div>

                    <div className="actionsRow">
                        <button type="submit" className="btn btn-primary">Place Order</button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
};

export default AddOrder;
