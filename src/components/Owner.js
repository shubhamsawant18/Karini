"use client";

import { useState } from "react";
import "../app/styles/Owner.css";

const Owner = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    price: "",
    discount: "",
    bgcolor: "",
    panelcolor: "",
    textcolor: "",
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    try {
      const response = await fetch("/api/owners/products/create", {
        method: "POST",
        body: form,
      });
      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Product created successfully!");
        setFormData({ image: null, name: "", price: "", discount: "", bgcolor: "", panelcolor: "", textcolor: "" });
      }
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <div className="owner-container">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="owner-wrapper">
        <aside className="sidebar">
          <a href="/owners/products" className="sidebar-link">All Products</a>
          <a href="/owners/products/create" className="sidebar-link">Create New Product</a>
        </aside>
        <main className="content">
          <h2 className="title">Create New Product</h2>
          <form onSubmit={handleSubmit} className="product-form" encType="multipart/form-data">
            <h3 className="section-title">Product Details</h3>
            <label className="label">Product Image
              <input type="file" name="image" onChange={handleChange} className="input" />
            </label>
            <div className="input-group">
              <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="input" />
              <input type="text" name="price" placeholder="Product Price" value={formData.price} onChange={handleChange} className="input" />
              <input type="text" name="discount" placeholder="Discount Price" value={formData.discount} onChange={handleChange} className="input" />
            </div>
            <h3 className="section-title">Panel Details</h3>
            <div className="input-group">
              <input type="text" name="bgcolor" placeholder="Background Color" value={formData.bgcolor} onChange={handleChange} className="input" />
              <input type="text" name="panelcolor" placeholder="Panel Color" value={formData.panelcolor} onChange={handleChange} className="input" />
              <input type="text" name="textcolor" placeholder="Text Color" value={formData.textcolor} onChange={handleChange} className="input" />
            </div>
            <button type="submit" className="submit-btn">Create New Product</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Owner;
