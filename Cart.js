import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Headphones", price: 199 },
    { id: 3, name: "Mouse", price: 49 },
  ]);

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Your Shopping Cart</h1>
      <p>View and manage the items you have added to your cart.</p>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {cartItems.map(item => (
              <li key={item.id} style={{ margin: "10px 0" }}>
                {item.name} - ${item.price}{" "}
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <h3>Total: ${total}</h3>
          {/* Checkout Button */}
          <button onClick={() => navigate("/creditcard")} style={{ marginTop: "20px" }}>
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;
