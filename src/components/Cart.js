const Cart = ({ cart, removeFromCart }) => {
    return (
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
              <button onClick={() => removeFromCart(index)}>Remove</button>
            </li>
          ))}
        </ul>
        <h3>Total: ${cart.reduce((sum, item) => sum + item.price, 0)}</h3>
      </div>
    );
  };
  
  export default Cart;
  