import React from "react";
import Image from "next/image";
import "../app/styles/Cart.css";

const cartItems = [
  {
    id: "1",
    title: "Stylish Shirt",
    body: "Comfortable and trendy shirt for all occasions.",
    price: 299,
    image: "/image/shirt.jpg",
  },
  {
    id: "2",
    title: "Casual Shirt",
    body: "Perfect for a relaxed day out.",
    price: 199,
    image: "/image/shirt.jpg",
  },
];

const Cart = () => {
  return (
    <div className="cartContainer">
      <div className="cartSidebar">
        <h3>Categories</h3>
        <a href="#">All Products</a>
        <a href="#">Discounted Products</a>
        <a href="#">New Arrivals</a>
        <a href="#">Best Sellers</a>
      </div>

      <div className="cartMain">
        <h2 className="cartTitle">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p>
            Your cart is empty. {" "}
            <a href="/shop" className="cartShopLink">
              Continue shopping
            </a>
          </p>
        ) : (
          <div className="cartItems">
            {cartItems.map((item) => (
              <div key={item.id} className="cartItem">
                <Image src={item.image} alt={item.title} width={150} height={150} />
                <div className="cartDetails">
                  <h3 className="cartItemTitle">{item.title}</h3>
                  <p className="cartBody">{item.body}</p>
                  <p className="cartPrice">Price: ₹{item.price}</p>
                  <button className="cartRemove">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
