import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Subscriptions from "./components/Subscriptions";
const CART_STORAGE_KEY = "eztech_cart";


function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });
  

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.service === item.service);

      if (item.id <= 4 && itemExists) {
        alert("You can only add one subscription at a time.");
        return prevItems;
      }

      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.service === item.service
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const increaseQuantity = (service) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.service === service ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (service) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.service === service
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (service) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.service !== service));
  };

  React.useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        <nav className="navbar">
          <h2>EZTech Cart</h2>
          <div className="nav-links">
            <Link to="/">Subscriptions</Link>
            <Link to="/cart">Cart ({cartItems.reduce((total, item) => total + item.quantity, 0)})</Link>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Subscriptions addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <div className="main-content">
                <h1>Your Cart</h1>
                {cartItems.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <ul className="cart-list">
                    {cartItems.map((item) => (
                      <li key={item.service}>
                        {item.service} - (${item.price} x {item.quantity}) = ${item.price * item.quantity}
                        <div style={{ marginTop: "5px" }}>
                          <button onClick={() => increaseQuantity(item.service)}>➕</button>
                          <button onClick={() => decreaseQuantity(item.service)}>➖</button>
                          <button onClick={() => removeFromCart(item.service)}>🗑️</button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {cartItems.length > 0 && (
                  <h3 style={{ marginTop: "20px" }}>
                    Total: ${calculateTotal()}
                  </h3>
                )}
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
