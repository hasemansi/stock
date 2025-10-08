import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "./outwardEntry.css";

const emptyProductRow = () => ({ product: "", quantity: 0, price: 0 });

const AddOutwardEntry = () => {
  const [outward, setOutward] = useState({
    outwardNumber: "",
    outwardDate: "",
    department: "",
    products: [emptyProductRow()],
    remarks: ""
  });

  const [departments, setDepartments] = useState([]);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3001/api/departments").then(r => setDepartments(r.data));
    axios.get("http://localhost:3001/api/products").then(r => setProducts(r.data));
  }, []);

  const handleProductChange = (index, field, value) => {
    setOutward(prev => {
      const prods = [...prev.products];
      prods[index] = { ...prods[index], [field]: field === "product" ? value : Number(value) };
      
      // Update price automatically when product is selected
      if (field === "product") {
        const prodObj = products.find(p => p._id === value);
        if (prodObj) prods[index].price = prodObj.price;
      }
      
      return { ...prev, products: prods };
    });
  };

  const addProductRow = () => setOutward(prev => ({ ...prev, products: [...prev.products, emptyProductRow()] }));
  const removeProductRow = (idx) => setOutward(prev => ({ ...prev, products: prev.products.filter((_, i) => i !== idx) }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3001/api/outward-entry", outward);
      toast.success("Outward entry created");
      navigate("/outward-entry");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create outward entry");
    }
  };

  return (
    <Dashboard>
      <div className="addOutwardEntry">
        <Link to="/outward-entry" className="btn btn-secondary mb-3">Back</Link>
        <h3>Add Outward Entry</h3>
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label>Outward Number:</label>
            <input type="text" value={outward.outwardNumber} onChange={e => setOutward({...outward, outwardNumber: e.target.value})} required />
          </div>

          <div className="inputGroup">
            <label>Outward Date:</label>
            <input type="date" value={outward.outwardDate} onChange={e => setOutward({...outward, outwardDate: e.target.value})} />
          </div>

          <div className="inputGroup">
            <label>Department:</label>
            <select value={outward.department} onChange={e => setOutward({...outward, department: e.target.value})} required>
              <option value="">-- Select Department --</option>
              {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
            </select>
          </div>

          <div>
            <label>Products:</label>
            {outward.products.map((p, idx) => (
              <div key={idx} className="productRow">
                <select value={p.product} onChange={e => handleProductChange(idx, "product", e.target.value)}>
                  <option value="">-- Select Product --</option>
                  {products.map(prod => <option key={prod._id} value={prod._id}>{prod.name}</option>)}
                </select>
                <input type="number" value={p.quantity} onChange={e => handleProductChange(idx, "quantity", e.target.value)} placeholder="Quantity" />
                <input type="number" value={p.price} onChange={e => handleProductChange(idx, "price", e.target.value)} placeholder="Price" />
                <button type="button" onClick={() => removeProductRow(idx)}>Remove</button>
              </div>
            ))}
            <button type="button" onClick={addProductRow}>Add Product</button>
          </div>

          <div className="inputGroup">
            <label>Remarks:</label>
            <textarea value={outward.remarks} onChange={e => setOutward({...outward, remarks: e.target.value})}></textarea>
          </div>

          <button type="submit" className="btn btn-primary">Create Outward Entry</button>
        </form>
      </div>
    </Dashboard>
  );
};

export default AddOutwardEntry;
