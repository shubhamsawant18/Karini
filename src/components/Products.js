"use client";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "../app/styles/Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]); // State for cart items
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("q") || "";
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
          const processedProducts = data.data.map((product) => ({
            id: product._id,
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

    const fetchCartItems = async () => {
      const token = Cookies.get("token");
      if (!token) {
        console.error("No token found! Redirecting to login...");
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }

        const data = await response.json();
        setCartItems(data.cart || []);
      } catch (err) {
        console.error("Error fetching cart items:", err);
        setError("Failed to fetch cart items.");
      }
    };

    fetchProducts();
    fetchCartItems();
  }, []);

  const addToCart = async (product) => {
    const cartItem = {
      productId: product.id,
      quantity: 2,
      address: {
        street: "Street",
        state: "Mah",
        zipCode: "415501",
        country: "India",
        city: "Koregaon",
      },
    };

    const token = Cookies.get("token");

    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cartItem),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add item to cart");
      }

      setSuccessMessage("Item added successfully!");
      setTimeout(() => setSuccessMessage(""), 1500);
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to add item to cart. Please try again.");
    }
  };

  const filteredProducts = products.filter((product) =>
    product.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleImageError = (e) => {
    e.target.src = fallbackImage;
    e.target.onerror = null;
  };

  return (
    <div className="homeContainer">
      <div className="homeSidebar">
        <span className="homeFilterText">All Products</span>
        <span className="homeFilterText">Discounted Products</span>
        <span className="homeFilterText">New Arrivals</span>
        <span className="homeFilterText">Best Sellers</span>
        <span className="homeSearchText">Search Your Product</span>
        <input type="text" placeholder="Search..." className="homeSearchBar" value={searchQuery} readOnly />

        <select className="homeDropdown">
          <option value="">Filter by Price</option>
          <option value="0-2000">Below $2000</option>
          <option value="2000-5000">$2000 - $5000</option>
          <option value="5000-10000">$5000 - $10000</option>
        </select>

        <span className="homeFilterText">Brand</span>
        <label className="homeCheckboxLabel"><input type="checkbox" /> Nike</label>
        <label className="homeCheckboxLabel"><input type="checkbox" /> Adidas</label>
        <label className="homeCheckboxLabel"><input type="checkbox" /> Puma</label>

        <button className="homeSeeAllButton">See All Results</button>
      </div>

      <div className="homeMain">
        <h1 className="homeH1">Welcome to Our Store</h1>

        {loading && <p>Loading products...</p>}
        {error && <p className="error">Error: {error}</p>}
        {successMessage && <p className="success">{successMessage}</p>}

        {filteredProducts.length > 0 ? (
          <div className="homeProductGrid">
            {filteredProducts.map((product, index) => (
              <div key={index} className="homeCard">
                <img src={product.ImageSrc} alt={product.Title} onError={handleImageError} className="homeImage" />
                <h2 className="homeTitle">{product.Title}</h2>
                <p className="homeBody">{product.Body.length > 60 ? product.Body.substring(0, 60) + "..." : product.Body}</p>
                <div className="homeTypePrice">
                  <p className="homeType"><strong>Type:</strong> <span className="boldText">{product.Type}</span></p>
                  <p className="homeProductPrice"><span className="priceText">$ {product.Price}</span></p>
                </div>
                <button className="homeButton" onClick={() => addToCart(product)}>Add to Cart</button>
              </div>
            ))}
          </div>
        ) : (
          !loading && <p>No matching products found.</p>
        )}

        {/* Cart Section */}
        <div className="cartContainer">
          <h2>Your Cart</h2>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index} className="cartItem">
                  <p><strong>Product ID:</strong> {item.productId}</p>
                  <p><strong>Quantity:</strong> {item.quantity}</p>
                  <p><strong>Price:</strong> ${item.price || "N/A"}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No items in your cart.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
