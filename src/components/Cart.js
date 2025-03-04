import React from "react";
import Image from "next/image";
import "../app/styles/Cart.css";

const cartItems = [
  {
    id: "1",
    name: "Stylish Shirt",
    price: 299,
    discount: 10,
    bgcolor: "#f8f8f8",
    image: "/image/shirt.jpg",
  },
  {
    id: "2",
    name: "Casual Shirt",
    price: 199,
    discount: 5,
    bgcolor: "#f0f0f0",
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
            Your cart is empty.{" "}
            <a href="/shop" className="cartShopLink">
              Continue shopping
            </a>
          </p>
        ) : (
          <div className="cartItems">
            {cartItems.map((item) => (
              <div key={item.id} className="cartItem">
                <div
                  className="cartImageContainer"
                  style={{ backgroundColor: item.bgcolor }}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={120}
                    height={120}
                  />
                </div>

                <div className="cartDetails">
                  <h3 className="cartItemName">{item.name}</h3>
                  <p className="cartPrice">Price: ₹{item.price}</p>
                  {item.discount && (
                    <p className="cartDiscount">Discount: {item.discount}% off</p>
                  )}
                  <div className="cartActions">
                    <button className="cartRemove">Remove</button>
                    <p className="cartTotal">Total: ₹{item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="cartCheckout">
          <a href="/checkout" className="cartCheckoutButton">
            Proceed to Checkout
          </a>
        </div>
      </div>
    </div>
  );
};

export default Cart;
