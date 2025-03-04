"use client";

import React from "react";
import Image from "next/image";
import "../app/styles/Products.css";

const products = [
  {
    title: "Stylish Shirt",
    body: "A premium quality stylish shirt.",
    type: "Clothing",
    image: "/image/shirt.jpg",
    variantPrice: "$29.99",
    discount: "10% Off",
  },
  {
    title: "Casual Shirt",
    body: "Comfortable casual wear for daily use.",
    type: "Clothing",
    image: "/image/shirt.jpg",
    variantPrice: "$19.99",
    discount: "20% Off",
  },
  {
    title: "Formal Shirt",
    body: "Perfect for office and formal occasions.",
    type: "Clothing",
    image: "/image/shirt.jpg",
    variantPrice: "$39.99",
    discount: "15% Off",
  },
];

const Products = () => {  // ✅ FIX: Change "Home" to "Products"
  return (
    <div className="homeContainer">
      {/* Sidebar */}
      <div className="homeSidebar">
        <span className="homeFilterText">All Products</span>
        <span className="homeFilterText">Discounted Products</span>
        <span className="homeFilterText">New Arrivals</span>
        <span className="homeFilterText">Best Sellers</span>

        <span className="homeSearchText">Search Your Product</span>
        <input type="text" placeholder="Search..." className="homeSearchBar" />

        <select className="homeDropdown">
          <option value="">Filter by Price</option>
          <option value="0-2000">Below $2000</option>
          <option value="2000-5000">$2000 - $5000</option>
          <option value="5000-10000">$5000 - $10000</option>
        </select>

        <span className="homeFilterText">Brand</span>
        <label className="homeCheckboxLabel">
          <input type="checkbox" /> Nike
        </label>
        <label className="homeCheckboxLabel">
          <input type="checkbox" /> Adidas
        </label>
        <label className="homeCheckboxLabel">
          <input type="checkbox" /> Puma
        </label>

        <span className="homeFilterText">Discount</span>
        <label className="homeCheckboxLabel">
          <input type="checkbox" /> 10% Off
        </label>
        <label className="homeCheckboxLabel">
          <input type="checkbox" /> 20% Off
        </label>
        <label className="homeCheckboxLabel">
          <input type="checkbox" /> 30% Off
        </label>

        <button className="homeSeeAllButton">See All Results</button>
      </div>

      {/* Main Content */}
      <div className="homeMain">
        <h1 className="homeH1">Welcome to Our Store</h1>
        <div className="homeProductGrid">
          {products.map((product, index) => (
            <div key={index} className="homeCard">
              <Image
                src={product.image}
                alt={product.title}
                width={200}
                height={200}
                className="homeImage"
              />
              <h2 className="homeTitle">{product.title}</h2>
              <p className="homeBody">{product.body}</p>
              <p className="homeType">Type: {product.type}</p>
              <p className="homeProductPrice">Price: {product.variantPrice}</p>
              <p className="homeDiscount">{product.discount}</p>
              <button className="homeButton">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products; 
