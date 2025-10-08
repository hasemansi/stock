import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import "./updateOrder.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const UpdateOrder = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState({
    department: "",
    supplier: "",
    products: [{ product: "", quantity: 1, price: 0 }],
    status: "Pending",
  });

  const [departments, setDepartments] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptRes, suppRes, prodRes, orderRes] = await Promise.all([
          axios.get("http://localhost:3001/api/departments"),
          axios.get("http://localhost:3001/api/suppliers"),
          axios.get("http://localhost:3001/api/products"),
          axios.get(`http://localhost:3001/api/orders/${id}`),
        ]);

        setDepartments(deptRes.data);
        setSuppliers(suppRes.data);
        setAllProducts(prodRes.data);

        const ord = orderRes.data;

        const mappedProducts = ord.products.map((p) => ({
          product: p.product?._id || p.product,
          quantity: p.quantity,
          price: p.price,
        }));

        setOrder({
          department: ord.department?._id || ord.department,
          supplier: ord.supplier?._id || ord.supplier,
          products: mappedProducts.length > 0 ? mappedProducts : [{ product: "", quantity: 1, price: 0 }],
          status: ord.status,
        });
      } catch (err) {
        console.error(err);
        toast.error("Error loading order data");
      }
    };
    fetchData();
  }, [id]);

  // Handle department, supplier
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  // Handle product changes
  const handleProductChange = (index, field, value) => {
    const newProducts = [...order.products];
    newProducts[index][field] = field === "quantity" || field === "price" ? Number(value) : value;
    setOrder({ ...order, products: newProducts });
  };

  // Add a new product row
  const addProductRow = () => {
    setOrder({ ...order, products: [...order.products, { product: "", quantity: 1, price: 0 }] });
  };

  // Remove product row
  const removeProductRow = (index) => {
    const newProducts = [...order.products];
    newProducts.splice(index, 1);
    setOrder({ ...order, products: newProducts });
  };

  // Calculate total amount
  const calculateTotal = () => {
    return order.products.reduce((sum, p) => sum + p.quantity * p.price, 0);
  };

  // Submit updated order
  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...order,
        totalAmount: calculateTotal(),
      };
      await axios.put(`http://localhost:3001/api/orders/${id}`, payload);
      toast.success("Order updated successfully!");
      navigate("/orders");
    } catch (err) {
      console.error(err);
      toast.error("Error updating order");
    }
  };

  // Receive stock and approve order
  const receiveStock = async () => {
    try {
      const res = await axios.put(`http://localhost:3001/api/orders/receive-stock/${id}`);
      setOrder(res.data.order); // Update order state
      toast.success("Stock received and order approved!");
    } catch (err) {
      console.error(err);
      toast.error("Error receiving stock");
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

        {/* Receive Stock Button */}
        {order.status === "Pending" && (
          <div style={{ marginBottom: "15px", textAlign: "right" }}>
            <button type="button" onClick={receiveStock} className="btn btn-success">
              <i className="fas fa-box"></i> Receive Stock
            </button>
          </div>
        )}

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
            {order.products.map((p, index) => (
              <div key={index} className="productRow">
                <select
                  value={p.product}
                  onChange={(e) => handleProductChange(index, "product", e.target.value)}
                  required
                >
                  <option value="">-- Select Product --</option>
                  {allProducts.map((prod) => (
                    <option key={prod._id} value={prod._id}>{prod.name}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min="1"
                  value={p.quantity}
                  onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
                  placeholder="Quantity"
                  required
                />
                <input
                  type="number"
                  min="0"
                  value={p.price}
                  onChange={(e) => handleProductChange(index, "price", e.target.value)}
                  placeholder="Price"
                  required
                />
                {order.products.length > 1 && (
                  <button type="button" onClick={() => removeProductRow(index)} className="btn-remove">
                    <i className="fas fa-trash-alt"></i>
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addProductRow} className="btn-add-product">
              <i className="fas fa-plus-circle"></i> Add Product
            </button>
          </div>

          <div className="inputGroup">
            <label>Total Amount (₹):</label>
            <input type="number" value={calculateTotal()} readOnly />
          </div>

          <div className="inputGroup">
            <label>Status:</label>
            <input type="text" value={order.status} readOnly />
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
