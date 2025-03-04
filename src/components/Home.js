import React from "react";
import Image from "next/image";
import "../app/styles/Home.css";

const products = [
  {
    title: "Stylish Shirt",
    body: "A premium quality stylish shirt.",
    type: "Clothing",
    image: "/image/shirt.jpg",
    variantPrice: "$29.99",
    variantQuantity: "Available: 15",
  },
  {
    title: "Casual Shirt",
    body: "Comfortable casual wear for daily use.",
    type: "Clothing",
    image: "/image/shirt.jpg",
    variantPrice: "$19.99",
    variantQuantity: "Available: 20",
  },
  {
    title: "Formal Shirt",
    body: "Perfect for office and formal occasions.",
    type: "Clothing",
    image: "/image/shirt.jpg",
    variantPrice: "$39.99",
    variantQuantity: "Available: 10",
  },
];

const Home = () => {
  return (
    <div className="homeContainer">
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
            <p className="homePrice">Price: {product.variantPrice}</p>
            <p className="homeQuantity">{product.variantQuantity}</p>
            <button className="homeButton">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
