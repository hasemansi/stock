import React, { useState, useEffect } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./product.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AddProduct = () => {
    const [product, setProduct] = useState({
        name: "",
        description: "",
        price: "",
        quantity: "",
        supplier: ""
    });

    const [suppliers, setSuppliers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios
            .get("http://localhost:3001/api/suppliers")
            .then((res) => setSuppliers(res.data))
            .catch(() => toast.error("Failed to load suppliers"));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({ ...product, [name]: value });
    };

    const submitForm = async (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:3001/api/products", product)
            .then(() => {
                toast.success("Product added successfully");
                navigate("/products");
            })
            .catch(() => toast.error("Error adding product"));
    };

    return (
        <Dashboard>
            <div className="addProduct">
                <Link to="/products" className="btn btn-secondary mb-3">
                    <i className="fa-solid fa-backward"></i> Back
                </Link>

                <h3>Add Product</h3>

                <form className="addProductForm" onSubmit={submitForm}>
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
                        <button type="submit" className="btn btn-primary">
                            <i className="fa-solid fa-plus"></i> Add Product
                        </button>
                    </div>
                </form>
            </div>
        </Dashboard>
    );
};

export default AddProduct;
