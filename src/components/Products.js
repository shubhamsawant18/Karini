"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import "../app/styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]); // Initially set to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        
        setProducts(data.data);
        console.log(products)
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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

        {loading && <p>Loading products...</p>}

        {error && <p className="error">Error: {error}</p>}

        {products && products.length > 0 ? (
          <div className="homeProductGrid">
            {products.map((product, index) => (
              <div key={index} className="homeCard">
                {/* <Image
                  src={product.image_src}
                  alt={product.title}
                  width={200}
                  height={200}
                  className="homeImage"
                /> */}
                <h2 className="homeTitle">{product.title}</h2>
                <p className="homeBody">{product.body}</p>
                <p className="homeType">Type: {product.type}</p>
                <p className="homeProductPrice">Price: {product.variantPrice}</p>
                <p className="homeDiscount">{product.discount}</p>
                <button className="homeButton">Add to Cart</button>
              </div>
            ))}
          </div>
        ) : !loading && <p>No products available.</p>}
      </div>
    </div>
  );
};

export default Products;
