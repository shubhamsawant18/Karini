"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import "../app/styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        
        if (data.data && Array.isArray(data.data)) {
          setProducts(data.data);
        } else {
          setProducts([]); // Fallback to an empty array if data is incorrect
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // **Filter products based on the search query**
  const filteredProducts = products.filter((product) =>
    product.Title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="homeContainer">
      <div className="homeSidebar">
        <span className="homeFilterText">All Products</span>
        <span className="homeFilterText">Discounted Products</span>
        <span className="homeFilterText">New Arrivals</span>
        <span className="homeFilterText">Best Sellers</span>
        <span className="homeSearchText">Search Your Product</span>
        <input
          type="text"
          placeholder="Search..."
          className="homeSearchBar"
          value={searchQuery}
          readOnly
        />

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

      <div className="homeMain">
        <h1 className="homeH1">Welcome to Our Store</h1>

        {loading && <p>Loading products...</p>}
        {error && <p className="error">Error: {error}</p>}

        {filteredProducts.length > 0 ? (
          <div className="homeProductGrid">
            {filteredProducts.map((product, index) => (
              <div key={index} className="homeCard">
                <Image
                  src={product["Image Src"]}
                  alt={product.Title || "Product Image"}
                  width={200}
                  height={200}
                  className="homeImage"
                />
                <h2 className="homeTitle">{product.Title || "No Title"}</h2>
                <p className="homeBody">{product.Body || "No description available"}</p>
                <p className="homeType">Type: {product.Type || "N/A"}</p>
                <p className="homeProductPrice">Price: {product["Variant Price"] || "N/A"}</p>
                <p className="homeDiscount">{product.discount || "No Discount"}</p>
                <button className="homeButton">Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No matching products found.</p>
        )}
      </div>
    </div>
  );
};

export default Products;
