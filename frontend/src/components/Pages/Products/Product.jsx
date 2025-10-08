import React, { useEffect, useState } from "react";
import Dashboard from "../../Auth/Dashboard";
import "./product.css";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const Product = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = () => {
        axios
            .get("http://localhost:3001/api/products")
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        await axios
            .delete(`http://localhost:3001/api/products/${id}`)
            .then((res) => {
                setProducts((prev) => prev.filter((p) => p._id !== id));
                toast.success(res.data.message);
            })
            .catch(() => toast.error("Error deleting product"));
    };

    return (
        <Dashboard>
            <div className="productTable">
                <button className="btn btn-primary mb-3">
                    <Link to="/add-product" style={{ color: "white", textDecoration: "none" }}>
                        Add Product <i className="fa-solid fa-plus"></i>
                    </Link>
                </button>

                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Product Name</th>
                            <th>Description</th>
                            <th>Price (₹)</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((p, index) => (
                            <tr key={p._id}>
                                <td>{index + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.description}</td>
                                <td>{p.price}</td>
                                <td>{p.quantity}</td>
                                <td>{p.supplier?.name || "N/A"}</td>
                                <td>
                                    <Link to={`/update-product/${p._id}`} className="btn btn-success me-2">
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button onClick={() => deleteProduct(p._id)} className="btn btn-danger">
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Dashboard>
    );
};

export default Product;
