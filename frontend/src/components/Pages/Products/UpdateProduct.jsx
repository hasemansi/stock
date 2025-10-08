import React, { useState, useEffect } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./product.css";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const UpdateProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        supplier: ""
    });

    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:3001/api/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch(() => toast.error("Error fetching product data"));

        axios
            .get("http://localhost:3001/api/suppliers")
            .then((res) => setSuppliers(res.data))
            .catch(() => toast.error("Failed to load suppliers"));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        axios
            .put(`http://localhost:3001/api/products/${id}`, product)
            .then(() => {
                toast.success("Product updated successfully");
                navigate("/products");
            })
            .catch(() => toast.error("Error updating product"));
    };

    return (
        <Dashboard>
            <div className="updateProduct">
                <Link to="/products" className="btn btn-secondary mb-3">
                    <i className="fa-solid fa-backward"></i> Back
                </Link>

                <h3>Update Product</h3>

                <form className="updateProductForm" onSubmit={submitForm}>
                    <div className="inputGroup">
                        <label>Product Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Description:</label>
                        <textarea
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="inputGroup">
                        <label>Price (₹):</label>
                        <input
                            type="number"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Quantity:</label>
                        <input
                            type="number"
                            name="quantity"
                            value={product.quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="inputGroup">
                        <label>Supplier:</label>
                        <select
                            name="supplier"
                            value={product.supplier?._id || product.supplier}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Supplier</option>
                            {suppliers.map((s) => (
                                <option key={s._id} value={s._id}>
                                    {s.name} ({s.company})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="inputGroup">
                        <button type="submit" className="btn btn-primary">
                            <i className="fa-solid fa-pen-to-square"></i> Update Product
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
};

export default UpdateProduct;
