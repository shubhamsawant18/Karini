"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "../app/styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  // Fallback image path
  const fallbackImage = "/image/tshirt.webp";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();

        if (data.data && Array.isArray(data.data)) {
          // Process and apply fallback values
          const processedProducts = data.data.map((product) => ({
            Title: product.Title || "No Title Available",
            Body: product.Body || "No description available",
            ImageSrc: product["Image Src"] || fallbackImage,
            Price: product["Variant Price"] || "Price Not Available",
            Type: product.Type || "N/A",
          }));
          setProducts(processedProducts);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle image fallback for missing or failed image loads
  const handleImageError = (e) => {
    e.target.src = fallbackImage; // Replace with fallback image
    e.target.onerror = null; // Prevent infinite loop in case fallback also fails
  };

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
                <img
                  src={product.ImageSrc}
                  alt={product.Title}
                  onError={handleImageError} // Handle broken image fallback
                  className="homeImage"
                />
                <h2 className="homeTitle">{product.Title}</h2>
                <p className="homeBody">
                  {product.Body.length > 60
                    ? product.Body.substring(0, 60) + "..."
                    : product.Body}
                </p>
                <div className="homeTypePrice">
                  <p className="homeType">
                    <strong>Type:</strong> <span className="boldText">{product.Type}</span>
                  </p>
                  <p className="homeProductPrice">
                    <span className="priceText">$ {product.Price}</span>
                  </p>
                </div>
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
